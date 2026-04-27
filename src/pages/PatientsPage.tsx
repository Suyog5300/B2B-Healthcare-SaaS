import { Users } from 'lucide-react';
import { ViewToggle } from '@/components/common/ViewToggle';
import { EmptyState } from '@/components/common/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import { useUIStore } from '@/store/uiStore';
import { VIEW_MODES } from '@/config/constants';
import { usePatients, PatientGrid, PatientList, PatientFilters } from '@/features/patients';

const PatientsPage = () => {
  const { patients, allPatients, isLoading, filters, setFilters } = usePatients();
  const { patientViewMode, setPatientViewMode } = useUIStore();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
            Patients
          </h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            {isLoading
              ? 'Loading patients...'
              : `${patients.length} of ${allPatients.length} patients`}
          </p>
        </div>
        <ViewToggle value={patientViewMode} onChange={setPatientViewMode} />
      </div>

      <PatientFilters filters={filters} onChange={setFilters} />

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      ) : patients.length === 0 ? (
        <EmptyState
          icon={<Users className="h-8 w-8" />}
          title="No patients found"
          description="Try adjusting your search or filters."
        />
      ) : patientViewMode === VIEW_MODES.GRID ? (
        <PatientGrid patients={patients} />
      ) : (
        <PatientList patients={patients} />
      )}
    </div>
  );
};

export default PatientsPage;
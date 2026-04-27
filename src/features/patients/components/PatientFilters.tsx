import { SearchBar } from '@/components/common/SearchBar';
import { PATIENT_DEPARTMENTS } from '@/data/mockPatients';
import type { PatientFilters as PatientFiltersType } from '../types/patient.types';

interface PatientFiltersProps {
  filters: PatientFiltersType;
  onChange: (filters: Partial<PatientFiltersType>) => void;
}

export const PatientFilters = ({ filters, onChange }: PatientFiltersProps) => {
  const selectClass =
    'h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100';

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex-1">
        <SearchBar
          value={filters.search}
          onChange={(v) => onChange({ search: v })}
          placeholder="Search by name, ID, or condition..."
        />
      </div>

      <select
        className={selectClass}
        value={filters.status}
        onChange={(e) =>
          onChange({ status: e.target.value as PatientFiltersType['status'] })
        }
        aria-label="Filter by status"
      >
        <option value="all">All statuses</option>
        <option value="active">Active</option>
        <option value="critical">Critical</option>
        <option value="recovered">Recovered</option>
        <option value="admitted">Admitted</option>
      </select>

      <select
        className={selectClass}
        value={filters.department}
        onChange={(e) => onChange({ department: e.target.value })}
        aria-label="Filter by department"
      >
        <option value="all">All departments</option>
        {PATIENT_DEPARTMENTS.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
    </div>
  );
};
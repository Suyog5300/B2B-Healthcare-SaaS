import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { calculateAge, formatDate } from '@/utils/date';
import { getInitials } from '@/utils/formatters';
import type { Patient, PatientStatus } from '../types/patient.types';

const statusVariant: Record<PatientStatus, 'success' | 'danger' | 'info' | 'warning'> = {
  active: 'info',
  critical: 'danger',
  recovered: 'success',
  admitted: 'warning',
};

interface PatientRowProps {
  patient: Patient;
}

export const PatientRow = ({ patient }: PatientRowProps) => {
  return (
    <Card className="px-4 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50">
      <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
        {/* Avatar + Name */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {patient.avatarUrl ? (
            <img
              src={patient.avatarUrl}
              alt={patient.name}
              className="h-10 w-10 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
              {getInitials(patient.name)}
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate font-medium text-slate-900 dark:text-slate-100">
              {patient.name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {patient.id} · {calculateAge(patient.dateOfBirth)} yrs · {patient.gender}
            </p>
          </div>
        </div>

        {/* Condition */}
        <div className="hidden min-w-0 flex-1 md:block">
          <p className="text-xs text-slate-500 dark:text-slate-400">Condition</p>
          <p className="truncate text-sm text-slate-900 dark:text-slate-100">
            {patient.condition}
          </p>
        </div>

        {/* Doctor */}
        <div className="hidden min-w-0 flex-1 lg:block">
          <p className="text-xs text-slate-500 dark:text-slate-400">Doctor</p>
          <p className="truncate text-sm text-slate-900 dark:text-slate-100">{patient.doctor}</p>
          <p className="truncate text-xs text-slate-500 dark:text-slate-400">
            {patient.department}
          </p>
        </div>

        {/* Last visit */}
        <div className="hidden text-right xl:block">
          <p className="text-xs text-slate-500 dark:text-slate-400">Last visit</p>
          <p className="text-sm text-slate-900 dark:text-slate-100">
            {formatDate(patient.lastVisit, 'dd MMM')}
          </p>
        </div>

        {/* Status */}
        <Badge variant={statusVariant[patient.status]} className="shrink-0 capitalize">
          {patient.status}
        </Badge>
      </div>
    </Card>
  );
};
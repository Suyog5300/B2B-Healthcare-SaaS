import { Phone, Mail, Calendar, Stethoscope } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
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

interface PatientCardProps {
  patient: Patient;
}

export const PatientCard = ({ patient }: PatientCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-primary-500 to-primary-700" />
      <CardContent className="pt-5">
        <div className="flex items-start gap-4">
          <div className="relative">
            {patient.avatarUrl ? (
              <img
                src={patient.avatarUrl}
                alt={patient.name}
                className="h-14 w-14 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-100 font-semibold text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                {getInitials(patient.name)}
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="truncate font-semibold text-slate-900 dark:text-slate-100">
                  {patient.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{patient.id}</p>
              </div>
              <Badge variant={statusVariant[patient.status]} className="capitalize">
                {patient.status}
              </Badge>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5 text-xs text-slate-600 dark:text-slate-400">
              <span className="rounded bg-slate-100 px-2 py-0.5 dark:bg-slate-700">
                {calculateAge(patient.dateOfBirth)} yrs
              </span>
              <span className="rounded bg-slate-100 px-2 py-0.5 capitalize dark:bg-slate-700">
                {patient.gender}
              </span>
              <span className="rounded bg-red-50 px-2 py-0.5 text-red-700 dark:bg-red-900/20 dark:text-red-400">
                {patient.bloodGroup}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 dark:border-slate-700">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Stethoscope className="h-4 w-4 shrink-0 text-slate-400" />
            <span className="truncate">{patient.condition}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Mail className="h-4 w-4 shrink-0 text-slate-400" />
            <span className="truncate">{patient.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Phone className="h-4 w-4 shrink-0 text-slate-400" />
            <span>{patient.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Calendar className="h-4 w-4 shrink-0 text-slate-400" />
            <span>Last visit: {formatDate(patient.lastVisit)}</span>
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-700/50">
          <p className="text-xs text-slate-500 dark:text-slate-400">Attending Doctor</p>
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
            {patient.doctor}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{patient.department}</p>
        </div>
      </CardContent>
    </Card>
  );
};
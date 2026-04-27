import { PatientRow } from './PatientRow';
import type { Patient } from '../types/patient.types';

interface PatientListProps {
  patients: Patient[];
}

export const PatientList = ({ patients }: PatientListProps) => (
  <div className="flex flex-col gap-2">
    {patients.map((patient) => (
      <PatientRow key={patient.id} patient={patient} />
    ))}
  </div>
);
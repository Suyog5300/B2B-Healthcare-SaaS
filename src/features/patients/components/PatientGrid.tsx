import { PatientCard } from './PatientCard';
import type { Patient } from '../types/patient.types';

interface PatientGridProps {
  patients: Patient[];
}

export const PatientGrid = ({ patients }: PatientGridProps) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {patients.map((patient) => (
      <PatientCard key={patient.id} patient={patient} />
    ))}
  </div>
);
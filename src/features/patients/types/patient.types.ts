export type Gender = 'male' | 'female' | 'other';
export type PatientStatus = 'active' | 'critical' | 'recovered' | 'admitted';
export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: Gender;
  dateOfBirth: string;
  bloodGroup: BloodGroup;
  status: PatientStatus;
  condition: string;
  doctor: string;
  department: string;
  admissionDate: string;
  lastVisit: string;
  avatarUrl?: string;
  address: string;
  emergencyContact: string;
}

export interface PatientFilters {
  search: string;
  status: PatientStatus | 'all';
  department: string | 'all';
}
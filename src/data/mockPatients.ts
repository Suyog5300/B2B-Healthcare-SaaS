import type { Patient } from '@/features/patients/types/patient.types';

const departments = ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Oncology', 'General'];
const doctors = [
  'Dr. Anjali Sharma',
  'Dr. Rajesh Kumar',
  'Dr. Priya Patel',
  'Dr. Amit Verma',
  'Dr. Sneha Reddy',
  'Dr. Vikram Singh',
];
const conditions = [
  'Hypertension',
  'Diabetes Type 2',
  'Asthma',
  'Migraine',
  'Arthritis',
  'Anxiety Disorder',
  'Coronary Artery Disease',
  'Chronic Bronchitis',
];

const firstNames = [
  'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Krishna',
  'Ananya', 'Saanvi', 'Aadhya', 'Pari', 'Diya', 'Myra', 'Aaradhya', 'Anika',
];
const lastNames = [
  'Sharma', 'Verma', 'Patel', 'Kumar', 'Singh', 'Gupta', 'Reddy', 'Joshi',
  'Mehta', 'Iyer', 'Nair', 'Rao', 'Desai', 'Kapoor', 'Bhat', 'Chopra',
];

const statuses: Patient['status'][] = ['active', 'critical', 'recovered', 'admitted'];
const bloodGroups: Patient['bloodGroup'][] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const genders: Patient['gender'][] = ['male', 'female', 'other'];

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generatePatient = (i: number): Patient => {
  const first = pick(firstNames);
  const last = pick(lastNames);
  const name = `${first} ${last}`;
  const year = 1955 + Math.floor(Math.random() * 60);
  const month = String(1 + Math.floor(Math.random() * 12)).padStart(2, '0');
  const day = String(1 + Math.floor(Math.random() * 28)).padStart(2, '0');

  const admDays = Math.floor(Math.random() * 90);
  const visitDays = Math.floor(Math.random() * admDays);
  const admissionDate = new Date(Date.now() - admDays * 86400000).toISOString();
  const lastVisit = new Date(Date.now() - visitDays * 86400000).toISOString();

  return {
    id: `PT-${String(1000 + i).padStart(5, '0')}`,
    name,
    email: `${first.toLowerCase()}.${last.toLowerCase()}${i}@example.com`,
    phone: `+91 ${9000000000 + Math.floor(Math.random() * 999999999)}`,
    gender: pick(genders),
    dateOfBirth: `${year}-${month}-${day}`,
    bloodGroup: pick(bloodGroups),
    status: pick(statuses),
    condition: pick(conditions),
    doctor: pick(doctors),
    department: pick(departments),
    admissionDate,
    lastVisit,
    avatarUrl: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
    address: `${Math.floor(Math.random() * 999) + 1}, Sector ${Math.floor(Math.random() * 50) + 1}, Pune, MH`,
    emergencyContact: `+91 ${9000000000 + Math.floor(Math.random() * 999999999)}`,
  };
};

export const mockPatients: Patient[] = Array.from({ length: 48 }, (_, i) => generatePatient(i));

export const PATIENT_DEPARTMENTS = departments;
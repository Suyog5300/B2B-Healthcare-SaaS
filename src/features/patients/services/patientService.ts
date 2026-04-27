import { mockPatients } from '@/data/mockPatients';
import type { Patient } from '../types/patient.types';

// Simulates API calls - swap with real API later
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const patientService = {
  async getAll(): Promise<Patient[]> {
    await delay(600);
    return mockPatients;
  },

  async getById(id: string): Promise<Patient | null> {
    await delay(300);
    return mockPatients.find((p) => p.id === id) ?? null;
  },
};
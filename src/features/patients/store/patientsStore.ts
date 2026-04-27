import { create } from 'zustand';
import { patientService } from '../services/patientService';
import type { Patient, PatientFilters } from '../types/patient.types';

interface PatientsState {
  patients: Patient[];
  isLoading: boolean;
  error: string | null;
  filters: PatientFilters;
  fetchPatients: () => Promise<void>;
  setFilters: (filters: Partial<PatientFilters>) => void;
  resetFilters: () => void;
}

const initialFilters: PatientFilters = {
  search: '',
  status: 'all',
  department: 'all',
};

export const usePatientsStore = create<PatientsState>((set) => ({
  patients: [],
  isLoading: false,
  error: null,
  filters: initialFilters,

  fetchPatients: async () => {
    set({ isLoading: true, error: null });
    try {
      const patients = await patientService.getAll();
      set({ patients, isLoading: false });
    } catch (err) {
      set({
        error: (err as Error).message ?? 'Failed to load patients',
        isLoading: false,
      });
    }
  },

  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),

  resetFilters: () => set({ filters: initialFilters }),
}));
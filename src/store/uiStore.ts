import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS, VIEW_MODES, type ViewMode } from '@/config/constants';

type Theme = 'light' | 'dark';

interface UIState {
  theme: Theme;
  patientViewMode: ViewMode;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setPatientViewMode: (mode: ViewMode) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'light',
      patientViewMode: VIEW_MODES.GRID,

      toggleTheme: () =>
        set((state) => {
          const next = state.theme === 'light' ? 'dark' : 'light';
          document.documentElement.classList.toggle('dark', next === 'dark');
          return { theme: next };
        }),

      setTheme: (theme) => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        set({ theme });
      },

      setPatientViewMode: (patientViewMode) => set({ patientViewMode }),
    }),
    {
      name: STORAGE_KEYS.THEME,
    }
  )
);
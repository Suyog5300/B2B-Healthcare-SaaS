import { create } from 'zustand';
import { authService } from '../services/authService';
import type { AuthState, AuthUser } from '../types/auth.types';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: AuthUser | null) => void;
  setLoading: (loading: boolean) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  error: null,
  isAuthenticated: false,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const user = await authService.login(email, password);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (err) {
      const code = (err as { code?: string }).code ?? '';
      set({
        error: authService.getFirebaseErrorMessage(code),
        isLoading: false,
        isAuthenticated: false,
      });
      throw err;
    }
  },

  logout: async () => {
    await authService.logout();
    set({ user: null, isAuthenticated: false, error: null });
  },

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    }),

  setLoading: (loading) => set({ isLoading: loading }),
  clearError: () => set({ error: null }),
}));
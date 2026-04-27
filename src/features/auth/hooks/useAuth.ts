import { useEffect } from 'react';
import { authService } from '../services/authService';
import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const store = useAuthStore();

  useEffect(() => {
    const unsubscribe = authService.onAuthChange((user) => {
      store.setUser(user);
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return store;
};

export const useAuthState = () => useAuthStore((s) => s);
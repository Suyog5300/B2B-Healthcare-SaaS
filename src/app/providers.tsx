import { useEffect, type ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAuth } from '@/features/auth';
import { useUIStore } from '@/store/uiStore';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

export const AppProviders = ({ children }: { children: ReactNode }) => {
  // Initialize auth listener
  useAuth();

  const theme = useUIStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <ErrorBoundary>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '8px',
            background: theme === 'dark' ? '#1e293b' : '#ffffff',
            color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
          },
        }}
      />
    </ErrorBoundary>
  );
};
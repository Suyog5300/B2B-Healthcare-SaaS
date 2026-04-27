import { Navigate } from 'react-router-dom';
import { useAuthState } from '@/features/auth';
import { ROUTES } from '@/config/routes';
import { Spinner } from '@/components/ui/Spinner';

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuthState();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner size="lg" className="text-primary-600" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <>{children}</>;
};
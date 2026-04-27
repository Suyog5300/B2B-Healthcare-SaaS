import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/config/routes';

const NotFoundPage = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 text-center dark:bg-slate-950">
    <h1 className="text-7xl font-bold text-primary-600">404</h1>
    <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
      Page not found
    </h2>
    <p className="mt-2 max-w-md text-slate-600 dark:text-slate-400">
      The page you're looking for doesn't exist or has been moved.
    </p>
    <Link to={ROUTES.DASHBOARD} className="mt-6">
      <Button leftIcon={<Home className="h-4 w-4" />}>Back to Dashboard</Button>
    </Link>
  </div>
);

export default NotFoundPage;
/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { AppLayout } from '@/components/layout/AppLayout';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';
import { PublicRoute } from '@/components/common/PublicRoute';
import { Spinner } from '@/components/ui/Spinner';

const LoginPage = lazy(() => import('@/pages/LoginPage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const PatientsPage = lazy(() => import('@/pages/PatientsPage'));
const AnalyticsPage = lazy(() => import('@/pages/AnalyticsPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const PageLoader = () => (
  <div className="flex h-[60vh] items-center justify-center">
    <Spinner size="lg" className="text-primary-600" />
  </div>
);

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [{ path: ROUTES.LOGIN, element: withSuspense(LoginPage) }],
  },
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: ROUTES.DASHBOARD, element: withSuspense(DashboardPage) },
      { path: ROUTES.PATIENTS, element: withSuspense(PatientsPage) },
      { path: ROUTES.ANALYTICS, element: withSuspense(AnalyticsPage) },
    ],
  },
  { path: '/404', element: withSuspense(NotFoundPage) },
  { path: '*', element: <Navigate to="/404" replace /> },
]);
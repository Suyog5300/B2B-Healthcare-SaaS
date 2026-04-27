import { Outlet } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';
import { APP_NAME } from '@/config/constants';

export const AuthLayout = () => (
  <div className="flex min-h-screen">
    {/* Left: Brand panel */}
    <div className="relative hidden flex-1 overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 lg:flex">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
      <div className="relative z-10 flex flex-col justify-between p-12 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur">
            <HeartPulse className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold">{APP_NAME}</span>
        </div>
        <div>
          <h1 className="mb-3 text-4xl font-bold leading-tight">
            Healthcare management,
            <br />
            simplified.
          </h1>
          <p className="max-w-md text-primary-100">
            Manage patients, track analytics, and stay connected with real-time notifications —
            all in one platform.
          </p>
        </div>
        <div className="text-sm text-primary-200">© 2026 {APP_NAME}. All rights reserved.</div>
      </div>
    </div>

    {/* Right: Form panel */}
    <div className="flex flex-1 items-center justify-center bg-white p-6 dark:bg-slate-900">
      <Outlet />
    </div>
  </div>
);
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, Lock, HeartPulse } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuthStore } from '@/features/auth';
import { loginSchema, type LoginFormValues } from '@/utils/validators';
import { ROUTES } from '@/config/routes';
import { APP_NAME } from '@/config/constants';

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const error = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormValues) => {
    clearError();
    try {
      await login(data.email, data.password);
      toast.success('Welcome back!');
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch {
      // error handled in store
    }
  };

  return (
    <div className="w-full max-w-md">
      {/* Mobile branding */}
      <div className="mb-8 flex items-center justify-center gap-2 lg:hidden">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600 text-white">
          <HeartPulse className="h-6 w-6" />
        </div>
        <span className="text-xl font-bold">{APP_NAME}</span>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Welcome back</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Sign in to your account to continue.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4" noValidate>
        <Input
          label="Email"
          type="email"
          placeholder="you@hospital.com"
          autoComplete="email"
          leftIcon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          leftIcon={<Lock className="h-4 w-4" />}
          error={errors.password?.message}
          {...register('password')}
        />

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
          Sign in
        </Button>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400">
          <p className="font-medium">Demo credentials:</p>
          <p>Email: demo@healthcare.com</p>
          <p>Password: demo123</p>
          <p className="mt-1 italic">
            (Create this user in your Firebase console under Authentication → Users)
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
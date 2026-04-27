import { Menu, Bell, LogOut, Moon, Sun } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/features/auth';
import { useUIStore } from '@/store/uiStore';
import { getInitials } from '@/utils/formatters';
import { useNotifications } from '@/features/notifications/hooks/useNotifications';

interface TopbarProps {
  onMenuClick: () => void;
}

export const Topbar = ({ onMenuClick }: TopbarProps) => {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const { theme, toggleTheme } = useUIStore();
  const { sendTestNotification } = useNotifications();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 lg:px-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={sendTestNotification}
          aria-label="Test notification"
        >
          <Bell className="h-5 w-5" />
        </Button>

        <div className="hidden items-center gap-3 border-l border-slate-200 pl-3 dark:border-slate-800 sm:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
            {user?.email ? getInitials(user.email) : 'U'}
          </div>
          <div className="hidden flex-col text-xs md:flex">
            <span className="font-medium text-slate-900 dark:text-slate-100">
              {user?.displayName ?? 'User'}
            </span>
            <span className="text-slate-500 dark:text-slate-400">{user?.email}</span>
          </div>
        </div>

        <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Logout">
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};
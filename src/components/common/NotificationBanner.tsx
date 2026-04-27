import { Bell, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useNotifications } from '@/features/notifications';

export const NotificationBanner = () => {
  const { permission, isSupported, requestPermission } = useNotifications();
  const [dismissed, setDismissed] = useState(false);

  if (!isSupported || permission === 'granted' || permission === 'denied' || dismissed) {
    return null;
  }

  return (
    <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-primary-200 bg-primary-50 p-4 dark:border-primary-800 dark:bg-primary-900/20">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-300">
          <Bell className="h-5 w-5" />
        </div>
        <div>
          <p className="font-medium text-slate-900 dark:text-slate-100">
            Enable notifications
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Get real-time alerts for critical patients and appointments.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={requestPermission}>
          Enable
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
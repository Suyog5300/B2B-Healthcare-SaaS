import { type ReactNode } from 'react';
import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
    <div className="rounded-full bg-slate-100 p-4 text-slate-400 dark:bg-slate-800">
      {icon ?? <Inbox className="h-8 w-8" />}
    </div>
    <h3 className="text-lg font-semibold">{title}</h3>
    {description && (
      <p className="max-w-md text-sm text-slate-500 dark:text-slate-400">{description}</p>
    )}
    {action}
  </div>
);
import { cn } from '@/utils/cn';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export const Toggle = ({ checked, onChange, label, className }: ToggleProps) => (
  <label className={cn('inline-flex cursor-pointer items-center gap-2', className)}>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        checked ? 'bg-primary-600' : 'bg-slate-300 dark:bg-slate-700'
      )}
    >
      <span
        className={cn(
          'inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform',
          checked ? 'translate-x-5' : 'translate-x-0.5'
        )}
      />
    </button>
    {label && <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>}
  </label>
);
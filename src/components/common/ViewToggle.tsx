import { LayoutGrid, List } from 'lucide-react';
import { cn } from '@/utils/cn';
import { VIEW_MODES, type ViewMode } from '@/config/constants';

interface ViewToggleProps {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}

export const ViewToggle = ({ value, onChange }: ViewToggleProps) => {
  const buttonClass = (active: boolean) =>
    cn(
      'flex h-9 items-center gap-1.5 rounded-md px-3 text-sm font-medium transition-colors',
      active
        ? 'bg-white text-primary-600 shadow-sm dark:bg-slate-700 dark:text-primary-400'
        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
    );

  return (
    <div className="inline-flex items-center gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
      <button
        type="button"
        onClick={() => onChange(VIEW_MODES.GRID)}
        className={buttonClass(value === VIEW_MODES.GRID)}
        aria-pressed={value === VIEW_MODES.GRID}
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="hidden sm:inline">Grid</span>
      </button>
      <button
        type="button"
        onClick={() => onChange(VIEW_MODES.LIST)}
        className={buttonClass(value === VIEW_MODES.LIST)}
        aria-pressed={value === VIEW_MODES.LIST}
      >
        <List className="h-4 w-4" />
        <span className="hidden sm:inline">List</span>
      </button>
    </div>
  );
};
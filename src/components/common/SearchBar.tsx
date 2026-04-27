import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar = ({
  value,
  onChange,
  placeholder = 'Search...',
  className,
}: SearchBarProps) => (
  <Input
    type="search"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    leftIcon={<Search className="h-4 w-4" />}
    className={className}
  />
);
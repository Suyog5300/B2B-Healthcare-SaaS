import { format, formatDistanceToNow, parseISO } from 'date-fns';

export const formatDate = (date: string | Date, pattern = 'dd MMM yyyy'): string => {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, pattern);
};

export const formatRelativeTime = (date: string | Date): string => {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
};

export const calculateAge = (dob: string): number => {
  const birth = new Date(dob);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
  return age;
};
import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(key: string, initial: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error('localStorage write error', err);
    }
  }, [key, value]);

  return [value, setValue] as const;
};
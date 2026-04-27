import { useEffect, useMemo } from 'react';
import { usePatientsStore } from '../store/patientsStore';
import { useDebounce } from '@/hooks/useDebounce';

export const usePatients = () => {
  const { patients, isLoading, error, filters, fetchPatients, setFilters, resetFilters } =
    usePatientsStore();

  useEffect(() => {
    if (patients.length === 0) {
      fetchPatients();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debouncedSearch = useDebounce(filters.search, 250);

  const filteredPatients = useMemo(() => {
    return patients.filter((p) => {
      const matchesSearch =
        debouncedSearch === '' ||
        p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.id.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.condition.toLowerCase().includes(debouncedSearch.toLowerCase());

      const matchesStatus = filters.status === 'all' || p.status === filters.status;
      const matchesDept = filters.department === 'all' || p.department === filters.department;

      return matchesSearch && matchesStatus && matchesDept;
    });
  }, [patients, debouncedSearch, filters.status, filters.department]);

  return {
    patients: filteredPatients,
    allPatients: patients,
    isLoading,
    error,
    filters,
    setFilters,
    resetFilters,
    refetch: fetchPatients,
  };
};
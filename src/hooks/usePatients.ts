// Custom React Hooks for Patient Data Management
// Handles async API calls with loading and error states

import { useState, useEffect, useCallback } from 'react';
import { patientDB } from '../services/database';
import type { Patient } from '../types';

/**
 * Hook for managing all patient data with loading and error states
 */
export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPatients = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await patientDB.getAll();
      setPatients(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch patients';
      setError(errorMessage);
      console.error('[usePatients] Error:', errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const createPatient = useCallback(
    async (patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => {
      try {
        setError(null);
        const newPatient = await patientDB.create(patient);
        setPatients((prev) => [...prev, newPatient]);
        return newPatient;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to create patient';
        setError(errorMessage);
        console.error('[usePatients] Create error:', errorMessage);
        throw err;
      }
    },
    []
  );

  const updatePatient = useCallback(
    async (id: string, updates: Partial<Omit<Patient, 'id' | 'createdAt'>>) => {
      try {
        setError(null);
        const updatedPatient = await patientDB.update(id, updates);
        if (updatedPatient) {
          setPatients((prev) =>
            prev.map((p) => (p.id === id ? updatedPatient : p))
          );
        }
        return updatedPatient;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update patient';
        setError(errorMessage);
        console.error('[usePatients] Update error:', errorMessage);
        throw err;
      }
    },
    []
  );

  const deletePatient = useCallback(async (id: string) => {
    try {
      setError(null);
      const success = await patientDB.delete(id);
      if (success) {
        setPatients((prev) => prev.filter((p) => p.id !== id));
      }
      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete patient';
      setError(errorMessage);
      console.error('[usePatients] Delete error:', errorMessage);
      return false;
    }
  }, []);

  return {
    patients,
    loading,
    error,
    refetch: fetchPatients,
    createPatient,
    updatePatient,
    deletePatient,
  };
}

/**
 * Hook for managing a single patient
 */
export function usePatient(id: string | undefined) {
  const [patient, setPatient] = useState<Patient | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPatient = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await patientDB.getById(id);
      setPatient(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch patient';
      setError(errorMessage);
      console.error('[usePatient] Error:', errorMessage);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPatient();
  }, [fetchPatient]);

  return {
    patient,
    loading,
    error,
    refetch: fetchPatient,
  };
}

/**
 * Hook for filtering patients by department
 */
export function usePatientsByDepartment(department: string | undefined) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPatients = useCallback(async () => {
    if (!department) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await patientDB.getByDepartment(department);
      setPatients(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch patients';
      setError(errorMessage);
      console.error('[usePatientsByDepartment] Error:', errorMessage);
    } finally {
      setLoading(false);
    }
  }, [department]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  return {
    patients,
    loading,
    error,
    refetch: fetchPatients,
  };
}

/**
 * Hook for patient statistics
 */
export function usePatientStats() {
  const { patients, loading, error } = usePatients();

  const stats = {
    total: patients.length,
    active: patients.filter((p) => p.status === 'Active').length,
    underTreatment: patients.filter((p) => p.status === 'Under Treatment').length,
    discharged: patients.filter((p) => p.status === 'Discharged').length,
    byDepartment: patients.reduce((acc, patient) => {
      acc[patient.department] = (acc[patient.department] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };

  return {
    stats,
    loading,
    error,
  };
}

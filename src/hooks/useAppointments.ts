// Custom React Hooks for Appointment Data Management
// Handles async API calls with loading and error states

import { useState, useEffect, useCallback } from 'react';
import { appointmentDB } from '../services/database';
import type { Appointment } from '../types';

/**
 * Hook for managing all appointment data with loading and error states
 */
export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await appointmentDB.getAll();
      setAppointments(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch appointments';
      setError(errorMessage);
      console.error('[useAppointments] Error:', errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const createAppointment = useCallback(
    async (appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => {
      try {
        setError(null);
        const newAppointment = await appointmentDB.create(appointment);
        setAppointments((prev) => [...prev, newAppointment]);
        return newAppointment;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to create appointment';
        setError(errorMessage);
        console.error('[useAppointments] Create error:', errorMessage);
        throw err;
      }
    },
    []
  );

  const updateAppointment = useCallback(
    async (id: string, updates: Partial<Omit<Appointment, 'id' | 'createdAt'>>) => {
      try {
        setError(null);
        const updatedAppointment = await appointmentDB.update(id, updates);
        if (updatedAppointment) {
          setAppointments((prev) =>
            prev.map((a) => (a.id === id ? updatedAppointment : a))
          );
        }
        return updatedAppointment;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update appointment';
        setError(errorMessage);
        console.error('[useAppointments] Update error:', errorMessage);
        throw err;
      }
    },
    []
  );

  const deleteAppointment = useCallback(async (id: string) => {
    try {
      setError(null);
      const success = await appointmentDB.delete(id);
      if (success) {
        setAppointments((prev) => prev.filter((a) => a.id !== id));
      }
      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete appointment';
      setError(errorMessage);
      console.error('[useAppointments] Delete error:', errorMessage);
      return false;
    }
  }, []);

  return {
    appointments,
    loading,
    error,
    refetch: fetchAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,
  };
}

/**
 * Hook for managing a single appointment
 */
export function useAppointment(id: string | undefined) {
  const [appointment, setAppointment] = useState<Appointment | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointment = useCallback(async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await appointmentDB.getById(id);
      setAppointment(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch appointment';
      setError(errorMessage);
      console.error('[useAppointment] Error:', errorMessage);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchAppointment();
  }, [fetchAppointment]);

  return {
    appointment,
    loading,
    error,
    refetch: fetchAppointment,
  };
}

/**
 * Hook for filtering appointments by department
 */
export function useAppointmentsByDepartment(department: string | undefined) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    if (!department) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await appointmentDB.getByDepartment(department);
      setAppointments(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch appointments';
      setError(errorMessage);
      console.error('[useAppointmentsByDepartment] Error:', errorMessage);
    } finally {
      setLoading(false);
    }
  }, [department]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  return {
    appointments,
    loading,
    error,
    refetch: fetchAppointments,
  };
}

/**
 * Hook for appointment statistics
 */
export function useAppointmentStats() {
  const { appointments, loading, error } = useAppointments();

  const stats = {
    total: appointments.length,
    scheduled: appointments.filter((a) => a.status === 'Scheduled').length,
    completed: appointments.filter((a) => a.status === 'Completed').length,
    cancelled: appointments.filter((a) => a.status === 'Cancelled').length,
    byDepartment: appointments.reduce((acc, appointment) => {
      acc[appointment.department] = (acc[appointment.department] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    byDoctor: appointments.reduce((acc, appointment) => {
      acc[appointment.doctor] = (acc[appointment.doctor] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };

  return {
    stats,
    loading,
    error,
  };
}

/**
 * Hook for upcoming appointments (next 7 days)
 */
export function useUpcomingAppointments() {
  const { appointments, loading, error } = useAppointments();

  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  const upcomingAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.date);
    return (
      appointmentDate >= today &&
      appointmentDate <= nextWeek &&
      appointment.status === 'Scheduled'
    );
  });

  return {
    upcomingAppointments,
    loading,
    error,
  };
}

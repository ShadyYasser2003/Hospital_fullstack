// Database Service - API Integration Layer
// This service interfaces with the Supabase backend server for all data operations

import { api } from '../utils/api';
import type { Patient, Appointment, ApiResponse } from '../types';

// ============================================================================
// PATIENT OPERATIONS
// ============================================================================

export const patientDB = {
  /**
   * Get all patients
   */
  getAll: async (): Promise<Patient[]> => {
    try {
      const response = await api.get<ApiResponse<Patient[]>>('/patients');
      return response.data || [];
    } catch (error) {
      console.error('[PatientDB] Error fetching all patients:', error);
      throw error;
    }
  },

  /**
   * Get patient by ID
   */
  getById: async (id: string): Promise<Patient | undefined> => {
    try {
      const response = await api.get<ApiResponse<Patient>>(`/patients/${id}`);
      return response.data;
    } catch (error) {
      console.error(`[PatientDB] Error fetching patient ${id}:`, error);
      return undefined;
    }
  },

  /**
   * Get patients by department
   */
  getByDepartment: async (department: string): Promise<Patient[]> => {
    try {
      const response = await api.get<ApiResponse<Patient[]>>(
        `/patients/department/${encodeURIComponent(department)}`
      );
      return response.data || [];
    } catch (error) {
      console.error(`[PatientDB] Error fetching patients for department ${department}:`, error);
      throw error;
    }
  },

  /**
   * Create new patient
   */
  create: async (patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>): Promise<Patient> => {
    try {
      const response = await api.post<ApiResponse<Patient>>('/patients', patient);
      if (!response.data) {
        throw new Error('Failed to create patient - no data returned');
      }
      return response.data;
    } catch (error) {
      console.error('[PatientDB] Error creating patient:', error);
      throw error;
    }
  },

  /**
   * Update patient
   */
  update: async (
    id: string,
    updates: Partial<Omit<Patient, 'id' | 'createdAt'>>
  ): Promise<Patient | undefined> => {
    try {
      const response = await api.put<ApiResponse<Patient>>(`/patients/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error(`[PatientDB] Error updating patient ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete patient
   */
  delete: async (id: string): Promise<boolean> => {
    try {
      const response = await api.delete<ApiResponse<void>>(`/patients/${id}`);
      return response.success;
    } catch (error) {
      console.error(`[PatientDB] Error deleting patient ${id}:`, error);
      return false;
    }
  },
};

// ============================================================================
// APPOINTMENT OPERATIONS
// ============================================================================

export const appointmentDB = {
  /**
   * Get all appointments
   */
  getAll: async (): Promise<Appointment[]> => {
    try {
      const response = await api.get<ApiResponse<Appointment[]>>('/appointments');
      return response.data || [];
    } catch (error) {
      console.error('[AppointmentDB] Error fetching all appointments:', error);
      throw error;
    }
  },

  /**
   * Get appointment by ID
   */
  getById: async (id: string): Promise<Appointment | undefined> => {
    try {
      const response = await api.get<ApiResponse<Appointment>>(`/appointments/${id}`);
      return response.data;
    } catch (error) {
      console.error(`[AppointmentDB] Error fetching appointment ${id}:`, error);
      return undefined;
    }
  },

  /**
   * Get appointments by department
   */
  getByDepartment: async (department: string): Promise<Appointment[]> => {
    try {
      const response = await api.get<ApiResponse<Appointment[]>>(
        `/appointments/department/${encodeURIComponent(department)}`
      );
      return response.data || [];
    } catch (error) {
      console.error(`[AppointmentDB] Error fetching appointments for department ${department}:`, error);
      throw error;
    }
  },

  /**
   * Create new appointment
   */
  create: async (
    appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Appointment> => {
    try {
      const response = await api.post<ApiResponse<Appointment>>('/appointments', appointment);
      if (!response.data) {
        throw new Error('Failed to create appointment - no data returned');
      }
      return response.data;
    } catch (error) {
      console.error('[AppointmentDB] Error creating appointment:', error);
      throw error;
    }
  },

  /**
   * Update appointment
   */
  update: async (
    id: string,
    updates: Partial<Omit<Appointment, 'id' | 'createdAt'>>
  ): Promise<Appointment | undefined> => {
    try {
      const response = await api.put<ApiResponse<Appointment>>(`/appointments/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error(`[AppointmentDB] Error updating appointment ${id}:`, error);
      throw error;
    }
  },

  /**
   * Delete appointment
   */
  delete: async (id: string): Promise<boolean> => {
    try {
      const response = await api.delete<ApiResponse<void>>(`/appointments/${id}`);
      return response.success;
    } catch (error) {
      console.error(`[AppointmentDB] Error deleting appointment ${id}:`, error);
      return false;
    }
  },
};

// Export types for compatibility
export type { Patient, Appointment };

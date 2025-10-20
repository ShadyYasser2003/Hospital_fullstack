// Environment Configuration
// Centralized environment variables and settings

import { projectId, publicAnonKey } from '../utils/supabase/info';

export const ENV = {
  // Supabase Configuration
  SUPABASE_URL: `https://${projectId}.supabase.co`,
  SUPABASE_ANON_KEY: publicAnonKey,
  API_BASE_URL: `https://${projectId}.supabase.co/functions/v1/make-server-471cd30a`,

  // Hospital Information
  HOSPITAL_NAME: 'CareHub Medical Center',
  HOSPITAL_SHORT_NAME: 'CareHub',
  HOSPITAL_TAGLINE: 'Your Health, Our Priority',
  HOSPITAL_ESTABLISHED: '1985',
  
  // Contact Information
  CONTACT: {
    EMERGENCY_PHONE: '+1 (555) 123-4567',
    GENERAL_PHONE: '+1 (555) 123-4568',
    EMAIL_INFO: 'info@carehub.com',
    EMAIL_SUPPORT: 'support@carehub.com',
    EMAIL_APPOINTMENTS: 'appointments@carehub.com',
    ADDRESS_LINE1: '123 Medical Plaza, Healthcare District',
    ADDRESS_LINE2: 'New York, NY 10001, USA',
    ADDRESS_FULL: '123 Medical Plaza, Healthcare District, New York, NY 10001',
    ADDRESS_CITY: 'New York',
    ADDRESS_STATE: 'NY',
    ADDRESS_ZIP: '10001',
    ADDRESS_COUNTRY: 'USA',
  },

  // Operating Hours
  HOURS: {
    EMERGENCY: '24/7 Available',
    WEEKDAYS: 'Mon-Fri: 8:00 AM - 8:00 PM',
    SATURDAY: 'Sat: 9:00 AM - 5:00 PM',
    SUNDAY: 'Sun: Emergency Only',
  },

  // Social Media Links
  SOCIAL: {
    FACEBOOK: 'https://facebook.com/carehub',
    TWITTER: 'https://twitter.com/carehub',
    INSTAGRAM: 'https://instagram.com/carehub',
    LINKEDIN: 'https://linkedin.com/company/carehub',
    YOUTUBE: 'https://youtube.com/carehub',
  },

  // Statistics (displayed on homepage)
  STATS: {
    TOTAL_DOCTORS: '500+',
    HAPPY_PATIENTS: '50,000+',
    DEPARTMENTS: '20+',
    YEARS_EXPERIENCE: '40+',
    SUCCESS_RATE: '98%',
    BED_CAPACITY: '1,200+',
  },

  // Feature Flags
  FEATURES: {
    ENABLE_ONLINE_APPOINTMENTS: true,
    ENABLE_PATIENT_PORTAL: true,
    ENABLE_TELEMEDICINE: true,
    ENABLE_ONLINE_PAYMENTS: false,
    ENABLE_EMERGENCY_BOOKING: true,
    ENABLE_LIVE_CHAT: false,
  },

  // Appointment Configuration
  APPOINTMENT: {
    AVAILABLE_TIMES: [
      '09:00 AM',
      '09:30 AM',
      '10:00 AM',
      '10:30 AM',
      '11:00 AM',
      '11:30 AM',
      '02:00 PM',
      '02:30 PM',
      '03:00 PM',
      '03:30 PM',
      '04:00 PM',
      '04:30 PM',
      '05:00 PM',
    ],
    BOOKING_ADVANCE_DAYS: 30,
    CANCELLATION_HOURS: 24,
    MAX_APPOINTMENTS_PER_DAY: 8,
  },

  // Department Configuration
  DEPARTMENTS: [
    'Cardiology',
    'Neurology',
    'Pediatrics',
    'Orthopedics',
    'General Medicine',
    'Emergency Medicine',
    'Radiology',
    'Laboratory Services',
    'Surgical Services',
    'Obstetrics & Gynecology',
  ],

  // Patient Status Options
  PATIENT_STATUS: [
    'Active',
    'Under Treatment',
    'Discharged',
    'Scheduled',
  ] as const,

  // Appointment Status Options
  APPOINTMENT_STATUS: [
    'Scheduled',
    'Completed',
    'Cancelled',
    'No Show',
  ] as const,

  // Gender Options
  GENDER_OPTIONS: [
    'Male',
    'Female',
    'Other',
  ] as const,

  // Storage Keys (for localStorage - fallback only)
  STORAGE_KEYS: {
    PATIENTS: 'hospital_patients',
    APPOINTMENTS: 'hospital_appointments',
    USER_PREFERENCES: 'hospital_user_preferences',
  },

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 10,
    MAX_PAGE_SIZE: 100,
  },

  // API Settings
  API: {
    TIMEOUT: 30000, // 30 seconds
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000, // 1 second
  },
};

// Type definitions for better TypeScript support
export type Department = typeof ENV.DEPARTMENTS[number];
export type AppointmentTime = typeof ENV.APPOINTMENT.AVAILABLE_TIMES[number];
export type PatientStatus = typeof ENV.PATIENT_STATUS[number];
export type AppointmentStatus = typeof ENV.APPOINTMENT_STATUS[number];
export type GenderOption = typeof ENV.GENDER_OPTIONS[number];

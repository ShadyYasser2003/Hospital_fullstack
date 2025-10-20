// Shared TypeScript Types and Interfaces

export interface Admin {
  id: string;
  email: string;
  name: string;
  role: 'admin';
  createdAt?: string;
  updatedAt?: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  department: string;
  assignedDoctor: string;
  admissionDate: string;
  status: 'Active' | 'Discharged' | 'Under Treatment';
  medicalHistory: string;
  emergencyContact: string;
  emergencyPhone: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  doctor: string;
  date: string;
  time: string;
  message: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  createdAt?: string;
  updatedAt?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  experience: string;
  education: string;
  image?: string;
  qualifications?: string[];
  languages?: string[];
  bio?: string;
  availability?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  services?: string[];
  facilities?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface AuthResponse {
  success: boolean;
  data?: {
    user: {
      id: string;
      email: string;
      name: string;
    };
    accessToken: string;
  };
  error?: string;
  message?: string;
}

// Utility Helper Functions
// Common helper functions used throughout the application

import { ENV } from '../config/env';

/**
 * Format a date string to a localized date
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format a date string to a short date (MM/DD/YYYY)
 */
export function formatShortDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

/**
 * Format a phone number
 */
export function formatPhoneNumber(phone: string): string {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as +1 (XXX) XXX-XXXX
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  // Format as (XXX) XXX-XXXX
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  return phone;
}

/**
 * Calculate age from date of birth
 */
export function calculateAge(dateOfBirth: string): number {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

/**
 * Get initials from a name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Truncate text to a specific length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10 || (cleaned.length === 11 && cleaned.startsWith('1'));
}

/**
 * Generate a random ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get color class for patient status
 */
export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    'Active': 'bg-green-100 text-green-800',
    'Under Treatment': 'bg-yellow-100 text-yellow-800',
    'Discharged': 'bg-gray-100 text-gray-800',
    'Scheduled': 'bg-blue-100 text-blue-800',
    'Completed': 'bg-green-100 text-green-800',
    'Cancelled': 'bg-red-100 text-red-800',
    'No Show': 'bg-orange-100 text-orange-800',
  };
  
  return statusColors[status] || 'bg-gray-100 text-gray-800';
}

/**
 * Get department color from config
 */
export function getDepartmentColor(department: string): string {
  const colors: Record<string, string> = {
    'Cardiology': 'red',
    'Neurology': 'purple',
    'Pediatrics': 'green',
    'Orthopedics': 'blue',
    'General Medicine': 'indigo',
    'Emergency Medicine': 'orange',
    'Radiology': 'teal',
    'Laboratory Services': 'pink',
    'Surgical Services': 'violet',
  };
  
  return colors[department] || 'gray';
}

/**
 * Check if a date is in the past
 */
export function isPastDate(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

/**
 * Check if a date is in the future
 */
export function isFutureDate(dateString: string): boolean {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date > today;
}

/**
 * Get the minimum date for appointment booking (today)
 */
export function getMinAppointmentDate(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

/**
 * Get the maximum date for appointment booking
 */
export function getMaxAppointmentDate(): string {
  const today = new Date();
  const maxDate = new Date(today.getTime() + ENV.APPOINTMENT.BOOKING_ADVANCE_DAYS * 24 * 60 * 60 * 1000);
  return maxDate.toISOString().split('T')[0];
}

/**
 * Sort array by a specific field
 */
export function sortByField<T>(array: T[], field: keyof T, ascending: boolean = true): T[] {
  return [...array].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];
    
    if (aValue < bValue) return ascending ? -1 : 1;
    if (aValue > bValue) return ascending ? 1 : -1;
    return 0;
  });
}

/**
 * Group array by a specific field
 */
export function groupByField<T>(array: T[], field: keyof T): Record<string, T[]> {
  return array.reduce((acc, item) => {
    const key = String(item[field]);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

/**
 * Get greeting based on time of day
 */
export function getGreeting(): string {
  const hour = new Date().getHours();
  
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

/**
 * Capitalize first letter of each word
 */
export function capitalizeWords(text: string): string {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Sleep/delay function for async operations
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

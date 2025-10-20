// API Utility Functions
// Helper functions for making API calls

import { ENV } from '../config/env';

/**
 * Base configuration for API calls
 */
export const API_CONFIG = {
  baseUrl: ENV.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ENV.SUPABASE_ANON_KEY}`,
  },
};

/**
 * Generic API fetch wrapper with error handling
 */
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_CONFIG.baseUrl}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...API_CONFIG.headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      error: `HTTP ${response.status}: ${response.statusText}`,
    }));
    throw new Error(error.error || 'API request failed');
  }

  return response.json();
}

/**
 * HTTP Methods
 */
export const api = {
  get: function <T>(endpoint: string) {
    return apiFetch<T>(endpoint, { method: 'GET' });
  },
  
  post: function <T>(endpoint: string, data: any) {
    return apiFetch<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  put: function <T>(endpoint: string, data: any) {
    return apiFetch<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  
  delete: function <T>(endpoint: string) {
    return apiFetch<T>(endpoint, { method: 'DELETE' });
  },
};

/**
 * Check if API is available
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}/health`);
    const data = await response.json();
    return data.status === 'ok';
  } catch {
    return false;
  }
}

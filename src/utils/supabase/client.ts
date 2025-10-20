// Supabase Client Configuration
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// Singleton pattern for Supabase client
let supabaseInstance: ReturnType<typeof createSupabaseClient> | null = null;

export const createClient = () => {
  if (!supabaseInstance) {
    const supabaseUrl = `https://${projectId}.supabase.co`;
    supabaseInstance = createSupabaseClient(supabaseUrl, publicAnonKey);
  }
  return supabaseInstance;
};

export const supabase = createClient();

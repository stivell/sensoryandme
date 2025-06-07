import { createClient } from '@supabase/supabase-js';

// Use demo/mock configuration if environment variables are not set
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key';

// Create a mock client if no real credentials are provided
const createMockClient = () => ({
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: { message: 'Demo mode - authentication disabled' } }),
    signUp: () => Promise.resolve({ data: { user: null, session: null }, error: { message: 'Demo mode - authentication disabled' } }),
    signOut: () => Promise.resolve({ error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: () => Promise.resolve({ data: null, error: { message: 'Demo mode - database disabled' } })
      }),
      order: () => Promise.resolve({ data: [], error: null })
    }),
    insert: () => Promise.resolve({ data: null, error: { message: 'Demo mode - database disabled' } }),
    update: () => Promise.resolve({ data: null, error: { message: 'Demo mode - database disabled' } })
  }),
  rpc: () => Promise.resolve({ data: null, error: { message: 'Demo mode - database disabled' } })
});

// Check if we have valid Supabase credentials
const hasValidCredentials = supabaseUrl !== 'https://demo.supabase.co' && 
                           supabaseAnonKey !== 'demo-key' &&
                           supabaseUrl.includes('supabase.co');

export const supabase = hasValidCredentials 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  : createMockClient();

// Export a flag to check if we're in demo mode
export const isDemoMode = !hasValidCredentials;
import { createClient } from '@supabase/supabase-js';
import { MEDICINES, DOCTORS, LAB_TESTS } from '../constants';

// ============================================================
// ONE MEDI: Supabase Client Configuration
// ============================================================
// This file provides both a real Supabase client and a mock fallback
// for development when Supabase is not configured.
// ============================================================

// Supabase configuration - Replace with your project credentials
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Determine if Supabase is configured
const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

// Create the real Supabase client if configured
export const supabaseClient = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// ============================================================
// Type Definitions (aligned with database schema)
// ============================================================

export type ServiceType =
  | 'MEDICINE'
  | 'LAB_TEST'
  | 'SCAN'
  | 'DOCTOR_CONSULT'
  | 'HOME_SERVICE'
  | 'INSURANCE'
  | 'CONTENT';

export interface CartItem {
  id: string;
  service_catalog_id: string;
  vendor_id?: string;
  quantity: number;
  unit_price: number;
  selected_slot_id?: string;
  patient_id?: string;
}

export interface ServiceCatalogItem {
  id: string;
  service_type: ServiceType;
  ref_table: string;
  ref_id: string;
  display_name: string;
  is_active: boolean;
}

// ============================================================
// MOCK SUPABASE CLIENT (for development without Supabase)
// ============================================================

const mockSupabase = {
  from: (table: string) => ({
    select: (columns?: string) => ({
      eq: (column: string, value: unknown) => ({
        single: async () => ({ data: null, error: null }),
        order: (col: string, opts?: { ascending: boolean }) => ({
          limit: (n: number) => ({
            then: (resolve: (result: { data: unknown[]; error: null }) => void) =>
              resolve({ data: [], error: null })
          })
        }),
        then: (resolve: (result: { data: unknown[]; error: null }) => void) =>
          resolve({ data: [], error: null })
      }),
      ilike: (column: string, pattern: string) => ({
        getResults: async () => performMockSearch(table, pattern)
      }),
      order: (col: string, opts?: { ascending: boolean }) => ({
        limit: (n: number) => ({
          then: (resolve: (result: { data: unknown[]; error: null }) => void) =>
            resolve({ data: [], error: null })
        })
      }),
      limit: (n: number) => ({
        then: (resolve: (result: { data: unknown[]; error: null }) => void) =>
          resolve({ data: [], error: null })
      })
    }),
    insert: (data: unknown) => ({
      select: () => ({
        single: async () => ({ data: null, error: null })
      })
    }),
    update: (data: unknown) => ({
      eq: (column: string, value: unknown) => ({
        then: async (resolve: (result: { data: null; error: null }) => void) =>
          resolve({ data: null, error: null })
      })
    }),
    delete: () => ({
      eq: (column: string, value: unknown) => ({
        then: async (resolve: (result: { data: null; error: null }) => void) =>
          resolve({ data: null, error: null })
      })
    })
  }),
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
    signInWithPassword: async () => ({ data: { user: null, session: null }, error: null }),
    signUp: async () => ({ data: { user: null, session: null }, error: null }),
    signOut: async () => ({ error: null }),
    onAuthStateChange: (callback: (event: string, session: unknown) => void) => ({
      data: { subscription: { unsubscribe: () => { } } }
    })
  },
  storage: {
    from: (bucket: string) => ({
      upload: async () => ({ data: null, error: null }),
      getPublicUrl: (path: string) => ({ data: { publicUrl: '' } })
    })
  },
  rpc: async (fn: string, params?: unknown) => ({ data: null, error: null })
};

// Mock search implementation using local constants
function performMockSearch(table: string, pattern: string): unknown[] {
  const query = pattern.replace(/%/g, '').toLowerCase();

  if (table === 'products' || table === 'medicine_master') {
    return MEDICINES.map(m => {
      let score = 0;
      const name = m.name.toLowerCase();
      const comp = m.composition.toLowerCase();
      const indications = m.indications.map(i => i.toLowerCase());

      if (name.startsWith(query)) score += 10;
      else if (name.includes(query)) score += 4;
      if (comp.includes(query)) score += 8;
      if (indications.some(i => i.includes(query))) score += 6;

      return { ...m, _score: score };
    })
      .filter(m => m._score > 0)
      .sort((a, b) => b._score - a._score);
  }

  if (table === 'doctors') {
    return DOCTORS.map(d => {
      let score = 0;
      const name = d.name.toLowerCase();
      const spec = d.specialty.toLowerCase();

      if (name.startsWith(query)) score += 10;
      else if (name.includes(query)) score += 5;
      if (spec.includes(query)) score += 7;

      return { ...d, _score: score };
    })
      .filter(d => d._score > 0)
      .sort((a, b) => b._score - a._score);
  }

  if (table === 'lab_tests') {
    return LAB_TESTS.map(l => {
      let score = 0;
      const name = l.name.toLowerCase();
      const cat = l.category.toLowerCase();

      if (name.startsWith(query)) score += 10;
      else if (name.includes(query)) score += 5;
      if (cat.includes(query)) score += 7;

      return { ...l, _score: score };
    })
      .filter(l => l._score > 0)
      .sort((a, b) => b._score - a._score);
  }

  return [];
}

// ============================================================
// UNIFIED SUPABASE CLIENT
// Uses real client if configured, otherwise falls back to mock
// ============================================================

export const supabase = isSupabaseConfigured ? supabaseClient! : mockSupabase;

// ============================================================
// GLOBAL SEARCH FUNCTION
// ============================================================

export const globalSearch = async (query: string) => {
  if (!query || query.length < 2) {
    return { medicines: [], doctors: [], labs: [] };
  }

  if (isSupabaseConfigured && supabaseClient) {
    // Use the database global_search function
    const { data, error } = await supabaseClient.rpc('global_search', {
      p_query: query,
      p_limit: 10
    });

    if (error) {
      console.error('Search error:', error);
      // Fall back to mock search
      return performMockGlobalSearch(query);
    }

    // Group results by type
    const medicines = data?.filter((r: { entity_type: string }) => r.entity_type === 'MEDICINE') || [];
    const doctors = data?.filter((r: { entity_type: string }) => r.entity_type === 'DOCTOR') || [];
    const labs = data?.filter((r: { entity_type: string }) => r.entity_type === 'LAB_TEST') || [];

    return { medicines, doctors, labs };
  }

  // Mock search
  return performMockGlobalSearch(query);
};

function performMockGlobalSearch(query: string) {
  const [medicines, doctors, labs] = [
    performMockSearch('products', `%${query}%`),
    performMockSearch('doctors', `%${query}%`),
    performMockSearch('lab_tests', `%${query}%`)
  ];

  return { medicines, doctors, labs };
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

// Check if using real Supabase
export const isUsingRealSupabase = () => isSupabaseConfigured;

// Get current user
export const getCurrentUser = async () => {
  if (!isSupabaseConfigured) return null;
  const { data: { user } } = await supabaseClient!.auth.getUser();
  return user;
};

// Get user profile
export const getUserProfile = async (userId: string) => {
  if (!isSupabaseConfigured) return null;
  const { data } = await supabaseClient!
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return data;
};

// ============================================================
// SERVICE CATALOG HELPERS
// ============================================================

export const getServicesByType = async (type: ServiceType, limit = 20) => {
  if (!isSupabaseConfigured) {
    // Return mock data based on type
    switch (type) {
      case 'MEDICINE': return MEDICINES.slice(0, limit);
      case 'DOCTOR_CONSULT': return DOCTORS.slice(0, limit);
      case 'LAB_TEST': return LAB_TESTS.slice(0, limit);
      default: return [];
    }
  }

  const { data } = await supabaseClient!
    .from('service_catalog')
    .select(`
      *,
      medicine_master(*),
      lab_tests(*),
      scans_master(*),
      doctors(*),
      services_master(*)
    `)
    .eq('service_type', type)
    .eq('is_active', true)
    .limit(limit);

  return data || [];
};

// ============================================================
// CART OPERATIONS
// ============================================================

export const getOrCreateCart = async (profileId: string) => {
  if (!isSupabaseConfigured) return { id: 'mock-cart' };

  // Try to get existing cart
  const { data: existingCart } = await supabaseClient!
    .from('carts')
    .select('*')
    .eq('profile_id', profileId)
    .single();

  if (existingCart) return existingCart;

  // Create new cart
  const { data: newCart } = await supabaseClient!
    .from('carts')
    .insert({ profile_id: profileId })
    .select()
    .single();

  return newCart;
};

export const addToCart = async (
  cartId: string,
  serviceCatalogId: string,
  quantity: number = 1,
  vendorId?: string
) => {
  if (!isSupabaseConfigured) return { success: true };

  const { data, error } = await supabaseClient!
    .from('cart_items')
    .insert({
      cart_id: cartId,
      service_catalog_id: serviceCatalogId,
      vendor_id: vendorId,
      quantity
    })
    .select()
    .single();

  return { success: !error, data, error };
};

// ============================================================
// EXPORT FOR BACKWARDS COMPATIBILITY
// ============================================================

export default supabase;

import { createClient } from '@supabase/supabase-js';

// ==============================================================
// SUPABASE CLIENT CONFIGURATION
// Note: In production, these should be environment variables
// ==============================================================
const SUPABASE_URL = 'https://ifvuxxszlbxrbqbyuxco.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmdnV4eHN6bGJ4cmJxYnl1eGNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0Njg3ODMsImV4cCI6MjA1NDA0NDc4M30.ZtlBVAb3gzHnRNLOIZoXiZuOcfKMU6TsC2aSWM8aIl8';


export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// ==============================================================
// GLOBAL SEARCH FUNCTION (Legacy Support)
// ==============================================================
export const globalSearch = async (query: string) => {
  if (!query || query.length < 2) {
    return { medicines: [], doctors: [], labs: [] };
  }

  try {
    const [medicinesResult, doctorsResult, labsResult] = await Promise.all([
      supabase
        .from('medicine_master')
        .select('*')
        .ilike('name', `%${query}%`)
        .limit(10),
      supabase
        .from('doctors')
        .select('*')
        .ilike('name', `%${query}%`)
        .limit(10),
      supabase
        .from('lab_tests')
        .select('*')
        .ilike('name', `%${query}%`)
        .limit(10),
    ]);

    return {
      medicines: medicinesResult.data || [],
      doctors: doctorsResult.data || [],
      labs: labsResult.data || [],
    };
  } catch (error) {
    console.error('Global search error:', error);
    return { medicines: [], doctors: [], labs: [] };
  }
};

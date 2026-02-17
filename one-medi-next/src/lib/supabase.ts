import { createBrowserClient } from '@supabase/ssr';

// ==============================================================
// SUPABASE BROWSER CLIENT – Single Source of Truth
// ==============================================================

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    'Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set.'
  );
}

export const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==============================================================
// GLOBAL SEARCH FUNCTION
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

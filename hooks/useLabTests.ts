import { supabase, type LabTest } from '../lib/supabase';
import { useSupabaseQuery, useSupabaseList, useSupabaseRecord } from './useSupabaseQuery';

/**
 * Fetch all active lab tests
 */
export function useLabTests(limit?: number) {
    return useSupabaseList<LabTest>('lab_tests', {
        filters: { is_active: true },
        orderBy: { column: 'name', ascending: true },
        limit,
    });
}

/**
 * Fetch a single lab test by ID
 */
export function useLabTest(id: string | undefined) {
    return useSupabaseRecord<LabTest>('lab_tests', id);
}

/**
 * Fetch lab tests by category
 */
export function useLabTestsByCategory(category: string) {
    return useSupabaseQuery<LabTest[]>(
        async () => {
            if (!category || category === 'all') {
                const { data, error } = await supabase
                    .from('lab_tests')
                    .select('*')
                    .eq('is_active', true)
                    .order('name', { ascending: true });
                return { data, error };
            }

            const { data, error } = await supabase
                .from('lab_tests')
                .select('*')
                .eq('category', category)
                .eq('is_active', true)
                .order('name', { ascending: true });

            return { data, error };
        },
        [category]
    );
}

/**
 * Search lab tests
 */
export function useLabTestSearch(query: string) {
    return useSupabaseQuery<LabTest[]>(
        async () => {
            if (!query || query.length < 2) {
                return { data: [], error: null };
            }

            const { data, error } = await supabase
                .from('lab_tests')
                .select('*')
                .textSearch('fts', query, { type: 'websearch' })
                .eq('is_active', true)
                .limit(20);

            return { data, error };
        },
        [query]
    );
}

/**
 * Get lab test pricing from different vendors
 */
export function useLabTestPricing(labTestId: string | undefined) {
    return useSupabaseQuery<any[]>(
        async () => {
            if (!labTestId) {
                return { data: [], error: null };
            }

            const { data, error } = await supabase
                .from('lab_pricing')
                .select(`
          *,
          vendor_locations!inner (
            id,
            name,
            address,
            vendor:vendors (
              id,
              name,
              logo_url
            )
          )
        `)
                .eq('lab_test_id', labTestId)
                .eq('is_active', true)
                .order('selling_price', { ascending: true });

            return { data, error };
        },
        [labTestId]
    );
}

/**
 * Get unique categories for filter
 */
export function useLabTestCategories() {
    return useSupabaseQuery<{ category: string }[]>(
        async () => {
            const { data, error } = await supabase
                .from('lab_tests')
                .select('category')
                .eq('is_active', true);

            if (error) return { data: null, error };

            const unique = [...new Set(data?.map(d => d.category).filter(Boolean))].map(c => ({ category: c! }));
            return { data: unique, error: null };
        },
        []
    );
}

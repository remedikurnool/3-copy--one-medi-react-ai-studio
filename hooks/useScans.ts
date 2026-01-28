import { supabase, type Scan } from '../lib/supabase';
import { useSupabaseQuery, useSupabaseList, useSupabaseRecord } from './useSupabaseQuery';

/**
 * Fetch all active scans
 */
export function useScans(limit?: number) {
    return useSupabaseList<Scan>('scans_master', {
        filters: { is_active: true },
        orderBy: { column: 'name', ascending: true },
        limit,
    });
}

/**
 * Fetch a single scan by ID
 */
export function useScan(id: string | undefined) {
    return useSupabaseRecord<Scan>('scans_master', id);
}

/**
 * Fetch scans by modality (MRI, CT, Ultrasound, etc.)
 */
export function useScansByModality(modality: string) {
    return useSupabaseQuery<Scan[]>(
        async () => {
            if (!modality || modality === 'all') {
                const { data, error } = await supabase
                    .from('scans_master')
                    .select('*')
                    .eq('is_active', true)
                    .order('name', { ascending: true });
                return { data, error };
            }

            const { data, error } = await supabase
                .from('scans_master')
                .select('*')
                .eq('modality', modality)
                .eq('is_active', true)
                .order('name', { ascending: true });

            return { data, error };
        },
        [modality]
    );
}

/**
 * Fetch scans by body part
 */
export function useScansByBodyPart(bodyPart: string) {
    return useSupabaseQuery<Scan[]>(
        async () => {
            if (!bodyPart || bodyPart === 'all') {
                const { data, error } = await supabase
                    .from('scans_master')
                    .select('*')
                    .eq('is_active', true)
                    .order('name', { ascending: true });
                return { data, error };
            }

            const { data, error } = await supabase
                .from('scans_master')
                .select('*')
                .eq('body_part', bodyPart)
                .eq('is_active', true)
                .order('name', { ascending: true });

            return { data, error };
        },
        [bodyPart]
    );
}

/**
 * Search scans
 */
export function useScanSearch(query: string) {
    return useSupabaseQuery<Scan[]>(
        async () => {
            if (!query || query.length < 2) {
                return { data: [], error: null };
            }

            const { data, error } = await supabase
                .from('scans_master')
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
 * Get scan pricing from different centers
 */
export function useScanPricing(scanId: string | undefined) {
    return useSupabaseQuery<any[]>(
        async () => {
            if (!scanId) {
                return { data: [], error: null };
            }

            const { data, error } = await supabase
                .from('scan_pricing')
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
                .eq('scan_id', scanId)
                .eq('is_active', true)
                .order('selling_price', { ascending: true });

            return { data, error };
        },
        [scanId]
    );
}

/**
 * Get unique modalities for filter
 */
export function useScanModalities() {
    return useSupabaseQuery<{ modality: string }[]>(
        async () => {
            const { data, error } = await supabase
                .from('scans_master')
                .select('modality')
                .eq('is_active', true);

            if (error) return { data: null, error };

            const unique = [...new Set(data?.map(d => d.modality).filter(Boolean))].map(m => ({ modality: m! }));
            return { data: unique, error: null };
        },
        []
    );
}

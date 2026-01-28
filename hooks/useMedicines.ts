import { supabase, type Medicine, type MedicineInventory } from '../lib/supabase';
import { useSupabaseQuery, useSupabaseList, useSupabaseRecord } from './useSupabaseQuery';

/**
 * Fetch all active medicines
 */
export function useMedicines(limit?: number) {
    return useSupabaseList<Medicine>('medicine_master', {
        filters: { is_active: true },
        orderBy: { column: 'name', ascending: true },
        limit,
    });
}

/**
 * Fetch a single medicine by ID
 */
export function useMedicine(id: string | undefined) {
    return useSupabaseRecord<Medicine>('medicine_master', id);
}

/**
 * Search medicines using full-text search
 */
export function useMedicineSearch(query: string) {
    return useSupabaseQuery<Medicine[]>(
        async () => {
            if (!query || query.length < 2) {
                return { data: [], error: null };
            }

            // Use full-text search on the fts column
            const { data, error } = await supabase
                .from('medicine_master')
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
 * Get medicine inventory with pricing from a specific vendor/location
 */
export function useMedicineInventory(medicineId: string | undefined) {
    return useSupabaseQuery<(MedicineInventory & { vendor_locations: any })[]>(
        async () => {
            if (!medicineId) {
                return { data: [], error: null };
            }

            const { data, error } = await supabase
                .from('medicine_inventory')
                .select(`
          *,
          vendor_locations!inner (
            id,
            name,
            address,
            phone,
            vendor:vendors (
              id,
              name,
              logo_url
            )
          )
        `)
                .eq('medicine_id', medicineId)
                .gt('quantity', 0);

            return { data, error };
        },
        [medicineId]
    );
}

/**
 * Get medicines by category/indication
 */
export function useMedicinesByCategory(category: string) {
    return useSupabaseQuery<Medicine[]>(
        async () => {
            if (!category) {
                return { data: [], error: null };
            }

            const { data, error } = await supabase
                .from('medicine_master')
                .select('*')
                .contains('indications', [category])
                .eq('is_active', true)
                .limit(20);

            return { data, error };
        },
        [category]
    );
}


import { supabase } from '../lib/supabase';
import { useSupabaseList, useSupabaseRecord, useSupabaseQuery } from './useSupabaseQuery';

export interface MedicalScan {
    id: string;
    name: string;
    category: string;
    body_part: string;
    description: string;
    preparation_instructions: string;
    duration_minutes: number;
    price: number;
    is_active: boolean;
    image_url?: string;
}

// Hook to fetch all scans
export function useMedicalScans(limit?: number) {
    return useSupabaseQuery<MedicalScan[]>(
        async () => {
            let query = supabase
                .from('scans_master')
                .select('*')
                .eq('is_active', true)
                .order('name');

            if (limit) {
                query = query.limit(limit);
            }

            const { data, error } = await query;
            return { data: (data as MedicalScan[]) || [], error };
        },
        [limit]
    );
}

// Hook to fetch a single scan
export function useMedicalScan(id: string | undefined) {
    return useSupabaseRecord<MedicalScan>('scans_master', id);
}

// Hook to search scans
export function useScanSearch(query: string) {
    return useSupabaseQuery<MedicalScan[]>(
        async () => {
            if (!query || query.length < 2) return { data: [], error: null };

            const { data, error } = await supabase
                .from('scans_master')
                .select('*')
                .eq('is_active', true)
                .ilike('name', `%${query}%`)
                .limit(20);

            return { data: (data as MedicalScan[]) || [], error };
        },
        [query]
    );
}

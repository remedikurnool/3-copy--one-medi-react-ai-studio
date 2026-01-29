
import { supabase } from '../lib/supabase';
import { useSupabaseList, useSupabaseRecord, useSupabaseQuery } from './useSupabaseQuery';

export interface LabTest {
    id: string;
    name: string;
    category: string;
    description: string;
    preparation_instructions: string;
    turnaround_time_hours: number;
    sample_type: string;
    is_home_collection: boolean;
    price: number;
    is_active: boolean;
    parameters: string[];
}

// Hook to fetch all lab tests
export function useLabTests(limit?: number) {
    return useSupabaseQuery<LabTest[]>(
        async () => {
            let query = supabase
                .from('lab_test_master')
                .select('*')
                .eq('is_active', true)
                .order('name');

            if (limit) {
                query = query.limit(limit);
            }

            const { data, error } = await query;
            return { data: (data as LabTest[]) || [], error };
        },
        [limit]
    );
}

// Hook to fetch a single lab test
export function useLabTest(id: string | undefined) {
    return useSupabaseRecord<LabTest>('lab_test_master', id);
}

// Hook to search lab tests
export function useLabTestSearch(query: string) {
    return useSupabaseQuery<LabTest[]>(
        async () => {
            if (!query || query.length < 2) return { data: [], error: null };

            const { data, error } = await supabase
                .from('lab_test_master')
                .select('*')
                .eq('is_active', true)
                .ilike('name', `%${query}%`)
                .limit(20);

            return { data: (data as LabTest[]) || [], error };
        },
        [query]
    );
}

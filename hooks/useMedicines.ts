
import { supabase } from '../lib/supabase';
import { useSupabaseList, useSupabaseRecord, useSupabaseQuery } from './useSupabaseQuery';

export interface Medicine {
    id: string;
    name: string;
    generic_name?: string;
    manufacturer: string;
    composition: string;
    dosage_form: string;
    strength: string;
    pack_size: string;
    price: number;
    prescription_required: boolean;
    is_active: boolean;
    image_url: string;
    category: string;
    description: string;
    indications: string[];
    side_effects: string[];
    contraindications?: string[];
    storage_instructions?: string;
    warnings?: string[];
    dosage_instructions?: string;
    route_of_administration?: string;
    safety_advice?: {
        pregnancy?: string;
        alcohol?: string;
        driving?: string;
    };
}

// Hook to fetch all medicines (with optional limit for best sellers)
export function useMedicines(limit?: number) {
    return useSupabaseQuery<Medicine[]>(
        async () => {
            let query = supabase
                .from('medicine_master')
                .select('*')
                .eq('is_active', true)
                .order('name');

            if (limit) {
                query = query.limit(limit);
            }

            const { data, error } = await query;
            return { data: (data as Medicine[]) || [], error };
        },
        [limit]
    );
}

// Hook to fetch a single medicine
export function useMedicine(id: string | undefined) {
    return useSupabaseRecord<Medicine>('medicine_master', id);
}

// Hook to search medicines
export function useMedicineSearch(query: string) {
    return useSupabaseQuery<Medicine[]>(
        async () => {
            if (!query || query.length < 2) return { data: [], error: null };

            const { data, error } = await supabase
                .from('medicine_master')
                .select('*')
                .eq('is_active', true)
                .ilike('name', `%${query}%`)
                .limit(20);

            return { data: (data as Medicine[]) || [], error };
        },
        [query]
    );
}

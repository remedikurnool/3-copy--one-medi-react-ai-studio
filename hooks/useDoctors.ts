
import { supabase } from '../lib/supabase';
import { useSupabaseList, useSupabaseRecord, useSupabaseQuery } from './useSupabaseQuery';

export interface Doctor {
    id: string;
    name: string;
    specialization: string;
    qualification: string;
    experience_years: number;
    about: string;
    languages: string[];
    image_url: string;
    consultation_fee: number;
    is_verified: boolean;
    is_active: boolean;
    rating: number;
    total_patients: number;
    available_days: string[];
}

// Hook to fetch all doctors
export function useDoctors(limit?: number) {
    return useSupabaseQuery<Doctor[]>(
        async () => {
            let query = supabase
                .from('doctors')
                .select('*')
                .eq('is_active', true)
                .order('rating', { ascending: false }); // Show top rated first

            if (limit) {
                query = query.limit(limit);
            }

            const { data, error } = await query;
            return { data: (data as Doctor[]) || [], error };
        },
        [limit]
    );
}

// Hook to fetch a single doctor
export function useDoctor(id: string | undefined) {
    return useSupabaseRecord<Doctor>('doctors', id);
}

// Hook to search doctors
export function useDoctorSearch(query: string) {
    return useSupabaseQuery<Doctor[]>(
        async () => {
            if (!query || query.length < 2) return { data: [], error: null };

            const { data, error } = await supabase
                .from('doctors')
                .select('*')
                .eq('is_active', true)
                .or(`name.ilike.%${query}%,specialization.ilike.%${query}%`)
                .limit(20);

            return { data: (data as Doctor[]) || [], error };
        },
        [query]
    );
}

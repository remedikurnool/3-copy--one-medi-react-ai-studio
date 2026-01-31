
import { supabase } from '../lib/supabase';
import { useSupabaseList, useSupabaseRecord, useSupabaseQuery } from './useSupabaseQuery';
import { Doctor } from '../types';

interface DBDoctor {
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
    hospital?: string;
    location?: string;
}

const mapDoctorNode = (data: DBDoctor): Doctor => ({
    id: data.id,
    name: data.name,
    specialty: data.specialization,
    qualification: data.qualification,
    experience: `${data.experience_years} Years`,
    hospital: data.hospital || 'One Medi Clinic',
    location: data.location || 'Kurnool',
    fee: data.consultation_fee,
    rating: data.rating,
    image: data.image_url || 'https://randomuser.me/api/portraits/men/1.jpg', // Fallback
    about: data.about,
    languages: data.languages,
    registrationNumber: '', // Not in DB
    hospitalAffiliation: '', // Not in DB
    variants: [] // Not in DB
});

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
            const mappedData = (data as DBDoctor[] || []).map(mapDoctorNode);
            return { data: mappedData, error };
        },
        [limit]
    );
}

// Hook to fetch a single doctor
export function useDoctor(id: string | undefined) {
    const { data: listData, loading, error, refetch } = useSupabaseQuery<Doctor | null>(
        async () => {
            if (!id) return { data: null, error: null };
            const { data, error } = await supabase
                .from('doctors')
                .select('*')
                .eq('id', id)
                .single();

            if (error) return { data: null, error };
            return { data: mapDoctorNode(data as DBDoctor), error: null };
        },
        [id]
    );

    return { data: listData, loading, error, refetch };
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

            const mappedData = (data as DBDoctor[] || []).map(mapDoctorNode);
            return { data: mappedData, error };
        },
        [query]
    );
}

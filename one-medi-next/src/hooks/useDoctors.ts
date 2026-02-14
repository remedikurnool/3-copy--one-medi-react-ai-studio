
import { supabase } from '../lib/supabase';
import { useSupabaseQuery } from './useSupabaseQuery';
import { Doctor } from '../types';

interface DBDoctor {
    id: string;
    name: string;
    specialty: string;
    sub_specialty?: string;
    qualifications?: string[];
    registration_number?: string;
    experience_years?: number;
    languages?: string[];
    bio?: string;
    image_url?: string;
    consultation_fee?: number;
    followup_fee?: number;
    video_consultation?: boolean;
    in_person_consultation?: boolean;
    is_active: boolean;
    rating?: number;
    rating_count?: number;
}

const mapDoctorNode = (data: DBDoctor): Doctor => ({
    id: data.id,
    name: data.name,
    slug: data.id,
    specialization: data.specialty,
    superSpecialization: data.sub_specialty,
    qualification: data.qualifications?.join(', ') || '',
    experienceYears: data.experience_years || 0,
    registrationNumber: data.registration_number || '',
    consultationFee: Number(data.consultation_fee) || 0,
    followUpFee: Number(data.followup_fee) || 0,
    languages: data.languages || [],
    bio: data.bio || '',
    image: data.image_url || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300',
    hospitalAffiliation: '',
    availableOnline: data.video_consultation || false,
    availableInClinic: data.in_person_consultation || false,
    status: 'ACTIVE',
    vendorId: 'v_doc_1',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    availableTimeSlots: ['10:00 AM - 01:00 PM', '05:00 PM - 08:00 PM'],
    consultationDurationMinutes: 15,
    emergencyConsultAvailable: false,
    rating: Number(data.rating) || 0,
    totalReviews: data.rating_count || 0,
    totalConsultations: 0,
});

// Hook to fetch all doctors
export function useDoctors(limit?: number) {
    return useSupabaseQuery<Doctor[]>(
        async () => {
            let query = supabase
                .from('doctors')
                .select('*')
                .eq('is_active', true)
                .order('name');

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
    return useSupabaseQuery<Doctor | null>(
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
                .or(`name.ilike.%${query}%,specialty.ilike.%${query}%`)
                .limit(20);

            const mappedData = (data as DBDoctor[] || []).map(mapDoctorNode);
            return { data: mappedData, error };
        },
        [query]
    );
}

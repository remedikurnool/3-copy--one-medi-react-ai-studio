import { supabase, type Doctor } from '../lib/supabase';
import { useSupabaseQuery, useSupabaseList, useSupabaseRecord } from './useSupabaseQuery';

/**
 * Fetch all active doctors
 */
export function useDoctors(limit?: number) {
    return useSupabaseList<Doctor>('doctors', {
        filters: { is_active: true },
        orderBy: { column: 'rating', ascending: false },
        limit,
    });
}

/**
 * Fetch a single doctor by ID
 */
export function useDoctor(id: string | undefined) {
    return useSupabaseRecord<Doctor>('doctors', id);
}

/**
 * Fetch doctors by specialty
 */
export function useDoctorsBySpecialty(specialty: string) {
    return useSupabaseQuery<Doctor[]>(
        async () => {
            if (!specialty || specialty === 'all') {
                const { data, error } = await supabase
                    .from('doctors')
                    .select('*')
                    .eq('is_active', true)
                    .order('rating', { ascending: false });
                return { data, error };
            }

            const { data, error } = await supabase
                .from('doctors')
                .select('*')
                .eq('specialty', specialty)
                .eq('is_active', true)
                .order('rating', { ascending: false });

            return { data, error };
        },
        [specialty]
    );
}

/**
 * Search doctors by name or specialty
 */
export function useDoctorSearch(query: string) {
    return useSupabaseQuery<Doctor[]>(
        async () => {
            if (!query || query.length < 2) {
                return { data: [], error: null };
            }

            const { data, error } = await supabase
                .from('doctors')
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
 * Get unique specialties for filter dropdown
 */
export function useDoctorSpecialties() {
    return useSupabaseQuery<{ specialty: string }[]>(
        async () => {
            const { data, error } = await supabase
                .from('doctors')
                .select('specialty')
                .eq('is_active', true);

            if (error) return { data: null, error };

            // Get unique specialties
            const unique = [...new Set(data?.map(d => d.specialty))].map(s => ({ specialty: s }));
            return { data: unique, error: null };
        },
        []
    );
}

/**
 * Get doctor availability slots
 */
export function useDoctorAvailability(doctorId: string | undefined, date?: string) {
    return useSupabaseQuery<any[]>(
        async () => {
            if (!doctorId) {
                return { data: [], error: null };
            }

            let query = supabase
                .from('doctor_availability')
                .select('*')
                .eq('doctor_id', doctorId);

            if (date) {
                query = query.eq('date', date);
            }

            const { data, error } = await query.order('start_time', { ascending: true });
            return { data, error };
        },
        [doctorId, date]
    );
}

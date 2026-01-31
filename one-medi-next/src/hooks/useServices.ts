import { supabase } from '../lib/supabase';
import { useSupabaseQuery } from './useSupabaseQuery';

// ==============================================================
// SERVICE TYPES
// ==============================================================
// ==============================================================
// SERVICE TYPES
// ==============================================================
export interface ServiceMaster {
    id: string;
    name: string;
    category: string;
    description: string | null;
    unit: string;
    durationMinutes: number;
    requirements: string[];
    isHomeService: boolean;
    isActive: boolean;
    price?: number;
    imageUrl?: string;
    // Added for specific service types
    concern?: string;
}

export type ServiceCategory =
    | 'HOME_CARE'
    | 'PHYSIOTHERAPY'
    | 'AMBULANCE'
    | 'SURGERY'
    | 'DIABETES'
    | 'WELLNESS'
    | 'SKIN_HAIR'
    | 'MOTHER_BABY';

interface DBService {
    id: string;
    name: string;
    category: string;
    description: string | null;
    unit: string;
    duration_minutes: number;
    requirements: string[];
    is_home_service: boolean;
    is_active: boolean;
    price?: number;
    image_url?: string;
    concern?: string;
}

const mapServiceNode = (data: DBService): ServiceMaster => ({
    id: data.id,
    name: data.name,
    category: data.category,
    description: data.description,
    unit: data.unit,
    durationMinutes: data.duration_minutes,
    requirements: data.requirements || [],
    isHomeService: data.is_home_service,
    isActive: data.is_active,
    price: data.price,
    imageUrl: data.image_url,
    concern: data.concern
});

// ==============================================================
// GENERIC SERVICE HOOKS
// ==============================================================

/**
 * Fetch services by category
 */
export function useServicesByCategory(category: ServiceCategory) {
    return useSupabaseQuery<ServiceMaster[]>(
        async () => {
            const { data, error } = await supabase
                .from('services_master')
                .select('*')
                .eq('category', category)
                .eq('is_active', true)
                .order('name');

            if (error) return { data: [], error };
            const mappedData = (data as DBService[] || []).map(mapServiceNode);
            return { data: mappedData, error: null };
        },
        [category]
    );
}

/**
 * Fetch a single service by ID
 */
export function useService(id: string | undefined) {
    return useSupabaseQuery<ServiceMaster | null>(
        async () => {
            if (!id) return { data: null, error: null };

            const { data, error } = await supabase
                .from('services_master')
                .select('*')
                .eq('id', id)
                .single();

            if (error) return { data: null, error };
            return { data: mapServiceNode(data as DBService), error: null };
        },
        [id]
    );
}

/**
 * Search services across all categories
 */
export function useServiceSearch(query: string) {
    return useSupabaseQuery<ServiceMaster[]>(
        async () => {
            if (!query || query.length < 2) return { data: [], error: null };

            const { data, error } = await supabase
                .from('services_master')
                .select('*')
                .eq('is_active', true)
                .ilike('name', `%${query}%`)
                .limit(20);

            if (error) return { data: [], error };
            const mappedData = (data as DBService[] || []).map(mapServiceNode);
            return { data: mappedData, error: null };
        },
        [query]
    );
}

// ==============================================================
// CATEGORY-SPECIFIC HOOKS
// ==============================================================

/**
 * Home Care Services
 */
export function useHomeCareServices() {
    return useServicesByCategory('HOME_CARE');
}

/**
 * Physiotherapy Services
 */
export function usePhysiotherapyServices() {
    return useServicesByCategory('PHYSIOTHERAPY');
}

/**
 * Ambulance Services
 */
export function useAmbulanceServices() {
    return useServicesByCategory('AMBULANCE');
}

/**
 * Surgery Packages
 */
export function useSurgeryPackages() {
    return useServicesByCategory('SURGERY');
}

/**
 * Diabetes Care Programs
 */
export function useDiabetesPrograms() {
    return useServicesByCategory('DIABETES');
}

/**
 * Wellness Plans
 */
export function useWellnessPlans() {
    return useServicesByCategory('WELLNESS');
}

/**
 * Skin & Hair Treatments
 */
export function useSkinHairTreatments() {
    return useServicesByCategory('SKIN_HAIR');
}

/**
 * Mother & Baby Care Services
 */
export function useMotherBabyServices() {
    return useServicesByCategory('MOTHER_BABY');
}

// ==============================================================
// HOME CARE SPECIFIC
// ==============================================================

/**
 * Fetch only home-visit capable services
 */
export function useHomeVisitServices() {
    return useSupabaseQuery<ServiceMaster[]>(
        async () => {
            const { data, error } = await supabase
                .from('services_master')
                .select('*')
                .eq('is_home_service', true)
                .eq('is_active', true)
                .order('category', { ascending: true });

            if (error) return { data: [], error };
            const mappedData = (data as DBService[] || []).map(mapServiceNode);
            return { data: mappedData, error: null };
        },
        []
    );
}

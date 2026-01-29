import { supabase } from '../lib/supabase';
import { useSupabaseQuery, useSupabaseList, useSupabaseRecord } from './useSupabaseQuery';

// ==============================================================
// HOSPITAL TYPES
// ==============================================================
export interface Hospital {
    id: string;
    name: string;
    description: string | null;
    logo_url: string | null;
    rating: number;
    rating_count: number;
    is_verified: boolean;
    is_active: boolean;
    // From vendor_locations join
    location?: {
        id: string;
        address: string;
        pincode: string;
        phone: string;
        latitude: number;
        longitude: number;
        is_open_24x7: boolean;
    };
}

export interface BloodBank {
    id: string;
    name: string;
    description: string | null;
    rating: number;
    rating_count: number;
    is_verified: boolean;
    location?: {
        id: string;
        address: string;
        pincode: string;
        phone: string;
        is_open_24x7: boolean;
    };
    // Static blood group availability
    available_groups?: string[];
}

// ==============================================================
// HOSPITAL HOOKS
// ==============================================================

/**
 * Fetch all hospitals with their locations
 */
export function useHospitals() {
    return useSupabaseQuery<Hospital[]>(
        async () => {
            const { data, error } = await supabase
                .from('vendors')
                .select(`
                    id, name, description, logo_url, rating, rating_count, is_verified, is_active,
                    vendor_locations (id, address_line_1, address_line_2, pincode, phone, latitude, longitude, is_open_24x7)
                `)
                .eq('type', 'HOSPITAL')
                .eq('is_active', true)
                .order('rating', { ascending: false });

            if (error) return { data: null, error };

            const hospitals: Hospital[] = (data || []).map((v: any) => ({
                id: v.id,
                name: v.name,
                description: v.description,
                logo_url: v.logo_url,
                rating: parseFloat(v.rating) || 0,
                rating_count: v.rating_count || 0,
                is_verified: v.is_verified,
                is_active: v.is_active,
                location: v.vendor_locations?.[0] ? {
                    id: v.vendor_locations[0].id,
                    address: `${v.vendor_locations[0].address_line_1 || ''} ${v.vendor_locations[0].address_line_2 || ''}`.trim(),
                    pincode: v.vendor_locations[0].pincode || '',
                    phone: v.vendor_locations[0].phone || '',
                    latitude: parseFloat(v.vendor_locations[0].latitude) || 0,
                    longitude: parseFloat(v.vendor_locations[0].longitude) || 0,
                    is_open_24x7: v.vendor_locations[0].is_open_24x7 || false,
                } : undefined,
            }));

            return { data: hospitals, error: null };
        },
        []
    );
}

/**
 * Fetch a single hospital by ID
 */
export function useHospital(id: string | undefined) {
    return useSupabaseQuery<Hospital | null>(
        async () => {
            if (!id) return { data: null, error: null };

            const { data, error } = await supabase
                .from('vendors')
                .select(`
                    id, name, description, logo_url, rating, rating_count, is_verified, is_active,
                    vendor_locations (id, address_line_1, address_line_2, pincode, phone, latitude, longitude, is_open_24x7)
                `)
                .eq('id', id)
                .eq('type', 'HOSPITAL')
                .single();

            if (error) return { data: null, error };

            const hospital: Hospital = {
                id: data.id,
                name: data.name,
                description: data.description,
                logo_url: data.logo_url,
                rating: parseFloat(data.rating) || 0,
                rating_count: data.rating_count || 0,
                is_verified: data.is_verified,
                is_active: data.is_active,
                location: data.vendor_locations?.[0] ? {
                    id: data.vendor_locations[0].id,
                    address: `${data.vendor_locations[0].address_line_1 || ''} ${data.vendor_locations[0].address_line_2 || ''}`.trim(),
                    pincode: data.vendor_locations[0].pincode || '',
                    phone: data.vendor_locations[0].phone || '',
                    latitude: parseFloat(data.vendor_locations[0].latitude) || 0,
                    longitude: parseFloat(data.vendor_locations[0].longitude) || 0,
                    is_open_24x7: data.vendor_locations[0].is_open_24x7 || false,
                } : undefined,
            };

            return { data: hospital, error: null };
        },
        [id]
    );
}

/**
 * Search hospitals by name
 */
export function useHospitalSearch(query: string) {
    return useSupabaseQuery<Hospital[]>(
        async () => {
            if (!query || query.length < 2) return { data: [], error: null };

            const { data, error } = await supabase
                .from('vendors')
                .select(`
                    id, name, description, logo_url, rating, rating_count, is_verified, is_active,
                    vendor_locations (id, address_line_1, pincode, phone, is_open_24x7)
                `)
                .eq('type', 'HOSPITAL')
                .eq('is_active', true)
                .ilike('name', `%${query}%`)
                .limit(10);

            if (error) return { data: [], error };

            const hospitals: Hospital[] = (data || []).map((v: any) => ({
                id: v.id,
                name: v.name,
                description: v.description,
                logo_url: v.logo_url,
                rating: parseFloat(v.rating) || 0,
                rating_count: v.rating_count || 0,
                is_verified: v.is_verified,
                is_active: v.is_active,
                location: v.vendor_locations?.[0] ? {
                    id: v.vendor_locations[0].id,
                    address: v.vendor_locations[0].address_line_1 || '',
                    pincode: v.vendor_locations[0].pincode || '',
                    phone: v.vendor_locations[0].phone || '',
                    latitude: 0,
                    longitude: 0,
                    is_open_24x7: v.vendor_locations[0].is_open_24x7 || false,
                } : undefined,
            }));

            return { data: hospitals, error: null };
        },
        [query]
    );
}

// ==============================================================
// BLOOD BANK HOOKS
// ==============================================================

/**
 * Fetch all blood banks
 */
export function useBloodBanks() {
    return useSupabaseQuery<BloodBank[]>(
        async () => {
            const { data, error } = await supabase
                .from('vendors')
                .select(`
                    id, name, description, rating, rating_count, is_verified,
                    vendor_locations (id, address_line_1, pincode, phone, is_open_24x7)
                `)
                .eq('type', 'BLOOD_BANK')
                .eq('is_active', true)
                .order('rating', { ascending: false });

            if (error) return { data: [], error };

            const bloodBanks: BloodBank[] = (data || []).map((v: any) => ({
                id: v.id,
                name: v.name,
                description: v.description,
                rating: parseFloat(v.rating) || 0,
                rating_count: v.rating_count || 0,
                is_verified: v.is_verified,
                location: v.vendor_locations?.[0] ? {
                    id: v.vendor_locations[0].id,
                    address: v.vendor_locations[0].address_line_1 || '',
                    pincode: v.vendor_locations[0].pincode || '',
                    phone: v.vendor_locations[0].phone || '',
                    is_open_24x7: v.vendor_locations[0].is_open_24x7 || false,
                } : undefined,
                // Static blood groups - typically available at most banks
                available_groups: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            }));

            return { data: bloodBanks, error: null };
        },
        []
    );
}

/**
 * Fetch a single blood bank by ID
 */
export function useBloodBank(id: string | undefined) {
    return useSupabaseQuery<BloodBank | null>(
        async () => {
            if (!id) return { data: null, error: null };

            const { data, error } = await supabase
                .from('vendors')
                .select(`
                    id, name, description, rating, rating_count, is_verified,
                    vendor_locations (id, address_line_1, pincode, phone, is_open_24x7)
                `)
                .eq('id', id)
                .eq('type', 'BLOOD_BANK')
                .single();

            if (error) return { data: null, error };

            const bloodBank: BloodBank = {
                id: data.id,
                name: data.name,
                description: data.description,
                rating: parseFloat(data.rating) || 0,
                rating_count: data.rating_count || 0,
                is_verified: data.is_verified,
                location: data.vendor_locations?.[0] ? {
                    id: data.vendor_locations[0].id,
                    address: data.vendor_locations[0].address_line_1 || '',
                    pincode: data.vendor_locations[0].pincode || '',
                    phone: data.vendor_locations[0].phone || '',
                    is_open_24x7: data.vendor_locations[0].is_open_24x7 || false,
                } : undefined,
                available_groups: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            };

            return { data: bloodBank, error: null };
        },
        [id]
    );
}

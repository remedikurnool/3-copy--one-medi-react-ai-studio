import { supabase } from '../lib/supabase';
import { useSupabaseQuery, useSupabaseList, useSupabaseRecord } from './useSupabaseQuery';

// ==============================================================
// HOSPITAL TYPES
// ==============================================================
import { Hospital, BloodBank } from '../types';

// ==============================================================
// HOSPITAL TYPES
// ==============================================================



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

            if (error) return { data: [], error };

            const hospitals: Hospital[] = (data || []).map((v: any) => ({
                id: v.id,
                name: v.name,
                type: 'Hospital',
                location: v.vendor_locations?.[0] ? `${v.vendor_locations[0].address_line_1 || ''} ${v.vendor_locations[0].address_line_2 || ''}`.trim() : 'Kurnool',
                distance: '2.5 km',
                rating: parseFloat(v.rating) || 0,
                reviews: v.rating_count || 0,
                image: v.logo_url || 'https://images.unsplash.com/photo-1587351021759-3e566b9af923?auto=format&fit=crop&q=80',
                facilities: ['Emergency', 'Pharmacy', 'Parking'],
                open24x7: v.vendor_locations?.[0]?.is_open_24x7 || false,
                insuranceAccepted: true
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
                type: 'Hospital',
                location: data.vendor_locations?.[0] ? `${data.vendor_locations[0].address_line_1 || ''} ${data.vendor_locations[0].address_line_2 || ''}`.trim() : 'Kurnool',
                distance: '2.5 km',
                rating: parseFloat(data.rating) || 0,
                reviews: data.rating_count || 0,
                image: data.logo_url || 'https://images.unsplash.com/photo-1587351021759-3e566b9af923?auto=format&fit=crop&q=80',
                facilities: ['Emergency', 'Pharmacy', 'Parking'],
                open24x7: data.vendor_locations?.[0]?.is_open_24x7 || false,
                insuranceAccepted: true
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
                type: 'Hospital', // Default type
                location: v.vendor_locations?.[0] ? `${v.vendor_locations[0].address_line_1 || ''} ${v.vendor_locations[0].address_line_2 || ''}`.trim() : 'Kurnool', // Map location string
                distance: '2.5 km', // Mock distance
                rating: parseFloat(v.rating) || 0,
                reviews: v.rating_count || 0, // Map rating_count to reviews
                image: v.logo_url || 'https://images.unsplash.com/photo-1587351021759-3e566b9af923?auto=format&fit=crop&q=80', // Map logo to image
                facilities: ['Emergency', 'Pharmacy', 'Parking'], // Mock facilities
                open24x7: v.vendor_locations?.[0]?.is_open_24x7 || false,
                insuranceAccepted: true, // Mock
                rating_count: v.rating_count || 0,
                is_verified: v.is_verified,
                is_active: v.is_active,
                // Keep detailed location object if needed by other components, but purely for Hospital interface satisfying:
                // capabilities: [], // if needed
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
                location: v.vendor_locations?.[0] ? `${v.vendor_locations[0].address_line_1 || ''} ${v.vendor_locations[0].pincode || ''}`.trim() : 'Kurnool',
                distance: '3.0 km',
                phone: v.vendor_locations?.[0]?.phone || '',
                availableGroups: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
                isOpen: true,
                address: v.vendor_locations?.[0]?.address_line_1 || 'Kurnool',
                contactPhone: v.vendor_locations?.[0]?.phone || '',
                isOpen24x7: v.vendor_locations?.[0]?.is_open_24x7 || false
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
                location: data.vendor_locations?.[0] ? `${data.vendor_locations[0].address_line_1 || ''} ${data.vendor_locations[0].pincode || ''}`.trim() : 'Kurnool',
                distance: '3.0 km',
                phone: data.vendor_locations?.[0]?.phone || '',
                availableGroups: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
                isOpen: true,
                address: data.vendor_locations?.[0]?.address_line_1 || 'Kurnool',
                contactPhone: data.vendor_locations?.[0]?.phone || '',
                isOpen24x7: data.vendor_locations?.[0]?.is_open_24x7 || false
            };

            return { data: bloodBank, error: null };
        },
        [id]
    );
}


import { supabase } from '../lib/supabase';
import { useSupabaseList, useSupabaseRecord, useSupabaseQuery } from './useSupabaseQuery';
import { Medicine } from '../types';

interface DBMedicine {
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
    mrp?: number;
    discount?: string;
}

const mapMedicineNode = (data: DBMedicine): Medicine => ({
    id: data.id,
    name: data.name,
    genericName: data.generic_name || '',
    category: data.category,
    price: data.price,
    mrp: data.mrp || data.price, // Fallback if mrp not in DB
    discount: data.discount || '0% OFF',
    image: data.image_url || '/placeholder.png', // Fallback image
    packSize: data.pack_size,
    prescriptionRequired: data.prescription_required,
    manufacturer: data.manufacturer,
    composition: data.composition,
    dosageForm: data.dosage_form,
    therapeuticClass: '', // Not in DB interface?
    indications: data.indications || [],
    dosageInstructions: data.dosage_instructions || '',
    routeOfAdministration: data.route_of_administration || '',
    sideEffects: data.side_effects || [],
    warnings: data.warnings || [],
    safetyAdvice: {
        pregnancy: data.safety_advice?.pregnancy || '',
        alcohol: data.safety_advice?.alcohol || '',
        driving: data.safety_advice?.driving || ''
    },
    variants: [], // DB doesn't seem to return variants structure yet
    // Added properties for consistency
    verifiedByDoctor: '',
    images: data.image_url ? [data.image_url] : [],
    activeIngredients: [],
    doctorRecommended: false,
    brandTrust: ''
});

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
            const mappedData = (data as DBMedicine[] || []).map(mapMedicineNode);
            return { data: mappedData, error };
        },
        [limit]
    );
}

// Hook to fetch a single medicine
export function useMedicine(id: string | undefined) {
    const { data: listData, loading, error, refetch } = useSupabaseQuery<Medicine | null>(
        async () => {
            if (!id) return { data: null, error: null };
            const { data, error } = await supabase
                .from('medicine_master')
                .select('*')
                .eq('id', id)
                .single();

            if (error) return { data: null, error };
            return { data: mapMedicineNode(data as DBMedicine), error: null };
        },
        [id]
    );

    return { data: listData, loading, error, refetch };
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

            const mappedData = (data as DBMedicine[] || []).map(mapMedicineNode);
            return { data: mappedData, error };
        },
        [query]
    );
}

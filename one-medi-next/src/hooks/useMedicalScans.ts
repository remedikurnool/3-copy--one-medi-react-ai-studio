
import { supabase } from '../lib/supabase';
import { useSupabaseList, useSupabaseRecord, useSupabaseQuery } from './useSupabaseQuery';
import { Scan } from '../types/index';

interface DBScan {
    id: string;
    name: string;
    category: string;
    body_part: string;
    description: string;
    preparation_instructions: string;
    duration_minutes: number;
    contrast_required: boolean;
    price: number;
    is_active: boolean;
    image_url?: string;
}

const mapScanNode = (data: DBScan): Scan => ({
    id: data.id,
    name: data.name,
    slug: data.id, // Using ID as slug for now
    category: data.category,
    scanType: data.category, // Standardizing scanType
    bodyPart: data.body_part,
    description: data.description,
    preparationInstructions: data.preparation_instructions,
    contrastRequired: data.contrast_required,
    sedationRequired: false, // Default
    price: data.price,
    mrp: data.price * 1.3,
    discountPercent: 30,
    reportTime: `${data.duration_minutes} Minutes`,
    marketPrice: data.price * 1.3,
    finalPrice: data.price,
    discountPercentage: 30,
    turnaroundTime: `${data.duration_minutes} Minutes`,
    image: data.image_url || 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80',
    centerRequired: true,
    homeServiceAvailable: false,
    status: 'ACTIVE',
    vendorId: 'v_diag_1' // Default vendor for diagnostics
});

// Hook to fetch all scans
export function useMedicalScans(limit?: number) {
    return useSupabaseQuery<Scan[]>(
        async () => {
            let query = supabase
                .from('scans_master')
                .select('*')
                .eq('is_active', true)
                .order('name');

            if (limit) {
                query = query.limit(limit);
            }

            const { data, error } = await query;
            const mappedData = (data as DBScan[] || []).map(mapScanNode);
            return { data: mappedData, error };
        },
        [limit]
    );
}

// Hook to fetch a single scan
export function useMedicalScan(id: string | undefined) {
    const { data: listData, loading, error, refetch } = useSupabaseQuery<Scan | null>(
        async () => {
            if (!id) return { data: null, error: null };
            const { data, error } = await supabase
                .from('scans_master')
                .select('*')
                .eq('id', id)
                .single();

            if (error) return { data: null, error };
            return { data: mapScanNode(data as DBScan), error: null };
        },
        [id]
    );

    return { data: listData, loading, error, refetch };
}

// Hook to search scans
export function useScanSearch(query: string) {
    return useSupabaseQuery<Scan[]>(
        async () => {
            if (!query || query.length < 2) return { data: [], error: null };

            const { data, error } = await supabase
                .from('scans_master')
                .select('*')
                .eq('is_active', true)
                .ilike('name', `%${query}%`)
                .limit(20);

            const mappedData = (data as DBScan[] || []).map(mapScanNode);
            return { data: mappedData, error };
        },
        [query]
    );
}

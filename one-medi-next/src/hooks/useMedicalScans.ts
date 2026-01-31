
import { supabase } from '../lib/supabase';
import { useSupabaseList, useSupabaseRecord, useSupabaseQuery } from './useSupabaseQuery';
import { MedicalScan } from '../types';

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

const mapScanNode = (data: DBScan): MedicalScan => ({
    id: data.id,
    name: data.name,
    category: data.category,
    bodyPart: data.body_part,
    price: data.price,
    mrp: data.price * 1.3, // Mock MRP
    discount: '30% OFF', // Mock Discount
    image: data.image_url || 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80',
    description: data.description,
    scanDuration: `${data.duration_minutes} Minutes`,
    contrastRequired: data.contrast_required,
    preparationNotes: data.preparation_instructions,
    variants: []
});

// Hook to fetch all scans
export function useMedicalScans(limit?: number) {
    return useSupabaseQuery<MedicalScan[]>(
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
    const { data: listData, loading, error, refetch } = useSupabaseQuery<MedicalScan | null>(
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
    return useSupabaseQuery<MedicalScan[]>(
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

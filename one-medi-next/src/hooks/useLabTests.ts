
import { supabase } from '../lib/supabase';
import { useSupabaseQuery } from './useSupabaseQuery';
import { LabTest } from '../types';

interface DBLabTest {
    id: string;
    name: string;
    code?: string;
    sample_type?: string;
    sample_volume?: string;
    fasting_required?: boolean;
    fasting_hours?: number;
    report_time?: string;
    category?: string;
    description?: string;
    preparation_instructions?: string;
    includes?: string[];
    parameters?: any;
    is_home_collection?: boolean;
    is_active: boolean;
}

const mapLabTestNode = (data: DBLabTest): LabTest => ({
    id: data.id,
    name: data.name,
    slug: data.id,
    category: data.category || 'General',
    description: data.description || '',
    shortDescription: data.description?.slice(0, 100) || '',
    sampleType: data.sample_type || 'Blood',
    fastingRequired: data.fasting_required || false,
    fastingHours: data.fasting_hours,
    reportDeliveryTime: data.report_time || '24 Hours',
    turnaroundTime: data.report_time || '24 Hours',
    preparationInstructions: data.preparation_instructions || '',
    parametersIncluded: data.includes || [],
    homeCollectionAvailable: data.is_home_collection || false,
    centerCollectionAvailable: true,
    price: 0, // Will be populated from lab_pricing if available
    mrp: 0,
    discountPercent: 0,
    reportFormat: 'PDF',
    isPackage: false,
    status: 'ACTIVE',
    vendorId: 'v_lab_1',
    tags: [],
});

// Hook to fetch all lab tests
export function useLabTests(limit?: number) {
    return useSupabaseQuery<LabTest[]>(
        async () => {
            let query = supabase
                .from('lab_tests')
                .select('*')
                .eq('is_active', true)
                .order('name');

            if (limit) {
                query = query.limit(limit);
            }

            const { data, error } = await query;
            const mappedData = (data as DBLabTest[] || []).map(mapLabTestNode);
            return { data: mappedData, error };
        },
        [limit]
    );
}

// Hook to fetch a single lab test
export function useLabTest(id: string | undefined) {
    return useSupabaseQuery<LabTest | null>(
        async () => {
            if (!id) return { data: null, error: null };
            const { data, error } = await supabase
                .from('lab_tests')
                .select('*')
                .eq('id', id)
                .single();

            if (error) return { data: null, error };
            return { data: mapLabTestNode(data as DBLabTest), error: null };
        },
        [id]
    );
}

// Hook to search lab tests
export function useLabTestSearch(query: string) {
    return useSupabaseQuery<LabTest[]>(
        async () => {
            if (!query || query.length < 2) return { data: [], error: null };

            const { data, error } = await supabase
                .from('lab_tests')
                .select('*')
                .eq('is_active', true)
                .ilike('name', `%${query}%`)
                .limit(20);

            const mappedData = (data as DBLabTest[] || []).map(mapLabTestNode);
            return { data: mappedData, error };
        },
        [query]
    );
}

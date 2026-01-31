
import { supabase } from '../lib/supabase';
import { useSupabaseList, useSupabaseRecord, useSupabaseQuery } from './useSupabaseQuery';
import { LabTest } from '../types';

interface DBLabTest {
    id: string;
    name: string;
    category: string;
    description: string;
    preparation_instructions: string;
    turnaround_time_hours: number;
    sample_type: string;
    is_home_collection: boolean;
    price: number;
    is_active: boolean;
    parameters: string[];
}

const mapLabTestNode = (data: DBLabTest): LabTest => ({
    id: data.id,
    name: data.name,
    category: data.category,
    price: data.price,
    mrp: data.price * 1.2, // Mock MRP if missing
    discount: '20% OFF', // Mock discount
    parameterCount: data.parameters?.length || 0,
    reportTime: `${data.turnaround_time_hours} Hours`,
    description: data.description,
    preparationInstructions: data.preparation_instructions,
    parameters: data.parameters || [],
    sampleType: data.sample_type,
    fastingRequired: false, // Default
    department: '',
    variants: []
});

// Hook to fetch all lab tests
export function useLabTests(limit?: number) {
    return useSupabaseQuery<LabTest[]>(
        async () => {
            try {
                let query = supabase
                    .from('lab_test_master')
                    .select('*')
                    .eq('is_active', true)
                    .order('name');

                if (limit) {
                    query = query.limit(limit);
                }

                const { data, error } = await query;

                if (error || !data) {
                    console.warn("Lab tests table missing or empty, using mock data", error);
                    // Return mock data if DB fails
                    const MOCK_LABS: DBLabTest[] = [
                        { id: '1', name: 'Thyroid Profile', category: 'Health', description: '', preparation_instructions: '', turnaround_time_hours: 24, sample_type: 'Blood', is_home_collection: true, price: 499, is_active: true, parameters: [] },
                        { id: '2', name: 'Full Body Checkup', category: 'Health', description: '', preparation_instructions: '', turnaround_time_hours: 24, sample_type: 'Blood', is_home_collection: true, price: 999, is_active: true, parameters: [] },
                        { id: '3', name: 'HbA1c', category: 'Diabetes', description: '', preparation_instructions: '', turnaround_time_hours: 12, sample_type: 'Blood', is_home_collection: true, price: 299, is_active: true, parameters: [] },
                        { id: '4', name: 'Lipid Profile', category: 'Health', description: '', preparation_instructions: '', turnaround_time_hours: 24, sample_type: 'Blood', is_home_collection: true, price: 599, is_active: true, parameters: [] },
                        { id: '5', name: 'Vitamin D', category: 'Health', description: '', preparation_instructions: '', turnaround_time_hours: 24, sample_type: 'Blood', is_home_collection: true, price: 799, is_active: true, parameters: [] },
                    ];
                    return { data: MOCK_LABS.map(mapLabTestNode), error: null };
                }

                const mappedData = (data as DBLabTest[] || []).map(mapLabTestNode);
                return { data: mappedData, error: null };
            } catch (e) {
                return { data: [], error: null };
            }
        },
        [limit]
    );
}

// Hook to fetch a single lab test
export function useLabTest(id: string | undefined) {
    const { data: listData, loading, error, refetch } = useSupabaseQuery<LabTest | null>(
        async () => {
            if (!id) return { data: null, error: null };
            const { data, error } = await supabase
                .from('lab_test_master')
                .select('*')
                .eq('id', id)
                .single();

            if (error) return { data: null, error };
            return { data: mapLabTestNode(data as DBLabTest), error: null };
        },
        [id]
    );

    return { data: listData, loading, error, refetch };
}

// Hook to search lab tests
export function useLabTestSearch(query: string) {
    return useSupabaseQuery<LabTest[]>(
        async () => {
            if (!query || query.length < 2) return { data: [], error: null };

            const { data, error } = await supabase
                .from('lab_test_master')
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

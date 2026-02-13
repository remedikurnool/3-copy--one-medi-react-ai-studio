import { LabTest } from '@/types';
import { LAB_TESTS } from '@/data/lab-test-content';

// Hook to fetch all lab tests
export function useLabTests(limit?: number) {
    const data = limit ? LAB_TESTS.slice(0, limit) : LAB_TESTS;
    return { data, loading: false, error: null };
}

// Hook to fetch a single lab test
export function useLabTest(id: string | undefined) {
    if (!id) return { data: null, loading: false, error: null };
    const test = LAB_TESTS.find(t => t.id === id) || null;
    return { data: test, loading: false, error: null };
}

// Hook to search lab tests
export function useLabTestSearch(query: string) {
    if (!query || query.length < 2) return { data: [], loading: false, error: null };
    const lowerQuery = query.toLowerCase();
    const data = LAB_TESTS.filter(t =>
        t.name.toLowerCase().includes(lowerQuery) ||
        t.category.toLowerCase().includes(lowerQuery) ||
        t.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
    return { data, loading: false, error: null };
}

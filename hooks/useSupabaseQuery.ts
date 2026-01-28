import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { PostgrestError } from '@supabase/supabase-js';

interface UseSupabaseQueryResult<T> {
    data: T | null;
    loading: boolean;
    error: PostgrestError | null;
    refetch: () => void;
}

/**
 * Generic hook for Supabase queries with loading, error, and refetch support
 */
export function useSupabaseQuery<T>(
    queryFn: () => Promise<{ data: T | null; error: PostgrestError | null }>,
    deps: any[] = []
): UseSupabaseQueryResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<PostgrestError | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await queryFn();
            if (error) {
                setError(error);
                setData(null);
            } else {
                setData(data);
            }
        } catch (err) {
            setError(err as PostgrestError);
            setData(null);
        } finally {
            setLoading(false);
        }
    }, deps);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}

/**
 * Hook for a single record query
 */
export function useSupabaseRecord<T>(
    table: string,
    id: string | undefined,
    options?: { select?: string }
): UseSupabaseQueryResult<T> {
    return useSupabaseQuery<T>(
        async () => {
            if (!id) return { data: null, error: null };

            const query = supabase
                .from(table)
                .select(options?.select || '*')
                .eq('id', id)
                .single();

            return await query;
        },
        [table, id, options?.select]
    );
}

/**
 * Hook for list queries with optional filters
 */
export function useSupabaseList<T>(
    table: string,
    options?: {
        select?: string;
        filters?: Record<string, any>;
        orderBy?: { column: string; ascending?: boolean };
        limit?: number;
    }
): UseSupabaseQueryResult<T[]> {
    return useSupabaseQuery<T[]>(
        async () => {
            let query = supabase
                .from(table)
                .select(options?.select || '*');

            // Apply filters
            if (options?.filters) {
                Object.entries(options.filters).forEach(([key, value]) => {
                    if (value !== undefined && value !== null) {
                        query = query.eq(key, value);
                    }
                });
            }

            // Apply ordering
            if (options?.orderBy) {
                query = query.order(options.orderBy.column, {
                    ascending: options.orderBy.ascending ?? true
                });
            }

            // Apply limit
            if (options?.limit) {
                query = query.limit(options.limit);
            }

            return await query;
        },
        [table, JSON.stringify(options)]
    );
}

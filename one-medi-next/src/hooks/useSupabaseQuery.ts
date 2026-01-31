import { useState, useEffect, useCallback, useRef } from 'react';
import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

// ==============================================================
// TYPES
// ==============================================================
export interface QueryResult<T> {
    data: T;
    error: PostgrestError | null;
}

export interface QueryState<T> {
    data: T | null;
    loading: boolean;
    error: PostgrestError | null;
    refetch: () => void;
}

export interface ListOptions {
    filters?: Record<string, any>;
    orderBy?: { column: string; ascending?: boolean };
    limit?: number;
    offset?: number;
}

// ==============================================================
// useSupabaseQuery
// Generic hook for custom Supabase queries
// ==============================================================
export function useSupabaseQuery<T>(
    queryFn: () => Promise<QueryResult<T>>,
    dependencies: any[] = []
): QueryState<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<PostgrestError | null>(null);
    const mountedRef = useRef(true);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await queryFn();
            if (mountedRef.current) {
                setData(result.data);
                setError(result.error);
            }
        } catch (e) {
            if (mountedRef.current) {
                setError(e as PostgrestError);
            }
        } finally {
            if (mountedRef.current) {
                setLoading(false);
            }
        }
    }, dependencies);

    useEffect(() => {
        mountedRef.current = true;
        fetchData();
        return () => {
            mountedRef.current = false;
        };
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}

// ==============================================================
// useSupabaseList
// Hook for fetching a list of records from a table
// ==============================================================
export function useSupabaseList<T>(
    table: string,
    options: ListOptions = {}
): QueryState<T[]> {
    const { filters = {}, orderBy, limit, offset } = options;

    return useSupabaseQuery<T[]>(
        async () => {
            let query = supabase.from(table).select('*');

            // Apply filters
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    query = query.eq(key, value);
                }
            });

            // Apply ordering
            if (orderBy) {
                query = query.order(orderBy.column, {
                    ascending: orderBy.ascending ?? true,
                });
            }

            // Apply pagination
            if (limit) {
                query = query.limit(limit);
            }
            if (offset) {
                query = query.range(offset, offset + (limit || 10) - 1);
            }

            const { data, error } = await query;
            return { data: (data as T[]) || [], error };
        },
        [table, JSON.stringify(filters), JSON.stringify(orderBy), limit, offset]
    );
}

// ==============================================================
// useSupabaseRecord
// Hook for fetching a single record by ID
// ==============================================================
export function useSupabaseRecord<T>(
    table: string,
    id: string | undefined
): QueryState<T | null> {
    return useSupabaseQuery<T | null>(
        async () => {
            if (!id) return { data: null, error: null };

            const { data, error } = await supabase
                .from(table)
                .select('*')
                .eq('id', id)
                .single();

            return { data: data as T | null, error };
        },
        [table, id]
    );
}

import { supabase } from '../lib/supabase';
import { useSupabaseQuery } from './useSupabaseQuery';

// ==============================================================
// CONTENT TYPES
// ==============================================================
export interface HealthContent {
    id: string;
    title: string;
    slug: string;
    type: 'article' | 'video';
    content_url: string | null;
    content_body: string | null;
    thumbnail_url: string | null;
    author_name: string | null;
    category: string;
    tags: string[];
    read_time_minutes: number;
    is_premium: boolean;
    is_published: boolean;
    published_at: string;
    view_count: number;
}

// ==============================================================
// CONTENT HOOKS
// ==============================================================

/**
 * Fetch all published health content (articles & videos)
 */
export function useHealthContent() {
    return useSupabaseQuery<HealthContent[]>(
        async () => {
            const { data, error } = await supabase
                .from('content_master')
                .select('*')
                .eq('is_published', true)
                .order('published_at', { ascending: false });

            if (error) return { data: [], error };
            return { data: (data || []) as HealthContent[], error: null };
        },
        []
    );
}

/**
 * Fetch content by type (article or video)
 */
export function useHealthContentByType(type: 'article' | 'video') {
    return useSupabaseQuery<HealthContent[]>(
        async () => {
            const { data, error } = await supabase
                .from('content_master')
                .select('*')
                .eq('is_published', true)
                .eq('type', type)
                .order('published_at', { ascending: false });

            if (error) return { data: [], error };
            return { data: (data || []) as HealthContent[], error: null };
        },
        [type]
    );
}

/**
 * Fetch content by category
 */
export function useHealthContentByCategory(category: string) {
    return useSupabaseQuery<HealthContent[]>(
        async () => {
            const { data, error } = await supabase
                .from('content_master')
                .select('*')
                .eq('is_published', true)
                .eq('category', category)
                .order('published_at', { ascending: false });

            if (error) return { data: [], error };
            return { data: (data || []) as HealthContent[], error: null };
        },
        [category]
    );
}

/**
 * Fetch a single content item by slug
 */
export function useHealthContentBySlug(slug: string | undefined) {
    return useSupabaseQuery<HealthContent | null>(
        async () => {
            if (!slug) return { data: null, error: null };

            const { data, error } = await supabase
                .from('content_master')
                .select('*')
                .eq('slug', slug)
                .eq('is_published', true)
                .single();

            if (error) return { data: null, error };
            return { data: data as HealthContent, error: null };
        },
        [slug]
    );
}

/**
 * Fetch a single content item by ID
 */
export function useHealthContentById(id: string | undefined) {
    return useSupabaseQuery<HealthContent | null>(
        async () => {
            if (!id) return { data: null, error: null };

            const { data, error } = await supabase
                .from('content_master')
                .select('*')
                .eq('id', id)
                .single();

            if (error) return { data: null, error };
            return { data: data as HealthContent, error: null };
        },
        [id]
    );
}

/**
 * Search health content
 */
export function useHealthContentSearch(query: string) {
    return useSupabaseQuery<HealthContent[]>(
        async () => {
            if (!query || query.length < 2) return { data: [], error: null };

            const { data, error } = await supabase
                .from('content_master')
                .select('*')
                .eq('is_published', true)
                .or(`title.ilike.%${query}%,category.ilike.%${query}%`)
                .limit(20);

            if (error) return { data: [], error };
            return { data: (data || []) as HealthContent[], error: null };
        },
        [query]
    );
}

/**
 * Get unique content categories
 */
export function useHealthContentCategories() {
    return useSupabaseQuery<string[]>(
        async () => {
            const { data, error } = await supabase
                .from('content_master')
                .select('category')
                .eq('is_published', true);

            if (error) return { data: [], error };

            const categories = [...new Set((data || []).map(d => d.category).filter(Boolean))];
            return { data: categories, error: null };
        },
        []
    );
}

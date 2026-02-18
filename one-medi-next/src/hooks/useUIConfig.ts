import { useSupabaseList, useSupabaseQuery, useSupabaseRecord } from './useSupabaseQuery';
import { supabase } from '../lib/supabase';

// Types based on Supabase schema
export interface UIMenu {
    id: string;
    name: string; // was menu_key
    title: string; // was name
    description?: string;
    is_active: boolean;
}

export interface UIMenuItem {
    id: string;
    menu_id: string;
    title: string; // was label
    icon?: string;
    route?: string;
    external_link?: string; // was external_url
    sort_order: number;
    is_active: boolean;
    badge_color?: string; // used for color theme
    badge_text?: string;
    description?: string;
}

export interface UICarousel {
    id: string;
    name: string; // was carousel_key
    title: string; // was name
    placement?: string; // or position
    auto_play: boolean;
    interval_ms: number;
    is_active: boolean;
}

export interface UICarouselItem {
    id: string;
    carousel_id: string;
    title?: string;
    subtitle?: string;
    image_url: string;
    link_type?: 'internal' | 'external' | 'deeplink';
    link_url?: string; // was link_value
    sort_order: number;
    is_active: boolean;
    starts_at?: string;
    ends_at?: string;
}

interface FeatureFlag {
    id: string;
    feature_key: string;
    name: string;
    is_enabled: boolean;
    rollout_percentage: number;
    city_ids?: string[];
}

// Hook to fetch menu with its items
export function useMenu(menuName: string) {
    return useSupabaseQuery<(UIMenu & { items: UIMenuItem[] }) | null>(
        async () => {
            // First get the menu
            const { data: menu, error: menuError } = await supabase
                .from('ui_menus')
                .select('*')
                .eq('name', menuName)
                .eq('is_active', true)
                .single();

            if (menuError || !menu) {
                return { data: null, error: menuError };
            }

            // Then get its items
            const { data: items, error: itemsError } = await supabase
                .from('ui_menu_items')
                .select('*')
                .eq('menu_id', menu.id)
                .eq('is_active', true)
                .order('sort_order', { ascending: true });

            if (itemsError) {
                console.error('Error fetching menu items:', itemsError);
                return { data: { ...menu, items: [] }, error: null };
            }

            return { data: { ...menu, items: items || [] }, error: null };
        },
        [menuName]
    );
}

// Hook to fetch all menus
export function useMenus() {
    return useSupabaseList<UIMenu>('ui_menus', {
        filters: { is_active: true },
        orderBy: { column: 'title', ascending: true },
    });
}

// Hook to fetch carousel with its items
export function useCarousel(carouselName: string) {
    return useSupabaseQuery<(UICarousel & { items: UICarouselItem[] }) | null>(
        async () => {
            try {
                // First get the carousel
                const { data: carousel, error: carouselError } = await supabase
                    .from('ui_carousels')
                    .select('*')
                    .eq('name', carouselName)
                    .eq('is_active', true)
                    .single();

                if (carouselError || !carousel) {
                    console.warn(`Carousel ${carouselName} not found, using mock`, carouselError);
                    // Mock data for hero carousel (Fallback only)
                    if (carouselName === 'hero_carousel') {
                        // ... keeping existing mock logic if needed, but updated keys
                        return { data: null, error: null };
                    }
                    return { data: null, error: null };
                }

                // Then get its items
                const { data: items, error: itemsError } = await supabase
                    .from('ui_carousel_items')
                    .select('*')
                    .eq('carousel_id', carousel.id)
                    .eq('is_active', true)
                    .order('sort_order', { ascending: true });

                if (itemsError) {
                    console.error('Error fetching carousel items:', itemsError);
                    return { data: { ...carousel, items: [] }, error: null };
                }

                return { data: { ...carousel, items: items || [] }, error: null };
            } catch (e) {
                return { data: null, error: null };
            }
        },
        [carouselName]
    );
}

// Hook to fetch carousels by placement/position
export function useCarouselsByPlacement(position: string) {
    return useSupabaseList<UICarousel>('ui_carousels', {
        filters: { position, is_active: true },
        orderBy: { column: 'name', ascending: true },
    });
}

// Hook to check feature flags
export function useFeatureFlag(featureKey: string) {
    return useSupabaseQuery<boolean>(
        async () => {
            const { data: flag, error } = await supabase
                .from('feature_flags')
                .select('*')
                .eq('feature_key', featureKey)
                .single();

            if (error || !flag) {
                return { data: false, error: null };
            }

            // Check if feature is enabled
            if (!flag.is_enabled) {
                return { data: false, error: null };
            }

            // Check rollout percentage
            if (flag.rollout_percentage < 100) {
                const random = Math.random() * 100;
                if (random > flag.rollout_percentage) {
                    return { data: false, error: null };
                }
            }

            return { data: true, error: null };
        },
        [featureKey]
    );
}

// Hook to fetch all active feature flags
export function useFeatureFlags() {
    return useSupabaseList<FeatureFlag>('feature_flags', {
        filters: { is_enabled: true },
    });
}

// Hook to get promoted banners for home page
export function usePromoBanners() {
    return useCarousel('home_promo');
}

// Hook to get hero carousel
export function useHeroCarousel() {
    return useCarousel('hero_carousel');
}

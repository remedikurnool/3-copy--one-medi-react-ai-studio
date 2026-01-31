import { useSupabaseList, useSupabaseQuery, useSupabaseRecord } from './useSupabaseQuery';
import { supabase } from '../lib/supabase';

// Types based on Supabase schema
interface UIMenu {
    id: string;
    menu_key: string;
    name: string;
    description?: string;
    is_active: boolean;
}

interface UIMenuItem {
    id: string;
    menu_id: string;
    label: string;
    icon?: string;
    route?: string;
    external_url?: string;
    display_order: number;
    is_active: boolean;
    roles_allowed?: string[];
}

interface UICarousel {
    id: string;
    carousel_key: string;
    name: string;
    placement: string;
    auto_play: boolean;
    interval_ms: number;
    is_active: boolean;
}

interface UICarouselItem {
    id: string;
    carousel_id: string;
    title?: string;
    subtitle?: string;
    image_url: string;
    link_type?: 'internal' | 'external' | 'deeplink';
    link_value?: string;
    display_order: number;
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
export function useMenu(menuKey: string) {
    return useSupabaseQuery<(UIMenu & { items: UIMenuItem[] }) | null>(
        async () => {
            // First get the menu
            const { data: menu, error: menuError } = await supabase
                .from('ui_menus')
                .select('*')
                .eq('menu_key', menuKey)
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
                .order('display_order', { ascending: true });

            if (itemsError) {
                console.error('Error fetching menu items:', itemsError);
                return { data: { ...menu, items: [] }, error: null };
            }

            return { data: { ...menu, items: items || [] }, error: null };
        },
        [menuKey]
    );
}

// Hook to fetch all menus
export function useMenus() {
    return useSupabaseList<UIMenu>('ui_menus', {
        filters: { is_active: true },
        orderBy: { column: 'name', ascending: true },
    });
}

// Hook to fetch carousel with its items
export function useCarousel(carouselKey: string) {
    return useSupabaseQuery<(UICarousel & { items: UICarouselItem[] }) | null>(
        async () => {
            // First get the carousel
            const { data: carousel, error: carouselError } = await supabase
                .from('ui_carousels')
                .select('*')
                .eq('carousel_key', carouselKey)
                .eq('is_active', true)
                .single();

            if (carouselError || !carousel) {
                return { data: null, error: carouselError };
            }

            // Then get its items
            const { data: items, error: itemsError } = await supabase
                .from('ui_carousel_items')
                .select('*')
                .eq('carousel_id', carousel.id)
                .eq('is_active', true)
                .order('display_order', { ascending: true });

            if (itemsError) {
                console.error('Error fetching carousel items:', itemsError);
                return { data: { ...carousel, items: [] }, error: null };
            }

            return { data: { ...carousel, items: items || [] }, error: null };
        },
        [carouselKey]
    );
}

// Hook to fetch carousels by placement
export function useCarouselsByPlacement(placement: string) {
    return useSupabaseList<UICarousel>('ui_carousels', {
        filters: { placement, is_active: true },
        orderBy: { column: 'display_order', ascending: true },
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

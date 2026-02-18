'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

/**
 * useSmartBack Hook
 * 
 * Provides a navigation function that intelligently decides whether to:
 * 1. Go back in history (if history exists)
 * 2. Redirect to a parent/fallback route (if landed directly on the page)
 */
export function useSmartBack() {
    const router = useRouter();
    const pathname = usePathname();

    const goBack = useCallback((defaultFallback: string = '/') => {
        // Check if there is a history to go back to.
        // window.history.state?.idx > 0 is a Next.js implementation detail (fragile but common)
        // A safer heuristic is checking referrer or simply history.length > 2 (new tab = 1 or 2)

        const hasHistory = typeof window !== 'undefined' && window.history.length > 2;

        if (hasHistory) {
            router.back();
        } else {
            // Determine fallback based on current path
            let fallbackUrl = defaultFallback;

            if (pathname.startsWith('/medicines/')) fallbackUrl = '/medicines';
            else if (pathname.startsWith('/scans/')) fallbackUrl = '/scans';
            else if (pathname.startsWith('/surgeries/')) fallbackUrl = '/surgeries';
            else if (pathname.startsWith('/wellness/')) fallbackUrl = '/wellness';
            else if (pathname.startsWith('/doctors/')) fallbackUrl = '/doctors';
            else if (pathname.startsWith('/profile/')) fallbackUrl = '/profile';
            else if (pathname.startsWith('/checkout')) fallbackUrl = '/cart';
            else if (pathname.startsWith('/bookings')) fallbackUrl = '/';
            else if (pathname.startsWith('/orders')) fallbackUrl = '/profile';

            // If we are already at the fallback (e.g. /medicines back to /medicines), go Home
            if (pathname === fallbackUrl) {
                fallbackUrl = '/';
            }

            router.push(fallbackUrl);
        }
    }, [router, pathname]);

    return goBack;
}

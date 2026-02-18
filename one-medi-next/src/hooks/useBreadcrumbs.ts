'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export interface BreadcrumbItem {
    label: string;
    path?: string;
}

const ROUTE_LABELS: Record<string, string> = {
    'medicines': 'Medicines',
    'scans': 'Lab Scans',
    'surgeries': 'Surgeries',
    'wellness': 'Wellness',
    'doctors': 'Doctors',
    'profile': 'My Profile',
    'cart': 'Shopping Cart',
    'orders': 'My Orders',
    'bookings': 'My Bookings',
    'checkout': 'Checkout',
    'search': 'Search',
    'category': 'Categories',
};

export function useBreadcrumbs() {
    const pathname = usePathname();

    const breadcrumbs = useMemo(() => {
        // Split path into segments, remove empty strings
        const segments = pathname.split('/').filter(Boolean);

        // Initial "Home" crumb
        const items: BreadcrumbItem[] = [
            { label: 'Home', path: '/' }
        ];

        let currentPath = '';

        segments.forEach((segment, index) => {
            currentPath += `/${segment}`;

            // Determine label
            // 1. Check if it's a known static route segment
            let label = ROUTE_LABELS[segment];

            // 2. If no label found (dynamic ID or unmapped), try to format it
            if (!label) {
                // If it looks like an ID (long alphanumeric), just say "Details"
                // This is a heuristic. Ideally, we fetch the name, but for breadcrumbs "Details" is often sufficient or we display the truncated ID.
                if (segment.length > 20 || /^\d+$/.test(segment)) {
                    label = 'Details';
                } else {
                    // Capitalize and replace hyphens
                    label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
                }
            }

            // If it's the last item, don't include path (non-clickable)
            const isLast = index === segments.length - 1;

            items.push({
                label,
                path: isLast ? undefined : currentPath
            });
        });

        return items;
    }, [pathname]);

    return breadcrumbs;
}

'use client';

import React from 'react';
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';
import { Breadcrumbs } from './Breadcrumbs';

export function SmartBreadcrumbs({ className }: { className?: string }) {
    const items = useBreadcrumbs();

    // Don't show if only Home
    if (items.length <= 1) return null;

    return (
        <div className={className}>
            <Breadcrumbs items={items} />
        </div>
    );
}

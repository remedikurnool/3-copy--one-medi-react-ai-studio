import React from 'react';
import { useNavigate } from 'react-router-dom';

interface EmptyStateProps {
    icon?: string;
    title: string;
    description?: string;
    actionLabel?: string;
    actionIcon?: string;
    onAction?: () => void;
    actionRoute?: string;
    variant?: 'default' | 'compact' | 'fullscreen';
    className?: string;
}

export default function EmptyState({
    icon = 'inbox',
    title,
    description,
    actionLabel,
    actionIcon,
    onAction,
    actionRoute,
    variant = 'default',
    className = '',
}: EmptyStateProps) {
    const navigate = useNavigate();

    const handleAction = () => {
        if (onAction) {
            onAction();
        } else if (actionRoute) {
            navigate(actionRoute);
        }
    };

    const containerClasses = {
        default: 'min-h-[300px] p-6',
        compact: 'py-8 px-4',
        fullscreen: 'min-h-screen p-6',
    };

    const iconSizes = {
        default: 'size-20 text-5xl',
        compact: 'size-14 text-3xl',
        fullscreen: 'size-24 text-6xl',
    };

    return (
        <div
            className={`flex flex-col items-center justify-center text-center ${containerClasses[variant]} ${className}`}
        >
            <div
                className={`rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4 ${iconSizes[variant]}`}
            >
                <span className="material-symbols-outlined text-gray-400 dark:text-gray-500">
                    {icon}
                </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
            {description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mb-6">
                    {description}
                </p>
            )}
            {(actionLabel && (onAction || actionRoute)) && (
                <button
                    onClick={handleAction}
                    className="px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:bg-primary-dark transition-colors flex items-center gap-2"
                >
                    {actionIcon && (
                        <span className="material-symbols-outlined text-lg">{actionIcon}</span>
                    )}
                    {actionLabel}
                </button>
            )}
        </div>
    );
}

// Preset empty states for common scenarios
export function NoResultsState({ query, onClear }: { query?: string; onClear?: () => void }) {
    return (
        <EmptyState
            icon="search_off"
            title="No results found"
            description={query ? `We couldn't find anything matching "${query}"` : 'Try adjusting your search or filters'}
            actionLabel={onClear ? 'Clear Search' : undefined}
            actionIcon="close"
            onAction={onClear}
            variant="compact"
        />
    );
}

export function NoOrdersState() {
    return (
        <EmptyState
            icon="receipt_long"
            title="No orders yet"
            description="Your order history will appear here once you make your first purchase"
            actionLabel="Shop Now"
            actionIcon="shopping_bag"
            actionRoute="/medicines"
        />
    );
}

export function NoBookingsState() {
    return (
        <EmptyState
            icon="calendar_month"
            title="No bookings yet"
            description="Book a doctor consultation, lab test, or scan to get started"
            actionLabel="Browse Services"
            actionIcon="explore"
            actionRoute="/services"
        />
    );
}

export function EmptyCartState() {
    return (
        <EmptyState
            icon="shopping_cart_off"
            title="Your cart is empty"
            description="Add medicines, tests, or other services to get started"
            actionLabel="Start Shopping"
            actionIcon="add_shopping_cart"
            actionRoute="/medicines"
            variant="fullscreen"
        />
    );
}

export function NoAddressesState({ onAdd }: { onAdd?: () => void }) {
    return (
        <EmptyState
            icon="location_off"
            title="No addresses saved"
            description="Add a delivery address to continue with your order"
            actionLabel="Add Address"
            actionIcon="add_location"
            onAction={onAdd}
            variant="compact"
        />
    );
}

export function NoFamilyMembersState({ onAdd }: { onAdd?: () => void }) {
    return (
        <EmptyState
            icon="group_off"
            title="No family members"
            description="Add family members to book appointments for them"
            actionLabel="Add Member"
            actionIcon="person_add"
            onAction={onAdd}
            variant="compact"
        />
    );
}

export function NetworkErrorState({ onRetry }: { onRetry?: () => void }) {
    return (
        <EmptyState
            icon="wifi_off"
            title="Connection lost"
            description="Please check your internet connection and try again"
            actionLabel="Retry"
            actionIcon="refresh"
            onAction={onRetry}
        />
    );
}

export function ServerErrorState({ onRetry }: { onRetry?: () => void }) {
    return (
        <EmptyState
            icon="cloud_off"
            title="Server error"
            description="Something went wrong on our end. Please try again later"
            actionLabel="Retry"
            actionIcon="refresh"
            onAction={onRetry}
        />
    );
}

export function NotFoundState() {
    return (
        <EmptyState
            icon="question_mark"
            title="Page not found"
            description="The page you're looking for doesn't exist or has been moved"
            actionLabel="Go Home"
            actionIcon="home"
            actionRoute="/"
            variant="fullscreen"
        />
    );
}

export function UnauthorizedState() {
    return (
        <EmptyState
            icon="lock"
            title="Login required"
            description="Please login to access this page"
            actionLabel="Login"
            actionIcon="login"
            actionRoute="/login"
            variant="fullscreen"
        />
    );
}

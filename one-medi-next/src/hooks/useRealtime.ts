import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useUserStore } from '../store/userStore';
import { Order } from './useOrders';

// ==============================================================
// REALTIME HOOKS
// ==============================================================

/**
 * Hook to subscribe to real-time order status updates for the current user
 */
export function useRealtimeOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const { profile, isAuthenticated } = useUserStore();

    // Use phone as unique identifier (in production, use Supabase auth user id)
    const userId = profile?.phone?.replace(/\D/g, '') || null;

    // Fetch initial orders
    const fetchOrders = useCallback(async () => {
        if (!isAuthenticated || !userId) {
            setOrders([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            // Note: In production, use Supabase auth user id
            // For now, this won't perfectly filter without proper auth integration
            .order('created_at', { ascending: false });

        if (!error && data) {
            setOrders(data as Order[]);
        }
        setLoading(false);
    }, [userId, isAuthenticated]);

    useEffect(() => {
        fetchOrders();

        // Don't subscribe if not authenticated
        if (!isAuthenticated) return;

        // Subscribe to real-time changes
        const channel = supabase
            .channel('orders-realtime')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'orders'
                    // Note: Filter will be added when proper auth is integrated
                },
                (payload) => {
                    console.log('[Realtime] Order change:', payload);

                    if (payload.eventType === 'INSERT') {
                        setOrders(prev => [payload.new as Order, ...prev]);
                        // Trigger notification for new order confirmation
                        showNotification('Order Confirmed!', `Your order #${(payload.new as Order).id.slice(-6)} has been placed.`);
                    } else if (payload.eventType === 'UPDATE') {
                        setOrders(prev =>
                            prev.map(order =>
                                order.id === (payload.new as Order).id ? (payload.new as Order) : order
                            )
                        );
                        // Trigger notification for status change
                        const newOrder = payload.new as Order;
                        showNotification('Order Updated', `Order #${newOrder.id.slice(-6)} is now ${newOrder.status}`);
                    } else if (payload.eventType === 'DELETE') {
                        setOrders(prev =>
                            prev.filter(order => order.id !== (payload.old as Order).id)
                        );
                    }
                }
            )
            .subscribe();

        // Cleanup subscription on unmount
        return () => {
            supabase.removeChannel(channel);
        };
    }, [isAuthenticated, fetchOrders]);

    return { orders, loading, refetch: fetchOrders };
}

/**
 * Hook to subscribe to real-time slot availability updates
 */
export function useRealtimeSlots(doctorId?: string, date?: string) {
    const [slots, setSlots] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!doctorId || !date) {
            setSlots([]);
            setLoading(false);
            return;
        }

        // Fetch initial slots
        const fetchSlots = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('availability_slots')
                .select('*')
                .eq('doctor_id', doctorId)
                .eq('slot_date', date)
                .eq('is_available', true)
                .order('start_time');

            if (!error && data) {
                setSlots(data);
            }
            setLoading(false);
        };

        fetchSlots();

        // Subscribe to slot changes
        const channel = supabase
            .channel(`slots:${doctorId}:${date}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'availability_slots',
                    filter: `doctor_id=eq.${doctorId}`
                },
                (payload) => {
                    console.log('[Realtime] Slot change:', payload);

                    if (payload.eventType === 'UPDATE') {
                        setSlots(prev =>
                            prev.map(slot =>
                                slot.id === payload.new.id ? payload.new : slot
                            ).filter(slot => slot.is_available)
                        );
                    } else if (payload.eventType === 'INSERT') {
                        const newSlot = payload.new;
                        if (newSlot.slot_date === date && newSlot.is_available) {
                            setSlots(prev => [...prev, newSlot].sort((a, b) =>
                                a.start_time.localeCompare(b.start_time)
                            ));
                        }
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [doctorId, date]);

    return { slots, loading };
}

// ==============================================================
// WEB PUSH NOTIFICATIONS
// ==============================================================

/**
 * Request notification permission from the user
 */
export async function requestNotificationPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
        console.log('This browser does not support notifications');
        return false;
    }

    if (Notification.permission === 'granted') {
        return true;
    }

    if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
    }

    return false;
}

/**
 * Show a web notification
 */
export function showNotification(title: string, body: string, options?: NotificationOptions) {
    if (!('Notification' in window)) return;

    if (Notification.permission === 'granted') {
        new Notification(title, {
            body,
            icon: '/onemedi-logo.png',
            badge: '/onemedi-badge.png',
            ...options
        });
    }
}

/**
 * Hook to manage notification permissions
 */
export function useNotificationPermission() {
    const [permission, setPermission] = useState<NotificationPermission>(
        'Notification' in window ? Notification.permission : 'denied'
    );

    const requestPermission = useCallback(async () => {
        const granted = await requestNotificationPermission();
        setPermission(granted ? 'granted' : 'denied');
        return granted;
    }, []);

    return { permission, requestPermission };
}

/**
 * Hook to schedule booking reminders
 */
export function useBookingReminders() {
    const scheduleReminder = useCallback((bookingTime: Date, serviceName: string) => {
        // Schedule reminder 1 hour before
        const reminderTime = new Date(bookingTime.getTime() - 60 * 60 * 1000);
        const now = new Date();

        if (reminderTime > now) {
            const timeout = reminderTime.getTime() - now.getTime();
            setTimeout(() => {
                showNotification(
                    'Upcoming Appointment',
                    `Your ${serviceName} appointment is in 1 hour!`,
                    { tag: 'booking-reminder' }
                );
            }, timeout);
        }
    }, []);

    return { scheduleReminder };
}

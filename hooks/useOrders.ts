import { useState } from 'react';
import { supabase, type Order, type OrderItem } from '../lib/supabase';
import { useSupabaseQuery } from './useSupabaseQuery';

interface CreateOrderParams {
    profileId: string;
    addressId: string;
    paymentMethod: string;
    items: {
        serviceCatalogId: string;
        vendorId?: string;
        quantity: number;
        unitPrice: number;
        serviceSnapshot?: any;
    }[];
    subtotal: number;
    discount?: number;
    tax?: number;
    total: number;
    couponId?: string;
}

/**
 * Create a new order
 */
export async function createOrder(params: CreateOrderParams): Promise<{ order: Order | null; error: any }> {
    try {
        // Generate order number
        const orderNumber = `OM${Date.now().toString(36).toUpperCase()}`;

        // Create order
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                profile_id: params.profileId,
                address_id: params.addressId,
                order_number: orderNumber,
                order_status: 'PENDING',
                payment_status: 'AWAITING',
                payment_method: params.paymentMethod,
                subtotal: params.subtotal,
                discount_amount: params.discount || 0,
                tax_amount: params.tax || 0,
                total_amount: params.total,
                coupon_id: params.couponId,
            })
            .select()
            .single();

        if (orderError) throw orderError;

        // Create order items
        const orderItems = params.items.map(item => ({
            order_id: order.id,
            service_catalog_id: item.serviceCatalogId,
            vendor_id: item.vendorId,
            quantity: item.quantity,
            unit_price: item.unitPrice,
            service_snapshot: item.serviceSnapshot,
            fulfillment_status: 'SCHEDULED',
        }));

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);

        if (itemsError) throw itemsError;

        return { order, error: null };
    } catch (error) {
        console.error('Error creating order:', error);
        return { order: null, error };
    }
}

/**
 * Fetch user's orders
 */
export function useOrders(userId: string | undefined) {
    return useSupabaseQuery<Order[]>(
        async () => {
            if (!userId) {
                return { data: [], error: null };
            }

            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('profile_id', userId)
                .order('created_at', { ascending: false });

            return { data, error };
        },
        [userId]
    );
}

/**
 * Fetch a single order with items
 */
export function useOrder(orderId: string | undefined) {
    return useSupabaseQuery<Order & { order_items: OrderItem[] }>(
        async () => {
            if (!orderId) {
                return { data: null, error: null };
            }

            const { data, error } = await supabase
                .from('orders')
                .select(`
          *,
          order_items (*)
        `)
                .eq('id', orderId)
                .single();

            return { data, error };
        },
        [orderId]
    );
}

/**
 * Update order status
 */
export async function updateOrderStatus(
    orderId: string,
    status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'OUT_FOR_DELIVERY' | 'COMPLETED' | 'CANCELLED'
): Promise<{ success: boolean; error: any }> {
    try {
        const { error } = await supabase
            .from('orders')
            .update({ order_status: status })
            .eq('id', orderId);

        if (error) throw error;
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error };
    }
}

/**
 * Update payment status
 */
export async function updatePaymentStatus(
    orderId: string,
    status: 'AWAITING' | 'PAID' | 'FAILED' | 'REFUNDED'
): Promise<{ success: boolean; error: any }> {
    try {
        const { error } = await supabase
            .from('orders')
            .update({ payment_status: status })
            .eq('id', orderId);

        if (error) throw error;
        return { success: true, error: null };
    } catch (error) {
        return { success: false, error };
    }
}

/**
 * Hook for creating orders with loading state
 */
export function useCreateOrder() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const create = async (
        orderData: {
            profile_id: string;
            order_type: 'medicine' | 'lab_test' | 'scan' | 'consultation' | 'service';
            total_amount: number;
            discount_amount?: number;
            delivery_fee?: number;
            delivery_address_id?: string;
            payment_method?: string;
            notes?: string;
        },
        items: {
            item_type: 'medicine' | 'lab_test' | 'scan' | 'consultation' | 'service';
            item_id: string;
            item_name: string;
            quantity: number;
            unit_price: number;
            total_price: number;
            discount_amount?: number;
        }[]
    ) => {
        setLoading(true);
        setError(null);

        try {
            // Generate order number
            const orderNumber = `OM${Date.now().toString(36).toUpperCase()}`;

            // Create order
            const { data: order, error: orderError } = await supabase
                .from('orders')
                .insert({
                    profile_id: orderData.profile_id,
                    order_number: orderNumber,
                    order_status: 'PENDING',
                    payment_status: 'AWAITING',
                    payment_method: orderData.payment_method || 'online',
                    subtotal: orderData.total_amount - (orderData.delivery_fee || 0),
                    discount_amount: orderData.discount_amount || 0,
                    tax_amount: 0,
                    total_amount: orderData.total_amount,
                    address_id: orderData.delivery_address_id,
                })
                .select()
                .single();

            if (orderError) throw orderError;

            // Create order items
            const orderItems = items.map(item => ({
                order_id: order.id,
                item_type: item.item_type,
                item_id: item.item_id,
                item_name: item.item_name,
                quantity: item.quantity,
                unit_price: item.unit_price,
                total_price: item.total_price,
                discount_amount: item.discount_amount || 0,
                fulfillment_status: 'SCHEDULED',
            }));

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItems);

            if (itemsError) {
                console.warn('Order items creation failed:', itemsError);
                // Order was created, continue anyway
            }

            setLoading(false);
            return order;
        } catch (err) {
            console.error('Error creating order:', err);
            setError(err);
            setLoading(false);
            throw err;
        }
    };

    return { createOrder: create, loading, error };
}


import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useSupabaseQuery } from './useSupabaseQuery';
import { useUserStore } from '../store/userStore';

export interface Order {
    id: string;
    profile_id: string;
    total_amount: number;
    discount_amount: number;
    final_amount: number;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    payment_method: string;
    payment_status: 'pending' | 'paid' | 'failed';
    coupon_id?: string;
    prescription_url?: string;
    delivery_address?: any;
    created_at: string;
}

export interface OrderItem {
    id: string;
    order_id: string;
    medicine_id?: string;
    lab_test_id?: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    medicine?: any; // Using any to avoid circular deps or complex types for now, or could import Medicine type
    lab_test?: any;
}

export interface Coupon {
    id: string;
    code: string;
    discount_type: 'percentage' | 'fixed';
    discount_value: number;
    min_order_value: number;
    max_discount_amount: number;
    expiry_date: string;
    is_active: boolean;
}

// Hook to validate coupon
export function useCoupon() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validateCoupon = async (code: string, cartTotal: number): Promise<Coupon | null> => {
        setLoading(true);
        setError(null);

        try {
            const { data, error } = await supabase
                .from('coupons')
                .select('*')
                .eq('code', code.toUpperCase())
                .eq('is_active', true)
                .gt('expiry_date', new Date().toISOString())
                .single();

            if (error) throw new Error('Invalid or expired coupon');

            if (data.min_order_value > cartTotal) {
                throw new Error(`Minimum order value of ₹${data.min_order_value} required`);
            }

            return data as Coupon;
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { validateCoupon, loading, error };
}

// Hook to create order
export function useCreateOrder() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createOrder = async (
        items: any[],
        totalAmount: number,
        discountAmount: number,
        finalAmount: number,
        address: any,
        paymentMethod: string,
        prescriptionUrl?: string | null,
        couponId?: string
    ): Promise<Order | null> => {
        setLoading(true);
        setError(null);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('User not authenticated');

            // 1. Create Order Record
            const { data: order, error: orderError } = await supabase
                .from('orders')
                .insert({
                    profile_id: user.id,
                    total_amount: totalAmount,
                    discount_amount: discountAmount,
                    final_amount: finalAmount,
                    status: 'pending',
                    payment_method: paymentMethod,
                    payment_status: 'pending',
                    coupon_id: couponId,
                    prescription_url: prescriptionUrl,
                    delivery_address: address
                })
                .select()
                .single();

            if (orderError) throw new Error(orderError.message);

            // 2. Create Order Items
            const orderItems = items.map(item => ({
                order_id: order.id,
                // Assuming item.type distinguishes between medicine/lab or we assume medicine for now
                medicine_id: item.type === 'medicine' ? item.id : null,
                lab_test_id: item.type === 'lab' ? item.id : null,
                quantity: item.qty || 1,
                unit_price: item.price,
                total_price: item.price * (item.qty || 1)
            }));

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItems);

            if (itemsError) throw new Error(itemsError.message);

            return order;

        } catch (err: any) {
            console.error('Create Order Error:', err);
            setError(err.message || 'Failed to create order');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { createOrder, loading, error };
}

// Hook to upload prescription
export function useUploadPrescription() {
    const [uploading, setUploading] = useState(false);

    const uploadFile = async (file: File): Promise<string | null> => {
        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `prescriptions/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('prescriptions')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('prescriptions').getPublicUrl(filePath);
            return data.publicUrl;
        } catch (error) {
            console.error('Upload Error:', error);
            return null;
        } finally {
            setUploading(false);
        }
    };

    return { uploadFile, uploading };
}

// Hook to fetch user's orders
export function useMyOrders(userId?: string) {
    const fetchOrders = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            const uid = userId || user?.id;

            if (!uid) {
                return { data: [], error: null };
            }

            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .eq('profile_id', uid)
                .order('created_at', { ascending: false });

            return { data: (data as Order[]) || [], error };
        } catch (err: any) {
            return { data: [], error: err };
        }
    };

    const { data: orders, loading, error, refetch } = useSupabaseQuery<Order[]>(fetchOrders, [userId]);

    return { orders: orders || [], loading, error, refetch };
}

// Hook to fetch single order details
export function useOrderDetails(orderId: string) {
    const fetchOrderDetails = async () => {
        if (!orderId) return { data: null, error: null };

        try {
            // Fetch order
            const { data: orderData, error: orderError } = await supabase
                .from('orders')
                .select('*')
                .eq('id', orderId)
                .single();

            if (orderError) throw orderError;

            // Fetch items
            const { data: itemsData, error: itemsError } = await supabase
                .from('order_items')
                .select(`
                    *,
                    medicine:medicine_id(*),
                    lab_test:lab_test_id(*)
                `)
                .eq('order_id', orderId);

            if (itemsError) throw itemsError;

            // Combine into one object for the hook state
            return {
                data: {
                    ...orderData,
                    items: itemsData || []
                } as Order & { items: OrderItem[] },
                error: null
            };
        } catch (err: any) {
            return { data: null, error: err };
        }
    };

    const { data, loading, error, refetch } = useSupabaseQuery<Order & { items: OrderItem[] }>(fetchOrderDetails, [orderId]);

    return {
        order: data,
        items: data?.items || [],
        loading,
        error,
        refetch
    };
}

import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useSupabaseList, useSupabaseRecord, useSupabaseQuery } from './useSupabaseQuery';

// Types based on actual Supabase service_bookings table schema
export interface ServiceBooking {
    id: string;
    profile_id: string;
    service_catalog_id: string;
    vendor_id?: string;
    booking_date: string;
    booking_time?: string;
    slot_id?: string;
    fulfillment_status: string;
    booked_for_id?: string;
    notes?: string;
    created_at: string;
    updated_at: string;
    // Joined data
    service_name?: string;
    vendor_name?: string;
}

export interface BookingSlot {
    id: string;
    service_type: string;
    service_id: string;
    vendor_id?: string;
    slot_date: string;
    start_time: string;
    end_time: string;
    max_bookings: number;
    current_bookings: number;
    is_available: boolean;
}

export interface CreateBookingInput {
    service_catalog_id: string;
    vendor_id?: string;
    booking_date: string;
    booking_time?: string;
    slot_id?: string;
    booked_for_id?: string;
    notes?: string;
}

// Hook to fetch user's bookings
export function useBookings(userId?: string) {
    return useSupabaseList<ServiceBooking>('service_bookings', {
        filters: userId ? { profile_id: userId } : undefined,
        orderBy: { column: 'created_at', ascending: false },
    });
}

// Hook to fetch a single booking
export function useBooking(bookingId: string | undefined) {
    return useSupabaseRecord<ServiceBooking>('service_bookings', bookingId);
}

// Hook to fetch bookings by status
export function useBookingsByStatus(userId: string, status: string) {
    return useSupabaseList<ServiceBooking>('service_bookings', {
        filters: { profile_id: userId, fulfillment_status: status },
        orderBy: { column: 'booking_date', ascending: true },
    });
}

// Hook to fetch active bookings
export function useActiveBookings(userId: string) {
    return useSupabaseQuery<ServiceBooking[]>(
        async () => {
            const { data, error } = await supabase
                .from('service_bookings')
                .select('*')
                .eq('profile_id', userId)
                .in('fulfillment_status', ['pending', 'confirmed', 'in_progress'])
                .order('booking_date', { ascending: true });

            return { data: data || [], error };
        },
        [userId]
    );
}

// Hook to fetch available slots for a service
export function useAvailableSlots(
    serviceId: string,
    date: string,
    vendorId?: string
) {
    return useSupabaseQuery<BookingSlot[]>(
        async () => {
            let query = supabase
                .from('availability_slots')
                .select('*')
                .eq('service_catalog_id', serviceId)
                .eq('slot_date', date)
                .eq('is_available', true);

            if (vendorId) {
                query = query.eq('vendor_id', vendorId);
            }

            const { data, error } = await query.order('start_time', { ascending: true });

            return { data: data || [], error };
        },
        [serviceId, date, vendorId]
    );
}

// Hook to create a booking
export function useCreateBooking() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createBooking = async (
        userId: string,
        input: CreateBookingInput
    ): Promise<ServiceBooking | null> => {
        setLoading(true);
        setError(null);

        try {
            const { data: booking, error: bookingError } = await supabase
                .from('service_bookings')
                .insert({
                    profile_id: userId,
                    service_catalog_id: input.service_catalog_id,
                    vendor_id: input.vendor_id,
                    booking_date: input.booking_date,
                    booking_time: input.booking_time,
                    slot_id: input.slot_id,
                    booked_for_id: input.booked_for_id,
                    notes: input.notes,
                    fulfillment_status: 'pending',
                })
                .select()
                .single();

            if (bookingError) {
                throw new Error(bookingError.message);
            }

            return booking as ServiceBooking;
        } catch (err: any) {
            console.error('Error creating booking:', err);
            setError(err.message || 'Failed to create booking');
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { createBooking, loading, error };
}

// Hook to cancel a booking
export function useCancelBooking() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const cancelBooking = async (
        bookingId: string,
        reason?: string
    ): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            const { error: updateError } = await supabase
                .from('service_bookings')
                .update({
                    fulfillment_status: 'cancelled',
                    notes: reason ? `Cancelled: ${reason}` : undefined,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', bookingId);

            if (updateError) {
                throw new Error(updateError.message);
            }

            return true;
        } catch (err: any) {
            console.error('Error cancelling booking:', err);
            setError(err.message || 'Failed to cancel booking');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { cancelBooking, loading, error };
}

// Hook to reschedule a booking
export function useRescheduleBooking() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const rescheduleBooking = async (
        bookingId: string,
        newDate: string,
        newTime?: string,
        newSlotId?: string
    ): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            const { error: updateError } = await supabase
                .from('service_bookings')
                .update({
                    booking_date: newDate,
                    booking_time: newTime,
                    slot_id: newSlotId,
                    fulfillment_status: 'pending',
                    updated_at: new Date().toISOString(),
                })
                .eq('id', bookingId);

            if (updateError) {
                throw new Error(updateError.message);
            }

            return true;
        } catch (err: any) {
            console.error('Error rescheduling booking:', err);
            setError(err.message || 'Failed to reschedule booking');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { rescheduleBooking, loading, error };
}

// Hook for doctor-specific booking
export function useDoctorBooking() {
    const { createBooking, loading, error } = useCreateBooking();

    const bookDoctorAppointment = async (
        userId: string,
        serviceCatalogId: string,
        date: string,
        time: string,
        consultationType: 'clinic' | 'video' | 'home',
        bookedForId?: string,
        notes?: string
    ) => {
        return createBooking(userId, {
            service_catalog_id: serviceCatalogId,
            booking_date: date,
            booking_time: time,
            booked_for_id: bookedForId,
            notes: notes ? `${consultationType}: ${notes}` : consultationType,
        });
    };

    return { bookDoctorAppointment, loading, error };
}

// Hook for lab test booking
export function useLabTestBooking() {
    const { createBooking, loading, error } = useCreateBooking();

    const bookLabTest = async (
        userId: string,
        serviceCatalogId: string,
        vendorId: string,
        date: string,
        time: string,
        collectionType: 'home' | 'center',
        bookedForId?: string
    ) => {
        return createBooking(userId, {
            service_catalog_id: serviceCatalogId,
            vendor_id: vendorId,
            booking_date: date,
            booking_time: time,
            booked_for_id: bookedForId,
            notes: `Collection: ${collectionType}`,
        });
    };

    return { bookLabTest, loading, error };
}

// Hook for scan booking
export function useScanBooking() {
    const { createBooking, loading, error } = useCreateBooking();

    const bookScan = async (
        userId: string,
        serviceCatalogId: string,
        centerId: string,
        date: string,
        time: string,
        bookedForId?: string,
        notes?: string
    ) => {
        return createBooking(userId, {
            service_catalog_id: serviceCatalogId,
            vendor_id: centerId,
            booking_date: date,
            booking_time: time,
            booked_for_id: bookedForId,
            notes,
        });
    };

    return { bookScan, loading, error };
}

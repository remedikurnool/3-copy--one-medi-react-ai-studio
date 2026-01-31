
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BookingState {
    service: any | null; // Generic service object (Home Care, Doctor, etc.)
    plan: any | null;    // Selected plan or variant
    slot: {
        date: string;
        time: string;
    } | null;
    preferences: any | null;
    isHomeVisit: boolean;

    // Actions
    setBookingDraft: (data: Partial<BookingState>) => void;
    clearBookingDraft: () => void;
}

export const useBookingStore = create<BookingState>()(
    persist(
        (set) => ({
            service: null,
            plan: null,
            slot: null,
            preferences: null,
            isHomeVisit: false,

            setBookingDraft: (data) => set((state) => ({ ...state, ...data })),
            clearBookingDraft: () => set({ service: null, plan: null, slot: null, preferences: null, isHomeVisit: false }),
        }),
        {
            name: 'booking-draft-storage',
        }
    )
);

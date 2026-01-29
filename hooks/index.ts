// Re-export all hooks
export { useSupabaseQuery, useSupabaseRecord, useSupabaseList } from './useSupabaseQuery';
export { useMedicines, useMedicine, useMedicineSearch, useMedicineInventory, useMedicinesByCategory } from './useMedicines';
export { useDoctors, useDoctor, useDoctorsBySpecialty, useDoctorSearch, useDoctorSpecialties, useDoctorAvailability } from './useDoctors';
export { useLabTests, useLabTest, useLabTestsByCategory, useLabTestSearch, useLabTestPricing, useLabTestCategories } from './useLabTests';
export { useScans, useScan, useScansByModality, useScansByBodyPart, useScanSearch, useScanPricing, useScanModalities } from './useScans';
export { useOrders, useOrder, createOrder, updateOrderStatus, updatePaymentStatus } from './useOrders';

// Phase 7: UI Configuration
export { useMenu, useMenus, useCarousel, useCarouselsByPlacement, useFeatureFlag, useFeatureFlags, usePromoBanners, useHeroCarousel } from './useUIConfig';

// Phase 8: Bookings
export {
    useBookings,
    useBooking,
    useBookingsByStatus,
    useActiveBookings,
    useAvailableSlots,
    useCreateBooking,
    useCancelBooking,
    useRescheduleBooking,
    useDoctorBooking,
    useLabTestBooking,
    useScanBooking
} from './useBookings';

// Phase 9: Vendors
export {
    useVendors,
    useVendor,
    useVendorsByCity,
    usePharmacies,
    useLabs,
    useDiagnosticCenters,
    useVendorPricing,
    useMedicineInventoryFromVendors,
    useBestMedicinePrice,
    useLabTestPricingFromVendors,
    useScanPricingFromCenters,
    useVendorSearch
} from './useVendors';

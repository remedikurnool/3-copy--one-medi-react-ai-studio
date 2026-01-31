// ==============================================================
// HOOKS INDEX
// Re-export all hooks from their respective modules
// ==============================================================

// Core Query Utilities
export { useSupabaseQuery, useSupabaseRecord, useSupabaseList } from './useSupabaseQuery';

// UI Configuration
export {
    useMenu,
    useMenus,
    useCarousel,
    useCarouselsByPlacement,
    useFeatureFlag,
    useFeatureFlags,
    usePromoBanners,
    useHeroCarousel
} from './useUIConfig';

// Bookings
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

// Vendors
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

// Hospitals & Blood Banks
export {
    useHospitals,
    useHospital,
    useHospitalSearch,
    useBloodBanks,
    useBloodBank
} from './useHospitals';

// Services (Home Care, Physio, Surgery, etc.)
export type { ServiceMaster } from './useServices';
export {
    useServicesByCategory,
    useService,
    useServiceSearch,
    useHomeCareServices,
    usePhysiotherapyServices,
    useAmbulanceServices,
    useSurgeryPackages,
    useDiabetesPrograms,
    useWellnessPlans,
    useSkinHairTreatments,
    useMotherBabyServices,
    useHomeVisitServices
} from './useServices';

// Insurance Plans
export type { InsurancePlan } from './useInsurance';
export {
    useInsurancePlans,
    useInsurancePlansByType,
    useInsurancePlan,
    useInsurancePlanTypes
} from './useInsurance';


// Health Content (Articles & Videos)
export type { HealthContent } from './useContent';
export {
    useHealthContent,
    useHealthContentByType,
    useHealthContentByCategory,
    useHealthContentBySlug,
    useHealthContentById,
    useHealthContentSearch,
    useHealthContentCategories
} from './useContent';

// Medicines
export type { Medicine } from '../types';
export {
    useMedicines,
    useMedicine,
    useMedicineSearch
} from './useMedicines';

// Doctors (Profiles)
export type { Doctor } from '../types';
export {
    useDoctors,
    useDoctor,
    useDoctorSearch
} from './useDoctors';

// Lab Tests (Master)
export type { LabTest } from '../types';
export {
    useLabTests,
    useLabTest,
    useLabTestSearch
} from './useLabTests';

// Medical Scans
export type { MedicalScan } from '../types';
export {
    useMedicalScans,
    useMedicalScan,
    useScanSearch
} from './useMedicalScans';

// Orders & Coupons
export {
    useCreateOrder,
    useCoupon,
    useUploadPrescription,
    useMyOrders,
    useOrderDetails
} from './useOrders';

// Realtime & Notifications
export {
    useRealtimeOrders,
    useRealtimeSlots,
    useNotificationPermission,
    useBookingReminders,
    requestNotificationPermission,
    showNotification
} from './useRealtime';

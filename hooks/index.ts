// Re-export all hooks
export { useSupabaseQuery, useSupabaseRecord, useSupabaseList } from './useSupabaseQuery';
export { useMedicines, useMedicine, useMedicineSearch, useMedicineInventory, useMedicinesByCategory } from './useMedicines';
export { useDoctors, useDoctor, useDoctorsBySpecialty, useDoctorSearch, useDoctorSpecialties, useDoctorAvailability } from './useDoctors';
export { useLabTests, useLabTest, useLabTestsByCategory, useLabTestSearch, useLabTestPricing, useLabTestCategories } from './useLabTests';
export { useScans, useScan, useScansByModality, useScansByBodyPart, useScanSearch, useScanPricing, useScanModalities } from './useScans';
export { useOrders, useOrder, createOrder, updateOrderStatus, updatePaymentStatus } from './useOrders';

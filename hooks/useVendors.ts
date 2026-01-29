import { useSupabaseList, useSupabaseRecord, useSupabaseQuery } from './useSupabaseQuery';
import { supabase } from '../lib/supabase';

// Types based on Supabase schema
export interface Vendor {
    id: string;
    name: string;
    vendor_type: 'pharmacy' | 'lab' | 'diagnostic_center' | 'hospital' | 'clinic' | 'ambulance_provider' | 'home_care';
    license_number?: string;
    city_id: string;
    address: string;
    latitude?: number;
    longitude?: number;
    phone?: string;
    email?: string;
    logo_url?: string;
    opening_hours?: Record<string, any>;
    is_active: boolean;
    is_verified: boolean;
    rating?: number;
    total_ratings?: number;
    created_at: string;
}

export interface VendorPricing {
    id: string;
    vendor_id: string;
    service_catalog_id: string;
    mrp: number;
    selling_price: number;
    discount_percentage?: number;
    is_available: boolean;
    stock_quantity?: number;
    lead_time_hours?: number;
    delivery_available: boolean;
    pickup_available: boolean;
    home_collection_available: boolean;
    home_collection_fee?: number;
    vendor?: Vendor;
}

export interface MedicineInventory {
    id: string;
    vendor_id: string;
    medicine_id: string;
    batch_number?: string;
    expiry_date?: string;
    mrp: number;
    selling_price: number;
    stock_quantity: number;
    is_available: boolean;
    vendor?: Vendor;
}

// Hook to fetch all vendors
export function useVendors(vendorType?: Vendor['vendor_type']) {
    return useSupabaseList<Vendor>('vendors', {
        filters: vendorType ? { vendor_type: vendorType, is_active: true } : { is_active: true },
        orderBy: { column: 'name', ascending: true },
    });
}

// Hook to fetch a single vendor
export function useVendor(vendorId: string | undefined) {
    return useSupabaseRecord<Vendor>('vendors', vendorId);
}

// Hook to fetch vendors by city
export function useVendorsByCity(cityId: string, vendorType?: Vendor['vendor_type']) {
    return useSupabaseList<Vendor>('vendors', {
        filters: {
            city_id: cityId,
            is_active: true,
            ...(vendorType ? { vendor_type: vendorType } : {}),
        },
        orderBy: { column: 'name', ascending: true },
    });
}

// Hook to fetch pharmacies
export function usePharmacies(cityId?: string) {
    return useSupabaseList<Vendor>('vendors', {
        filters: {
            vendor_type: 'pharmacy',
            is_active: true,
            ...(cityId ? { city_id: cityId } : {}),
        },
        orderBy: { column: 'name', ascending: true },
    });
}

// Hook to fetch labs
export function useLabs(cityId?: string) {
    return useSupabaseList<Vendor>('vendors', {
        filters: {
            vendor_type: 'lab',
            is_active: true,
            ...(cityId ? { city_id: cityId } : {}),
        },
        orderBy: { column: 'name', ascending: true },
    });
}

// Hook to fetch diagnostic centers
export function useDiagnosticCenters(cityId?: string) {
    return useSupabaseList<Vendor>('vendors', {
        filters: {
            vendor_type: 'diagnostic_center',
            is_active: true,
            ...(cityId ? { city_id: cityId } : {}),
        },
        orderBy: { column: 'name', ascending: true },
    });
}

// Hook to fetch vendor pricing for a service
export function useVendorPricing(serviceCatalogId: string | undefined) {
    return useSupabaseQuery<VendorPricing[]>(
        async () => {
            if (!serviceCatalogId) return { data: [], error: null };

            const { data, error } = await supabase
                .from('vendor_pricing')
                .select(`
          *,
          vendor:vendors(id, name, logo_url, address, phone)
        `)
                .eq('service_catalog_id', serviceCatalogId)
                .eq('is_available', true)
                .order('selling_price', { ascending: true });

            return { data: (data as VendorPricing[]) || [], error };
        },
        [serviceCatalogId]
    );
}

// Hook to fetch medicine inventory from vendors
export function useMedicineInventoryFromVendors(medicineId: string | undefined) {
    return useSupabaseQuery<MedicineInventory[]>(
        async () => {
            if (!medicineId) return { data: [], error: null };

            const { data, error } = await supabase
                .from('medicine_inventory')
                .select(`
          *,
          vendor:vendors(id, name, logo_url, address, phone)
        `)
                .eq('medicine_id', medicineId)
                .eq('is_available', true)
                .gt('stock_quantity', 0)
                .order('selling_price', { ascending: true });

            return { data: (data as MedicineInventory[]) || [], error };
        },
        [medicineId]
    );
}

// Hook to get best price for a medicine
export function useBestMedicinePrice(medicineId: string | undefined) {
    return useSupabaseQuery<MedicineInventory | null>(
        async () => {
            if (!medicineId) return { data: null, error: null };

            const { data, error } = await supabase
                .from('medicine_inventory')
                .select(`
          *,
          vendor:vendors(id, name, logo_url, address)
        `)
                .eq('medicine_id', medicineId)
                .eq('is_available', true)
                .gt('stock_quantity', 0)
                .order('selling_price', { ascending: true })
                .limit(1)
                .single();

            return { data: data as MedicineInventory | null, error };
        },
        [medicineId]
    );
}

// Hook to fetch lab test pricing from vendors
export function useLabTestPricingFromVendors(testId: string | undefined) {
    return useSupabaseQuery<VendorPricing[]>(
        async () => {
            if (!testId) return { data: [], error: null };

            // First get the service catalog entry for this lab test
            const { data: catalogEntry } = await supabase
                .from('service_catalog')
                .select('id')
                .eq('reference_id', testId)
                .eq('service_type', 'lab_test')
                .single();

            if (!catalogEntry) return { data: [], error: null };

            const { data, error } = await supabase
                .from('vendor_pricing')
                .select(`
          *,
          vendor:vendors(id, name, logo_url, address, phone)
        `)
                .eq('service_catalog_id', catalogEntry.id)
                .eq('is_available', true)
                .order('selling_price', { ascending: true });

            return { data: (data as VendorPricing[]) || [], error };
        },
        [testId]
    );
}

// Hook to fetch scan pricing from centers
export function useScanPricingFromCenters(scanId: string | undefined) {
    return useSupabaseQuery<VendorPricing[]>(
        async () => {
            if (!scanId) return { data: [], error: null };

            // First get the service catalog entry for this scan
            const { data: catalogEntry } = await supabase
                .from('service_catalog')
                .select('id')
                .eq('reference_id', scanId)
                .eq('service_type', 'scan')
                .single();

            if (!catalogEntry) return { data: [], error: null };

            const { data, error } = await supabase
                .from('vendor_pricing')
                .select(`
          *,
          vendor:vendors(id, name, logo_url, address, phone)
        `)
                .eq('service_catalog_id', catalogEntry.id)
                .eq('is_available', true)
                .order('selling_price', { ascending: true });

            return { data: (data as VendorPricing[]) || [], error };
        },
        [scanId]
    );
}

// Hook to search vendors
export function useVendorSearch(query: string, vendorType?: Vendor['vendor_type']) {
    return useSupabaseQuery<Vendor[]>(
        async () => {
            if (!query || query.length < 2) return { data: [], error: null };

            let queryBuilder = supabase
                .from('vendors')
                .select('*')
                .eq('is_active', true)
                .ilike('name', `%${query}%`);

            if (vendorType) {
                queryBuilder = queryBuilder.eq('vendor_type', vendorType);
            }

            const { data, error } = await queryBuilder
                .order('name', { ascending: true })
                .limit(20);

            return { data: (data as Vendor[]) || [], error };
        },
        [query, vendorType]
    );
}

// Re-export everything from submodules
export { supabase, getCurrentUser, getCurrentSession } from './client';
export {
    signInWithOTP,
    verifyOTP,
    signInWithGoogle,
    signOut,
    getUser,
    onAuthStateChange,
    ensureProfile
} from './auth';
export type {
    Database,
    Tables,
    InsertTables,
    UpdateTables,
    Medicine,
    Doctor,
    LabTest,
    Scan,
    Profile,
    Address,
    FamilyMember,
    Order,
    OrderItem,
    Cart,
    CartItem,
    Vendor,
    VendorLocation,
    MedicineInventory,
    InsurancePlan,
    ServiceBooking
} from './types';

// Import supabase for globalSearch
import { supabase } from './client';

// Global Search function for unified search
export async function globalSearch(query: string) {
    const searchTerm = `%${query}%`;

    const [medicinesResult, doctorsResult, labsResult] = await Promise.all([
        // Search medicines
        supabase
            .from('medicine_master')
            .select('id, name, generic_name, manufacturer, pack_size, form, image_url, prescription_required')
            .or(`name.ilike.${searchTerm},generic_name.ilike.${searchTerm}`)
            .eq('is_active', true)
            .limit(5),

        // Search doctors
        supabase
            .from('doctors')
            .select('id, name, specialty, experience_years, rating, image_url, consultation_fee')
            .or(`name.ilike.${searchTerm},specialty.ilike.${searchTerm}`)
            .eq('is_active', true)
            .limit(5),

        // Search lab tests
        supabase
            .from('lab_test_master')
            .select('id, name, category, report_time_hours, parameters, image_url')
            .or(`name.ilike.${searchTerm},category.ilike.${searchTerm}`)
            .eq('is_active', true)
            .limit(5),
    ]);

    // Transform medicines for frontend
    const medicines = (medicinesResult.data || []).map(med => ({
        id: med.id,
        name: med.name,
        composition: med.generic_name || '',
        image: med.image_url || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=200&q=80',
        price: 99,
        discount: '15%',
        indications: [],
        prescriptionRequired: med.prescription_required || false,
    }));

    // Transform doctors for frontend
    const doctors = (doctorsResult.data || []).map(doc => ({
        id: doc.id,
        name: doc.name,
        specialty: doc.specialty,
        experience: `${doc.experience_years || 0}+ years`,
        rating: doc.rating || 4.5,
        image: doc.image_url || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&q=80',
        fee: doc.consultation_fee || 500,
    }));

    // Transform lab tests for frontend
    const labs = (labsResult.data || []).map(lab => ({
        id: lab.id,
        name: lab.name,
        parameterCount: lab.parameters?.length || 1,
        reportTime: `${lab.report_time_hours || 24}h`,
        price: 999,
        image: lab.image_url || 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=200&q=80',
    }));

    return { medicines, doctors, labs };
}

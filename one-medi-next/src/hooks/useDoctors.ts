import { Doctor } from '@/types';
import { DOCTORS } from '@/data/doctor-content';

// Hook to fetch all doctors
export function useDoctors(limit?: number) {
    // Return mock data
    const data = limit ? DOCTORS.slice(0, limit) : DOCTORS;
    return { data, loading: false, error: null };
}

// Hook to fetch a single doctor
export function useDoctor(id: string | undefined) {
    if (!id) return { data: null, loading: false, error: null };
    const doctor = DOCTORS.find(d => d.id === id) || null;
    return { data: doctor, loading: false, error: null };
}

// Hook to search doctors
export function useDoctorSearch(query: string) {
    if (!query || query.length < 2) return { data: [], loading: false, error: null };

    const lowerQuery = query.toLowerCase();
    const data = DOCTORS.filter(d =>
        d.name.toLowerCase().includes(lowerQuery) ||
        d.specialization.toLowerCase().includes(lowerQuery) ||
        d.qualification.toLowerCase().includes(lowerQuery)
    );

    return { data, loading: false, error: null };
}

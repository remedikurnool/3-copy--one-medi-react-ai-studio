
import {
  Hospital, VaccinationRecord, VendorInfo, VendorId
} from './types/index';

// ==============================================================
// LOCAL VENDOR CONFIG (UI display data)
// ==============================================================
export const LOCAL_VENDORS: Record<string, VendorInfo> = {
  apollo_kurnool: {
    name: 'Apollo Pharmacy, RS Road',
    location: 'RS Road, Kurnool',
    image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=100',
    type: 'Pharmacy'
  },
  medplus_ccamp: {
    name: 'MedPlus, C-Camp Circle',
    location: 'C-Camp, Kurnool',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?auto=format&fit=crop&q=80&w=100',
    type: 'Pharmacy'
  },
  vijaya_diagnostics: {
    name: 'Vijaya Diagnostic Center',
    location: 'Gayathri Estate, Kurnool',
    image: 'https://images.unsplash.com/photo-1579152276506-44439679bb4c?auto=format&fit=crop&q=80&w=100',
    type: 'Lab'
  }
};

// ==============================================================
// HOSPITAL EXTENDED TYPE (UI-specific extension)
// ==============================================================
export interface DetailedHospital extends Hospital {
  about: string;
  departments: string[];
  totalBeds: number;
  totalDoctors: number;
  yearEstablished: number;
  emergencyNumber: string;
  accreditations: string[];
  insurancePartners: string[];
}

// ==============================================================
// VACCINATION SCHEDULE (Static clinical reference)
// ==============================================================
export const VACCINATION_SCHEDULE: VaccinationRecord[] = [
  { id: 'v1', vaccine: 'BCG', age: 'At Birth', protectsAgainst: 'Tuberculosis', status: 'completed' },
  { id: 'v2', vaccine: 'Hepatitis B', age: 'At Birth', protectsAgainst: 'Hepatitis B', status: 'completed' },
  { id: 'v3', vaccine: 'OPV 1', age: '6 Weeks', protectsAgainst: 'Polio', status: 'pending', dueDate: '15 Oct' }
];

// ==============================================================
// SURGERY UI CONFIG
// ==============================================================
export const SURGERY_TYPES = [
  { id: 's1', name: 'Appendectomy' },
  { id: 's2', name: 'Cataract Surgery' },
  { id: 's3', name: 'Knee Replacement' }
];

export const SURGERY_SPECIALTIES = [
  { id: 'all', label: 'All', icon: 'grid_view' },
  { id: 'Orthopedics', label: 'Ortho', icon: 'accessibility' },
  { id: 'Gynecology', label: 'Gynae', icon: 'female' }
];

// ==============================================================
// ICU / NURSE RATE CONFIG
// ==============================================================
export const ICU_EQUIPMENT_RATES = { ventilator: 2500, monitor: 500, oxygen: 300, hospitalBed: 400, syringePump: 200 };
export const NURSE_RATES = { icu: 1500, general: 1000 };

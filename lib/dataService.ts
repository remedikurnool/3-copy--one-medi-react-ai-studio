import * as constants from '../constants';
import { Medicine, LabTest, MedicalScan, Doctor, HomeCareService, DiabetesProgram, Hospital, SurgeryPackage } from '../types';

/**
 * DataService abstracts the source of data for the application.
 * Currently it pulls from constants.ts, but is designed to be
 * easily swapped with a real API or Supabase client for enterprise readiness.
 */

// Simulated delay to mimic API latency
const API_DELAY = 100;
const simulateApi = <T>(data: T): Promise<T> =>
    new Promise((resolve) => setTimeout(() => resolve(data), API_DELAY));

export const dataService = {
    // Medicines
    getMedicines: () => simulateApi(constants.MEDICINES),
    getMedicineById: (id: string) =>
        simulateApi(constants.MEDICINES.find(m => m.id === id)),

    // Doctors
    getDoctors: () => simulateApi(constants.DOCTORS),
    getDoctorById: (id: string) =>
        simulateApi(constants.DOCTORS.find(d => d.id === id)),

    // Lab Tests
    getLabTests: () => simulateApi(constants.LAB_TESTS),
    getLabTestById: (id: string) =>
        simulateApi(constants.LAB_TESTS.find(l => l.id === id)),

    // Scans
    getScans: () => simulateApi(constants.MEDICAL_SCANS),
    getScanById: (id: string) =>
        simulateApi(constants.MEDICAL_SCANS.find(s => s.id === id)),

    // Hospitals
    getHospitals: () => simulateApi(constants.HOSPITALS),
    getHospitalById: (id: string) =>
        simulateApi(constants.HOSPITALS.find(h => h.id === id)),

    // Home Care
    getHomeCareServices: () => simulateApi(constants.HOME_CARE_SERVICES),
    getHomeCareById: (id: string) =>
        simulateApi(constants.HOME_CARE_SERVICES.find(h => h.id === id)),

    // Physio
    getPhysioServices: () => simulateApi(constants.PHYSIO_SERVICES),

    // New features
    getInsurancePlans: () => simulateApi(constants.INSURANCE_PLANS),
    getSurgeryPackages: () => simulateApi(constants.SURGERY_PACKAGES),
    getBloodBanks: () => simulateApi(constants.BLOOD_BANKS),
};

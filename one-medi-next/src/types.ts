
// ==============================================================
// LEGACY TYPES - REDIRECTING TO SRC/TYPES/INDEX.TS
// ==============================================================

// CORE MODELS
export type {
  Medicine,
  LabTest,
  Scan,
  Doctor,
  VendorId,
  Status
} from './types/index';

// SPECIALIZED MODELS
export type {
  HomeCareService,
  DiabetesProgram,
  WellnessPlan,
  HealthArticle,
  VaccinationRecord,
  SurgeryPackage,
  MotherBabyPackage,
  SkinTreatment
} from './types/index';

// AUXILIARY MODELS
export type {
  Hospital,
  BloodBank,
  AmbulanceService,
  InsurancePlan,
  VendorInfo,
  Product
} from './types/index';

// LEGACY SHIM FOR MEDICAL SCAN (Standardized to Scan)
export type { Scan as MedicalScan } from './types/index';

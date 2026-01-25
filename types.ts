export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  category: string;
  price: number;
  mrp: number;
  discount: string;
  image: string;
  packSize: string;
  prescriptionRequired: boolean;
  manufacturer: string;
  composition: string;
  dosageForm: string;
  therapeuticClass: string;
  indications: string[];
  dosageInstructions: string;
  routeOfAdministration: string;
  sideEffects: string[];
  warnings: string[];
  safetyAdvice: {
    pregnancy: string;
    alcohol: string;
    driving: string;
  };
  variants: {
    id: string;
    packSize: string;
    sellingPrice: number;
    mrp: number;
  }[];
}

export interface LabTest {
  id: string;
  name: string;
  category: string;
  price: number;
  mrp: number;
  discount: string;
  parameterCount: number;
  reportTime: string;
  description: string;
  preparationInstructions: string;
  parameters: string[];
  sampleType?: string;
  fastingRequired?: boolean;
  department?: string;
  variants?: {
    centerId: string;
    centerName: string;
    centerImage: string;
    distance: string;
    rating: number;
    reportTime: string;
    price: number;
    mrp: number;
    nextSlot: string;
    nabl?: boolean;
  }[];
}

export interface MedicalScan {
  id: string;
  name: string;
  category: string;
  bodyPart: string;
  price: number;
  mrp: number;
  discount: string;
  image: string;
  description: string;
  scanDuration: string;
  contrastRequired: boolean;
  preparationNotes: string;
  variants: {
    centerId: string;
    centerName: string;
    centerImage: string;
    distance: string;
    price: number;
    mrp: number;
    nextSlot: string;
    nabl: boolean;
    rating?: number;
    reportTime?: string;
  }[];
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  experience: string;
  hospital: string;
  location: string;
  fee: number;
  rating: number;
  image: string;
  about?: string;
  registrationNumber?: string;
  hospitalAffiliation?: string;
  languages?: string[];
  variants?: {
    type: string;
    icon: string;
    price: number;
    duration: string;
    nextSlot: string;
  }[];
}

export interface HomeCareService {
  id: string;
  title: string;
  category: string;
  subCategory?: string;
  type?: string;
  description: string;
  image: string;
  rating: number;
  price: number;
  priceUnit: string;
  visitDuration?: string;
  homeVisitAvailable?: boolean;
  homeVisitFee?: number;
  genderPreferenceAvailable?: boolean;
  staffQualification?: string;
  equipmentRequired?: boolean;
  features?: string[];
  reviews?: number;
  whatsappBooking?: boolean;
  localTitle?: string;
  isVerified?: boolean;
  plans?: {
    id: string;
    name: string;
    title?: string;
    duration: string;
    price: number;
    originalPrice?: number;
    savings?: number;
    type?: string; // Rental or Purchase
    label?: string;
  }[];
  conditions?: string[];
}

export interface DiabetesProgram {
  id: string;
  title: string;
  description: string;
  diabetesType?: string;
  careLevel?: string;
  duration: string;
  monitoringFrequency: string;
  supportChannel: string;
  includedServices: string[];
  pricing: {
    mrp: number;
    offerPrice: number;
    billingCycle: string;
  };
  isPopular?: boolean;
}

export interface Hospital {
  id: string;
  name: string;
  type: string;
  location: string;
  distance: string;
  rating: number;
  reviews: number;
  image: string;
  facilities: string[];
  open24x7: boolean;
  insuranceAccepted: boolean;
}

export interface BloodBank {
  id: string;
  name: string;
  location: string;
  distance: string;
  phone: string;
  availableGroups: string[];
  isOpen: boolean;
  address: string;
  contactPhone: string;
  isOpen24x7: boolean;
}

export interface AmbulanceService {
  id: string;
  type: string;
  baseCharge: number;
  pricePerKm: number;
  image: string;
  equipment: string[];
  responseTime: string;
}

export interface InsurancePlan {
  id: string;
  planName: string;
  provider: string;
  logo: string;
  category: string;
  coverAmount: number;
  premium: number;
  monthlyEmi?: number;
  cashless: boolean;
  networkHospitals: number;
  claimSettlementRatio: string;
  features: string[];
  copay?: string;
  waitingPeriod?: string;
}

export interface SurgeryPackage {
  id: string;
  procedureName: string;
  category: string;
  approxCost: string;
  hospital: string;
  image: string;
  recoveryTime: string;
  stayDuration: string;
  description?: string;
  inclusions?: string[];
  symptoms?: string[];
  risks?: string[];
  procedure?: string;
  department?: string;
}

export interface MotherBabyPackage {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  features: string[];
  mrp: number;
  price: number;
  image: string;
}

export interface SkinTreatment {
  id: string;
  name: string;
  concern: string;
  clinic: string;
  image: string;
  technologyUsed: string;
  sessionsRequired: string;
  downtime: string;
  price: number;
  rating: number;
  treatment: string;
}

export interface WellnessPlan {
  id: string;
  title: string;
  category: string;
  duration: string;
  price: number;
  expertName: string;
  image: string;
  consultations: number;
  dietChartFrequency: string;
  expert: string;
}

export interface HealthArticle {
  id: string;
  title: string;
  category: string;
  readTime?: string;
  videoDuration?: string;
  summary: string;
  image: string;
  author: string;
  authorRole?: string;
  publishDate: string;
  isFeatured?: boolean;
  type: 'article' | 'video';
}

export interface VaccinationRecord {
  id: string;
  vaccine: string;
  age: string;
  protectsAgainst: string;
  status: 'completed' | 'pending';
  dueDate?: string;
}
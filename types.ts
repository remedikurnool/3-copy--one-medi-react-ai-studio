
export interface ConsultationVariant {
  type: 'Clinic Visit' | 'Video Consult' | 'Home Visit';
  price: number;
  duration: string;
  available: boolean;
  nextSlot: string;
  icon: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  experience: string;
  languages: string[];
  rating: number;
  reviews: number;
  fee: number;
  image: string;
  available: boolean;
  hospital?: string;
  location?: string;
  about?: string;
  variants?: ConsultationVariant[];
}

export interface Medicine {
  id: string;
  name: string;
  category: string;
  manufacturer: string;
  packSize: string;
  price: number;
  mrp: number;
  image: string;
  discount?: string;
  deliveryTime?: string;
  isPrescriptionRequired?: boolean;
  description?: string;
  uses?: string[];
  sideEffects?: string[];
}

export interface TestVariant {
  centerId: string;
  centerName: string;
  centerImage: string;
  price: number;
  mrp: number;
  reportTime: string;
  rating: number;
  nabl: boolean;
  distance?: string;
  nextSlot?: string;
}

export interface LabTest {
  id: string;
  name: string;
  parameterCount: number;
  description: string;
  price: number;
  mrp: number;
  discount: string;
  tags?: string[];
  category?: string;
  reportTime?: string;
  fasting?: string;
  variants?: TestVariant[];
}

export interface MedicalScan {
  id: string;
  name: string;
  category: string;
  description: string;
  bodyPart: string;
  price: number;
  mrp: number;
  discount: string;
  image: string;
  variants: TestVariant[];
}

export interface ServicePlan {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  duration: string;
  label?: string;
  savings?: number;
}

export interface HomeCareService {
  id: string;
  title: string;
  localTitle?: string;
  category: 'Nursing' | 'Physiotherapy' | 'Doctor Visit' | 'Elderly Care' | 'Lab' | 'Maternal Care';
  description: string;
  price: number;
  priceUnit: string;
  rating: number;
  reviews: number;
  image: string;
  features: string[];
  isVerified?: boolean;
  available?: boolean;
  plans?: ServicePlan[];
  whatsappBooking?: boolean;
}

export interface PhysioService {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  rating: number;
  reviews: number;
  image: string;
  conditions: string[];
  homeVisitAvailable: boolean;
  homeVisitFee?: number;
  plans?: ServicePlan[];
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
  open24x7: boolean;
  insuranceAccepted: boolean;
  specialties: string[];
}

export interface MotherBabyPackage {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  mrp: number;
  image: string;
  features: string[];
  tag?: string;
}

export interface VaccinationRecord {
  id: string;
  age: string;
  vaccine: string;
  protectsAgainst: string;
  status: 'pending' | 'completed' | 'overdue';
  dueDate?: string;
}

export interface HealthArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  image: string;
  summary: string;
  content?: string;
}

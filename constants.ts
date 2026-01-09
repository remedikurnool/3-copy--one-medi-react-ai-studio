
import { Doctor, Medicine, LabTest, MedicalScan, HomeCareService, PhysioService, Hospital, MotherBabyPackage, VaccinationRecord, HealthArticle } from './types';

// --- MEDICINES ---
export const MEDICINES: Medicine[] = [
  {
    id: 'm1',
    name: 'Dolo 650 Tablet',
    category: 'Pain Relief',
    manufacturer: 'Micro Labs Ltd',
    packSize: '15 Tablets',
    price: 30,
    mrp: 35,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600',
    discount: '14% OFF',
    deliveryTime: '2 hours',
    isPrescriptionRequired: false,
    description: 'Relieves pain and fever.',
    uses: ['Fever', 'Headache', 'Muscle pain']
  },
  {
    id: 'm2',
    name: 'Glycomet 500mg',
    category: 'Diabetes',
    manufacturer: 'USV Pvt Ltd',
    packSize: '10 Tablets',
    price: 15,
    mrp: 18,
    image: 'https://images.unsplash.com/photo-1550572017-ed20015dd085?auto=format&fit=crop&q=80&w=600',
    discount: '16% OFF',
    deliveryTime: 'Same Day',
    isPrescriptionRequired: true
  },
  {
    id: 'm4',
    name: 'Himalaya Liv.52 DS',
    category: 'Ayurvedic',
    manufacturer: 'Himalaya Wellness',
    packSize: '60 Tablets',
    price: 175,
    mrp: 195,
    image: 'https://images.unsplash.com/photo-1615485240318-113c0f396ca5?auto=format&fit=crop&q=80&w=600',
    discount: '10% OFF',
    isPrescriptionRequired: false
  },
  {
    id: 'm5',
    name: 'Sebamed Baby Wash',
    category: 'Baby Care',
    manufacturer: 'Sebamed',
    packSize: '200ml',
    price: 450,
    mrp: 499,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600',
    discount: '10% OFF',
    isPrescriptionRequired: false
  },
  {
    id: 'm6',
    name: 'Telma 40 Tablet',
    category: 'Cardiac',
    manufacturer: 'Glenmark Pharma',
    packSize: '15 Tablets',
    price: 120,
    mrp: 145,
    image: 'https://images.unsplash.com/photo-1471864190281-ad5f9f33d6c6?auto=format&fit=crop&q=80&w=600',
    discount: '17% OFF',
    isPrescriptionRequired: true
  }
];

// --- DOCTORS ---
export const DOCTORS: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Ramesh Gupta',
    specialty: 'General Physician',
    qualification: 'MBBS, MD',
    experience: '15 Years',
    languages: ['English', 'Telugu', 'Hindi'],
    rating: 4.8,
    reviews: 1200,
    fee: 500,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    available: true,
    hospital: 'Sunrise Multi-Specialty Hospital',
    variants: [
      { type: 'Clinic Visit', price: 500, duration: '15 min', available: true, nextSlot: 'Today, 10:30 AM', icon: 'apartment' },
      { type: 'Video Consult', price: 400, duration: '10 min', available: true, nextSlot: 'Today, 11:30 AM', icon: 'videocam' }
    ]
  },
  {
    id: 'd2',
    name: 'Dr. Priya Sharma',
    specialty: 'Cardiologist',
    qualification: 'MD, DM (Cardio)',
    experience: '12 Years',
    languages: ['English', 'Hindi'],
    rating: 4.9,
    reviews: 850,
    fee: 800,
    image: 'https://images.unsplash.com/photo-1559839734-2b71f1e3c770?auto=format&fit=crop&q=80&w=400',
    available: true,
    hospital: 'Apollo Clinics, Kurnool',
    variants: [
      { type: 'Clinic Visit', price: 800, duration: '20 min', available: true, nextSlot: 'Tomorrow, 09:00 AM', icon: 'apartment' }
    ]
  },
  {
    id: 'd3',
    name: 'Dr. K. Srinivas',
    specialty: 'Pediatrician',
    qualification: 'DCH, MD (Pediatrics)',
    experience: '8 Years',
    languages: ['Telugu', 'English'],
    rating: 4.7,
    reviews: 420,
    fee: 400,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    available: true,
    hospital: 'Rainbow Children Hospital',
    variants: [
      { type: 'Clinic Visit', price: 400, duration: '15 min', available: true, nextSlot: 'Today, 05:00 PM', icon: 'apartment' }
    ]
  },
  {
    id: 'd4',
    name: 'Dr. Anjali Reddy',
    specialty: 'Dermatologist',
    qualification: 'MD (DVL)',
    experience: '10 Years',
    languages: ['Telugu', 'English', 'Hindi'],
    rating: 4.8,
    reviews: 610,
    fee: 600,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400',
    available: true,
    hospital: 'Derma-Care Kurnool',
    variants: [
      { type: 'Video Consult', price: 500, duration: '15 min', available: true, nextSlot: 'Today, 02:00 PM', icon: 'videocam' }
    ]
  }
];

// --- LAB TESTS ---
export const LAB_TESTS: LabTest[] = [
  {
    id: 'l1',
    name: 'Kurnool Premier Health Check',
    parameterCount: 85,
    description: 'Comprehensive screening covering Heart, Liver, Kidney, Thyroid and Diabetes.',
    price: 1999,
    mrp: 4999,
    discount: '60% OFF',
    category: 'Full Body',
    reportTime: '24 Hours',
    fasting: '10-12 Hours',
    variants: [
      { centerId: 'c1', centerName: 'Kurnool Diagnostic Center', centerImage: 'https://images.unsplash.com/photo-1579152276506-44439679bb4c?auto=format&fit=crop&q=80&w=200', price: 1999, mrp: 4999, reportTime: '24 Hours', rating: 4.5, nabl: true }
    ]
  },
  {
    id: 'l2',
    name: 'PCOD Advanced Profile',
    parameterCount: 12,
    description: 'Hormonal screening for metabolic and reproductive health.',
    price: 1200,
    mrp: 2500,
    discount: '52% OFF',
    category: 'Women Health',
    reportTime: '48 Hours',
    variants: [
      { centerId: 'c2', centerName: 'Rayalaseema Labs', centerImage: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=200', price: 1200, mrp: 2500, reportTime: '48 Hours', rating: 4.7, nabl: true }
    ]
  },
  {
    id: 'l3',
    name: 'Iron Deficiency Screen',
    parameterCount: 3,
    description: 'Checks Iron, Ferritin and TIBC levels.',
    price: 450,
    mrp: 900,
    discount: '50% OFF',
    category: 'Blood',
    reportTime: '12 Hours',
    variants: [
      { centerId: 'c1', centerName: 'Kurnool Diagnostic Center', centerImage: 'https://images.unsplash.com/photo-1579152276506-44439679bb4c?auto=format&fit=crop&q=80&w=200', price: 450, mrp: 900, reportTime: '12 Hours', rating: 4.5, nabl: true }
    ]
  }
];

// --- MEDICAL SCANS ---
export const MEDICAL_SCANS: MedicalScan[] = [
  {
    id: 'ms1',
    name: 'MRI Brain Plain',
    category: 'MRI',
    description: 'High-resolution imaging for neurological assessment.',
    bodyPart: 'Head',
    price: 3500,
    mrp: 4500,
    discount: '22% OFF',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600',
    variants: [
      { centerId: 'c1', centerName: 'Kurnool MRI Center', centerImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=200', price: 3500, mrp: 4500, reportTime: '2 Hours', rating: 4.8, nabl: true }
    ]
  },
  {
    id: 'ms2',
    name: 'USG Pregnancy (Level 2)',
    category: 'Ultrasound',
    description: 'Fetal anatomy survey and growth monitoring.',
    bodyPart: 'Abdomen',
    price: 1500,
    mrp: 2000,
    discount: '25% OFF',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600',
    variants: [
      { centerId: 'c3', centerName: 'Sunrise Scans', centerImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=200', price: 1500, mrp: 2000, reportTime: 'Immediate', rating: 4.6, nabl: true }
    ]
  }
];

// --- HOME CARE & PHYSIO ---
export const HOME_CARE_SERVICES: HomeCareService[] = [
  {
    id: 'hc1',
    title: 'Post-Surgical Nursing',
    category: 'Nursing',
    description: '24/7 or session-based nursing for wound care and monitoring.',
    price: 1500,
    priceUnit: 'Visit',
    rating: 4.8,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600',
    features: ['Wound Dressing', 'Vitals Monitoring', 'Medication Management'],
    isVerified: true,
    available: true
  },
  {
    id: 'hc2',
    title: 'Elderly Companion Care',
    category: 'Elderly Care',
    description: 'Emotional and physical support for seniors at home.',
    price: 12000,
    priceUnit: 'Month',
    rating: 4.9,
    reviews: 85,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=600',
    features: ['Walk Assistance', 'Feeding Support', 'Reminders'],
    isVerified: true
  }
];

export const PHYSIO_SERVICES: PhysioService[] = [
  {
    id: 'ph1',
    title: 'Post-Stroke Rehab',
    description: 'Neuro-physiotherapy to restore movement and speech.',
    price: 800,
    duration: '1 Hour',
    rating: 4.9,
    reviews: 310,
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=600',
    conditions: ['Hemiplegia', 'Muscle Weakness'],
    homeVisitAvailable: true,
    homeVisitFee: 200
  }
];

// --- HOSPITALS ---
export const HOSPITALS: Hospital[] = [
  {
    id: 'h1',
    name: 'Kurnool General Hospital (KGH)',
    type: 'Government Multi-Specialty',
    location: 'KGH Road, Kurnool',
    distance: '1.2 km',
    rating: 4.2,
    reviews: 5000,
    image: 'https://images.unsplash.com/photo-1587350859743-bc4714e0a67f?auto=format&fit=crop&q=80&w=800',
    open24x7: true,
    insuranceAccepted: false,
    specialties: ['Trauma', 'Gynaecology', 'Pediatrics']
  },
  {
    id: 'h2',
    name: 'Sunrise Multi-Specialty Hospital',
    type: 'Private Tertiary Care',
    location: 'Budhawara Peta, Kurnool',
    distance: '2.5 km',
    rating: 4.6,
    reviews: 1200,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    open24x7: true,
    insuranceAccepted: true,
    specialties: ['Cardiology', 'Neurology', 'Orthopedics']
  }
];

// --- MOTHER & BABY ---
export const MOTHER_BABY_SERVICES: HomeCareService[] = [
  {
    id: 'mb_nurse_1',
    title: 'Newborn Care Nursing',
    category: 'Maternal Care',
    description: 'Expert nurses for infant bathing, feeding support, and mother recovery.',
    price: 2500,
    priceUnit: 'Day',
    rating: 4.9,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65ee9?auto=format&fit=crop&q=80&w=600',
    features: ['Infant Hygiene', 'Breastfeeding Guide', 'Stitch Care'],
    isVerified: true
  }
];

export const MOTHER_BABY_PACKAGES: MotherBabyPackage[] = [
  {
    id: 'pkg-9m',
    title: '9-Month Pregnancy Journey',
    subtitle: 'Everything from conception to delivery',
    price: 15999,
    mrp: 24999,
    image: 'https://images.unsplash.com/photo-1559839734-2b71f1e3c770?auto=format&fit=crop&q=80&w=800',
    tag: 'PRE-DELIVERY',
    features: ['8 Lab Tests', '3 Scans', 'Unlimited GP Consults']
  }
];

export const VACCINATION_SCHEDULE: VaccinationRecord[] = [
  { id: 'v1', age: 'At Birth', vaccine: 'BCG, OPV, HepB', protectsAgainst: 'TB, Polio, HepB', status: 'completed' },
  { id: 'v2', age: '6 Weeks', vaccine: 'Pentavalent 1, IPV 1', protectsAgainst: 'Multiple', status: 'pending', dueDate: '15 Oct 2023' }
];

export const CARE_GUIDES: HealthArticle[] = [
  {
    id: 'g1',
    title: 'Diet Tips for Pregnant Women in Kurnool',
    category: 'Pregnancy',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=600',
    summary: 'Focusing on seasonal fruits and local staples like Jonna Rotte.'
  }
];

// --- MISC ---
export const BOOKINGS = [
  {
    id: 'b1',
    type: 'medicine',
    title: 'Dolo 650 Tablet',
    subtitle: 'Order #OD4432',
    status: 'Shipped',
    date: '14 Oct, 2:00 PM',
    amount: 120,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200'
  }
];

export const DIABETES_PACKAGES = [
  {
    id: 'dp1',
    title: 'Rayalaseema Diabetes Screen',
    description: 'HbA1c + Fasting Sugar + Home Visit.',
    price: 499,
    mrp: 800,
    isPopular: true,
    features: ['Home Collection', 'Digital Report', 'Diet Plan']
  }
];

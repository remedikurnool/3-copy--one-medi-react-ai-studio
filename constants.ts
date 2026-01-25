import { 
  Medicine, LabTest, MedicalScan, Doctor, HomeCareService, DiabetesProgram, 
  Hospital, BloodBank, SurgeryPackage, AmbulanceService, InsurancePlan, 
  MotherBabyPackage, SkinTreatment, WellnessPlan, HealthArticle, VaccinationRecord,
  Product, VendorInfo
} from './types';

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

export const HOSPITALS: DetailedHospital[] = [
    {
        id: 'h1',
        name: 'KIMS Hospital',
        type: 'Multi-Specialty',
        location: 'Joharapuram Road, Kurnool',
        distance: '2.5 km',
        rating: 4.5,
        reviews: 1200,
        image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=800',
        facilities: ['24/7 ICU', 'Emergency Care', 'Pharmacy', 'Advanced Lab', 'Blood Bank'],
        open24x7: true,
        insuranceAccepted: true,
        about: 'KIMS Hospital Kurnool is a premier multi-specialty healthcare provider in the Rayalaseema region, equipped with state-of-the-art diagnostic and surgical infrastructure.',
        departments: ['Cardiology', 'Neurology', 'Orthopedics', 'Gastroenterology', 'Pediatrics', 'Oncology'],
        totalBeds: 350,
        totalDoctors: 85,
        yearEstablished: 2004,
        emergencyNumber: '08518-247600',
        accreditations: ['NABH Accredited', 'NABL Certified Lab'],
        insurancePartners: ['Star Health', 'HDFC Ergo', 'ICICI Lombard', 'Religare', 'GIPSA Network']
    }
];

export const MEDICINES: Medicine[] = [
  {
    id: 'm1',
    name: 'Dolo 650mg Tablet',
    genericName: 'Paracetamol',
    category: 'Pain Relief',
    price: 30,
    mrp: 35,
    discount: '14% OFF',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200',
    packSize: '15 Tablets',
    prescriptionRequired: false,
    manufacturer: 'Micro Labs Ltd',
    composition: 'Paracetamol (650mg)',
    dosageForm: 'Tablet',
    therapeuticClass: 'Analgesic',
    indications: ['Fever', 'Headache'],
    dosageInstructions: 'Take after food.',
    routeOfAdministration: 'Oral',
    sideEffects: ['Nausea'],
    warnings: ['Avoid alcohol'],
    safetyAdvice: { pregnancy: 'Safe', alcohol: 'Unsafe', driving: 'Safe' },
    variants: [{ id: 'v1', packSize: '15 Tablets', sellingPrice: 30, mrp: 35 }],
    verifiedByDoctor: 'Dr. Ramesh Gupta'
  },
  {
    id: 'sk_1',
    name: 'Sebogel Salicylic Acid Gel',
    genericName: 'Salicylic Acid + Nicotinamide',
    category: 'Acne Care',
    price: 245,
    mrp: 290,
    discount: '15% OFF',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=200',
    packSize: '30g',
    prescriptionRequired: false,
    manufacturer: 'Ethicare Remedies',
    composition: 'Salicylic Acid 2%, Nicotinamide 6%',
    dosageForm: 'Gel',
    therapeuticClass: 'Anti-acne',
    indications: ['Pimples', 'Blackheads', 'Oily Skin'],
    dosageInstructions: 'Apply on affected areas twice daily.',
    routeOfAdministration: 'Topical',
    sideEffects: ['Dryness', 'Peeling'],
    warnings: ['Avoid eye contact'],
    safetyAdvice: { pregnancy: 'Consult Doctor', alcohol: 'Safe', driving: 'Safe' },
    variants: [{ id: 'v1', packSize: '30g', sellingPrice: 245, mrp: 290 }],
    activeIngredients: ['Salicylic Acid', 'Nicotinamide'],
    doctorRecommended: true,
    brandTrust: 'Dermatologist Preferred'
  },
  {
    id: 'sk_2',
    name: 'La Shield Sunscreen Gel SPF 40',
    genericName: 'Octyl Methoxycinnamate + Titanium Dioxide',
    category: 'Sun Protection',
    price: 650,
    mrp: 790,
    discount: '18% OFF',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=200',
    packSize: '60g',
    prescriptionRequired: false,
    manufacturer: 'Glenmark Pharmaceuticals',
    composition: 'Broad Spectrum Physical & Chemical Filters',
    dosageForm: 'Gel',
    therapeuticClass: 'Sunscreen',
    indications: ['UV Protection', 'Sunburn Prevention'],
    dosageInstructions: 'Apply 20 mins before sun exposure.',
    routeOfAdministration: 'Topical',
    sideEffects: ['None reported'],
    warnings: ['Reapply every 3 hours'],
    safetyAdvice: { pregnancy: 'Safe', alcohol: 'Safe', driving: 'Safe' },
    variants: [{ id: 'v1', packSize: '60g', sellingPrice: 650, mrp: 790 }],
    activeIngredients: ['Titanium Dioxide', 'Zinc Oxide'],
    doctorRecommended: true,
    brandTrust: 'Clinically Tested'
  },
  {
    id: 'sk_3',
    name: 'Kojiglo Forte Cream',
    genericName: 'Kojic Acid + Hydroquinone',
    category: 'Pigmentation/Lightening',
    price: 480,
    mrp: 550,
    discount: '12% OFF',
    image: 'https://images.unsplash.com/photo-1594433030833-21c1ba8667e8?auto=format&fit=crop&q=80&w=200',
    packSize: '20g',
    prescriptionRequired: true,
    manufacturer: 'Alkem Laboratories',
    composition: 'Kojic Acid, Hydroquinone, Glycolic Acid',
    dosageForm: 'Cream',
    therapeuticClass: 'Skin Lightening',
    indications: ['Melasma', 'Dark Spots', 'Hyperpigmentation'],
    dosageInstructions: 'Use at night only.',
    routeOfAdministration: 'Topical',
    sideEffects: ['Redness', 'Itching'],
    warnings: ['Mandatory Sunscreen use'],
    safetyAdvice: { pregnancy: 'Unsafe', alcohol: 'Safe', driving: 'Safe' },
    variants: [{ id: 'v1', packSize: '20g', sellingPrice: 480, mrp: 550 }],
    activeIngredients: ['Kojic Acid', 'Hydroquinone'],
    doctorRecommended: true,
    brandTrust: 'Gold Standard for Melasma'
  },
  {
    id: 'hr_1',
    name: 'Mintop 5% Solution',
    genericName: 'Minoxidil',
    category: 'Hair Loss',
    price: 720,
    mrp: 850,
    discount: '15% OFF',
    image: 'https://images.unsplash.com/photo-1626015448362-daac75a97440?auto=format&fit=crop&q=80&w=200',
    packSize: '60ml',
    prescriptionRequired: true,
    manufacturer: 'Dr. Reddys Laboratories',
    composition: 'Minoxidil 5% w/v',
    dosageForm: 'Solution',
    therapeuticClass: 'Hair Growth Stimulant',
    indications: ['Alopecia', 'Hair Thinning'],
    dosageInstructions: '1ml twice daily on dry scalp.',
    routeOfAdministration: 'Topical',
    sideEffects: ['Scalp irritation'],
    warnings: ['Wash hands after use'],
    safetyAdvice: { pregnancy: 'Unsafe', alcohol: 'Safe', driving: 'Safe' },
    variants: [{ id: 'v1', packSize: '60ml', sellingPrice: 720, mrp: 850 }],
    activeIngredients: ['Minoxidil'],
    doctorRecommended: true,
    brandTrust: 'Top Rated for Regrowth'
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Ramesh Gupta',
    specialty: 'General Physician',
    qualification: 'MBBS, MD',
    experience: '12 Years',
    hospital: 'Sunrise Hospital',
    location: 'Kurnool',
    fee: 500,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200',
    about: 'Senior physician with expertise in viral fevers.',
    registrationNumber: 'APMC-12345',
    languages: ['English', 'Telugu'],
    variants: [
      { type: 'Clinic Visit', icon: 'apartment', price: 500, duration: '15 min', nextSlot: 'Tomorrow, 10:00 AM' }
    ]
  },
  {
    id: 'd_skin_1',
    name: 'Dr. Ramya Reddy',
    specialty: 'Dermatologist',
    qualification: 'MBBS, MD (DVL)',
    experience: '10 Years',
    hospital: 'Remedi Clinic',
    location: 'Kurnool',
    fee: 600,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1559839734-2b71f1e3c770?auto=format&fit=crop&q=80&w=200',
    about: 'Specialist in aesthetic dermatology, laser procedures, and clinical skin conditions.',
    registrationNumber: 'APMC-67890',
    languages: ['English', 'Telugu', 'Hindi'],
    variants: [
      { type: 'Clinic Visit', icon: 'apartment', price: 600, duration: '20 min', nextSlot: 'Today, 05:00 PM' }
    ]
  }
];

export const SKIN_HAIR_SERVICES: SkinTreatment[] = [
  {
    id: 'st1',
    name: 'Laser Hair Reduction',
    concern: 'Unwanted Hair',
    clinic: 'Remedi Clinic',
    image: 'https://images.unsplash.com/photo-1559599141-3816a0b721e4?auto=format&fit=crop&q=80&w=400',
    technologyUsed: 'Triple Wavelength Diode Laser',
    sessionsRequired: '6-8 Sessions',
    downtime: 'None',
    price: 2500,
    rating: 4.8,
    treatment: 'Laser Hair Removal',
    activeIngredients: ['US-FDA Approved Tech'],
    benefits: ['Permanent Hair Reduction', 'Pain-Free Technology', 'Safe for all skin types'],
    expertNote: 'Best for Kurnool weather; no post-procedure downtime.'
  },
  {
    id: 'st2',
    name: 'PRP Scalp Treatment',
    concern: 'Hair Loss',
    clinic: 'Remedi Clinic',
    image: 'https://images.unsplash.com/photo-1623859627214-871162483863?auto=format&fit=crop&q=80&w=400',
    technologyUsed: 'Platelet-Rich Plasma',
    sessionsRequired: '3-6 Sessions',
    downtime: '1-2 Days',
    price: 4500,
    rating: 4.9,
    treatment: 'PRP Therapy',
    activeIngredients: ['Autologous Growth Factors'],
    benefits: ['Natural Hair Regrowth', 'Improves Hair Density', 'Chemical-Free'],
    expertNote: 'Uses your own growth factors to stimulate dormant follicles.'
  }
];

export const INSURANCE_PLANS: InsurancePlan[] = [
  {
    id: 'ins1',
    planName: 'Optima Secure',
    provider: 'HDFC ERGO',
    logo: 'https://www.hdfcergo.com/images/default-source/logos/hdfc-ergo-logo.svg',
    category: 'Family',
    coverAmount: 1000000,
    premium: 12500,
    monthlyEmi: 1100,
    cashless: true,
    networkHospitals: 12000,
    claimSettlementRatio: '98.2%',
    features: ['Restore Benefit', 'Home Healthcare', 'No Copay', 'Tax Benefit u/s 80D'],
    copay: '0%',
    waitingPeriod: '2 Years for Pre-existing'
  },
  {
    id: 'ins2',
    planName: 'Young Star Plan',
    provider: 'Star Health',
    logo: 'https://www.starhealth.in/sites/default/files/logo_0.png',
    category: 'Individual',
    coverAmount: 500000,
    premium: 6800,
    monthlyEmi: 599,
    cashless: true,
    networkHospitals: 14000,
    claimSettlementRatio: '92.5%',
    features: ['Modern Treatments', 'Automatic Restoration', 'Wellness Points', 'Delivery Expenses'],
    copay: '0%',
    waitingPeriod: '1 Year for specific diseases'
  },
  {
    id: 'ins3',
    planName: 'Senior Citizens Red Carpet',
    provider: 'Star Health',
    logo: 'https://www.starhealth.in/sites/default/files/logo_0.png',
    category: 'Senior',
    coverAmount: 1000000,
    premium: 24000,
    monthlyEmi: 2100,
    cashless: true,
    networkHospitals: 14000,
    claimSettlementRatio: '92.5%',
    features: ['OPD Consultations', 'Health Checkups', 'Pre-existing covered after 1yr', 'Guaranteed Renewability'],
    copay: '30%',
    waitingPeriod: '1 Year for Pre-existing'
  },
  {
    id: 'ins4',
    planName: 'Critical Care Plus',
    provider: 'Care Health',
    logo: 'https://www.careinsurance.com/assets/images/care-logo.svg',
    category: 'Critical',
    coverAmount: 2500000,
    premium: 15500,
    monthlyEmi: 1400,
    cashless: false,
    networkHospitals: 8000,
    claimSettlementRatio: '95.2%',
    features: ['Lump Sum Payout', '32 Critical Illnesses', 'Global Cover', 'Second Opinion'],
    copay: '0%',
    waitingPeriod: '90 Days Initial'
  }
];

export const LAB_TESTS: LabTest[] = [
  {
    id: 'l1',
    name: 'Full Body Checkup',
    category: 'Full Body',
    price: 999,
    mrp: 2499,
    discount: '60% OFF',
    parameterCount: 65,
    reportTime: '24 Hours',
    description: 'Comprehensive health checkup.',
    preparationInstructions: 'Fasting required.',
    parameters: ['CBC', 'LFT', 'KFT'],
    sampleType: 'Blood',
    fastingRequired: true,
    department: 'Pathology',
    variants: [
      { centerId: 'c1', centerName: 'Vijaya Diagnostic', centerImage: 'https://placehold.co/100', distance: '2.5 km', rating: 4.5, reportTime: '24 Hours', price: 999, mrp: 2499, nextSlot: 'Today 07:00 AM', nabl: true }
    ]
  }
];

export const MEDICAL_SCANS: MedicalScan[] = [
  {
    id: 'ms1',
    name: 'MRI Brain Plain',
    category: 'MRI',
    bodyPart: 'Brain',
    price: 3500,
    mrp: 6000,
    discount: '40% OFF',
    image: 'https://cdn-icons-png.flaticon.com/512/2966/2966334.png',
    description: 'Imaging of the brain structure.',
    scanDuration: '20 Mins',
    contrastRequired: false,
    preparationNotes: 'Remove metal objects.',
    variants: [
      { centerId: 'sc1', centerName: 'Kurnool Diagnostics', centerImage: 'https://placehold.co/100', distance: '3 km', price: 3500, mrp: 6000, nextSlot: 'Today, 11:00 AM', nabl: true, rating: 4.7 }
    ]
  }
];

export const HOME_CARE_SERVICES: HomeCareService[] = [
  {
    id: 'hc1',
    title: 'Nursing Care (12 Hours)',
    category: 'Nursing',
    description: 'Professional nursing care at home.',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    price: 1200,
    priceUnit: 'shift',
    visitDuration: '12 Hours',
    homeVisitAvailable: true,
    staffQualification: 'GNM / BSc Nursing',
    isVerified: true,
    certifications: ['Medical Council Verified', 'Police Background Verified'],
    plans: [
      { id: 'p1', name: '12 Hour Shift', duration: '12 Hours', price: 1200 }
    ]
  }
];

export const PHYSIO_SERVICES: HomeCareService[] = [
  {
    id: 'phy1',
    title: 'Orthopedic Rehab',
    category: 'Physiotherapy',
    subCategory: 'Ortho Care',
    description: 'Professional rehab for fractures, joint replacements, and chronic pain.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    reviews: 128,
    price: 500,
    priceUnit: 'session',
    visitDuration: '45 Mins',
    homeVisitAvailable: true,
    homeVisitFee: 150,
    staffQualification: 'BPT / MPT (Certified)',
    isVerified: true,
    certifications: ['IAP Certified', 'Govt Regd Therapist', 'Stroke Rehab Specialist'],
    features: ['Manual Therapy', 'TENS/Ultrasound Support', 'Personalized Exercise Plan'],
    conditions: ['Back Pain', 'Knee Pain', 'Cervical Spondylosis'],
    plans: [
      { id: 'pp1', name: 'Standard Session', title: 'Single Visit', duration: '45 Mins', price: 500, originalPrice: 600, savings: 100 },
      { id: 'pp2', name: 'Extended Session', title: 'Deep Rehab', duration: '90 Mins', price: 900, originalPrice: 1200, savings: 300, label: 'Most Effective' },
      { id: 'pp3', name: 'Weekly Package', title: '6 Sessions', duration: '6 Days', price: 2700, originalPrice: 3600, savings: 900, label: 'Best Value' }
    ],
    reviewsList: [
      { id: 'rev1', author: 'Anil Kumar', rating: 5, comment: 'Dr. Srinivas was very professional. My back pain reduced significantly in just 3 sessions.', date: 'Oct 10, 2023', isVerified: true },
      { id: 'rev2', author: 'Latha M.', rating: 4, comment: 'Punctual staff and well-explained exercises.', date: 'Sep 28, 2023', isVerified: true }
    ]
  },
  {
    id: 'phy2',
    title: 'TENS Machine Rental',
    category: 'Physiotherapy',
    subCategory: 'Equipment',
    description: 'Portable Transcutaneous Electrical Nerve Stimulation (TENS) unit for pain relief at home.',
    image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=400',
    rating: 4.7,
    reviews: 45,
    price: 150,
    priceUnit: 'day',
    visitDuration: 'Rental',
    homeVisitAvailable: true,
    homeVisitFee: 50,
    isVerified: true,
    staffQualification: 'Equipment',
    certifications: ['Sanitized after every use', 'Safety Tested'],
    plans: [
      { id: 'tr1', name: 'Daily Rental', duration: '1 Day', price: 150, type: 'Rental' },
      { id: 'tr2', name: 'Weekly Rental', duration: '7 Days', price: 800, originalPrice: 1050, savings: 250, type: 'Rental', label: 'Recommended' },
      { id: 'tr3', name: 'Monthly Rental', duration: '30 Days', price: 2500, originalPrice: 4500, savings: 2000, type: 'Rental' }
    ],
    features: ['4-Channel Output', 'Adjustable Frequency', 'Battery Operated', 'Instruction Manual Included']
  }
];

export const DIABETES_PACKAGES: DiabetesProgram[] = [
  {
    id: 'db1',
    title: 'Comprehensive Reversal',
    description: 'Best for Type 2 Diabetes',
    diabetesType: 'Type 2',
    careLevel: 'Advanced',
    duration: '6 Months',
    monitoringFrequency: 'Daily via App',
    supportChannel: 'Personal Coach',
    includedServices: ['Endocrinologist Consult', 'Dietician Support', 'Smart Glucometer', 'Lab Tests'],
    pricing: { mrp: 12000, offerPrice: 8999, billingCycle: 'One Time' },
    isPopular: true
  }
];

export const MOTHER_BABY_SERVICES: HomeCareService[] = [];
export const MOTHER_BABY_PACKAGES: MotherBabyPackage[] = [];
export const CARE_GUIDES: HealthArticle[] = [
  { id: 'cg1', title: 'Summer Skin Essentials', category: 'Skin Care', summary: 'Hydration and SPF tips for the Kurnool heat.', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400', author: 'Dr. Ramya Reddy', publishDate: '10 Oct', type: 'article', isFeatured: true, readTime: '5 min' }
];

export const VACCINATION_SCHEDULE: VaccinationRecord[] = [
    { id: 'v1', vaccine: 'BCG', age: 'At Birth', protectsAgainst: 'Tuberculosis', status: 'completed' },
    { id: 'v2', vaccine: 'Hepatitis B', age: 'At Birth', protectsAgainst: 'Hepatitis B', status: 'completed' },
    { id: 'v3', vaccine: 'OPV 1', age: '6 Weeks', protectsAgainst: 'Polio', status: 'pending', dueDate: '15 Oct' }
];

export const BLOOD_BANKS: BloodBank[] = [
    { id: 'bb1', name: 'Kurnool Govt Blood Bank', location: 'Govt Hospital Road', distance: '1.2 km', phone: '08518-223344', availableGroups: ['A+', 'O+', 'B-', 'AB+'], isOpen: true, address: 'Near Collectorate', contactPhone: '08518-223344', isOpen24x7: true }
];

export const AMBULANCE_SERVICES: AmbulanceService[] = [
    { id: 'amb1', type: 'BLS', baseCharge: 500, pricePerKm: 15, image: '', equipment: ['Oxygen', 'First Aid'], responseTime: '10 mins' },
    { id: 'amb2', type: 'ALS', baseCharge: 1500, pricePerKm: 25, image: '', equipment: ['Ventilator', 'Monitor', 'Oxygen'], responseTime: '15 mins' }
];

export const WELLNESS_PLANS: WellnessPlan[] = [
    { id: 'w1', title: 'Weight Management', category: 'Diet', duration: '3 Months', price: 2999, expertName: 'Neha Kapoor', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400', consultations: 6, dietChartFrequency: 'Weekly', expert: 'Expert Dietician' }
];

export const BOOKINGS: any[] = [];
export const SURGERY_TYPES = [
    { id: 's1', name: 'Appendectomy' },
    { id: 's2', name: 'Cataract Surgery' },
    { id: 's3', name: 'Knee Replacement' }
];
export const ICU_EQUIPMENT_RATES = { ventilator: 2500, monitor: 500, oxygen: 300, hospitalBed: 400, syringePump: 200 };
export const NURSE_RATES = { icu: 1500, general: 1000 };
export const SURGERY_SPECIALTIES = [
    { id: 'all', label: 'All', icon: 'grid_view' },
    { id: 'Orthopedics', label: 'Ortho', icon: 'accessibility' },
    { id: 'Gynecology', label: 'Gynae', icon: 'female' }
];
export const SURGERY_PACKAGES: SurgeryPackage[] = [
    { id: 'sp1', procedureName: 'Total Knee Replacement', category: 'Orthopedics', approxCost: '₹1,50,000', hospital: 'KIMS Kurnool', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400', recoveryTime: '4-6 Weeks', stayDuration: '3-4 Days', description: 'Advanced minimally invasive knee replacement.', department: 'Orthopedics' }
];


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

export const PRODUCTS: Product[] = [
  {
    id: 'p_dia_1',
    name: 'Accu-Chek Instant Glucometer',
    brand: 'Roche Diagnostics',
    category: 'Diabetes Care',
    subCategory: 'Devices',
    image: 'https://m.media-amazon.com/images/I/71u9fT0rBfL._SX679_.jpg',
    images: ['https://m.media-amazon.com/images/I/71u9fT0rBfL._SX679_.jpg'],
    rating: 4.6,
    reviews: 12450,
    description: 'Effortless blood glucose monitoring. Highly recommended for daily tracking in Kurnool.',
    price: 950,
    mrp: 1499,
    discount: '36% OFF',
    isReturnable: false,
    warranty: '10 Years Manufacturer Warranty',
    isAuthorized: true,
    fulfilledBy: LOCAL_VENDORS.apollo_kurnool,
    verifiedByDoctor: 'Dr. Ramesh Gupta (MD)'
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
    fulfilledBy: LOCAL_VENDORS.medplus_ccamp,
    verifiedByDoctor: 'Dr. Ramesh Gupta',
    crossSellIds: ['p_dia_1']
  },
  {
    id: 'm2',
    name: 'Metformin 500mg',
    genericName: 'Metformin',
    category: 'Diabetes',
    price: 15,
    mrp: 22,
    discount: '31% OFF',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200',
    packSize: '10 Tablets',
    prescriptionRequired: true,
    manufacturer: 'Abbott',
    composition: 'Metformin HCl (500mg)',
    dosageForm: 'Tablet',
    therapeuticClass: 'Anti-diabetic',
    indications: ['Diabetes Type 2'],
    dosageInstructions: 'Take with dinner.',
    routeOfAdministration: 'Oral',
    sideEffects: ['Stomach upset'],
    warnings: ['Monitor kidney function'],
    safetyAdvice: { pregnancy: 'Consult Doctor', alcohol: 'Unsafe', driving: 'Safe' },
    variants: [{ id: 'v1', packSize: '10 Tablets', sellingPrice: 15, mrp: 22 }],
    fulfilledBy: LOCAL_VENDORS.apollo_kurnool,
    verifiedByDoctor: 'Dr. Ramesh Gupta',
    crossSellIds: ['p_dia_1']
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
    description: 'Complete metabolic profile including blood counts, liver, and kidney markers.',
    preparationInstructions: 'Overnight fasting required.',
    parameters: ['Lipid Profile', 'LFT', 'KFT', 'Sugar'],
    sampleType: 'Blood',
    fastingRequired: true,
    department: 'Pathology',
    fulfilledBy: LOCAL_VENDORS.vijaya_diagnostics,
    isNablCertified: true,
    variants: [
      { centerId: 'c1', centerName: 'Vijaya Diagnostic', centerImage: 'https://placehold.co/100', distance: '2.5 km', rating: 4.5, reportTime: '24 Hours', price: 999, mrp: 2499, nextSlot: 'Today 07:00 AM', nabl: true }
    ]
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
    about: 'Expert in chronic disease management and infectious diseases in the Kurnool region.',
    registrationNumber: 'APMC-12345',
    languages: ['Telugu', 'English', 'Hindi'],
    variants: [
      { type: 'Clinic Visit', icon: 'apartment', price: 500, duration: '15 min', nextSlot: 'Tomorrow, 10:00 AM' },
      { type: 'Video Consult', icon: 'videocam', price: 400, duration: '15 min', nextSlot: 'Today, 04:00 PM' }
    ]
  }
];

export const HOME_CARE_SERVICES: HomeCareService[] = [
  {
    id: 'nurse1',
    title: 'Post-Op Nursing Care',
    category: 'Nursing',
    description: 'Specialized 24/7 or 12/12 nursing for surgical recovery, wound management, and IV therapy.',
    image: 'https://images.unsplash.com/photo-1576765608596-78e53a3cb3d6?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    reviews: 482,
    price: 1500,
    priceUnit: 'shift',
    visitDuration: '12 Hours',
    homeVisitAvailable: true,
    staffQualification: 'GNM / BSc Nursing',
    expertBio: 'Our nursing staff are trained at top hospitals in Andhra Pradesh and undergo strict background verification.',
    specializations: ['ICU Nursing', 'Wound Care', 'Post-Cardiac Care'],
    isVerified: true,
    certifications: ['Medical Council Verified', 'ISO 9001:2015 Quality Care', 'Police Background Verified'],
    reviewsList: [
      { id: 'rev1', author: 'Venkatesh Rao', rating: 5, comment: 'Very professional staff. They handled my father\'s recovery after knee surgery with great care in Kurnool.', date: 'Oct 2023', isVerified: true },
      { id: 'rev2', author: 'Sneha Latha', rating: 4, comment: 'Staff was punctual and well-trained in using medical equipment. Highly recommend.', date: 'Sep 2023', isVerified: true }
    ],
    features: ['24/7 Monitoring', 'Daily Vitals Report', 'Medication Management'],
    plans: [
      { id: 'np1', name: 'Day Shift', duration: '12 Hours', price: 1500 },
      { id: 'np2', name: '24/7 Support', duration: '24 Hours', price: 2800, label: 'Best Value' }
    ]
  },
  {
    id: 'nt1',
    title: 'Clinical Nutrition Therapy',
    category: 'Nutrition',
    description: 'Personalized disease-specific diet plans.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    reviews: 215,
    price: 999,
    priceUnit: 'plan',
    visitDuration: '45 Mins Call',
    homeVisitAvailable: true,
    staffQualification: 'MSc. Clinical Nutrition / RD',
    expertBio: 'Dr. Kavya has helped over 5000 Kurnool families manage diabetes through traditional dietetics.',
    specializations: ['Diabetes', 'Weight Management'],
    isVerified: true,
    certifications: ['Registered Dietician (IDA)'],
    plans: [
      { id: 'np1', name: 'Starter Plan', duration: '1 Session', price: 999 },
      { id: 'np2', name: 'Disease Reversal', duration: '30 Days', price: 2999, label: 'Best Seller' }
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
    description: 'Structural imaging of brain tissues.',
    scanDuration: '20 Mins',
    contrastRequired: false,
    preparationNotes: 'Remove all metal jewelry.',
    variants: [
      { centerId: 'sc1', centerName: 'Kurnool Diagnostics', centerImage: 'https://placehold.co/100', distance: '3 km', price: 3500, mrp: 6000, nextSlot: 'Today, 11:00 AM', nabl: true, rating: 4.7 }
    ]
  }
];

export const PHYSIO_SERVICES: HomeCareService[] = [
  {
    id: 'phy1',
    title: 'Post-Surgery Rehab',
    category: 'Physiotherapy',
    subCategory: 'Ortho Care',
    description: 'Professional rehab after orthopedic surgeries.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    price: 500,
    priceUnit: 'session',
    visitDuration: '45 Mins',
    homeVisitAvailable: true,
    staffQualification: 'BPT',
    plans: [{ id: 'pp1', name: 'Single Session', duration: '1 Session', price: 500 }]
  }
];

export const BLOOD_BANKS: BloodBank[] = [
  { id: 'bb1', name: 'Red Cross', location: 'Collectorate', distance: '3km', phone: '08518-245', availableGroups: ['A+', 'O+'], isOpen: true, address: 'Collectorate Complex, Kurnool', contactPhone: '08518-245', isOpen24x7: true }
];

export const HOSPITALS: Hospital[] = [
  { id: 'h1', name: 'KIMS Kurnool', type: 'Multi-Specialty', location: 'Joharapuram Road', distance: '2.5km', rating: 4.5, reviews: 1200, image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=400', facilities: ['ICU', 'Lab', 'Emergency'], open24x7: true, insuranceAccepted: true }
];

export const SURGERY_SPECIALTIES = [
  { id: 'all', label: 'All', icon: 'grid_view' },
  { id: 'Orthopedics', label: 'Orthopedics', icon: 'accessibility' }
];

export const SURGERY_PACKAGES: SurgeryPackage[] = [
  { id: 'sp1', procedureName: 'Knee Replacement', category: 'Orthopedics', approxCost: '₹1.5L', hospital: 'Sunrise', image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=600', recoveryTime: '6 Weeks', stayDuration: '5 Days', department: 'Orthopedics' }
];

export const AMBULANCE_SERVICES: AmbulanceService[] = [
  { id: 'amb1', type: 'BLS', baseCharge: 800, pricePerKm: 20, image: '', equipment: ['Oxygen'], responseTime: '15 mins' }
];

export const DIABETES_PACKAGES: DiabetesProgram[] = [
  { id: 'dp1', title: 'Reversal Plan', description: 'Holistic management including diet and specialist consults.', duration: '3 Months', monitoringFrequency: 'Weekly', supportChannel: 'WhatsApp', includedServices: ['Diet Charts', 'Glucocheck Strips'], pricing: { mrp: 15000, offerPrice: 9999, billingCycle: 'One Time' } }
];

export const MOTHER_BABY_SERVICES: HomeCareService[] = [
  {
    id: 'mb1',
    title: 'Post-Delivery Nursing',
    category: 'Nursing',
    localTitle: 'తల్లి మరియు బిడ్డ సంరక్షణ',
    description: 'Certified nurses for newborn care, breastfeeding support, and mother\'s recovery tracking.',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    price: 2000,
    priceUnit: 'shift',
    visitDuration: '8 Hours',
    homeVisitAvailable: true,
    isVerified: true,
    staffQualification: 'ANM/Nursing Grad',
    certifications: ['Newborn Care Certified', 'Police Verified', 'Health Cleared'],
    reviewsList: [
      { id: 'rev_mb1', author: 'Anusha P', rating: 5, comment: 'The nurse was very patient and taught me how to handle the baby properly.', date: 'Aug 2023', isVerified: true }
    ]
  }
];

export const MOTHER_BABY_PACKAGES: MotherBabyPackage[] = [
  { id: 'mbp1', tag: 'Care', title: '9-Month Journey', subtitle: 'Full care till birth', features: ['Monthly Scans', 'Nutritionist Access'], mrp: 30000, price: 25000, image: 'https://images.unsplash.com/photo-1544126592-807daa215a75?auto=format&fit=crop&q=80&w=400' }
];

export const CARE_GUIDES: HealthArticle[] = [
  { id: 'cg1', title: 'Managing Diabetes in Summer', category: 'Chronic', summary: 'Crucial health tips for the Kurnool peak heat.', image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=400', author: 'Dr. Ramesh', publishDate: '10 Oct', type: 'article' }
];

export const VACCINATION_SCHEDULE: VaccinationRecord[] = [
  { id: 'v1', vaccine: 'BCG', age: 'At Birth', protectsAgainst: 'TB', status: 'completed' }
];

export const INSURANCE_PLANS: InsurancePlan[] = [
  { id: 'ip1', planName: 'Family Guard', provider: 'Star Health', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/85/Star_Health_and_Allied_Insurance_Logo.svg/1200px-Star_Health_and_Allied_Insurance_Logo.svg.png', category: 'Family', coverAmount: 500000, premium: 12000, cashless: true, networkHospitals: 14000, claimSettlementRatio: '98%', features: ['No Room Rent Limit'] }
];

export const BOOKINGS = [
  { id: 'b1', title: 'Dolo 650', subtitle: 'Medicine Order', status: 'Shipped', date: 'Today, 10:30 AM', amount: 150, type: 'medicine' }
];

export const SURGERY_TYPES = [{ id: 's_knee', name: 'Knee Replacement', cost: 180000 }];
export const ICU_EQUIPMENT_RATES = { ventilator: 2000, monitor: 500, oxygen: 800, hospitalBed: 300, syringePump: 200 };
export const NURSE_RATES = { icu: 2500, general: 1200 };

export const SKIN_HAIR_SERVICES: SkinTreatment[] = [
  {
    id: 'st1',
    name: 'Laser Hair Removal',
    concern: 'Unwanted Hair',
    clinic: 'Remedi Clinic',
    image: 'https://images.unsplash.com/photo-1559599141-3816a0b721e4?auto=format&fit=crop&q=80&w=400',
    technologyUsed: 'Triple Wavelength Laser',
    sessionsRequired: '6-8 Sessions',
    downtime: 'None',
    price: 2500,
    rating: 4.8,
    treatment: 'Laser Hair Removal'
  }
];

export const WELLNESS_PLANS: WellnessPlan[] = [
  { 
    id: 'w1', 
    title: 'Weight Loss Mastery', 
    category: 'Diet', 
    duration: '3 Months', 
    price: 4999, 
    expertName: 'Dt. Kavya', 
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400', 
    consultations: 12, 
    dietChartFrequency: 'Weekly', 
    expert: 'Dt. Kavya' 
  }
];

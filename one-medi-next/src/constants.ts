
import {
  Medicine, LabTest, Scan, Doctor, HomeCareService, DiabetesProgram,
  Hospital, BloodBank, SurgeryPackage, AmbulanceService, Ambulance, InsurancePlan,
  MotherBabyPackage, SkinTreatment, WellnessPlan, HealthArticle, VaccinationRecord,
  Product, VendorInfo, Status, VendorId
} from './types/index';

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
    slug: 'dolo-650mg-tablet',
    brandName: 'Dolo',
    genericName: 'Paracetamol',
    category: 'Pain Relief',
    subCategory: 'Fever',
    manufacturer: 'Micro Labs Ltd',
    hsnCode: '30049099',
    drugSchedule: 'OTC',
    prescriptionRequired: false,
    description: '<p>Dolo 650 Tablet is a medicine used to relieve pain and to reduce fever. It is used to treat many conditions such as headache, body ache, toothache and common cold.</p>',
    shortDescription: 'Effective for fever and mild to moderate pain.',
    composition: 'Paracetamol (650mg)',
    strength: '650mg',
    dosageForm: 'Tablet',
    packSize: '15 Tablets',
    unit: 'Strip',
    quantityPerPack: 15,
    price: 30,
    mrp: 35,
    discountPercent: 14,
    taxPercent: 12,
    finalPrice: 30,
    stockQuantity: 500,
    minStockLevel: 50,
    lowStockAlert: false,
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600'
    ],
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200',
    thumbnailImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=100',
    barcode: '8901234567890',
    batchNumber: 'ML23045',
    expiryDate: '2025-12-31',
    sideEffects: ['Nausea', 'Vomiting', 'Stomach pain'],
    contraindications: ['Liver disease', 'Kidney disease'],
    warnings: ['Do not exceed recommended dose'],
    storageInstructions: 'Store in a cool, dry place',
    usageInstructions: 'Take after food.',
    tags: ['fever', 'pain', 'headache', 'paracetamol'],
    seoTitle: 'Buy Dolo 650mg Tablet Online - Best Price',
    seoDescription: 'Order Dolo 650mg Tablet online. Check uses, dosage, side effects and price.',
    isFeatured: true,
    isTrending: true,
    status: 'ACTIVE',
    vendorId: 'apollo_kurnool' as VendorId,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    rating: 4.8,
    averageRating: 4.8,
    totalReviews: 1250,
    totalOrders: 5000,
    reorderFrequency: 85,
    wishlistCount: 200,
    viewCount: 10000,
    returnEligible: true,
    returnWindowDays: 7,
    safety: { pregnancy: 'Safe', alcohol: 'Unsafe', driving: 'Safe', breastfeeding: 'Safe', kidney: 'Consult Doctor', liver: 'Consult Doctor' },
  },
  {
    id: 'sk_1',
    name: 'Sebogel Salicylic Acid Gel',
    slug: 'sebogel-salicylic-acid-gel',
    brandName: 'Sebogel',
    genericName: 'Salicylic Acid + Nicotinamide',
    category: 'Acne Care',
    manufacturer: 'Ethicare Remedies',
    hsnCode: '33049910',
    drugSchedule: 'OTC',
    prescriptionRequired: false,
    description: '<p>Sebogel contains Salicylic Acid and Nicotinamide which helps in opening closed skin pores and fights against acne causing bacteria.</p>',
    shortDescription: 'Advanced gel for acne and oily skin.',
    composition: 'Salicylic Acid 2%, Nicotinamide 6%',
    strength: '2% w/w',
    dosageForm: 'Gel',
    packSize: '30g',
    unit: 'Tube',
    quantityPerPack: 1,
    price: 245,
    mrp: 290,
    discountPercent: 15,
    taxPercent: 18,
    finalPrice: 245,
    stockQuantity: 100,
    minStockLevel: 10,
    lowStockAlert: false,
    images: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600'
    ],
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=200',
    thumbnailImage: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=100',
    sideEffects: ['Dry skin', 'Irritation'],
    storageInstructions: 'Store below 30°C',
    usageInstructions: 'Apply on affected areas.',
    isFeatured: true,
    isTrending: false,
    status: 'ACTIVE',
    vendorId: 'medplus_ccamp' as VendorId,
    rating: 4.5,
    averageRating: 4.5,
    returnEligible: true,
    returnWindowDays: 7,
    safety: { pregnancy: 'Consult Doctor', alcohol: 'Safe', driving: 'Safe' }
  },
  {
    id: 'sk_2',
    name: 'La Shield Sunscreen Gel SPF 40',
    slug: 'la-shield-sunscreen-gel-spf-40',
    brandName: 'La Shield',
    genericName: 'Octyl Methoxycinnamate + Titanium Dioxide',
    category: 'Sun Protection',
    manufacturer: 'Glenmark Pharmaceuticals',
    prescriptionRequired: false,
    description: '<p>La Shield SPF 40 Gel is a broad-spectrum sunscreen that protects the skin against UVA and UVB rays.</p>',
    composition: 'Broad Spectrum Physical & Chemical Filters',
    dosageForm: 'Gel',
    packSize: '60g',
    unit: 'Tube',
    quantityPerPack: 1,
    price: 650,
    mrp: 790,
    discountPercent: 18,
    finalPrice: 650,
    stockQuantity: 200,
    images: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600'],
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=200',
    usageInstructions: 'Apply 20 mins before sun exposure.',
    isFeatured: true,
    status: 'ACTIVE',
    vendorId: 'apollo_kurnool' as VendorId,
    rating: 4.7,
    averageRating: 4.7,
    returnEligible: true,
    safety: { pregnancy: 'Safe', alcohol: 'Safe', driving: 'Safe' }
  },
  {
    id: 'sk_3',
    name: 'Kojiglo Forte Cream',
    slug: 'kojiglo-forte-cream',
    brandName: 'Kojiglo',
    genericName: 'Kojic Acid + Hydroquinone',
    category: 'Pigmentation',
    manufacturer: 'Alkem Laboratories',
    prescriptionRequired: true,
    description: '<p>Kojiglo Forte Cream is used to treat melasma and hyperpigmentation.</p>',
    composition: 'Kojic Acid, Hydroquinone, Glycolic Acid',
    dosageForm: 'Cream',
    packSize: '20g',
    unit: 'Tube',
    quantityPerPack: 1,
    price: 480,
    mrp: 550,
    discountPercent: 12,
    finalPrice: 480,
    stockQuantity: 50,
    images: ['https://images.unsplash.com/photo-1594433030833-21c1ba8667e8?auto=format&fit=crop&q=80&w=600'],
    image: 'https://images.unsplash.com/photo-1594433030833-21c1ba8667e8?auto=format&fit=crop&q=80&w=200',
    usageInstructions: 'Use at night only.',
    isFeatured: true,
    status: 'ACTIVE',
    vendorId: 'apollo_kurnool' as VendorId,
    rating: 4.2,
    averageRating: 4.2,
    returnEligible: true,
    safety: { pregnancy: 'Unsafe', alcohol: 'Safe', driving: 'Safe' }
  },
  {
    id: 'hr_1',
    name: 'Mintop 5% Solution',
    slug: 'mintop-5-solution',
    brandName: 'Mintop',
    genericName: 'Minoxidil',
    category: 'Hair Loss',
    manufacturer: 'Dr. Reddys Laboratories',
    prescriptionRequired: true,
    description: '<p>Mintop 5% Solution belongs to a class of drugs known as vasodilators. It is used to promote hair growth in men with male pattern baldness.</p>',
    composition: 'Minoxidil 5% w/v',
    dosageForm: 'Solution',
    packSize: '60ml',
    unit: 'Bottle',
    quantityPerPack: 1,
    price: 720,
    mrp: 850,
    discountPercent: 15,
    finalPrice: 720,
    stockQuantity: 80,
    images: ['https://images.unsplash.com/photo-1626015448362-daac75a97440?auto=format&fit=crop&q=80&w=600'],
    image: 'https://images.unsplash.com/photo-1626015448362-daac75a97440?auto=format&fit=crop&q=80&w=200',
    usageInstructions: '1ml twice daily on dry scalp.',
    isFeatured: true,
    status: 'ACTIVE',
    vendorId: 'medplus_ccamp' as VendorId,
    rating: 4.6,
    averageRating: 4.6,
    returnEligible: true,
    safety: { pregnancy: 'Unsafe', alcohol: 'Safe', driving: 'Safe' }
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Ramesh Gupta',
    slug: 'dr-ramesh-gupta',
    specialization: 'General Physician',
    qualification: 'MBBS, MD (General Medicine)',
    experienceYears: 12,
    hospitalAffiliation: 'Sunrise Hospital',
    consultationFee: 500,
    rating: 4.8,
    averageRating: 4.8,
    totalReviews: 850,
    totalConsultations: 5000,
    responseTime: '15 Mins',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200',
    bio: 'Senior physician with expertise in viral fevers, diabetes management, and chronic illnesses.',
    registrationNumber: 'APMC-12345',
    languages: ['English', 'Telugu', 'Hindi'],
    availableOnline: true,
    availableInClinic: true,
    availableAtMultipleCenters: false,
    status: 'ACTIVE',
    vendorId: 'd1_vendor' as VendorId,
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    availableTimeSlots: ['10:00 AM - 01:00 PM', '05:00 PM - 09:00 PM'],
    consultationDurationMinutes: 15,
    emergencyConsultAvailable: true,
    variants: [
      { type: 'Clinic Visit', icon: 'apartment', price: 500, duration: '15 min', nextSlot: 'Tomorrow, 10:00 AM' },
      { type: 'Video Consult', icon: 'videocam', price: 400, duration: '15 min', nextSlot: 'Today, 04:00 PM' }
    ]
  },
  {
    id: 'd_skin_1',
    name: 'Dr. Ramya Reddy',
    slug: 'dr-ramya-reddy',
    specialization: 'Dermatologist',
    qualification: 'MBBS, MD (DVL)',
    experienceYears: 10,
    hospitalAffiliation: 'Remedi Clinic',
    consultationFee: 600,
    rating: 4.9,
    averageRating: 4.9,
    totalReviews: 1200,
    totalConsultations: 8000,
    responseTime: '30 Mins',
    image: 'https://images.unsplash.com/photo-1559839734-2b71f1e3c770?auto=format&fit=crop&q=80&w=200',
    bio: 'Specialist in aesthetic dermatology, laser procedures, and clinical skin conditions.',
    registrationNumber: 'APMC-67890',
    languages: ['English', 'Telugu', 'Hindi'],
    availableOnline: true,
    availableInClinic: true,
    status: 'ACTIVE',
    vendorId: 'd_skin_1_vendor' as VendorId,
    availableDays: ['Mon', 'Wed', 'Fri'],
    availableTimeSlots: ['04:00 PM - 08:00 PM'],
    consultationDurationMinutes: 20,
    emergencyConsultAvailable: false,
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



export const LAB_TESTS: LabTest[] = [
  {
    id: 'l1',
    name: 'Full Body Checkup',
    slug: 'full-body-checkup',
    category: 'Full Body',
    subCategory: 'Preventive Care',
    description: 'Comprehensive health checkup covering 80+ parameters including liver, kidney, thyroid, and blood sugar profiles.',
    shortDescription: 'Basic health checkup for all ages.',
    preparationInstructions: '10-12 hours fasting required. Water is allowed.',
    fastingRequired: true,
    fastingHours: 12,
    sampleType: 'Blood',
    reportDeliveryTime: '24 Hours',
    turnaroundTime: '24 Hours',
    parametersIncluded: ['CBC', 'LFT', 'KFT', 'Lipid Profile', 'Thyroid Profile', 'Blood Sugar'],
    price: 999,
    mrp: 2499,
    discountPercent: 60,
    homeCollectionAvailable: true,
    centerCollectionAvailable: true,
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=400',
    reportFormat: 'Smart Interactive',
    sampleStorageConditions: 'Refrigerated',
    ageRestriction: '18+',
    genderRestriction: 'Any',
    isPackage: true,
    isFeatured: true,
    department: 'Pathology',
    status: 'ACTIVE',
    vendorId: 'vijaya_diagnostics' as VendorId,
    availableCities: ['Kurnool', 'Nandyal'],
    availableTimeSlots: ['07:00 AM - 08:00 AM', '08:00 AM - 09:00 AM'],
    maxBookingsPerSlot: 5,
    averageRating: 4.8,
    totalReviews: 540,
    totalBookings: 1500,
    marketPrice: 2499,
    finalPrice: 999,
    variants: [
      { centerId: 'c1', centerName: 'Vijaya Diagnostic', centerImage: 'https://placehold.co/100', distance: '2.5 km', rating: 4.5, reportTime: '24 Hours', price: 999, mrp: 2499, nextSlot: 'Today 07:00 AM', nabl: true }
    ]
  },
  {
    id: 'l2',
    name: 'Thyroid Profile (Total)',
    slug: 'thyroid-profile-total',
    category: 'Thyroid',
    subCategory: 'Hormones',
    description: 'Tests for T3, T4, and TSH levels to check thyroid function.',
    shortDescription: 'Check your thyroid levels.',
    preparationInstructions: 'No fasting required, but sample preferably taken in the morning.',
    fastingRequired: false,
    sampleType: 'Blood',
    reportDeliveryTime: '24 Hours',
    turnaroundTime: '24 Hours',
    parametersIncluded: ['T3', 'T4', 'TSH'],
    price: 400,
    mrp: 600,
    discountPercent: 33,
    homeCollectionAvailable: true,
    centerCollectionAvailable: true,
    image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=400',
    reportFormat: 'PDF',
    isPackage: false,
    status: 'ACTIVE',
    vendorId: 'vijaya_diagnostics' as VendorId,
    averageRating: 4.7,
    totalReviews: 320,
    totalBookings: 800,
    marketPrice: 600,
    finalPrice: 400,
  }
];

export const MEDICAL_SCANS: Scan[] = [
  {
    id: 'ms1',
    name: 'MRI Brain Plain',
    slug: 'mri-brain-plain',
    category: 'MRI',
    scanType: 'MRI',
    bodyPart: 'Brain',
    description: 'Non-invasive imaging technology that produces three dimensional detailed anatomical images.',
    preparationInstructions: 'Remove all metal objects. Fasting not required unless specified.',
    contrastRequired: false,
    sedationRequired: false,
    price: 3500,
    mrp: 6000,
    discountPercent: 41,
    reportTime: '24 Hours',
    image: 'https://cdn-icons-png.flaticon.com/512/2966/2966334.png',
    centerRequired: true,
    homeServiceAvailable: false,
    radiationExposureLevel: 'None',
    contraindications: ['Pacemaker', 'Metal Implants', 'Claustrophobia'],
    status: 'ACTIVE',
    vendorId: 'kurnool_diag' as VendorId,
    centerName: 'Kurnool Diagnostics',
    centerAddress: 'Opp. KIMS Hospital',
    machineModel: 'Siemens 1.5T',
    isNABL: true,
    variants: [
      { centerId: 'sc1', centerName: 'Kurnool Diagnostics', centerImage: 'https://placehold.co/100', distance: '3 km', price: 3500, mrp: 6000, nextSlot: 'Today, 11:00 AM', nabl: true, rating: 4.7 }
    ],
    // Backward compatibility
    finalPrice: 3500,
    marketPrice: 6000,
    turnaroundTime: '24 Hours',
    discountPercentage: 41
  }
];

export const HOME_CARE_SERVICES: HomeCareService[] = [
  {
    id: 'hc1',
    name: 'Nursing Care (12 Hours)',
    slug: 'nursing-care-12-hours',
    category: 'Nurse',
    description: 'Professional nursing care at home for post-surgery recovery, elderly care, and chronic illness management.',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=400',
    rating: 4.8,
    reviews: 120,
    price: 1200,
    priceUnit: 'shift',
    visitDuration: '12 Hours',
    duration: '12 Hours',
    pricePerVisit: 1200,
    minimumBookingHours: 12,
    serviceAreaCities: ['Kurnool', 'Nandyal'],
    requiresMedicalPrescription: false,
    homeVisitAvailable: true,
    staffQualification: 'GNM / BSc Nursing',
    isVerified: true,
    equipmentProvided: false,
    certifications: ['Medical Council Verified', 'Police Background Verified'],
    serviceInclusions: ['Vitals Monitoring', 'Medication Administration', 'Basic Hygiene Care'],
    plans: [
      { id: 'p1', name: '12 Hour Shift', duration: '12 Hours', price: 1200 }
    ],
    status: 'ACTIVE',
    vendorId: 'hc_vendor_1' as VendorId
  }
];

export const PHYSIO_SERVICES: HomeCareService[] = [
  {
    id: 'phy1',
    name: 'Orthopedic Rehab',
    slug: 'orthopedic-rehab',
    category: 'Physiotherapy',
    subCategory: 'Ortho Care',
    description: 'Professional rehab for fractures, joint replacements, and chronic pain management at home.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400',
    rating: 4.9,
    reviews: 128,
    price: 500,
    priceUnit: 'session',
    visitDuration: '45 Mins',
    duration: '45 Mins',
    pricePerVisit: 500,
    homeVisitAvailable: true,
    homeVisitFee: 150,
    serviceAreaCities: ['Kurnool'],
    requiresMedicalPrescription: false,
    staffQualification: 'BPT / MPT (Certified)',
    isVerified: true,
    equipmentProvided: true,
    certifications: ['IAP Certified', 'Govt Regd Therapist', 'Stroke Rehab Specialist'],
    features: ['Manual Therapy', 'TENS/Ultrasound Support', 'Personalized Exercise Plan'],
    conditions: ['Back Pain', 'Knee Pain', 'Cervical Spondylosis'],
    plans: [
      { id: 'pp1', name: 'Single Visit', duration: '45 Mins', price: 500, originalPrice: 600, savings: 100 },
      { id: 'pp2', name: 'Deep Rehab', duration: '90 Mins', price: 900, originalPrice: 1200, savings: 300, label: 'Most Effective' },
      { id: 'pp3', name: '6 Sessions', duration: '6 Days', price: 2700, originalPrice: 3600, savings: 900, label: 'Best Value' }
    ],
    reviewsList: [
      { id: 'rev1', author: 'Anil Kumar', rating: 5, comment: 'Dr. Srinivas was very professional. My back pain reduced significantly in just 3 sessions.', date: 'Oct 10, 2023', isVerified: true },
      { id: 'rev2', author: 'Latha M.', rating: 4, comment: 'Punctual staff and well-explained exercises.', date: 'Sep 28, 2023', isVerified: true }
    ],
    status: 'ACTIVE',
    vendorId: 'phy_vendor_1' as VendorId
  },
  {
    id: 'phy2',
    name: 'TENS Machine Rental',
    slug: 'tens-machine-rental',
    category: 'Physiotherapy',
    subCategory: 'Equipment',
    description: 'Portable Transcutaneous Electrical Nerve Stimulation (TENS) unit for pain relief at home.',
    image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=400',
    rating: 4.7,
    reviews: 45,
    price: 150,
    priceUnit: 'day',
    visitDuration: 'Rental',
    duration: '24 Hours',
    pricePerVisit: 150,
    homeVisitAvailable: true,
    homeVisitFee: 50,
    serviceAreaCities: ['Kurnool'],
    requiresMedicalPrescription: false,
    isVerified: true,
    staffQualification: 'Equipment',
    equipmentProvided: true,
    certifications: ['Sanitized after every use', 'Safety Tested'],
    plans: [
      { id: 'tr1', name: 'Daily Rental', duration: '1 Day', price: 150, type: 'Rental' },
      { id: 'tr2', name: 'Weekly Rental', duration: '7 Days', price: 800, originalPrice: 1050, savings: 250, type: 'Rental', label: 'Recommended' },
      { id: 'tr3', name: 'Monthly Rental', duration: '30 Days', price: 2500, originalPrice: 4500, savings: 2000, type: 'Rental' }
    ],
    features: ['4-Channel Output', 'Adjustable Frequency', 'Battery Operated', 'Instruction Manual Included'],
    status: 'ACTIVE',
    vendorId: 'phy_vendor_1' as VendorId
  }
];

export const DIABETES_PACKAGES: DiabetesProgram[] = [
  {
    id: 'db1',
    name: 'Comprehensive Reversal',
    description: 'Best for Type 2 Diabetes',
    diabetesType: 'Type 2',
    careLevel: 'Advanced',
    duration: '6 Months',
    monitoringFrequency: 'Daily via App',
    supportChannel: 'Personal Coach',
    includedServices: ['Endocrinologist Consult', 'Dietician Support', 'Smart Glucometer', 'Lab Tests'],
    pricing: { mrp: 12000, offerPrice: 8999, billingCycle: 'One Time' },
    isPopular: true,
    features: ['Real-time Glucose Tracking', 'Doctor Support', 'Diet Plans']
  }
];

export const MOTHER_BABY_SERVICES: HomeCareService[] = [];
export const MOTHER_BABY_PACKAGES: MotherBabyPackage[] = [];
export const CARE_GUIDES: HealthArticle[] = [
  { id: 'cg1', name: 'Summer Skin Essentials', category: 'Skin Care', summary: 'Hydration and SPF tips for the Kurnool heat.', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400', author: 'Dr. Ramya Reddy', publishDate: '10 Oct', type: 'article', isFeatured: true, readTime: '5 min' }
];

export const VACCINATION_SCHEDULE: VaccinationRecord[] = [
  { id: 'v1', vaccine: 'BCG', age: 'At Birth', protectsAgainst: 'Tuberculosis', status: 'completed' },
  { id: 'v2', vaccine: 'Hepatitis B', age: 'At Birth', protectsAgainst: 'Hepatitis B', status: 'completed' },
  { id: 'v3', vaccine: 'OPV 1', age: '6 Weeks', protectsAgainst: 'Polio', status: 'pending', dueDate: '15 Oct' }
];

export const BLOOD_BANKS: BloodBank[] = [
  {
    id: 'bb1',
    name: 'Kurnool Govt Blood Bank',
    licenseNumber: 'AP-BB-12345',
    location: 'Govt Hospital Road',
    distance: '1.2 km',
    phone: '08518-223344',
    email: 'bloodbank.kurnool@ap.gov.in',
    operatingHours: '24x7',
    hasTraumaFacility: true,
    availableGroups: ['A+', 'O+', 'B-', 'AB+'],
    isOpen: true,
    address: 'Near Collectorate, Kurnool',
    contactPhone: '08518-223344',
    isOpen24x7: true,
    status: 'ACTIVE',
    vendorId: 'bb_govt' as VendorId,
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'bb2',
    name: 'Red Cross Blood Bank',
    licenseNumber: 'AP-BB-67890',
    location: 'Park Road',
    distance: '2.5 km',
    phone: '08518-556677',
    availableGroups: ['O-', 'A-', 'B+'],
    isOpen: true,
    address: 'Opp. Childrens Park, Kurnool',
    contactPhone: '08518-556677',
    isOpen24x7: false,
    operatingHours: '09:00 AM - 09:00 PM',
    status: 'ACTIVE',
    vendorId: 'bb_redcross' as VendorId
  }
];

export const AMBULANCE_SERVICES: Ambulance[] = [
  {
    id: 'amb1',
    ambulanceType: 'Basic', // mapped to type
    pricePerKm: 15,
    baseFare: 500,
    oxygenSupport: false,
    ventilatorSupport: false,
    paramedicIncluded: false,
    gpsTrackingEnabled: true,
    coverageArea: 'Kurnool City Limits',
    responseTimeEstimate: '10 Mins',
    status: 'ACTIVE',
    vendorId: 'amb_vendor_1' as VendorId,
    currentLocation: { lat: 15.8281, lng: 78.0373 },
    driverDetails: { name: 'Raju', phone: '9988776655' },
    vehicleNumber: 'AP21 AB 1234'
  },
  {
    id: 'amb2',
    ambulanceType: 'ICU',
    pricePerKm: 25,
    baseFare: 1500,
    oxygenSupport: true,
    ventilatorSupport: true,
    paramedicIncluded: true,
    gpsTrackingEnabled: true,
    coverageArea: 'Kurnool District',
    responseTimeEstimate: '15 Mins',
    status: 'ACTIVE',
    vendorId: 'amb_vendor_2' as VendorId,
    driverDetails: { name: 'Kiran', phone: '9988776644' },
    vehicleNumber: 'AP21 XY 5678'
  }
];

export const INSURANCE_PLANS: InsurancePlan[] = [
  {
    id: 'ip1',
    planName: 'Family Health Guard',
    providerName: 'Star Health',
    category: 'Family Floater',
    coverageAmount: 500000,
    premiumAmount: 12000,
    cashless: true,
    networkHospitals: 4500,
    claimSettlementRatio: '98.5%',
    coverageDetails: ['Hospitalization', 'Day Care Procedures', 'Pre/Post Hospitalization'],
    waitingPeriod: '30 Days',
    claimProcess: 'Direct Cashless via TPA',
    preExistingConditionsCovered: false,
    status: 'ACTIVE',
    vendorId: 'ins_star' as VendorId,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'ip2',
    planName: 'Senior Citizen Red Carpet',
    providerName: 'Star Health',
    category: 'Senior Citizen',
    coverageAmount: 1000000,
    premiumAmount: 25000,
    cashless: true,
    networkHospitals: 5000,
    claimSettlementRatio: '98.5%',
    coverageDetails: ['Critical Illness', 'Organ Donor Expenses'],
    waitingPeriod: '2 Years for PED',
    preExistingConditionsCovered: true,
    status: 'ACTIVE',
    vendorId: 'ins_star' as VendorId
  }
];

export const WELLNESS_PLANS: WellnessPlan[] = [
  { id: 'w1', name: 'Weight Management', category: 'Diet', duration: '3 Months', price: 2999, originalPrice: 4000, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400', consultations: 6, dietChartFrequency: 'Weekly', expertName: 'Neha Kapoor', description: 'Personalized diet plans.' }
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
  { id: 'sp1', name: 'Total Knee Replacement', category: 'Orthopedics', approxCost: '₹1,50,000', hospital: 'KIMS Kurnool', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400', recoveryTime: '4-6 Weeks', stayDuration: '3-4 Days', description: 'Advanced minimally invasive knee replacement.', department: 'Orthopedics' }
];

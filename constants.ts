import { 
  Medicine, LabTest, MedicalScan, Doctor, HomeCareService, DiabetesProgram, 
  Hospital, BloodBank, SurgeryPackage, AmbulanceService, InsurancePlan, 
  MotherBabyPackage, SkinTreatment, WellnessPlan, HealthArticle, VaccinationRecord 
} from './types';

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
    indications: ['Fever', 'Headache', 'Pain'],
    dosageInstructions: 'Take after food as needed.',
    routeOfAdministration: 'Oral',
    sideEffects: ['Nausea', 'Gastric Irritation'],
    warnings: ['Do not exceed recommended dose'],
    safetyAdvice: { pregnancy: 'Safe', alcohol: 'Unsafe', driving: 'Safe' },
    variants: [{ id: 'v1', packSize: '15 Tablets', sellingPrice: 30, mrp: 35 }]
  },
  {
    id: 'm2',
    name: 'Azithral 500mg Tablet',
    genericName: 'Azithromycin',
    category: 'Antibiotics',
    price: 119,
    mrp: 130,
    discount: '8% OFF',
    image: 'https://images.unsplash.com/photo-1471864190276-a9468164763c?auto=format&fit=crop&q=80&w=200',
    packSize: '5 Tablets',
    prescriptionRequired: true,
    manufacturer: 'Alembic Pharmaceuticals',
    composition: 'Azithromycin (500mg)',
    dosageForm: 'Tablet',
    therapeuticClass: 'Macrolide Antibiotic',
    indications: ['Bacterial Infections', 'Respiratory Infection'],
    dosageInstructions: 'Take 1 hour before or 2 hours after food.',
    routeOfAdministration: 'Oral',
    sideEffects: ['Diarrhea', 'Nausea'],
    warnings: ['Complete full course'],
    safetyAdvice: { pregnancy: 'Caution', alcohol: 'Unsafe', driving: 'Safe' },
    variants: [{ id: 'v1', packSize: '5 Tablets', sellingPrice: 119, mrp: 130 }]
  },
  {
    id: 'm3',
    name: 'Pan 40 Tablet',
    genericName: 'Pantoprazole',
    category: 'Stomach Care',
    price: 155,
    mrp: 170,
    discount: '9% OFF',
    image: 'https://images.unsplash.com/photo-1550572017-4fcdbb560215?auto=format&fit=crop&q=80&w=200',
    packSize: '15 Tablets',
    prescriptionRequired: true,
    manufacturer: 'Alkem Laboratories',
    composition: 'Pantoprazole (40mg)',
    dosageForm: 'Tablet',
    therapeuticClass: 'Proton Pump Inhibitor',
    indications: ['Acidity', 'GERD', 'Heartburn'],
    dosageInstructions: 'Take on an empty stomach.',
    routeOfAdministration: 'Oral',
    sideEffects: ['Headache', 'Dizziness'],
    warnings: ['Long term use may affect bone density'],
    safetyAdvice: { pregnancy: 'Safe', alcohol: 'Caution', driving: 'Safe' },
    variants: [{ id: 'v1', packSize: '15 Tablets', sellingPrice: 155, mrp: 170 }]
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
    about: 'Senior physician with expertise in viral fevers and chronic disease management.',
    registrationNumber: 'APMC-12345',
    hospitalAffiliation: 'Sunrise Hospital',
    languages: ['English', 'Telugu', 'Hindi'],
    variants: [
      { type: 'Clinic Visit', icon: 'apartment', price: 500, duration: '15 min', nextSlot: 'Tomorrow, 10:00 AM' },
      { type: 'Video Consult', icon: 'videocam', price: 400, duration: '15 min', nextSlot: 'Today, 04:00 PM' }
    ]
  },
  {
    id: 'd2',
    name: 'Dr. Ramya Krishna',
    specialty: 'Dermatologist',
    qualification: 'MD - Dermatology',
    experience: '8 Years',
    hospital: 'Remedi Clinic',
    location: 'Kurnool',
    fee: 600,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1559839734-2b71f1e3c770?auto=format&fit=crop&q=80&w=200',
    about: 'Expert in clinical dermatology and aesthetic treatments.',
    registrationNumber: 'APMC-67890',
    hospitalAffiliation: 'Remedi Clinic',
    languages: ['English', 'Telugu'],
    variants: [
      { type: 'Clinic Visit', icon: 'apartment', price: 600, duration: '15 min', nextSlot: 'Tomorrow, 11:00 AM' }
    ]
  },
  {
    id: 'd3',
    name: 'Dr. Priya Sharma',
    specialty: 'Gynecologist',
    qualification: 'MBBS, MS - OBGYN',
    experience: '15 Years',
    hospital: 'Gowri Gopal Hospital',
    location: 'Kurnool',
    fee: 700,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200',
    about: 'Specialist in high-risk pregnancy and infertility treatments.',
    registrationNumber: 'APMC-54321',
    hospitalAffiliation: 'Gowri Gopal Hospital',
    languages: ['English', 'Telugu', 'Hindi'],
    variants: [
      { type: 'Clinic Visit', icon: 'apartment', price: 700, duration: '20 min', nextSlot: 'Tomorrow, 09:30 AM' }
    ]
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
    description: 'Comprehensive health checkup including blood, urine, and vital organ function tests.',
    preparationInstructions: 'Overnight fasting of 10-12 hours required.',
    parameters: ['Complete Blood Count', 'Lipid Profile', 'Liver Function Test', 'Kidney Function Test'],
    sampleType: 'Blood & Urine',
    fastingRequired: true,
    department: 'Pathology',
    variants: [
      { centerId: 'c1', centerName: 'Vijaya Diagnostic', centerImage: 'https://placehold.co/100', distance: '2.5 km', rating: 4.5, reportTime: '24 Hours', price: 999, mrp: 2499, nextSlot: 'Today 07:00 AM', nabl: true }
    ]
  },
  {
    id: 'l2',
    name: 'HbA1c Test',
    category: 'Diabetes',
    price: 400,
    mrp: 600,
    discount: '33% OFF',
    parameterCount: 1,
    reportTime: '6 Hours',
    description: 'Average blood sugar level over past 3 months.',
    preparationInstructions: 'No fasting required.',
    parameters: ['HbA1c'],
    sampleType: 'Blood',
    fastingRequired: false,
    department: 'Pathology',
    variants: [
      { centerId: 'c1', centerName: 'Vijaya Diagnostic', centerImage: 'https://placehold.co/100', distance: '2.5 km', rating: 4.5, reportTime: '6 Hours', price: 400, mrp: 600, nextSlot: 'Today 08:00 AM', nabl: true }
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
    preparationNotes: 'Remove metal objects. Bring previous reports.',
    variants: [
      { centerId: 'sc1', centerName: 'Kurnool Diagnostics', centerImage: 'https://placehold.co/100', distance: '3 km', price: 3500, mrp: 6000, nextSlot: 'Today, 11:00 AM', nabl: true, rating: 4.7, reportTime: 'Next Day' }
    ]
  },
  {
    id: 'ms2',
    name: 'CT Scan Chest',
    category: 'CT Scan',
    bodyPart: 'Chest',
    price: 2500,
    mrp: 4000,
    discount: '37% OFF',
    image: 'https://cdn-icons-png.flaticon.com/512/2966/2966334.png',
    description: 'Detailed lung imaging.',
    scanDuration: '10 Mins',
    contrastRequired: false,
    preparationNotes: 'Wear loose clothing.',
    variants: [
      { centerId: 'sc1', centerName: 'Kurnool Diagnostics', centerImage: 'https://placehold.co/100', distance: '3 km', price: 2500, mrp: 4000, nextSlot: 'Today, 12:00 PM', nabl: true, rating: 4.7, reportTime: 'Same Day' }
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
    homeVisitFee: 0,
    genderPreferenceAvailable: true,
    staffQualification: 'GNM / BSc Nursing',
    equipmentRequired: false,
    features: ['Vitals Monitoring', 'Medication Administration', 'Wound Dressing'],
    plans: [
      { id: 'p1', name: '12 Hour Shift', duration: '12 Hours', price: 1200 },
      { id: 'p2', name: '24 Hour Shift', duration: '24 Hours', price: 2200 }
    ]
  },
  {
    id: 'eq1',
    title: 'Oxygen Concentrator 5L',
    category: 'Medical Equipment',
    description: 'Rent or buy oxygen concentrators.',
    image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=400',
    rating: 4.6,
    price: 4000,
    priceUnit: 'month',
    plans: [
        { id: 'ep1', name: 'Monthly Rental', duration: '1 Month', price: 4000, type: 'Rental' },
        { id: 'ep2', name: 'Purchase', duration: 'Lifetime', price: 45000, type: 'Purchase' }
    ]
  }
];

export const PHYSIO_SERVICES: HomeCareService[] = [
    {
        id: 'phy1',
        title: 'Post-Surgery Rehab',
        category: 'Physiotherapy',
        subCategory: 'Ortho Care',
        description: 'Specialized therapy for recovery after surgery.',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400',
        rating: 4.9,
        price: 500,
        priceUnit: 'session',
        visitDuration: '45 Mins',
        homeVisitAvailable: true,
        homeVisitFee: 100,
        staffQualification: 'BPT / MPT',
        equipmentRequired: true,
        features: ['Manual Therapy', 'Electrotherapy', 'Exercise Prescription'],
        plans: [
            { id: 'pp1', name: 'Single Session', title: 'Single Session', duration: '1 Session', price: 500, originalPrice: 600, label: 'Trial' },
            { id: 'pp2', name: '10 Sessions', title: '10 Sessions', duration: '10 Sessions', price: 4500, originalPrice: 5000, savings: 500, label: 'Best Value' }
        ],
        conditions: ['Knee Replacement', 'Hip Surgery', 'Fracture']
    }
];

export const DIABETES_PACKAGES: DiabetesProgram[] = [
    {
        id: 'dp1',
        title: 'Diabetes Reversal Program',
        description: 'Holistic approach to manage diabetes.',
        diabetesType: 'Type 2',
        careLevel: 'Comprehensive',
        duration: '3 Months',
        monitoringFrequency: 'Weekly',
        supportChannel: 'App & Call',
        includedServices: ['Doctor Consultation', 'Dietician Plan', 'Fitness Coach'],
        pricing: { mrp: 15000, offerPrice: 9999, billingCycle: 'One Time' },
        isPopular: true
    }
];

export const HOSPITALS: Hospital[] = [
    {
        id: 'h1',
        name: 'KIMS Hospital',
        type: 'Multi-Specialty',
        location: 'Joharapuram Road, Kurnool',
        distance: '2.5 km',
        rating: 4.5,
        reviews: 1200,
        image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=400',
        facilities: ['ICU', 'Emergency', 'Pharmacy', 'Lab'],
        open24x7: true,
        insuranceAccepted: true
    }
];

export const MOTHER_BABY_SERVICES: HomeCareService[] = [
    {
        id: 'mb1',
        title: 'Pregnancy Care (Trimester 1)',
        category: 'Mother & Baby',
        localTitle: 'First Trimester Care',
        description: 'Guidance and monitoring for early pregnancy.',
        image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=400',
        rating: 4.8,
        price: 2000,
        priceUnit: 'month',
        whatsappBooking: true,
        isVerified: true
    }
];

export const MOTHER_BABY_PACKAGES: MotherBabyPackage[] = [
    {
        id: 'mbp1',
        tag: 'Complete Care',
        title: '9-Month Pregnancy Journey',
        subtitle: 'Comprehensive care till delivery',
        features: ['Monthly Scans', 'Doctor Consultations', 'Nutrition Plan'],
        mrp: 30000,
        price: 25000,
        image: 'https://images.unsplash.com/photo-1544126592-807daa215a75?auto=format&fit=crop&q=80&w=400'
    }
];

export const CARE_GUIDES: HealthArticle[] = [
    {
        id: 'cg1',
        title: 'Managing Diabetes in Summer',
        category: 'Chronic Care',
        summary: 'Tips to keep blood sugar stable in heat.',
        image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=80&w=400',
        author: 'Dr. Anjali',
        publishDate: '10 Oct 2023',
        readTime: '5 min read',
        type: 'article',
        isFeatured: true
    }
];

export const VACCINATION_SCHEDULE: VaccinationRecord[] = [
    {
        id: 'v1',
        vaccine: 'BCG',
        age: 'At Birth',
        protectsAgainst: 'Tuberculosis',
        status: 'completed'
    },
    {
        id: 'v2',
        vaccine: 'Hepatitis B',
        age: 'At Birth',
        protectsAgainst: 'Hepatitis B',
        status: 'completed'
    },
    {
        id: 'v3',
        vaccine: 'OPV 1',
        age: '6 Weeks',
        protectsAgainst: 'Polio',
        status: 'pending',
        dueDate: '15 Nov 2023'
    }
];

export const INSURANCE_PLANS: InsurancePlan[] = [
    {
        id: 'ip1',
        planName: 'Family Health Guard',
        provider: 'Star Health',
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/85/Star_Health_and_Allied_Insurance_Logo.svg/1200px-Star_Health_and_Allied_Insurance_Logo.svg.png',
        category: 'Family',
        coverAmount: 500000,
        premium: 12000,
        cashless: true,
        networkHospitals: 14000,
        claimSettlementRatio: '98%',
        features: ['No Room Rent Limit', 'Ayush Cover', 'Maternity Cover'],
        monthlyEmi: 1050
    },
    {
        id: 'ip2',
        planName: 'Optima Restore',
        provider: 'HDFC Ergo',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/HDFC_ERGO_Logo.png',
        category: 'Family',
        coverAmount: 1000000,
        premium: 18000,
        cashless: true,
        networkHospitals: 12000,
        claimSettlementRatio: '99%',
        features: ['100% Restore Benefit', '2x Multiplier Benefit', 'Daily Cash']
    }
];

export const BLOOD_BANKS: BloodBank[] = [
  {
    id: 'bb1',
    name: 'Red Cross Blood Bank',
    address: 'Collectorate Complex, Kurnool',
    contactPhone: '08518-245678',
    availableGroups: ['A+', 'B+', 'O+', 'AB+'],
    isOpen24x7: true,
    distance: '3.0 km',
    location: 'Collectorate Complex',
    phone: '08518-245678',
    isOpen: true
  }
];

export const SURGERY_SPECIALTIES = [
  { id: 'all', label: 'All', icon: 'grid_view' },
  { id: 'Orthopedics', label: 'Orthopedics', icon: 'accessibility' },
  { id: 'Gynecology', label: 'Gynecology', icon: 'pregnant_woman' },
  { id: 'General Surgery', label: 'General', icon: 'medical_services' },
  { id: 'Urology', label: 'Urology', icon: 'water_drop' },
  { id: 'Proctology', label: 'Proctology', icon: 'airline_seat_flat' },
];

export const SURGERY_PACKAGES: SurgeryPackage[] = [
  {
    id: 'sp1',
    procedureName: 'Total Knee Replacement',
    category: 'Orthopedics',
    approxCost: '₹1.5L - ₹2.5L',
    hospital: 'Sunrise Hospital',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=600',
    recoveryTime: '6-8 Weeks',
    stayDuration: '3-5 Days',
    procedure: 'Total Knee Replacement',
    department: 'Orthopedics',
    description: 'A surgical procedure to replace the weight-bearing surfaces of the knee joint to relieve pain and disability.',
    symptoms: ['Severe knee pain', 'Stiffness', 'Chronic inflammation'],
    inclusions: ['Prosthetic Implant', 'Surgeon Fee', 'OT Charges', '5 Days Stay'],
    risks: ['Infection', 'Blood Clots', 'Implant Loosening']
  },
  {
    id: 'sp2',
    procedureName: 'C-Section Delivery',
    category: 'Gynecology',
    approxCost: '₹40k - ₹60k',
    hospital: 'Gowri Gopal Hospital',
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=600',
    recoveryTime: '4-6 Weeks',
    stayDuration: '3 Days',
    procedure: 'Caesarean Section',
    department: 'Gynecology',
    description: 'Surgical delivery of a baby through an incision in the mother\'s abdomen and uterus.',
    symptoms: ['Prolonged labor', 'Fetal distress', 'Multiple pregnancy'],
    inclusions: ['Surgeon & Pediatrician Fee', 'OT Charges', 'Baby Care', '3 Days Stay'],
    risks: ['Infection', 'Blood Loss']
  },
  {
    id: 'sp3',
    procedureName: 'Laparoscopic Appendectomy',
    category: 'General Surgery',
    approxCost: '₹35k - ₹50k',
    hospital: 'KIMS Hospital',
    image: 'https://plus.unsplash.com/premium_photo-1682130157004-057c137d96d5?auto=format&fit=crop&q=80&w=600',
    recoveryTime: '1-2 Weeks',
    stayDuration: '2 Days',
    procedure: 'Appendix Removal',
    department: 'General Surgery',
    description: 'Minimally invasive surgery to remove the appendix when it is infected.',
    symptoms: ['Sudden pain on right side', 'Nausea', 'Fever'],
    inclusions: ['Laparoscopy Kit', 'Surgeon Fee', 'Medicine Kit'],
    risks: ['Bleeding', 'Infection']
  },
  {
    id: 'sp4',
    procedureName: 'Kidney Stone Removal (RIRS)',
    category: 'Urology',
    approxCost: '₹45k - ₹70k',
    hospital: 'Viswabharathi Hospital',
    image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&q=80&w=600',
    recoveryTime: '2-3 Days',
    stayDuration: '1 Day',
    procedure: 'Laser Stone Removal',
    department: 'Urology',
    description: 'Retrograde Intrarenal Surgery (RIRS) uses a laser to break stones inside the kidney.',
    symptoms: ['Severe side pain', 'Blood in urine', 'Nausea'],
    inclusions: ['Laser Charges', 'Stent Cost', 'Urologist Fee'],
    risks: ['Ureter Injury', 'Infection']
  },
  {
    id: 'sp5',
    procedureName: 'Laser Piles Treatment',
    category: 'Proctology',
    approxCost: '₹30k - ₹45k',
    hospital: 'Laser Pile Clinic',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600',
    recoveryTime: '2 Days',
    stayDuration: 'Day Care',
    procedure: 'Laser Hemorrhoidoplasty',
    department: 'Proctology',
    description: 'Advanced laser procedure to shrink and remove piles with minimal pain and no cuts.',
    symptoms: ['Painful bowel movements', 'Bleeding', 'Itching'],
    inclusions: ['Laser Kit', 'Surgeon Fee', 'Follow-up'],
    risks: ['Minor bleeding']
  }
];

export const AMBULANCE_SERVICES: AmbulanceService[] = [
  {
    id: 'amb1',
    type: 'BLS',
    baseCharge: 800,
    pricePerKm: 20,
    image: '',
    equipment: ['Oxygen', 'Stretcher'],
    responseTime: '15 mins'
  },
  {
    id: 'amb2',
    type: 'ALS',
    baseCharge: 2500,
    pricePerKm: 40,
    image: '',
    equipment: ['Ventilator', 'Monitor', 'Defibrillator'],
    responseTime: '20 mins'
  }
];

export const SKIN_HAIR_SERVICES: SkinTreatment[] = [
  {
    id: 'skin_peel',
    name: 'Chemical Peel',
    concern: 'Acne & Pigmentation',
    clinic: 'Remedi Clinic',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600',
    technologyUsed: 'Glycolic/Salicylic',
    sessionsRequired: '4-6 Sessions',
    downtime: '1-2 Days',
    price: 1500,
    rating: 4.8,
    treatment: 'Chemical Peel'
  },
  {
    id: 'skin_laser',
    name: 'Laser Hair Reduction',
    concern: 'Unwanted Hair',
    clinic: 'Remedi Clinic',
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&q=80&w=600',
    technologyUsed: 'Diode Laser (US FDA)',
    sessionsRequired: '6-8 Sessions',
    downtime: 'None',
    price: 2500,
    rating: 4.9,
    treatment: 'LHR - Full Face'
  },
  {
    id: 'skin_prp',
    name: 'PRP Hair Treatment',
    concern: 'Hair Loss / Thinning',
    clinic: 'Remedi Clinic',
    image: 'https://images.unsplash.com/photo-1620804566723-5da20422c39e?auto=format&fit=crop&q=80&w=600',
    technologyUsed: 'Centrifuge',
    sessionsRequired: '4-6 Sessions',
    downtime: '1 Day',
    price: 3500,
    rating: 4.7,
    treatment: 'PRP Therapy'
  },
  {
    id: 'skin_hydra',
    name: 'HydraFacial',
    concern: 'Dull Skin / Tan',
    clinic: 'Remedi Clinic',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600',
    technologyUsed: 'Hydradermabrasion',
    sessionsRequired: 'Monthly',
    downtime: 'None',
    price: 2000,
    rating: 4.9,
    treatment: 'HydraFacial'
  },
  {
    id: 'skin_wart',
    name: 'Wart Removal',
    concern: 'Skin Tags / Warts',
    clinic: 'Remedi Clinic',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=600',
    technologyUsed: 'RF Cautery',
    sessionsRequired: '1 Session',
    downtime: '3-5 Days',
    price: 1000,
    rating: 4.6,
    treatment: 'RF Removal'
  }
];

export const WELLNESS_PLANS: WellnessPlan[] = [
  {
    id: 'well1',
    title: 'Weight Loss Transformation',
    category: 'Weight Loss',
    duration: '3 Months',
    price: 4999,
    expertName: 'Dr. Anjali',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600',
    consultations: 6,
    dietChartFrequency: 'Weekly',
    expert: 'Dr. Anjali'
  }
];

export const BOOKINGS = [
  { 
    id: 'b1', 
    title: 'Dolo 650', 
    subtitle: 'Medicine • Order #1234', 
    status: 'Shipped', 
    date: 'Today, 10:30 AM', 
    amount: 150, 
    type: 'medicine',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200' 
  },
  { 
    id: 'b2', 
    title: 'Dr. Ramesh Gupta', 
    subtitle: 'Appointment • Clinic Visit', 
    status: 'Confirmed', 
    date: 'Tomorrow, 11:00 AM', 
    amount: 500, 
    type: 'doctor',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200' 
  }
];

export const SURGERY_TYPES = [
    { id: 's_knee', name: 'Knee Replacement', cost: 180000 },
    { id: 's_cataract', name: 'Cataract (Phaco)', cost: 35000 },
    { id: 's_appendix', name: 'Appendectomy', cost: 45000 },
    { id: 's_hernia', name: 'Hernia Repair', cost: 50000 },
    { id: 's_gallbladder', name: 'Gallbladder Removal', cost: 55000 },
];

export const ICU_EQUIPMENT_RATES = {
    ventilator: 2000,
    monitor: 500,
    oxygen: 800,
    hospitalBed: 300,
    syringePump: 200,
};

export const NURSE_RATES = {
    icu: 2500,
    general: 1200
};
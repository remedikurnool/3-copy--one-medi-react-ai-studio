export type VendorId = string;
export type UserId = string;
export type OrderId = string;
export type BookingId = string;

// Common Status Types
export type Status = 'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK' | 'ARCHIVED';
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'RETURNED';
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'RESCHEDULED';

// ==========================================
// 1. MEDICINES MODULE
// ==========================================
export interface Medicine {
    // Core Product Fields
    id: string;
    name: string;
    slug: string;
    brandName?: string;
    genericName?: string;
    category: string;
    subCategory?: string;
    manufacturer: string;
    hsnCode?: string;
    drugSchedule?: 'H' | 'H1' | 'X' | 'OTC';
    prescriptionRequired: boolean;
    description: string; // HTML supported
    shortDescription?: string;
    composition: string;
    strength?: string; // 500mg, 250mg etc.
    dosageForm: 'Tablet' | 'Capsule' | 'Syrup' | 'Injection' | 'Cream' | 'Gel' | 'Drops' | 'Inhaler' | 'Sachet' | 'Patch' | 'Spray' | 'Liquid' | 'Powder' | 'Granules' | 'Lotion' | 'Ointment' | 'Suppository' | 'Suspension' | 'Emulsion' | 'Solution' | 'Paste' | 'Disc' | 'Implant' | 'System' | 'Enema' | 'Device' | 'Kit' | string;
    packSize: string;
    unit: string; // Strip, Bottle
    quantityPerPack: number;
    price: number;
    mrp: number;
    discountPercent?: number;
    taxPercent?: number; // GST
    finalPrice?: number; // computed
    stockQuantity: number;
    minStockLevel?: number;
    lowStockAlert?: boolean;
    images: string[];
    image?: string; // Backwards compatibility
    thumbnailImage?: string;
    barcode?: string;
    batchNumber?: string;
    expiryDate?: string;
    sideEffects?: string[];
    contraindications?: string[];
    warnings?: string[];
    storageInstructions?: string;
    usageInstructions?: string;
    tags?: string[];
    seoTitle?: string;
    seoDescription?: string;
    isFeatured?: boolean;
    isTrending?: boolean;
    status: Status;
    vendorId: VendorId;
    createdAt?: string;
    updatedAt?: string;

    // Ecommerce Fields
    averageRating?: number; // Renamed from rating to match PRD, but kept rating for backward compatibility if needed
    rating?: number; // Kept for backward compatibility
    totalReviews?: number;
    totalOrders?: number;
    reorderFrequency?: number;
    wishlistCount?: number;
    viewCount?: number;
    returnEligible: boolean;
    returnWindowDays?: number;

    // Safety (from previous definition, aligning with PRD structure if possible or keeping as is)
    safety?: {
        pregnancy?: string;
        alcohol?: string;
        driving?: string;
        breastfeeding?: string;
        kidney?: string;
        liver?: string;
    };

    // Additional fields from previous interface that might be useful to keep
    verifiedByDoctor?: string;
    activeIngredients?: string[];
    doctorRecommended?: boolean;
    brandTrust?: string;
    therapeuticClass?: string;
    indications?: string[];
    dosageInstructions?: string; // Duplicate, keeping one
    routeOfAdministration?: string;
    variants?: any[];
}

// ==========================================
// 2. LAB TESTS MODULE
// ==========================================
export interface LabTest {
    // Core Fields
    id: string;
    name: string;
    slug: string;
    category: string; // Blood, Thyroid, Diabetes
    subCategory?: string;
    description: string;
    shortDescription?: string;
    preparationInstructions?: string;
    fastingRequired: boolean;
    fastingHours?: number;
    sampleType: 'Blood' | 'Urine' | 'Saliva' | 'Stool' | string;
    reportDeliveryTime: string; // 24 hrs, 48 hrs
    parametersIncluded?: string[];
    price: number;
    mrp: number;
    discountPercent?: number;
    homeCollectionAvailable: boolean;
    centerCollectionAvailable: boolean;
    image?: string;
    reportFormat?: 'PDF' | 'Smart Interactive' | string;
    sampleStorageConditions?: string;
    ageRestriction?: string;
    genderRestriction?: 'Male' | 'Female' | 'Any';
    isPackage: boolean;
    includedTests?: LabTest[]; // For packages
    status: Status;
    vendorId: VendorId;

    // Booking Fields
    availableCities?: string[];
    availableTimeSlots?: string[];
    maxBookingsPerSlot?: number;
    technicianAssigned?: string;

    // Reviews & Metrics
    averageRating?: number;
    totalReviews?: number;
    totalBookings?: number;

    // Extra Data Fields (Keeping for backward compatibility if needed)
    prerequisites?: string;
    marketPrice?: number; // mapped to mrp
    finalPrice?: number; // mapped to price
    turnaroundTime?: string; // mapped to reportDeliveryTime
    accreditedBy?: string[];
    tubesRequired?: number;
    provider?: string;
    viewCount?: number;
    bookingsCount?: number;
    isFeatured?: boolean;
    tags?: string[];
    rating?: number;
    reportTime?: string; // backward compat key for constants
    variants?: any[]; // backward compat for current constants
    department?: string; // backward compat
}

// ==========================================
// 3. SCANS MODULE
// ==========================================
export interface ScanVariant {
    centerId: string;
    centerName: string;
    centerImage?: string;
    distance?: string;
    price: number;
    mrp: number;
    nextSlot?: string;
    nabl?: boolean;
    rating?: number;
}

export interface Scan {
    id: string;
    name: string;
    slug: string;
    category: string;
    scanType: 'MRI' | 'CT' | 'Ultrasound' | 'X-Ray' | 'PET-CT' | string;
    bodyPart?: string;
    description: string;
    preparationInstructions?: string;
    contrastRequired: boolean;
    sedationRequired: boolean;
    price: number;
    mrp: number;
    discountPercent?: number;
    reportTime: string;
    image?: string;
    centerRequired: boolean;
    homeServiceAvailable: boolean; // portable
    radiationExposureLevel?: string;
    contraindications?: string[];
    status: Status;
    vendorId: VendorId;

    // Center Fields
    centerName?: string; // If specific to a center
    centerAddress?: string;
    centerLocation?: { lat: number; lng: number };
    equipmentDetails?: string;
    machineModel?: string;
    isNABL?: boolean;
    isNABH?: boolean;
    variants?: ScanVariant[];

    // Backward compatibility
    marketPrice?: number; // mapped to mrp
    finalPrice?: number; // mapped to price
    turnaroundTime?: string; // mapped to reportTime
    discountPercentage?: number; // mapped to discountPercent
}

// ==========================================
// 4. DOCTORS MODULE
// ==========================================
export interface Doctor {
    id: string;
    name: string;
    slug: string;
    qualification: string;
    specialization: string;
    superSpecialization?: string;
    experienceYears: number;
    registrationNumber: string;
    consultationFee: number;
    followUpFee?: number;
    languages: string[];
    bio: string;
    image: string;
    hospitalAffiliation?: string;
    awards?: string[];
    publications?: string[];
    availableOnline: boolean;
    availableInClinic: boolean;
    availableAtMultipleCenters?: boolean;
    status: Status;
    vendorId: VendorId;
    // Availability
    availableDays: string[];
    availableTimeSlots: string[];
    maxPatientsPerSlot?: number;
    consultationDurationMinutes: number;
    slotBufferTime?: number;
    emergencyConsultAvailable: boolean;
    // Reputation
    averageRating?: number; // PRD name
    rating?: number; // component compat
    totalReviews?: number;
    totalConsultations?: number;
    responseTime?: string;
    cancellationRate?: number;
    variants?: any[]; // for UI booking options
}

// ==========================================
// 5. HOME CARE SERVICES
// ==========================================
export interface HomeCareService {
    id: string;
    name: string;
    slug?: string;
    category: 'Nurse' | 'Physiotherapy' | 'Elder Care' | 'Baby Care' | string;
    subCategory?: string;
    type?: string;
    description: string;
    image: string;
    rating: number;
    price: number;
    priceUnit: string;
    visitDuration?: string;
    duration?: string;
    pricePerHour?: number;
    pricePerVisit?: number;
    minimumBookingHours?: number;
    serviceAreaCities?: string[];
    requiresMedicalPrescription?: boolean;
    homeVisitAvailable?: boolean;
    homeVisitFee?: number;
    genderPreferenceAvailable?: boolean;
    staffQualification?: string;
    equipmentProvided?: boolean;
    equipmentRequired?: boolean;
    features?: string[];
    serviceInclusions?: string[];
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
    certifications?: string[];
    reviewsList?: {
        id: string;
        author: string;
        rating: number;
        comment: string;
        date: string;
        isVerified: boolean;
    }[];
    status?: Status;
    vendorId?: VendorId;
}

// ==========================================
// 6. AMBULANCE MODULE
// ==========================================
export interface Ambulance {
    id: string;
    ambulanceType: 'Basic' | 'ICU' | 'Ventilator' | 'Mortuary';
    pricePerKm: number;
    baseFare: number;
    oxygenSupport: boolean;
    ventilatorSupport: boolean;
    paramedicIncluded: boolean;
    gpsTrackingEnabled: boolean;
    coverageArea?: string;
    responseTimeEstimate?: string;
    status: Status;
    vendorId: VendorId;
    // Live Fields
    currentLocation?: { lat: number; lng: number };
    driverDetails?: { name: string; phone: string };
    vehicleNumber?: string;
}

// ==========================================
// 7. BLOOD BANK MODULE
// ==========================================
export interface BloodUnit {
    id: string;
    bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    availableUnits: number;
    componentType: 'Whole' | 'Platelets' | 'Plasma' | 'RBC';
    lastUpdated: string;
    storageFacility?: string;
    emergencyContact?: string;
    availabilityStatus: 'AVAILABLE' | 'SCARCE' | 'CRITICAL';
    vendorId: VendorId;
}

// ==========================================
// 8. INSURANCE MODULE
// ==========================================
export interface InsurancePlan {
    id: string;
    planName: string;
    providerName: string;
    logo?: string;
    category: string;
    coverageAmount: number;
    premiumAmount: number;
    monthlyEmi?: number;
    cashless: boolean;
    networkHospitals: number;
    claimSettlementRatio: string;
    coverageDetails: string[];
    waitingPeriod?: string;
    claimProcess?: string;
    cashlessHospitals?: string[];
    eligibilityCriteria?: string;
    ageLimit?: string;
    preExistingConditionsCovered: boolean;
    image?: string;
    status: Status;
    vendorId: VendorId;
}

// ==========================================
// 9. ORDER SYSTEM
// ==========================================
export interface OrderItem {
    itemId: string;
    name: string;
    type: 'medicine' | 'lab_test' | 'scan' | 'product';
    quantity: number;
    price: number;
    discount?: number;
    tax?: number;
    image?: string;
}

export interface Order {
    id: OrderId;
    orderNumber: string;
    userId: UserId;
    vendorId: VendorId;
    items: OrderItem[];
    subtotal: number;
    discount: number;
    tax: number;
    deliveryCharge: number;
    total: number;
    couponCode?: string;
    prescriptionId?: string;
    paymentMethod: 'COD' | 'ONLINE' | 'WALLET';
    paymentStatus: PaymentStatus;
    orderStatus: OrderStatus;
    trackingNumber?: string;
    deliveryPartner?: string;
    expectedDeliveryDate?: string;
    deliveredAt?: string;
    cancelReason?: string;
    refundStatus?: 'NONE' | 'INITIATED' | 'COMPLETED';
    refundAmount?: number;
    createdAt: string;
}

// ==========================================
// 10. BOOKING SYSTEM
// ==========================================
export interface Booking {
    id: BookingId;
    bookingNumber: string;
    userId: UserId;
    vendorId: VendorId;
    serviceType: 'doctor' | 'lab' | 'scan' | 'home_care' | 'ambulance';
    serviceId: string;
    patientDetails: {
        name: string;
        age: number;
        gender: string;
        phone: string;
    };
    date: string;
    timeSlot: string;
    collectionType?: 'HOME' | 'CENTER';
    addressId?: string;
    amount: number;
    paymentStatus: PaymentStatus;
    bookingStatus: BookingStatus;
    reportUrl?: string;
    reportStatus?: 'PENDING' | 'GENERATED' | 'DELIVERED';
    cancellationReason?: string;
}

// ==========================================
// USER MODULE
// ==========================================
export interface User {
    id: UserId;
    name: string;
    email: string;
    phone: string;
    gender?: string;
    dateOfBirth?: string;
    bloodGroup?: string;
    allergies?: string[];
    chronicConditions?: string[];
    healthRecords?: { id: string; name: string; url: string; date: string }[];
    familyMembers?: { id: string; name: string; relation: string }[];
    savedAddresses?: { id: string; type: string; address: string; city: string; zip: string }[];
    walletBalance: number;
    loyaltyPoints: number;
    subscriptionPlan?: 'FREE' | 'GOLD' | 'PLATINUM';
    preferredLanguage?: string;
    notificationPreferences?: {
        email: boolean;
        sms: boolean;
        push: boolean;
        whatsapp: boolean;
    };
}

// ==========================================
// VENDOR MODULE
// ==========================================
export interface Vendor {
    id: VendorId;
    name: string;
    type: 'PHARMACY' | 'LAB' | 'HOSPITAL' | 'CLINIC' | 'HOME_CARE_AGENCY';
    gstNumber?: string;
    licenseNumber?: string;
    kycDocuments?: string[];
    bankDetails?: {
        accountNumber: string;
        ifsc: string;
        bankName: string;
    };
    commissionRate: number;
    rating: number;
    totalRevenue: number;
    settlementCycle: 'DAILY' | 'WEEKLY' | 'MONTHLY';
    payoutStatus: 'PENDING' | 'PROCESSED';
}
// ==========================================
// 11. CHRONIC CARE & WELLNESS
// ==========================================
export interface DiabetesProgram {
    id: string;
    name: string;
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
    features?: string[];
}

export interface WellnessPlan {
    id: string;
    name: string;
    category: string;
    description: string;
    duration: string;
    price: number;
    originalPrice?: number;
    expertName: string;
    image: string;
    consultations: number;
    dietChartFrequency: string;
    expert?: string;
}

export interface MotherBabyPackage {
    id: string;
    tag: string;
    name: string;
    subtitle: string;
    features: string[];
    mrp: number;
    price: number;
    image: string;
}

export interface SurgeryPackage {
    id: string;
    name: string; // standardized from procedureName
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

export interface HealthArticle {
    id: string;
    name: string; // standardized from title
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
// ==========================================
// 12. AUXILIARY ENTITIES
// ==========================================
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
    licenseNumber?: string;
    location: string;
    distance: string; // calculated
    phone: string;
    email?: string;
    website?: string;
    operatingHours?: string;
    hasTraumaFacility?: boolean;
    availableGroups: string[];
    image?: string;
    status?: Status;
    vendorId?: VendorId;
    isOpen: boolean; // calculated
    address: string;
    contactPhone?: string; // duplicate of phone but keeping for compat
    isOpen24x7?: boolean;
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

export interface VendorInfo {
    name: string;
    location: string;
    image: string;
    type: string;
}

export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    mrp: number;
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
    activeIngredients?: string[];
    benefits?: string[];
    expertNote?: string;
}

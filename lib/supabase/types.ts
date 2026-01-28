export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            addresses: {
                Row: {
                    city_id: string | null
                    created_at: string | null
                    id: string
                    is_default: boolean | null
                    landmark: string | null
                    latitude: number | null
                    line_1: string
                    line_2: string | null
                    longitude: number | null
                    pincode: string | null
                    profile_id: string
                    tag: string | null
                    updated_at: string | null
                }
                Insert: {
                    city_id?: string | null
                    created_at?: string | null
                    id?: string
                    is_default?: boolean | null
                    landmark?: string | null
                    latitude?: number | null
                    line_1: string
                    line_2?: string | null
                    longitude?: number | null
                    pincode?: string | null
                    profile_id: string
                    tag?: string | null
                    updated_at?: string | null
                }
                Update: {
                    city_id?: string | null
                    created_at?: string | null
                    id?: string
                    is_default?: boolean | null
                    landmark?: string | null
                    latitude?: number | null
                    line_1?: string
                    line_2?: string | null
                    longitude?: number | null
                    pincode?: string | null
                    profile_id?: string
                    tag?: string | null
                    updated_at?: string | null
                }
                Relationships: []
            }
            cart_items: {
                Row: {
                    branch_id: string | null
                    cart_id: string
                    created_at: string | null
                    id: string
                    notes: string | null
                    patient_id: string | null
                    quantity: number | null
                    selected_slot_id: string | null
                    service_catalog_id: string
                    unit_price: number | null
                    updated_at: string | null
                    vendor_id: string | null
                }
                Insert: {
                    branch_id?: string | null
                    cart_id: string
                    created_at?: string | null
                    id?: string
                    notes?: string | null
                    patient_id?: string | null
                    quantity?: number | null
                    selected_slot_id?: string | null
                    service_catalog_id: string
                    unit_price?: number | null
                    updated_at?: string | null
                    vendor_id?: string | null
                }
                Update: {
                    branch_id?: string | null
                    cart_id?: string
                    created_at?: string | null
                    id?: string
                    notes?: string | null
                    patient_id?: string | null
                    quantity?: number | null
                    selected_slot_id?: string | null
                    service_catalog_id?: string
                    unit_price?: number | null
                    updated_at?: string | null
                    vendor_id?: string | null
                }
                Relationships: []
            }
            carts: {
                Row: {
                    created_at: string | null
                    id: string
                    profile_id: string
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    id?: string
                    profile_id: string
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    id?: string
                    profile_id?: string
                    updated_at?: string | null
                }
                Relationships: []
            }
            doctors: {
                Row: {
                    bio: string | null
                    consultation_fee: number | null
                    created_at: string | null
                    experience_years: number | null
                    followup_fee: number | null
                    fts: unknown | null
                    id: string
                    image_url: string | null
                    in_person_consultation: boolean | null
                    is_active: boolean | null
                    languages: string[] | null
                    name: string
                    profile_id: string | null
                    qualifications: string[] | null
                    rating: number | null
                    rating_count: number | null
                    registration_council: string | null
                    registration_number: string | null
                    specialty: string
                    sub_specialty: string | null
                    updated_at: string | null
                    video_consultation: boolean | null
                }
                Insert: {
                    bio?: string | null
                    consultation_fee?: number | null
                    created_at?: string | null
                    experience_years?: number | null
                    followup_fee?: number | null
                    fts?: unknown | null
                    id?: string
                    image_url?: string | null
                    in_person_consultation?: boolean | null
                    is_active?: boolean | null
                    languages?: string[] | null
                    name: string
                    profile_id?: string | null
                    qualifications?: string[] | null
                    rating?: number | null
                    rating_count?: number | null
                    registration_council?: string | null
                    registration_number?: string | null
                    specialty: string
                    sub_specialty?: string | null
                    updated_at?: string | null
                    video_consultation?: boolean | null
                }
                Update: {
                    bio?: string | null
                    consultation_fee?: number | null
                    created_at?: string | null
                    experience_years?: number | null
                    followup_fee?: number | null
                    fts?: unknown | null
                    id?: string
                    image_url?: string | null
                    in_person_consultation?: boolean | null
                    is_active?: boolean | null
                    languages?: string[] | null
                    name?: string
                    profile_id?: string | null
                    qualifications?: string[] | null
                    rating?: number | null
                    rating_count?: number | null
                    registration_council?: string | null
                    registration_number?: string | null
                    specialty?: string
                    sub_specialty?: string | null
                    updated_at?: string | null
                    video_consultation?: boolean | null
                }
                Relationships: []
            }
            family_members: {
                Row: {
                    age: number | null
                    created_at: string | null
                    gender: string | null
                    id: string
                    name: string
                    owner_id: string
                    relation: string | null
                    updated_at: string | null
                }
                Insert: {
                    age?: number | null
                    created_at?: string | null
                    gender?: string | null
                    id?: string
                    name: string
                    owner_id: string
                    relation?: string | null
                    updated_at?: string | null
                }
                Update: {
                    age?: number | null
                    created_at?: string | null
                    gender?: string | null
                    id?: string
                    name?: string
                    owner_id?: string
                    relation?: string | null
                    updated_at?: string | null
                }
                Relationships: []
            }
            lab_tests: {
                Row: {
                    category: string | null
                    created_at: string | null
                    department: string | null
                    description: string | null
                    fasting_hours: number | null
                    fasting_required: boolean | null
                    fts: unknown | null
                    id: string
                    image_url: string | null
                    is_active: boolean | null
                    name: string
                    parameters: string[] | null
                    preparation_instructions: string | null
                    report_time_hours: number | null
                    sample_type: string | null
                    updated_at: string | null
                }
                Insert: {
                    category?: string | null
                    created_at?: string | null
                    department?: string | null
                    description?: string | null
                    fasting_hours?: number | null
                    fasting_required?: boolean | null
                    fts?: unknown | null
                    id?: string
                    image_url?: string | null
                    is_active?: boolean | null
                    name: string
                    parameters?: string[] | null
                    preparation_instructions?: string | null
                    report_time_hours?: number | null
                    sample_type?: string | null
                    updated_at?: string | null
                }
                Update: {
                    category?: string | null
                    created_at?: string | null
                    department?: string | null
                    description?: string | null
                    fasting_hours?: number | null
                    fasting_required?: boolean | null
                    fts?: unknown | null
                    id?: string
                    image_url?: string | null
                    is_active?: boolean | null
                    name?: string
                    parameters?: string[] | null
                    preparation_instructions?: string | null
                    report_time_hours?: number | null
                    sample_type?: string | null
                    updated_at?: string | null
                }
                Relationships: []
            }
            medicine_inventory: {
                Row: {
                    batch_number: string | null
                    branch_id: string
                    created_at: string | null
                    expiry_date: string | null
                    id: string
                    medicine_id: string
                    mrp: number
                    quantity: number | null
                    selling_price: number
                    updated_at: string | null
                }
                Insert: {
                    batch_number?: string | null
                    branch_id: string
                    created_at?: string | null
                    expiry_date?: string | null
                    id?: string
                    medicine_id: string
                    mrp: number
                    quantity?: number | null
                    selling_price: number
                    updated_at?: string | null
                }
                Update: {
                    batch_number?: string | null
                    branch_id?: string
                    created_at?: string | null
                    expiry_date?: string | null
                    id?: string
                    medicine_id?: string
                    mrp?: number
                    quantity?: number | null
                    selling_price?: number
                    updated_at?: string | null
                }
                Relationships: []
            }
            medicine_master: {
                Row: {
                    composition: string | null
                    contraindications: string[] | null
                    created_at: string | null
                    form: string | null
                    fts: unknown | null
                    generic_name: string | null
                    hsn_code: string | null
                    id: string
                    image_url: string | null
                    indications: string[] | null
                    is_active: boolean | null
                    manufacturer: string | null
                    name: string
                    pack_size: string | null
                    parent_id: string | null
                    prescription_required: boolean | null
                    schedule: string | null
                    side_effects: string[] | null
                    storage_instructions: string | null
                    strength: string | null
                    unit: string | null
                    updated_at: string | null
                    version: number | null
                }
                Insert: {
                    composition?: string | null
                    contraindications?: string[] | null
                    created_at?: string | null
                    form?: string | null
                    fts?: unknown | null
                    generic_name?: string | null
                    hsn_code?: string | null
                    id?: string
                    image_url?: string | null
                    indications?: string[] | null
                    is_active?: boolean | null
                    manufacturer?: string | null
                    name: string
                    pack_size?: string | null
                    parent_id?: string | null
                    prescription_required?: boolean | null
                    schedule?: string | null
                    side_effects?: string[] | null
                    storage_instructions?: string | null
                    strength?: string | null
                    unit?: string | null
                    updated_at?: string | null
                    version?: number | null
                }
                Update: {
                    composition?: string | null
                    contraindications?: string[] | null
                    created_at?: string | null
                    form?: string | null
                    fts?: unknown | null
                    generic_name?: string | null
                    hsn_code?: string | null
                    id?: string
                    image_url?: string | null
                    indications?: string[] | null
                    is_active?: boolean | null
                    manufacturer?: string | null
                    name?: string
                    pack_size?: string | null
                    parent_id?: string | null
                    prescription_required?: boolean | null
                    schedule?: string | null
                    side_effects?: string[] | null
                    storage_instructions?: string | null
                    strength?: string | null
                    unit?: string | null
                    updated_at?: string | null
                    version?: number | null
                }
                Relationships: []
            }
            order_items: {
                Row: {
                    branch_id: string | null
                    created_at: string | null
                    fulfillment_status: string | null
                    id: string
                    order_id: string
                    quantity: number
                    service_catalog_id: string
                    service_snapshot: Json | null
                    unit_price: number
                    updated_at: string | null
                    vendor_id: string | null
                }
                Insert: {
                    branch_id?: string | null
                    created_at?: string | null
                    fulfillment_status?: string | null
                    id?: string
                    order_id: string
                    quantity?: number
                    service_catalog_id: string
                    service_snapshot?: Json | null
                    unit_price: number
                    updated_at?: string | null
                    vendor_id?: string | null
                }
                Update: {
                    branch_id?: string | null
                    created_at?: string | null
                    fulfillment_status?: string | null
                    id?: string
                    order_id?: string
                    quantity?: number
                    service_catalog_id?: string
                    service_snapshot?: Json | null
                    unit_price?: number
                    updated_at?: string | null
                    vendor_id?: string | null
                }
                Relationships: []
            }
            orders: {
                Row: {
                    address_id: string | null
                    coupon_id: string | null
                    created_at: string | null
                    discount_amount: number | null
                    id: string
                    order_number: string | null
                    order_status: string | null
                    payment_method: string | null
                    payment_status: string | null
                    profile_id: string
                    subtotal: number
                    tax_amount: number | null
                    total_amount: number
                    updated_at: string | null
                }
                Insert: {
                    address_id?: string | null
                    coupon_id?: string | null
                    created_at?: string | null
                    discount_amount?: number | null
                    id?: string
                    order_number?: string | null
                    order_status?: string | null
                    payment_method?: string | null
                    payment_status?: string | null
                    profile_id: string
                    subtotal: number
                    tax_amount?: number | null
                    total_amount: number
                    updated_at?: string | null
                }
                Update: {
                    address_id?: string | null
                    coupon_id?: string | null
                    created_at?: string | null
                    discount_amount?: number | null
                    id?: string
                    order_number?: string | null
                    order_status?: string | null
                    payment_method?: string | null
                    payment_status?: string | null
                    profile_id?: string
                    subtotal?: number
                    tax_amount?: number | null
                    total_amount?: number
                    updated_at?: string | null
                }
                Relationships: []
            }
            profiles: {
                Row: {
                    avatar_url: string | null
                    blood_group: string | null
                    created_at: string | null
                    date_of_birth: string | null
                    email: string | null
                    emergency_contact: string | null
                    full_name: string | null
                    gender: string | null
                    id: string
                    phone: string | null
                    role_id: string | null
                    updated_at: string | null
                }
                Insert: {
                    avatar_url?: string | null
                    blood_group?: string | null
                    created_at?: string | null
                    date_of_birth?: string | null
                    email?: string | null
                    emergency_contact?: string | null
                    full_name?: string | null
                    gender?: string | null
                    id: string
                    phone?: string | null
                    role_id?: string | null
                    updated_at?: string | null
                }
                Update: {
                    avatar_url?: string | null
                    blood_group?: string | null
                    created_at?: string | null
                    date_of_birth?: string | null
                    email?: string | null
                    emergency_contact?: string | null
                    full_name?: string | null
                    gender?: string | null
                    id?: string
                    phone?: string | null
                    role_id?: string | null
                    updated_at?: string | null
                }
                Relationships: []
            }
            scans_master: {
                Row: {
                    body_part: string | null
                    contraindications: string[] | null
                    contrast_required: boolean | null
                    created_at: string | null
                    description: string | null
                    duration_minutes: number | null
                    fts: unknown | null
                    id: string
                    image_url: string | null
                    is_active: boolean | null
                    modality: string | null
                    name: string
                    preparation_instructions: string | null
                    updated_at: string | null
                }
                Insert: {
                    body_part?: string | null
                    contraindications?: string[] | null
                    contrast_required?: boolean | null
                    created_at?: string | null
                    description?: string | null
                    duration_minutes?: number | null
                    fts?: unknown | null
                    id?: string
                    image_url?: string | null
                    is_active?: boolean | null
                    modality?: string | null
                    name: string
                    preparation_instructions?: string | null
                    updated_at?: string | null
                }
                Update: {
                    body_part?: string | null
                    contraindications?: string[] | null
                    contrast_required?: boolean | null
                    created_at?: string | null
                    description?: string | null
                    duration_minutes?: number | null
                    fts?: unknown | null
                    id?: string
                    image_url?: string | null
                    is_active?: boolean | null
                    modality?: string | null
                    name?: string
                    preparation_instructions?: string | null
                    updated_at?: string | null
                }
                Relationships: []
            }
            service_bookings: {
                Row: {
                    booked_for_id: string | null
                    booking_date: string
                    booking_time: string | null
                    branch_id: string | null
                    created_at: string | null
                    fulfillment_status: string | null
                    id: string
                    notes: string | null
                    order_item_id: string | null
                    profile_id: string
                    service_catalog_id: string
                    slot_id: string | null
                    updated_at: string | null
                    vendor_id: string | null
                }
                Insert: {
                    booked_for_id?: string | null
                    booking_date: string
                    booking_time?: string | null
                    branch_id?: string | null
                    created_at?: string | null
                    fulfillment_status?: string | null
                    id?: string
                    notes?: string | null
                    order_item_id?: string | null
                    profile_id: string
                    service_catalog_id: string
                    slot_id?: string | null
                    updated_at?: string | null
                    vendor_id?: string | null
                }
                Update: {
                    booked_for_id?: string | null
                    booking_date?: string
                    booking_time?: string | null
                    branch_id?: string | null
                    created_at?: string | null
                    fulfillment_status?: string | null
                    id?: string
                    notes?: string | null
                    order_item_id?: string | null
                    profile_id?: string
                    service_catalog_id?: string
                    slot_id?: string | null
                    updated_at?: string | null
                    vendor_id?: string | null
                }
                Relationships: []
            }
            vendors: {
                Row: {
                    contact_email: string | null
                    contact_phone: string | null
                    created_at: string | null
                    id: string
                    is_active: boolean | null
                    logo_url: string | null
                    name: string
                    updated_at: string | null
                    vendor_type: string
                }
                Insert: {
                    contact_email?: string | null
                    contact_phone?: string | null
                    created_at?: string | null
                    id?: string
                    is_active?: boolean | null
                    logo_url?: string | null
                    name: string
                    updated_at?: string | null
                    vendor_type: string
                }
                Update: {
                    contact_email?: string | null
                    contact_phone?: string | null
                    created_at?: string | null
                    id?: string
                    is_active?: boolean | null
                    logo_url?: string | null
                    name?: string
                    updated_at?: string | null
                    vendor_type?: string
                }
                Relationships: []
            }
            vendor_locations: {
                Row: {
                    address: string | null
                    city_id: string | null
                    created_at: string | null
                    id: string
                    is_active: boolean | null
                    latitude: number | null
                    longitude: number | null
                    name: string
                    operating_hours: Json | null
                    phone: string | null
                    pincode: string | null
                    updated_at: string | null
                    vendor_id: string
                }
                Insert: {
                    address?: string | null
                    city_id?: string | null
                    created_at?: string | null
                    id?: string
                    is_active?: boolean | null
                    latitude?: number | null
                    longitude?: number | null
                    name: string
                    operating_hours?: Json | null
                    phone?: string | null
                    pincode?: string | null
                    updated_at?: string | null
                    vendor_id: string
                }
                Update: {
                    address?: string | null
                    city_id?: string | null
                    created_at?: string | null
                    id?: string
                    is_active?: boolean | null
                    latitude?: number | null
                    longitude?: number | null
                    name?: string
                    operating_hours?: Json | null
                    phone?: string | null
                    pincode?: string | null
                    updated_at?: string | null
                    vendor_id?: string
                }
                Relationships: []
            }
            insurance_plans: {
                Row: {
                    category: string | null
                    claim_settlement_ratio: number | null
                    copay_percentage: number | null
                    cover_amount: number | null
                    created_at: string | null
                    features: string[] | null
                    id: string
                    is_active: boolean | null
                    logo_url: string | null
                    monthly_emi: number | null
                    name: string
                    network_hospitals: number | null
                    premium: number | null
                    provider: string
                    updated_at: string | null
                    waiting_period: string | null
                }
                Insert: {
                    category?: string | null
                    claim_settlement_ratio?: number | null
                    copay_percentage?: number | null
                    cover_amount?: number | null
                    created_at?: string | null
                    features?: string[] | null
                    id?: string
                    is_active?: boolean | null
                    logo_url?: string | null
                    monthly_emi?: number | null
                    name: string
                    network_hospitals?: number | null
                    premium?: number | null
                    provider: string
                    updated_at?: string | null
                    waiting_period?: string | null
                }
                Update: {
                    category?: string | null
                    claim_settlement_ratio?: number | null
                    copay_percentage?: number | null
                    cover_amount?: number | null
                    created_at?: string | null
                    features?: string[] | null
                    id?: string
                    is_active?: boolean | null
                    logo_url?: string | null
                    monthly_emi?: number | null
                    name?: string
                    network_hospitals?: number | null
                    premium?: number | null
                    provider?: string
                    updated_at?: string | null
                    waiting_period?: string | null
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            is_admin: {
                Args: Record<PropertyKey, never>
                Returns: boolean
            }
            has_vendor_access: {
                Args: { vendor_uuid: string }
                Returns: boolean
            }
        }
        Enums: {
            order_status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'OUT_FOR_DELIVERY' | 'COMPLETED' | 'CANCELLED'
            payment_status: 'AWAITING' | 'PAID' | 'FAILED' | 'REFUNDED'
            fulfillment_status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'NO_SHOW' | 'CANCELLED'
            service_type: 'MEDICINE' | 'LAB_TEST' | 'SCAN' | 'DOCTOR_CONSULT' | 'HOME_SERVICE' | 'INSURANCE' | 'CONTENT'
            vendor_type: 'PHARMACY' | 'DIAGNOSTIC_LAB' | 'SCAN_CENTER' | 'HOSPITAL' | 'PHYSIO_AGENCY' | 'AMBULANCE_PROVIDER' | 'CONTENT_PARTNER'
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

// Helper types for easier usage
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Convenient aliases
export type Medicine = Tables<'medicine_master'>
export type Doctor = Tables<'doctors'>
export type LabTest = Tables<'lab_tests'>
export type Scan = Tables<'scans_master'>
export type Profile = Tables<'profiles'>
export type Address = Tables<'addresses'>
export type FamilyMember = Tables<'family_members'>
export type Order = Tables<'orders'>
export type OrderItem = Tables<'order_items'>
export type Cart = Tables<'carts'>
export type CartItem = Tables<'cart_items'>
export type Vendor = Tables<'vendors'>
export type VendorLocation = Tables<'vendor_locations'>
export type MedicineInventory = Tables<'medicine_inventory'>
export type InsurancePlan = Tables<'insurance_plans'>
export type ServiceBooking = Tables<'service_bookings'>

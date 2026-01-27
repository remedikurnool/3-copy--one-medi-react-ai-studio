-- ============================================================
-- ONE MEDI: Migration 006 - Pricing & Availability (Group E)
-- ============================================================
-- Tables: medicine_inventory, lab_pricing, scan_pricing,
--         service_pricing, availability_slots
-- ============================================================

-- ============================================================
-- MEDICINE INVENTORY TABLE
-- Real-time vendor stock and pricing
-- ============================================================
CREATE TABLE medicine_inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  medicine_id UUID NOT NULL REFERENCES medicine_master(id) ON DELETE CASCADE,
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  branch_id UUID REFERENCES vendor_locations(id),
  stock_qty INTEGER DEFAULT 0,
  reserved_qty INTEGER DEFAULT 0, -- Reserved for pending orders
  price DECIMAL(10,2) NOT NULL,
  mrp DECIMAL(10,2) NOT NULL,
  discount_percent DECIMAL(5,2) DEFAULT 0,
  batch_number TEXT,
  expiry_date DATE,
  is_available BOOLEAN DEFAULT TRUE,
  last_restocked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(medicine_id, vendor_id, branch_id),
  CHECK(price <= mrp),
  CHECK(stock_qty >= 0),
  CHECK(reserved_qty >= 0)
);

CREATE INDEX idx_medicine_inventory_vendor ON medicine_inventory(vendor_id);
CREATE INDEX idx_medicine_inventory_available ON medicine_inventory(is_available) WHERE is_available = TRUE;

-- ============================================================
-- LAB PRICING TABLE
-- Vendor-specific lab test pricing
-- ============================================================
CREATE TABLE lab_pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id UUID NOT NULL REFERENCES lab_tests(id) ON DELETE CASCADE,
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  branch_id UUID REFERENCES vendor_locations(id),
  price DECIMAL(10,2) NOT NULL,
  mrp DECIMAL(10,2) NOT NULL,
  home_collection_fee DECIMAL(10,2) DEFAULT 0,
  nabl_accredited BOOLEAN DEFAULT FALSE,
  cap_accredited BOOLEAN DEFAULT FALSE,
  is_available BOOLEAN DEFAULT TRUE,
  turnaround_hours INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(test_id, vendor_id, branch_id),
  CHECK(price <= mrp)
);

CREATE INDEX idx_lab_pricing_vendor ON lab_pricing(vendor_id);
CREATE INDEX idx_lab_pricing_test ON lab_pricing(test_id);

-- ============================================================
-- SCAN PRICING TABLE
-- Vendor-specific radiology pricing
-- ============================================================
CREATE TABLE scan_pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_id UUID NOT NULL REFERENCES scans_master(id) ON DELETE CASCADE,
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  branch_id UUID REFERENCES vendor_locations(id),
  price DECIMAL(10,2) NOT NULL,
  mrp DECIMAL(10,2) NOT NULL,
  with_contrast_price DECIMAL(10,2), -- Additional for contrast
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(scan_id, vendor_id, branch_id),
  CHECK(price <= mrp)
);

CREATE INDEX idx_scan_pricing_vendor ON scan_pricing(vendor_id);
CREATE INDEX idx_scan_pricing_scan ON scan_pricing(scan_id);

-- ============================================================
-- SERVICE PRICING TABLE
-- Dynamic pricing for home services
-- ============================================================
CREATE TABLE service_pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID NOT NULL REFERENCES services_master(id) ON DELETE CASCADE,
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  base_price DECIMAL(10,2) NOT NULL,
  variable_price DECIMAL(10,2) DEFAULT 0, -- Per unit (km, hour, etc.)
  minimum_charge DECIMAL(10,2),
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(service_id, vendor_id)
);

CREATE INDEX idx_service_pricing_vendor ON service_pricing(vendor_id);

-- ============================================================
-- DOCTOR AVAILABILITY TABLE
-- Doctor slots linked to vendors (hospitals/clinics)
-- ============================================================
CREATE TABLE doctor_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
  vendor_id UUID REFERENCES vendors(id), -- Hospital/Clinic
  branch_id UUID REFERENCES vendor_locations(id),
  day_of_week INTEGER, -- 0=Sunday, 6=Saturday
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  slot_duration_minutes INTEGER DEFAULT 15,
  max_patients INTEGER DEFAULT 20,
  consultation_type TEXT DEFAULT 'BOTH', -- VIDEO, IN_PERSON, BOTH
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_doctor_availability_doctor ON doctor_availability(doctor_id);
CREATE INDEX idx_doctor_availability_day ON doctor_availability(day_of_week);

-- ============================================================
-- AVAILABILITY SLOTS TABLE
-- ★ Unified slot model with OPTIMISTIC LOCKING
-- Generic slots for any bookable service
-- ============================================================
CREATE TABLE availability_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_catalog_id UUID NOT NULL REFERENCES service_catalog(id) ON DELETE CASCADE,
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  branch_id UUID REFERENCES vendor_locations(id),
  slot_date DATE NOT NULL,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  capacity INTEGER DEFAULT 1,
  booked_count INTEGER DEFAULT 0,
  version INTEGER DEFAULT 1, -- ★ Optimistic locking version
  is_blocked BOOLEAN DEFAULT FALSE,
  blocked_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CHECK(booked_count <= capacity),
  CHECK(start_time < end_time)
);

-- Partial index for available slots only
CREATE INDEX idx_slots_available ON availability_slots(start_time) 
  WHERE booked_count < capacity AND is_blocked = FALSE;
CREATE INDEX idx_slots_service ON availability_slots(service_catalog_id);
CREATE INDEX idx_slots_vendor ON availability_slots(vendor_id);
CREATE INDEX idx_slots_date ON availability_slots(slot_date);

-- ============================================================
-- FUNCTION: Book Slot with Optimistic Locking
-- ============================================================
CREATE OR REPLACE FUNCTION book_slot(
  p_slot_id UUID,
  p_expected_version INTEGER
)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
DECLARE
  v_success BOOLEAN := FALSE;
BEGIN
  UPDATE availability_slots
  SET 
    booked_count = booked_count + 1,
    version = version + 1,
    updated_at = NOW()
  WHERE 
    id = p_slot_id 
    AND version = p_expected_version
    AND booked_count < capacity
    AND is_blocked = FALSE;
  
  IF FOUND THEN
    v_success := TRUE;
  END IF;
  
  RETURN v_success;
END;
$$;

-- ============================================================
-- FUNCTION: Release Slot
-- ============================================================
CREATE OR REPLACE FUNCTION release_slot(p_slot_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
AS $$
DECLARE
  v_success BOOLEAN := FALSE;
BEGIN
  UPDATE availability_slots
  SET 
    booked_count = GREATEST(booked_count - 1, 0),
    version = version + 1,
    updated_at = NOW()
  WHERE id = p_slot_id;
  
  IF FOUND THEN
    v_success := TRUE;
  END IF;
  
  RETURN v_success;
END;
$$;

-- ============================================================
-- TRIGGERS
-- ============================================================
CREATE TRIGGER medicine_inventory_updated_at BEFORE UPDATE ON medicine_inventory
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER lab_pricing_updated_at BEFORE UPDATE ON lab_pricing
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER scan_pricing_updated_at BEFORE UPDATE ON scan_pricing
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER service_pricing_updated_at BEFORE UPDATE ON service_pricing
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER doctor_availability_updated_at BEFORE UPDATE ON doctor_availability
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER availability_slots_updated_at BEFORE UPDATE ON availability_slots
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

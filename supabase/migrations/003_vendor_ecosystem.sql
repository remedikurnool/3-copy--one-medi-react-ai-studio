-- ============================================================
-- ONE MEDI: Migration 003 - Vendor Ecosystem (Group B)
-- ============================================================
-- Tables: vendors, vendor_locations, vendor_staff, vendor_kyc
-- ============================================================

-- ============================================================
-- VENDORS TABLE
-- Parent entity for all vendor/partner types
-- ============================================================
CREATE TABLE vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type vendor_type NOT NULL,
  owner_id UUID REFERENCES profiles(id),
  logo_url TEXT,
  description TEXT,
  commission_rate DECIMAL(5,2) DEFAULT 0.00, -- Platform commission %
  is_active BOOLEAN DEFAULT TRUE,
  is_verified BOOLEAN DEFAULT FALSE,
  rating DECIMAL(2,1) DEFAULT 0.0,
  rating_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- VENDOR LOCATIONS TABLE
-- Physical branches with geolocation
-- ============================================================
CREATE TABLE vendor_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  name TEXT, -- Branch name (e.g., "Main Branch", "City Center")
  city_id UUID REFERENCES cities(id),
  address_line_1 TEXT NOT NULL,
  address_line_2 TEXT,
  pincode TEXT,
  coords GEOGRAPHY(POINT, 4326),
  phone TEXT,
  email TEXT,
  opening_time TIME DEFAULT '09:00',
  closing_time TIME DEFAULT '21:00',
  is_open_24x7 BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Geospatial index for vendor location searches
CREATE INDEX idx_vendor_locations_coords ON vendor_locations USING GIST (coords);
CREATE INDEX idx_vendor_locations_city ON vendor_locations(city_id);

-- ============================================================
-- VENDOR STAFF TABLE
-- Multi-user portal access for vendor employees
-- ============================================================
CREATE TABLE vendor_staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  branch_id UUID REFERENCES vendor_locations(id),
  access_level TEXT DEFAULT 'STAFF', -- OWNER, MANAGER, STAFF
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(vendor_id, user_id)
);

-- ============================================================
-- VENDOR KYC TABLE
-- Compliance and verification documents
-- ============================================================
CREATE TABLE vendor_kyc (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE UNIQUE,
  gstin TEXT, -- GST Identification Number
  pan_number TEXT,
  dl_number TEXT, -- Drug License Number (for pharmacies)
  fssai_number TEXT, -- Food Safety (if applicable)
  license_url TEXT, -- Uploaded license document
  gst_certificate_url TEXT,
  pan_card_url TEXT,
  bank_account_number TEXT,
  bank_ifsc TEXT,
  bank_name TEXT,
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES profiles(id),
  rejection_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TRIGGERS
-- ============================================================
CREATE TRIGGER vendors_updated_at BEFORE UPDATE ON vendors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER vendor_locations_updated_at BEFORE UPDATE ON vendor_locations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER vendor_staff_updated_at BEFORE UPDATE ON vendor_staff
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER vendor_kyc_updated_at BEFORE UPDATE ON vendor_kyc
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

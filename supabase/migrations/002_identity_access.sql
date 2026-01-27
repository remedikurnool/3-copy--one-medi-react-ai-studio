-- ============================================================
-- ONE MEDI: Migration 002 - Identity & Access (Group A)
-- ============================================================
-- Tables: roles, profiles, family_members, addresses
-- ============================================================

-- ============================================================
-- ROLES TABLE
-- RBAC master table for permission management
-- ============================================================
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  permissions JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed default roles
INSERT INTO roles (name, permissions) VALUES
  ('ADMIN', '{"all": true}'),
  ('VENDOR_ADMIN', '{"manage_inventory": true, "view_orders": true, "manage_staff": true}'),
  ('STAFF', '{"view_orders": true, "fulfill_orders": true}'),
  ('PATIENT', '{"place_orders": true, "view_own_orders": true}');

-- ============================================================
-- PROFILES TABLE
-- User profiles linked to Supabase auth.users
-- ============================================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  email TEXT,
  avatar_url TEXT,
  role_id UUID REFERENCES roles(id),
  date_of_birth DATE,
  gender TEXT,
  blood_group TEXT,
  emergency_contact TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- FAMILY MEMBERS TABLE
-- For booking on behalf of dependents
-- ============================================================
CREATE TABLE family_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  relation TEXT NOT NULL,
  date_of_birth DATE,
  gender TEXT,
  blood_group TEXT,
  medical_history JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CITIES TABLE (Reference for addresses and features)
-- ============================================================
CREATE TABLE cities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT DEFAULT 'India',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed initial cities
INSERT INTO cities (name, state) VALUES
  ('Kurnool', 'Andhra Pradesh'),
  ('Hyderabad', 'Telangana'),
  ('Bangalore', 'Karnataka'),
  ('Chennai', 'Tamil Nadu'),
  ('Mumbai', 'Maharashtra');

-- ============================================================
-- ADDRESSES TABLE
-- Geolocation-enabled address storage
-- ============================================================
CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  tag TEXT DEFAULT 'Home', -- Home, Work, Other
  line_1 TEXT NOT NULL,
  line_2 TEXT,
  landmark TEXT,
  city_id UUID REFERENCES cities(id),
  pincode TEXT,
  coords GEOGRAPHY(POINT, 4326), -- PostGIS geography type
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for geospatial queries
CREATE INDEX idx_addresses_coords ON addresses USING GIST (coords);

-- ============================================================
-- TRIGGERS: Auto-update updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER family_members_updated_at BEFORE UPDATE ON family_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER addresses_updated_at BEFORE UPDATE ON addresses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ONE MEDI: Migration 005 - Service Masters (Group D)
-- ============================================================
-- Tables: medicine_master, medicine_alternatives, lab_tests,
--         scans_master, doctors, services_master
-- ============================================================

-- ============================================================
-- MEDICINE MASTER TABLE
-- Versioned medicine records for historical accuracy
-- ============================================================
CREATE TABLE medicine_master (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version INTEGER DEFAULT 1,
  parent_id UUID REFERENCES medicine_master(id), -- For versioning
  name TEXT NOT NULL,
  generic_name TEXT,
  composition TEXT,
  manufacturer TEXT,
  hsn_code TEXT, -- Harmonized System Nomenclature for GST
  prescription_required BOOLEAN DEFAULT FALSE,
  schedule TEXT, -- H, H1, X, etc.
  form TEXT, -- Tablet, Syrup, Injection, etc.
  strength TEXT, -- e.g., "500mg", "10ml"
  pack_size TEXT, -- e.g., "Strip of 10"
  unit TEXT DEFAULT 'strip',
  indications TEXT[], -- Array of use cases
  side_effects TEXT[],
  contraindications TEXT[],
  storage_instructions TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Full-text search vector
  search_vector TSVECTOR GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(generic_name, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(composition, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(array_to_string(indications, ' '), '')), 'D')
  ) STORED
);

-- Full-text search index
CREATE INDEX idx_medicine_search ON medicine_master USING GIN (search_vector);
CREATE INDEX idx_medicine_generic ON medicine_master(generic_name);
CREATE INDEX idx_medicine_active ON medicine_master(is_active) WHERE is_active = TRUE;

-- ============================================================
-- MEDICINE ALTERNATIVES TABLE
-- Doctor-safe generic substitutions
-- ============================================================
CREATE TABLE medicine_alternatives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  medicine_id UUID NOT NULL REFERENCES medicine_master(id) ON DELETE CASCADE,
  alternative_id UUID NOT NULL REFERENCES medicine_master(id) ON DELETE CASCADE,
  rank INTEGER DEFAULT 1, -- Priority order
  savings_percent DECIMAL(5,2), -- Cost savings
  approved BOOLEAN DEFAULT FALSE, -- Pharmacist/Doctor approved
  approved_by UUID REFERENCES profiles(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(medicine_id, alternative_id),
  CHECK(medicine_id != alternative_id)
);

-- ============================================================
-- LAB TESTS TABLE
-- Master list of laboratory tests
-- ============================================================
CREATE TABLE lab_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT UNIQUE, -- Test code (e.g., CBC001)
  sample_type sample_type DEFAULT 'BLOOD',
  sample_volume TEXT, -- e.g., "5ml"
  fasting_required BOOLEAN DEFAULT FALSE,
  fasting_hours INTEGER,
  report_time TEXT, -- e.g., "Same Day", "24 Hours"
  category TEXT, -- e.g., "Hematology", "Biochemistry"
  description TEXT,
  preparation_instructions TEXT,
  includes TEXT[], -- Array of included tests (for packages)
  parameters JSONB, -- Detailed test parameters
  is_home_collection BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_lab_tests_category ON lab_tests(category);
CREATE INDEX idx_lab_tests_active ON lab_tests(is_active) WHERE is_active = TRUE;

-- ============================================================
-- SCANS MASTER TABLE
-- Radiology/Imaging services
-- ============================================================
CREATE TABLE scans_master (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT UNIQUE,
  body_part TEXT, -- e.g., "Brain", "Chest", "Abdomen"
  modality scan_modality NOT NULL,
  contrast_required BOOLEAN DEFAULT FALSE,
  preparation_instructions TEXT,
  duration_minutes INTEGER DEFAULT 30,
  report_time TEXT,
  description TEXT,
  contraindications TEXT[],
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_scans_modality ON scans_master(modality);
CREATE INDEX idx_scans_body_part ON scans_master(body_part);

-- ============================================================
-- DOCTORS TABLE
-- Clinical credentials and profiles
-- ============================================================
CREATE TABLE doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id), -- If doctor is also a user
  name TEXT NOT NULL,
  specialty TEXT NOT NULL,
  sub_specialty TEXT,
  qualifications TEXT[], -- Array: ["MBBS", "MD", "DM"]
  registration_number TEXT, -- Medical council registration
  registration_council TEXT, -- e.g., "MCI", "State Medical Council"
  experience_years INTEGER,
  languages TEXT[], -- Spoken languages
  bio TEXT,
  image_url TEXT,
  consultation_fee DECIMAL(10,2),
  followup_fee DECIMAL(10,2),
  video_consultation BOOLEAN DEFAULT TRUE,
  in_person_consultation BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE,
  rating DECIMAL(2,1) DEFAULT 0.0,
  rating_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_doctors_specialty ON doctors(specialty);
CREATE INDEX idx_doctors_active ON doctors(is_active) WHERE is_active = TRUE;

-- ============================================================
-- SERVICES MASTER TABLE
-- Generic home services (Physio, Nursing, Ambulance, etc.)
-- ============================================================
CREATE TABLE services_master (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT, -- e.g., "Nursing", "Physiotherapy", "Ambulance"
  description TEXT,
  unit TEXT DEFAULT 'per session', -- per km, per session, per hour, per day
  duration_minutes INTEGER,
  requirements TEXT[], -- Equipment/preparation needed
  is_home_service BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_services_category ON services_master(category);

-- ============================================================
-- INSURANCE PLANS TABLE
-- Health insurance products
-- ============================================================
CREATE TABLE insurance_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  provider TEXT NOT NULL, -- Insurance company
  plan_type TEXT, -- Individual, Family, Senior Citizen
  sum_insured DECIMAL(12,2),
  premium_monthly DECIMAL(10,2),
  premium_yearly DECIMAL(10,2),
  coverage JSONB, -- Detailed coverage breakdown
  features TEXT[],
  exclusions TEXT[],
  waiting_period_days INTEGER,
  claim_settlement_ratio DECIMAL(5,2),
  network_hospitals INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CONTENT MASTER TABLE
-- Blogs, videos, health articles
-- ============================================================
CREATE TABLE content_master (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  type content_type DEFAULT 'article',
  content_url TEXT, -- For videos
  content_body TEXT, -- For articles (HTML/Markdown)
  thumbnail_url TEXT,
  author_id UUID REFERENCES profiles(id),
  author_name TEXT,
  category TEXT,
  tags TEXT[],
  read_time_minutes INTEGER,
  is_premium BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_content_type ON content_master(type);
CREATE INDEX idx_content_published ON content_master(is_published) WHERE is_published = TRUE;

-- ============================================================
-- TRIGGERS
-- ============================================================
CREATE TRIGGER medicine_master_updated_at BEFORE UPDATE ON medicine_master
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER lab_tests_updated_at BEFORE UPDATE ON lab_tests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER scans_master_updated_at BEFORE UPDATE ON scans_master
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER doctors_updated_at BEFORE UPDATE ON doctors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER services_master_updated_at BEFORE UPDATE ON services_master
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER insurance_plans_updated_at BEFORE UPDATE ON insurance_plans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER content_master_updated_at BEFORE UPDATE ON content_master
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

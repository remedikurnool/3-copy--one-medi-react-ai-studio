-- ============================================================
-- ONE MEDI: Migration 011 - Central Taxonomy (Group J)
-- ============================================================
-- Tables: taxonomies, taxonomy_terms, service_taxonomy_map
-- ============================================================

-- ============================================================
-- TAXONOMIES TABLE
-- Medical categorization systems
-- ============================================================
CREATE TABLE taxonomies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE, -- e.g., "Specialty", "Body System", "Condition"
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  
  -- Which service types can use this taxonomy?
  applicable_service_types service_type[],
  
  -- Display
  icon TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TAXONOMY TERMS TABLE
-- Hierarchical terms within taxonomies
-- ============================================================
CREATE TABLE taxonomy_terms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  taxonomy_id UUID NOT NULL REFERENCES taxonomies(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES taxonomy_terms(id), -- For hierarchy
  
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  
  -- Display
  icon TEXT,
  image_url TEXT,
  color TEXT, -- For UI highlighting
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(taxonomy_id, slug)
);

CREATE INDEX idx_taxonomy_terms_taxonomy ON taxonomy_terms(taxonomy_id);
CREATE INDEX idx_taxonomy_terms_parent ON taxonomy_terms(parent_id);
CREATE INDEX idx_taxonomy_terms_active ON taxonomy_terms(is_active) WHERE is_active = TRUE;

-- ============================================================
-- SERVICE TAXONOMY MAP TABLE
-- Universal tagging engine - links services to taxonomy terms
-- ============================================================
CREATE TABLE service_taxonomy_map (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_catalog_id UUID NOT NULL REFERENCES service_catalog(id) ON DELETE CASCADE,
  taxonomy_term_id UUID NOT NULL REFERENCES taxonomy_terms(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT FALSE, -- Primary categorization
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(service_catalog_id, taxonomy_term_id)
);

CREATE INDEX idx_service_taxonomy_service ON service_taxonomy_map(service_catalog_id);
CREATE INDEX idx_service_taxonomy_term ON service_taxonomy_map(taxonomy_term_id);

-- ============================================================
-- ADD FK TO UI_MENU_ITEMS
-- ============================================================
ALTER TABLE ui_menu_items 
  ADD CONSTRAINT fk_menu_items_taxonomy 
  FOREIGN KEY (taxonomy_term_id) REFERENCES taxonomy_terms(id);

-- ============================================================
-- DEFAULT TAXONOMIES
-- ============================================================

-- 1. Medical Specialties
INSERT INTO taxonomies (name, slug, description, applicable_service_types) VALUES
  ('Specialty', 'specialty', 'Medical specialties for doctors and services', 
   ARRAY['DOCTOR_CONSULT', 'HOME_SERVICE']::service_type[]);

-- 2. Body Systems
INSERT INTO taxonomies (name, slug, description, applicable_service_types) VALUES
  ('Body System', 'body-system', 'Anatomical body systems', 
   ARRAY['LAB_TEST', 'SCAN', 'DOCTOR_CONSULT']::service_type[]);

-- 3. Health Conditions
INSERT INTO taxonomies (name, slug, description, applicable_service_types) VALUES
  ('Health Condition', 'condition', 'Common health conditions and diseases', 
   ARRAY['MEDICINE', 'LAB_TEST', 'DOCTOR_CONSULT', 'CONTENT']::service_type[]);

-- 4. Medicine Categories
INSERT INTO taxonomies (name, slug, description, applicable_service_types) VALUES
  ('Medicine Category', 'medicine-category', 'Therapeutic categories for medicines', 
   ARRAY['MEDICINE']::service_type[]);

-- 5. Test Categories
INSERT INTO taxonomies (name, slug, description, applicable_service_types) VALUES
  ('Test Category', 'test-category', 'Laboratory test categories', 
   ARRAY['LAB_TEST']::service_type[]);

-- ============================================================
-- DEFAULT TAXONOMY TERMS
-- ============================================================

-- Specialties
INSERT INTO taxonomy_terms (taxonomy_id, name, slug, sort_order)
SELECT id, 'General Physician', 'general-physician', 1 FROM taxonomies WHERE slug = 'specialty'
UNION ALL
SELECT id, 'Cardiology', 'cardiology', 2 FROM taxonomies WHERE slug = 'specialty'
UNION ALL
SELECT id, 'Dermatology', 'dermatology', 3 FROM taxonomies WHERE slug = 'specialty'
UNION ALL
SELECT id, 'Gynecology', 'gynecology', 4 FROM taxonomies WHERE slug = 'specialty'
UNION ALL
SELECT id, 'Orthopedics', 'orthopedics', 5 FROM taxonomies WHERE slug = 'specialty'
UNION ALL
SELECT id, 'Pediatrics', 'pediatrics', 6 FROM taxonomies WHERE slug = 'specialty'
UNION ALL
SELECT id, 'Dentistry', 'dentistry', 7 FROM taxonomies WHERE slug = 'specialty'
UNION ALL
SELECT id, 'Ophthalmology', 'ophthalmology', 8 FROM taxonomies WHERE slug = 'specialty'
UNION ALL
SELECT id, 'ENT', 'ent', 9 FROM taxonomies WHERE slug = 'specialty'
UNION ALL
SELECT id, 'Psychiatry', 'psychiatry', 10 FROM taxonomies WHERE slug = 'specialty';

-- Body Systems
INSERT INTO taxonomy_terms (taxonomy_id, name, slug, sort_order)
SELECT id, 'Cardiovascular', 'cardiovascular', 1 FROM taxonomies WHERE slug = 'body-system'
UNION ALL
SELECT id, 'Respiratory', 'respiratory', 2 FROM taxonomies WHERE slug = 'body-system'
UNION ALL
SELECT id, 'Digestive', 'digestive', 3 FROM taxonomies WHERE slug = 'body-system'
UNION ALL
SELECT id, 'Nervous', 'nervous', 4 FROM taxonomies WHERE slug = 'body-system'
UNION ALL
SELECT id, 'Musculoskeletal', 'musculoskeletal', 5 FROM taxonomies WHERE slug = 'body-system'
UNION ALL
SELECT id, 'Endocrine', 'endocrine', 6 FROM taxonomies WHERE slug = 'body-system'
UNION ALL
SELECT id, 'Reproductive', 'reproductive', 7 FROM taxonomies WHERE slug = 'body-system'
UNION ALL
SELECT id, 'Urinary', 'urinary', 8 FROM taxonomies WHERE slug = 'body-system'
UNION ALL
SELECT id, 'Integumentary', 'integumentary', 9 FROM taxonomies WHERE slug = 'body-system';

-- Test Categories
INSERT INTO taxonomy_terms (taxonomy_id, name, slug, sort_order)
SELECT id, 'Hematology', 'hematology', 1 FROM taxonomies WHERE slug = 'test-category'
UNION ALL
SELECT id, 'Biochemistry', 'biochemistry', 2 FROM taxonomies WHERE slug = 'test-category'
UNION ALL
SELECT id, 'Immunology', 'immunology', 3 FROM taxonomies WHERE slug = 'test-category'
UNION ALL
SELECT id, 'Microbiology', 'microbiology', 4 FROM taxonomies WHERE slug = 'test-category'
UNION ALL
SELECT id, 'Pathology', 'pathology', 5 FROM taxonomies WHERE slug = 'test-category'
UNION ALL
SELECT id, 'Radiology', 'radiology', 6 FROM taxonomies WHERE slug = 'test-category'
UNION ALL
SELECT id, 'Cardiac Markers', 'cardiac-markers', 7 FROM taxonomies WHERE slug = 'test-category'
UNION ALL
SELECT id, 'Thyroid', 'thyroid', 8 FROM taxonomies WHERE slug = 'test-category'
UNION ALL
SELECT id, 'Diabetes', 'diabetes', 9 FROM taxonomies WHERE slug = 'test-category'
UNION ALL
SELECT id, 'Liver Function', 'liver-function', 10 FROM taxonomies WHERE slug = 'test-category'
UNION ALL
SELECT id, 'Kidney Function', 'kidney-function', 11 FROM taxonomies WHERE slug = 'test-category';

-- ============================================================
-- FUNCTION: Get Services by Taxonomy
-- ============================================================
CREATE OR REPLACE FUNCTION get_services_by_taxonomy(
  p_taxonomy_slug TEXT,
  p_term_slug TEXT
)
RETURNS TABLE (
  service_catalog_id UUID,
  service_type service_type,
  display_name TEXT
)
LANGUAGE sql STABLE
AS $$
  SELECT 
    sc.id,
    sc.service_type,
    sc.display_name
  FROM service_catalog sc
  INNER JOIN service_taxonomy_map stm ON stm.service_catalog_id = sc.id
  INNER JOIN taxonomy_terms tt ON tt.id = stm.taxonomy_term_id
  INNER JOIN taxonomies t ON t.id = tt.taxonomy_id
  WHERE t.slug = p_taxonomy_slug
    AND tt.slug = p_term_slug
    AND sc.is_active = TRUE
    AND tt.is_active = TRUE;
$$;

-- ============================================================
-- TRIGGERS
-- ============================================================
CREATE TRIGGER taxonomies_updated_at BEFORE UPDATE ON taxonomies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER taxonomy_terms_updated_at BEFORE UPDATE ON taxonomy_terms
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

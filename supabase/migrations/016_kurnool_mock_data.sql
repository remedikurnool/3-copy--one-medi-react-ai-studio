-- ============================================================
-- ONE MEDI: Migration 016 - Kurnool Realistic Mock Data
-- ============================================================

-- 1. ADD VENDORS (Diagnostic Centers)
INSERT INTO vendors (name, type, is_active, is_verified, rating, rating_count) VALUES
  ('Vijaya Diagnostics', 'DIAGNOSTIC_LAB', TRUE, TRUE, 4.5, 1200),
  ('Lucid Diagnostics', 'DIAGNOSTIC_LAB', TRUE, TRUE, 4.3, 850),
  ('Thyrocare', 'DIAGNOSTIC_LAB', TRUE, TRUE, 4.2, 5000),
  ('Apollo Diagnostics', 'DIAGNOSTIC_LAB', TRUE, TRUE, 4.6, 3200),
  ('Redcliffe Labs', 'DIAGNOSTIC_LAB', TRUE, TRUE, 4.4, 1500)
ON CONFLICT DO NOTHING;

-- 2. ADD VENDOR LOCATIONS (Kurnool Specific Areas)
-- Note: Replace with actual Kurnool City UUID from your database
-- Kurnool ID: 0b21f742-3c33-4490-baaa-050b588444be
INSERT INTO vendor_locations (vendor_id, name, city_id, address_line_1, pincode, phone)
SELECT id, 'Gayatri Estate Branch', '0b21f742-3c33-4490-baaa-050b588444be'::UUID, 'Gayatri Estate, Near SBI', '518002', '08518223344' FROM vendors WHERE name = 'Vijaya Diagnostics'
UNION ALL
SELECT id, 'NR Peta Branch', '0b21f742-3c33-4490-baaa-050b588444be'::UUID, 'NR Peta, Main Road', '518004', '08518225566' FROM vendors WHERE name = 'Lucid Diagnostics'
UNION ALL
SELECT id, 'Kurnool City Center', '0b21f742-3c33-4490-baaa-050b588444be'::UUID, 'Park Road, Old City', '518001', '08518227788' FROM vendors WHERE name = 'Apollo Diagnostics'
UNION ALL
SELECT id, 'Budhawar Peta Branch', '0b21f742-3c33-4490-baaa-050b588444be'::UUID, 'Budhawar Peta', '518002', '08518229900' FROM vendors WHERE name = 'Redcliffe Labs'
ON CONFLICT DO NOTHING;

-- 3. ADD SPECIFIC DOCTORS
INSERT INTO doctors (name, specialty, sub_specialty, qualifications, experience_years, languages, bio, consultation_fee, video_consultation, in_person_consultation) VALUES
  ('Dr. T Karthik', 'General Medicine', 'Diabetes Specialist & Intensivist', ARRAY['MBBS', 'MD (GENERAL MEDICINE)', 'FAIG'], 6, ARRAY['English', 'Telugu', 'Hindi'], 'Consultant Physician, Diabetes Specialist & Intensivist with expert care in critical medicine.', 600.00, TRUE, TRUE),
  ('Dr. K Ramya', 'Dermatology', 'Consultant Skin & Hair Specialist', ARRAY['MBBS', 'MD (DVL)'], 4, ARRAY['English', 'Telugu'], 'Expert skin and hair specialist focusing on medical and aesthetic dermatology.', 500.00, TRUE, TRUE),
  ('Dr. D V Subba Reddy', 'Orthopedics', 'Consultant Orthopedic Surgeon', ARRAY['MBBS', 'MS (ORTHO)'], 8, ARRAY['English', 'Telugu', 'Kannada'], 'Specialist in trauma, joint replacements and orthopedic surgery.', 700.00, TRUE, TRUE)
ON CONFLICT DO NOTHING;

-- 4. REGISTER DOCTORS IN SERVICE CATALOG
INSERT INTO service_catalog (service_type, ref_table, ref_id, display_name)
SELECT 'DOCTOR_CONSULT', 'doctors', id, name FROM doctors WHERE name IN ('Dr. T Karthik', 'Dr. K Ramya', 'Dr. D V Subba Reddy')
ON CONFLICT DO NOTHING;

-- 5. ADD REALISTIC LAB CATEGORIES (TAXONOMY)
INSERT INTO taxonomy_terms (taxonomy_id, name, slug, sort_order)
SELECT id, 'Executive Health Checkup', 'executive-health', 12 FROM taxonomies WHERE slug = 'test-category'
UNION ALL SELECT id, 'Fever Profile', 'fever-profile', 13 FROM taxonomies WHERE slug = 'test-category'
UNION ALL SELECT id, 'Womens Health', 'womens-health', 14 FROM taxonomies WHERE slug = 'test-category'
UNION ALL SELECT id, 'Full Body Checkup', 'full-body', 15 FROM taxonomies WHERE slug = 'test-category'
ON CONFLICT DO NOTHING;

-- 6. ADD REALISTIC LAB TESTS & PRICING
WITH new_tests AS (
  INSERT INTO lab_tests (name, code, sample_type, category, report_time, description) VALUES
  ('Master Health Checkup', 'MHC001', 'BLOOD', 'Full Body Checkup', '24 Hours', 'Comprehensive health assessment including 60+ parameters'),
  ('Fever Panel Basic', 'FEV001', 'BLOOD', 'Fever Profile', '6 Hours', 'Malaria, Typhoid, CBC and ESR'),
  ('PCOS Screening', 'PCOS01', 'BLOOD', 'Womens Health', '12 Hours', 'Complete hormonal profile for PCOS assessment')
  RETURNING id, name
)
INSERT INTO lab_pricing (test_id, vendor_id, mrp, price, home_collection_fee)
SELECT nt.id, v.id, 2500, 1999, 150 FROM new_tests nt, vendors v WHERE v.name = 'Vijaya Diagnostics' AND nt.name = 'Master Health Checkup'
UNION ALL
SELECT nt.id, v.id, 800, 599, 100 FROM new_tests nt, vendors v WHERE v.name = 'Lucid Diagnostics' AND nt.name = 'Fever Panel Basic'
UNION ALL
SELECT nt.id, v.id, 1500, 1299, 0 FROM new_tests nt, vendors v WHERE v.name = 'Thyrocare' AND nt.name = 'PCOS Screening'
ON CONFLICT DO NOTHING;

-- 7. REGISTER NEW TESTS IN CATALOG
INSERT INTO service_catalog (service_type, ref_table, ref_id, display_name)
SELECT 'LAB_TEST', 'lab_tests', id, name FROM lab_tests WHERE code IN ('MHC001', 'FEV001', 'PCOS01')
ON CONFLICT DO NOTHING;

-- 8. ADD MEDICINE CATEGORIES
INSERT INTO taxonomy_terms (taxonomy_id, name, slug, sort_order)
SELECT id, 'Diabetes Care', 'diabetes-care', 1 FROM taxonomies WHERE slug = 'medicine-category'
UNION ALL SELECT id, 'Cardiac Care', 'cardiac-care', 2 FROM taxonomies WHERE slug = 'medicine-category'
UNION ALL SELECT id, 'Gastro Care', 'gastro-care', 3 FROM taxonomies WHERE slug = 'medicine-category'
ON CONFLICT DO NOTHING;

-- 9. ADD SOME REALISTIC MEDICINES UNDER CATEGORIES
WITH new_meds AS (
  INSERT INTO medicine_master (name, generic_name, manufacturer, form, strength, pack_size) VALUES
  ('Glycomet 500 SR', 'Metformin', 'USV', 'Tablet', '500mg', 'Strip of 15'),
  ('Telma 40', 'Telmisartan', 'Glenmark', 'Tablet', '40mg', 'Strip of 15'),
  ('Lantus Solostar', 'Insulin Glargine', 'Sanofi', 'Injection', '100IU/ml', '3ml Pen')
  RETURNING id, name
)
INSERT INTO medicine_inventory (medicine_id, vendor_id, price, mrp, stock_qty)
SELECT nm.id, v.id, 65, 75, 100 FROM new_meds nm, vendors v WHERE v.name = 'Vijaya Diagnostics' AND nm.name = 'Glycomet 500 SR'
ON CONFLICT DO NOTHING;

-- 10. REGISTER MEDICINES IN CATALOG
INSERT INTO service_catalog (service_type, ref_table, ref_id, display_name)
SELECT 'MEDICINE', 'medicine_master', id, name FROM medicine_master WHERE name IN ('Glycomet 500 SR', 'Telma 40', 'Lantus Solostar')
ON CONFLICT DO NOTHING;

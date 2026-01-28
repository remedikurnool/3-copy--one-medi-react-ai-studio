-- ============================================================
-- Kurnool Realistic Mock Data Seeding Script (STRICTLY ADDITIVE)
-- ============================================================

-- 1. CITY: KURNOOL
INSERT INTO cities (id, name, state, country, is_active)
SELECT '0b21f742-3c33-4490-baaa-050b588444be', 'Kurnool', 'Andhra Pradesh', 'India', TRUE
WHERE NOT EXISTS (SELECT 1 FROM cities WHERE name = 'Kurnool');

-- 2. VENDORS (Diagnostic Centers & Pharmacies)
INSERT INTO vendors (name, type, is_active, is_verified, rating, rating_count)
SELECT v.name, v.type, TRUE, TRUE, v.rating, v.rating_count
FROM (VALUES
  ('Vijaya Diagnostics', 'DIAGNOSTIC_LAB'::vendor_type, 4.5, 1200),
  ('Lucid Diagnostics', 'DIAGNOSTIC_LAB'::vendor_type, 4.3, 850),
  ('Thyrocare', 'DIAGNOSTIC_LAB'::vendor_type, 4.2, 5000),
  ('Apollo Diagnostics', 'DIAGNOSTIC_LAB'::vendor_type, 4.6, 3200),
  ('Redcliffe Labs', 'DIAGNOSTIC_LAB'::vendor_type, 4.4, 1500),
  ('MedPlus Pharmacy', 'PHARMACY'::vendor_type, 4.4, 2500),
  ('Apollo Pharmacy', 'PHARMACY'::vendor_type, 4.5, 3000)
) AS v(name, type, rating, rating_count)
WHERE NOT EXISTS (SELECT 1 FROM vendors WHERE vendors.name = v.name);

-- 3. VENDOR LOCATIONS (Kurnool Specific Areas)
INSERT INTO vendor_locations (vendor_id, name, city_id, address_line_1, pincode, phone)
SELECT v.id, l.name, '0b21f742-3c33-4490-baaa-050b588444be'::UUID, l.addr, l.pin, l.ph
FROM (VALUES
  ('Vijaya Diagnostics', 'Gayatri Estate Branch', 'Gayatri Estate, Near SBI', '518002', '08518223344'),
  ('Lucid Diagnostics', 'NR Peta Branch', 'NR Peta, Main Road', '518004', '08518225566'),
  ('Apollo Diagnostics', 'Kurnool City Center', 'Park Road, Old City', '518001', '08518227788'),
  ('Redcliffe Labs', 'Budhawar Peta Branch', 'Budhawar Peta', '518002', '08518229900')
) AS l(v_name, name, addr, pin, ph)
JOIN vendors v ON v.name = l.v_name
WHERE NOT EXISTS (SELECT 1 FROM vendor_locations WHERE name = l.name AND vendor_id = v.id);

-- 4. DOCTORS
INSERT INTO doctors (name, specialty, sub_specialty, qualifications, experience_years, languages, bio, consultation_fee, video_consultation, in_person_consultation)
SELECT d.name, d.spec, d.sub_spec, d.qual, d.exp, d.lang, d.bio, d.fee, TRUE, TRUE
FROM (VALUES
  ('Dr. T Karthik', 'General Medicine', 'Diabetes Specialist & Intensivist', ARRAY['MBBS', 'MD (GENERAL MEDICINE)', 'FAIG'], 6, ARRAY['English', 'Telugu', 'Hindi'], 'Consultant Physician, Diabetes Specialist & Intensivist with expert care in critical medicine.', 600.00),
  ('Dr. K Ramya', 'Dermatology', 'Consultant Skin & Hair Specialist', ARRAY['MBBS', 'MD (DVL)'], 4, ARRAY['English', 'Telugu'], 'Expert skin and hair specialist focusing on medical and aesthetic dermatology.', 500.00),
  ('Dr. D V Subba Reddy', 'Orthopedics', 'Consultant Orthopedic Surgeon', ARRAY['MBBS', 'MS (ORTHO)'], 8, ARRAY['English', 'Telugu', 'Kannada'], 'Specialist in trauma, joint replacements and orthopedic surgery.', 700.00),
  ('Dr. Ramesh Kumar', 'General Physician', NULL, ARRAY['MBBS', 'MD (Medicine)'], 15, ARRAY['English', 'Telugu', 'Hindi'], 'Senior general physician with expertise in preventive care.', 500.00)
) AS d(name, spec, sub_spec, qual, exp, lang, bio, fee)
WHERE NOT EXISTS (SELECT 1 FROM doctors WHERE doctors.name = d.name);

-- 6. LAB TESTS
INSERT INTO lab_tests (name, code, sample_type, category, report_time, description)
SELECT x.name, x.code, x.st::sample_type, x.cat, x.rt, x.descr
FROM (VALUES
  ('Master Health Checkup', 'MHC001', 'BLOOD', 'Full Body Checkup', '24 Hours', 'Comprehensive health assessment including 60+ parameters'),
  ('Fever Panel Basic', 'FEV001', 'BLOOD', 'Fever Profile', '6 Hours', 'Malaria, Typhoid, CBC and ESR'),
  ('Thyroid Profile (T3, T4, TSH)', 'THY001', 'BLOOD', 'Hormone Profile', '12 Hours', 'Complete thyroid function assessment')
) AS x(name, code, st, cat, rt, descr)
WHERE NOT EXISTS (SELECT 1 FROM lab_tests WHERE lab_tests.code = x.code);

-- 7. SCANS
INSERT INTO scans_master (name, modality, description)
SELECT x.name, x.mod::scan_modality, x.descr
FROM (VALUES
  ('MRI Brain', 'MRI', 'Plain study of brain'),
  ('TIFFA Scan', 'ULTRASOUND', 'Targeted Imaging for Fetal Anomalies'),
  ('Chest X-Ray', 'XRAY', 'Digital X-ray for chest assessment')
) AS x(name, mod, descr)
WHERE NOT EXISTS (SELECT 1 FROM scans_master WHERE scans_master.name = x.name);

-- 8. MEDICINES
INSERT INTO medicine_master (name, generic_name, manufacturer, form, strength, pack_size)
SELECT x.name, x.gn, x.man, x.form, x.str, x.ps
FROM (VALUES
  ('Glycomet 500 SR', 'Metformin', 'USV', 'Tablet', '500mg', 'Strip of 15'),
  ('Telma 40', 'Telmisartan', 'Glenmark', 'Tablet', '40mg', 'Strip of 15'),
  ('Dolo 650', 'Paracetamol', 'Micro Labs', 'Tablet', '650mg', 'Strip of 15')
) AS x(name, gn, man, form, str, ps)
WHERE NOT EXISTS (SELECT 1 FROM medicine_master WHERE medicine_master.name = x.name);

-- 11. REGISTER IN SERVICE CATALOG
INSERT INTO service_catalog (service_type, ref_table, ref_id, display_name)
SELECT 'MEDICINE'::service_type, 'medicine_master', ref.id, ref.name
FROM medicine_master ref
WHERE NOT EXISTS (SELECT 1 FROM service_catalog WHERE ref_table = 'medicine_master' AND ref_id = ref.id);

INSERT INTO service_catalog (service_type, ref_table, ref_id, display_name)
SELECT 'LAB_TEST'::service_type, 'lab_tests', ref.id, ref.name
FROM lab_tests ref
WHERE NOT EXISTS (SELECT 1 FROM service_catalog WHERE ref_table = 'lab_tests' AND ref_id = ref.id);

INSERT INTO service_catalog (service_type, ref_table, ref_id, display_name)
SELECT 'SCAN'::service_type, 'scans_master', ref.id, ref.name
FROM scans_master ref
WHERE NOT EXISTS (SELECT 1 FROM service_catalog WHERE ref_table = 'scans_master' AND ref_id = ref.id);

INSERT INTO service_catalog (service_type, ref_table, ref_id, display_name)
SELECT 'DOCTOR_CONSULT'::service_type, 'doctors', ref.id, ref.name
FROM doctors ref
WHERE NOT EXISTS (SELECT 1 FROM service_catalog WHERE ref_table = 'doctors' AND ref_id = ref.id);

-- 12. COUPONS
INSERT INTO coupons (code, name, description, discount_type, discount_value, max_discount_amount, min_order_amount)
SELECT x.code, x.name, x.descr, x.dt::discount_type, x.dv, x.mda, x.moa
FROM (VALUES
  ('WELCOME50', 'Welcome Offer', '50% off on first order', 'PERCENTAGE', 50.00, 200.00, 100.00),
  ('FLAT100', 'Flat ₹100 Off', 'Flat ₹100 off on orders above ₹500', 'FIXED', 100.00, NULL, 500.00)
) AS x(code, name, descr, dt, dv, mda, moa)
WHERE NOT EXISTS (SELECT 1 FROM coupons WHERE coupons.code = x.code);

-- 13. UI CAROUSELS
INSERT INTO ui_carousels (name, position, is_active)
SELECT 'home_hero', 'HOME_TOP'::carousel_position, TRUE
WHERE NOT EXISTS (SELECT 1 FROM ui_carousels WHERE name = 'home_hero');

-- ============================================================
-- ONE MEDI: Migration 015 - Seed Data
-- ============================================================
-- Sample data for development and testing
-- ============================================================

-- ============================================================
-- SAMPLE MEDICINES
-- ============================================================
INSERT INTO medicine_master (name, generic_name, composition, manufacturer, hsn_code, prescription_required, form, strength, pack_size, indications) VALUES
  ('Dolo 650', 'Paracetamol', 'Paracetamol 650mg', 'Micro Labs', '3004', FALSE, 'Tablet', '650mg', 'Strip of 15', ARRAY['Fever', 'Pain', 'Headache']),
  ('Crocin Advance', 'Paracetamol', 'Paracetamol 500mg', 'GSK', '3004', FALSE, 'Tablet', '500mg', 'Strip of 15', ARRAY['Fever', 'Cold', 'Body Pain']),
  ('Augmentin 625', 'Amoxicillin + Clavulanic Acid', 'Amoxicillin 500mg + Clavulanic Acid 125mg', 'GSK', '3004', TRUE, 'Tablet', '625mg', 'Strip of 10', ARRAY['Bacterial Infection', 'Respiratory Infection']),
  ('Azithral 500', 'Azithromycin', 'Azithromycin 500mg', 'Alembic', '3004', TRUE, 'Tablet', '500mg', 'Strip of 3', ARRAY['Bacterial Infection', 'Pneumonia', 'Bronchitis']),
  ('Pan 40', 'Pantoprazole', 'Pantoprazole 40mg', 'Alkem', '3004', FALSE, 'Tablet', '40mg', 'Strip of 15', ARRAY['Acidity', 'GERD', 'Peptic Ulcer']),
  ('Metformin 500', 'Metformin', 'Metformin Hydrochloride 500mg', 'USV', '3004', TRUE, 'Tablet', '500mg', 'Strip of 20', ARRAY['Diabetes', 'Type 2 Diabetes', 'Blood Sugar Control']),
  ('Ecosprin 75', 'Aspirin', 'Aspirin 75mg', 'USV', '3004', FALSE, 'Tablet', '75mg', 'Strip of 14', ARRAY['Heart Disease', 'Blood Thinner', 'Cardiac Protection']),
  ('Shelcal 500', 'Calcium + Vitamin D3', 'Calcium Carbonate 500mg + Vitamin D3 250IU', 'Torrent', '3004', FALSE, 'Tablet', '500mg', 'Strip of 15', ARRAY['Calcium Deficiency', 'Bone Health', 'Osteoporosis']),
  ('Combiflam', 'Ibuprofen + Paracetamol', 'Ibuprofen 400mg + Paracetamol 325mg', 'Sanofi', '3004', FALSE, 'Tablet', '400mg', 'Strip of 20', ARRAY['Pain', 'Headache', 'Toothache', 'Body Pain']),
  ('Allegra 120', 'Fexofenadine', 'Fexofenadine 120mg', 'Sanofi', '3004', FALSE, 'Tablet', '120mg', 'Strip of 10', ARRAY['Allergy', 'Hay Fever', 'Allergic Rhinitis']);

-- ============================================================
-- SAMPLE LAB TESTS
-- ============================================================
INSERT INTO lab_tests (name, code, sample_type, fasting_required, fasting_hours, category, report_time, description) VALUES
  ('Complete Blood Count (CBC)', 'CBC001', 'BLOOD', FALSE, NULL, 'Hematology', '4 Hours', 'Measures RBC, WBC, platelets, hemoglobin, and hematocrit'),
  ('Lipid Profile', 'LIP001', 'BLOOD', TRUE, 12, 'Biochemistry', '6 Hours', 'Measures total cholesterol, HDL, LDL, VLDL, and triglycerides'),
  ('Thyroid Profile (T3, T4, TSH)', 'THY001', 'BLOOD', FALSE, NULL, 'Thyroid', '8 Hours', 'Complete thyroid function assessment'),
  ('HbA1c (Glycated Hemoglobin)', 'DIA001', 'BLOOD', FALSE, NULL, 'Diabetes', '4 Hours', '3-month average blood sugar control'),
  ('Liver Function Test (LFT)', 'LFT001', 'BLOOD', TRUE, 8, 'Liver Function', '6 Hours', 'Measures liver enzymes, bilirubin, proteins'),
  ('Kidney Function Test (KFT)', 'KFT001', 'BLOOD', TRUE, 8, 'Kidney Function', '6 Hours', 'Measures creatinine, BUN, uric acid'),
  ('Vitamin D (25-OH)', 'VIT001', 'BLOOD', FALSE, NULL, 'Immunology', '24 Hours', 'Vitamin D deficiency screening'),
  ('Vitamin B12', 'VIT002', 'BLOOD', FALSE, NULL, 'Immunology', '24 Hours', 'B12 deficiency detection'),
  ('Complete Urine Examination', 'URI001', 'URINE', FALSE, NULL, 'Pathology', '4 Hours', 'Physical and chemical urine analysis'),
  ('ESR (Erythrocyte Sedimentation Rate)', 'ESR001', 'BLOOD', FALSE, NULL, 'Hematology', '2 Hours', 'Inflammation marker'),
  ('Blood Glucose Fasting', 'GLU001', 'BLOOD', TRUE, 10, 'Diabetes', '2 Hours', 'Fasting blood sugar level'),
  ('Blood Glucose PP', 'GLU002', 'BLOOD', FALSE, NULL, 'Diabetes', '2 Hours', 'Post-meal blood sugar level'),
  ('CRP (C-Reactive Protein)', 'CRP001', 'BLOOD', FALSE, NULL, 'Cardiac Markers', '4 Hours', 'Inflammation and cardiac risk marker');

-- ============================================================
-- SAMPLE SCANS
-- ============================================================
INSERT INTO scans_master (name, code, body_part, modality, contrast_required, duration_minutes, preparation_instructions) VALUES
  ('MRI Brain Plain', 'MRI001', 'Brain', 'MRI', FALSE, 30, 'Remove all metal objects. No special preparation needed.'),
  ('MRI Brain with Contrast', 'MRI002', 'Brain', 'MRI', TRUE, 45, 'Fasting for 4 hours. Kidney function test required.'),
  ('CT Scan Chest', 'CT001', 'Chest', 'CT', FALSE, 15, 'No special preparation needed.'),
  ('CT Scan Abdomen', 'CT002', 'Abdomen', 'CT', TRUE, 30, 'Fasting for 6 hours. Drink water before scan.'),
  ('Ultrasound Abdomen', 'US001', 'Abdomen', 'ULTRASOUND', FALSE, 20, 'Fasting for 6 hours. Full bladder required.'),
  ('X-Ray Chest PA View', 'XR001', 'Chest', 'XRAY', FALSE, 5, 'Remove metal jewelry and clothing with buttons.'),
  ('X-Ray Spine (Complete)', 'XR002', 'Spine', 'XRAY', FALSE, 15, 'No special preparation needed.'),
  ('DEXA Bone Density Scan', 'DEX001', 'Bone', 'DEXA', FALSE, 15, 'Avoid calcium supplements 24 hours before.'),
  ('2D Echo', 'ECH001', 'Heart', 'ULTRASOUND', FALSE, 30, 'No special preparation needed.'),
  ('Doppler Lower Limb', 'DOP001', 'Legs', 'ULTRASOUND', FALSE, 30, 'Wear loose clothing.');

-- ============================================================
-- SAMPLE DOCTORS
-- ============================================================
INSERT INTO doctors (name, specialty, sub_specialty, qualifications, registration_number, experience_years, languages, bio, consultation_fee, video_consultation, in_person_consultation) VALUES
  ('Dr. Ramesh Kumar', 'General Physician', NULL, ARRAY['MBBS', 'MD (Medicine)'], 'AP-MED-12345', 15, ARRAY['English', 'Telugu', 'Hindi'], 'Senior general physician with expertise in preventive care and chronic disease management.', 500.00, TRUE, TRUE),
  ('Dr. Priya Sharma', 'Cardiology', 'Interventional Cardiology', ARRAY['MBBS', 'MD', 'DM (Cardiology)'], 'KA-MED-23456', 12, ARRAY['English', 'Hindi', 'Kannada'], 'Expert in heart diseases, angioplasty, and preventive cardiology.', 1000.00, TRUE, TRUE),
  ('Dr. Srinivas Reddy', 'Orthopedics', 'Joint Replacement', ARRAY['MBBS', 'MS (Ortho)'], 'AP-MED-34567', 18, ARRAY['English', 'Telugu'], 'Specialist in knee and hip replacement surgeries.', 800.00, TRUE, TRUE),
  ('Dr. Anjali Rao', 'Gynecology', 'High-Risk Pregnancy', ARRAY['MBBS', 'MS (OBG)', 'DGO'], 'TS-MED-45678', 20, ARRAY['English', 'Telugu', 'Hindi'], 'Expert obstetrician with focus on high-risk pregnancies and laparoscopic surgeries.', 700.00, TRUE, TRUE),
  ('Dr. Mohammed Arif', 'Pediatrics', 'Neonatology', ARRAY['MBBS', 'MD (Peds)', 'DM (Neonatology)'], 'AP-MED-56789', 10, ARRAY['English', 'Hindi', 'Urdu'], 'Child specialist with expertise in newborn care and developmental pediatrics.', 600.00, TRUE, TRUE),
  ('Dr. Lakshmi Devi', 'Dermatology', 'Cosmetic Dermatology', ARRAY['MBBS', 'MD (Derm)'], 'AP-MED-67890', 8, ARRAY['English', 'Telugu'], 'Skin specialist with expertise in acne, pigmentation, and anti-aging treatments.', 500.00, TRUE, TRUE),
  ('Dr. K. Venkatesh', 'Dentistry', 'Implantology', ARRAY['BDS', 'MDS'], 'AP-DEN-78901', 12, ARRAY['English', 'Telugu', 'Hindi'], 'Expert in dental implants, root canal, and cosmetic dentistry.', 400.00, FALSE, TRUE),
  ('Dr. Sunitha Krishnan', 'Ophthalmology', 'Cataract Surgery', ARRAY['MBBS', 'MS (Ophth)'], 'AP-MED-89012', 14, ARRAY['English', 'Telugu', 'Malayalam'], 'Eye specialist focusing on cataract, glaucoma, and refractive surgeries.', 600.00, TRUE, TRUE);

-- ============================================================
-- SAMPLE HOME SERVICES
-- ============================================================
INSERT INTO services_master (name, category, description, unit, duration_minutes, requirements, is_home_service) VALUES
  ('Physiotherapy Session', 'Physiotherapy', 'Home physiotherapy by certified physiotherapist', 'per session', 45, ARRAY['Exercise mat', 'Comfortable clothing'], TRUE),
  ('Nursing Care (8 Hours)', 'Nursing', 'Professional nurse for daily care and medication', 'per day', 480, ARRAY['Medical history', 'Current medications'], TRUE),
  ('Nursing Care (24 Hours)', 'Nursing', 'Round-the-clock nursing care by trained nurse', 'per day', 1440, ARRAY['Medical history', 'Current medications', 'Doctor prescription'], TRUE),
  ('ICU Setup at Home', 'ICU Care', 'Complete ICU setup with ventilator, monitor, and nurse', 'per day', 1440, ARRAY['Doctor referral', 'Power backup'], TRUE),
  ('Elder Care (Day)', 'Elder Care', 'Companion care for elderly during daytime', 'per day', 720, ARRAY['Medical history', 'Emergency contacts'], TRUE),
  ('Baby Care Training', 'Baby Care', 'Newborn care training for new parents', 'per session', 120, ARRAY['New baby at home'], TRUE),
  ('Ambulance (Basic)', 'Ambulance', 'Basic ambulance with trained staff', 'per trip', 60, ARRAY['Patient details', 'Pickup location'], FALSE),
  ('Ambulance (ICU)', 'Ambulance', 'ICU ambulance with doctor and life support', 'per trip', 60, ARRAY['Patient details', 'Doctor referral'], FALSE);

-- ============================================================
-- SAMPLE INSURANCE PLANS
-- ============================================================
INSERT INTO insurance_plans (name, provider, plan_type, sum_insured, premium_monthly, premium_yearly, features, network_hospitals, claim_settlement_ratio) VALUES
  ('Health Companion', 'Star Health', 'Individual', 500000.00, 1200.00, 12999.00, ARRAY['Cashless treatment', 'Pre-existing disease cover after 4 years', 'Free health checkup'], 10000, 89.50),
  ('Family Health Optima', 'Star Health', 'Family', 1000000.00, 2500.00, 27999.00, ARRAY['Family floater', 'Maternity cover', 'Newborn cover', 'No claim bonus'], 10000, 89.50),
  ('Optima Restore', 'HDFC Ergo', 'Family', 1000000.00, 2200.00, 23999.00, ARRAY['100% sum insured restoration', 'Multiplier benefit', 'Wellness program'], 12000, 91.20),
  ('Active Health Platinum', 'Aditya Birla', 'Individual', 500000.00, 1500.00, 16499.00, ARRAY['Chronic disease management', 'Annual health checkup', 'Second opinion'], 8000, 88.00),
  ('Corona Kavach', 'Star Health', 'Individual', 250000.00, 450.00, 4999.00, ARRAY['COVID-19 coverage', 'Home care expenses', 'AYUSH treatment'], 10000, 89.50);

-- ============================================================
-- REGISTER IN SERVICE CATALOG
-- ============================================================

-- Medicines to catalog
INSERT INTO service_catalog (service_type, ref_table, ref_id, display_name)
SELECT 'MEDICINE', 'medicine_master', id, name FROM medicine_master;

-- Lab tests to catalog  
INSERT INTO service_catalog (service_type, ref_table, ref_id, display_name)
SELECT 'LAB_TEST', 'lab_tests', id, name FROM lab_tests;

-- Scans to catalog
INSERT INTO service_catalog (service_type, ref_table, ref_id, display_name)  
SELECT 'SCAN', 'scans_master', id, name FROM scans_master;

-- Doctors to catalog
INSERT INTO service_catalog (service_type, ref_table, ref_id, display_name)
SELECT 'DOCTOR_CONSULT', 'doctors', id, name FROM doctors;

-- Home services to catalog
INSERT INTO service_catalog (service_type, ref_table, ref_id, display_name)
SELECT 'HOME_SERVICE', 'services_master', id, name FROM services_master;

-- Insurance to catalog
INSERT INTO service_catalog (service_type, ref_table, ref_id, display_name)
SELECT 'INSURANCE', 'insurance_plans', id, name FROM insurance_plans;

-- ============================================================
-- SAMPLE COUPONS
-- ============================================================
INSERT INTO coupons (code, name, description, discount_type, discount_value, max_discount_amount, min_order_amount, max_uses, valid_from, valid_to, applicable_service_types) VALUES
  ('WELCOME50', 'Welcome Offer', '50% off on first order', 'PERCENTAGE', 50.00, 200.00, 100.00, 1000, NOW(), NOW() + INTERVAL '6 months', NULL),
  ('FLAT100', 'Flat ₹100 Off', 'Flat ₹100 off on orders above ₹500', 'FIXED', 100.00, NULL, 500.00, 500, NOW(), NOW() + INTERVAL '3 months', NULL),
  ('LAB20', 'Lab Test Discount', '20% off on all lab tests', 'PERCENTAGE', 20.00, 150.00, 200.00, 2000, NOW(), NOW() + INTERVAL '3 months', ARRAY['LAB_TEST']::service_type[]),
  ('MEDCARE', 'Medicine Care', '15% off on medicines', 'PERCENTAGE', 15.00, 100.00, 300.00, NULL, NOW(), NOW() + INTERVAL '1 year', ARRAY['MEDICINE']::service_type[]);

-- ============================================================
-- SAMPLE CAROUSEL ITEMS
-- ============================================================
INSERT INTO ui_carousel_items (carousel_id, title, subtitle, image_url, link_url, link_type, sort_order)
SELECT 
  id,
  'Free Health Checkup',
  'Book lab tests worth ₹999 FREE',
  'https://source.unsplash.com/800x400/?health,medical',
  '/lab-tests',
  'INTERNAL',
  1
FROM ui_carousels WHERE name = 'home_hero'
UNION ALL
SELECT 
  id,
  'Doctor Consultation',
  'Consult top doctors starting ₹199',
  'https://source.unsplash.com/800x400/?doctor,hospital',
  '/doctors',
  'INTERNAL',
  2
FROM ui_carousels WHERE name = 'home_hero'
UNION ALL
SELECT 
  id,
  'Medicines Delivered',
  'Get medicines at your doorstep',
  'https://source.unsplash.com/800x400/?pharmacy,medicine',
  '/medicines',
  'INTERNAL',
  3
FROM ui_carousels WHERE name = 'home_hero';

-- ============================================================
-- COMPLETE!
-- ============================================================

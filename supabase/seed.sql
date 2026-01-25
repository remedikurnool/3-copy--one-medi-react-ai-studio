
-- Enable pg_trgm for AI/Fuzzy Search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 1. CATEGORIES TABLE (Hierarchical)
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    parent_id UUID REFERENCES categories(id),
    slug TEXT UNIQUE,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. PRODUCTS TABLE (Medicines, Devices)
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    category_id UUID REFERENCES categories(id),
    composition TEXT, -- For AI Search (e.g. Paracetamol)
    uses TEXT[], -- For AI Search (e.g. Fever, Pain)
    manufacturer TEXT,
    price DECIMAL(10,2),
    mrp DECIMAL(10,2),
    prescription_required BOOLEAN DEFAULT FALSE,
    image_url TEXT,
    search_vector TSVECTOR GENERATED ALWAYS AS (
        setweight(to_tsvector('english', name), 'A') ||
        setweight(to_tsvector('english', coalesce(composition, '')), 'B') ||
        setweight(to_tsvector('english', array_to_string(uses, ' ')), 'C')
    ) STORED
);

-- 3. DOCTORS TABLE
CREATE TABLE doctors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    specialty TEXT NOT NULL,
    qualification TEXT,
    experience_years INT,
    hospital_affiliation TEXT,
    fee DECIMAL(10,2),
    image_url TEXT
);

-- 4. SERVICES TABLE (Labs, Scans, Home Care)
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- 'LAB', 'SCAN', 'HOME_CARE', 'SURGERY'
    category_id UUID REFERENCES categories(id),
    price DECIMAL(10,2),
    description TEXT
);

-- SEED DATA INSERTION --

-- A. Categories (Module 1 & 2)
INSERT INTO categories (id, name, slug) VALUES 
('c001', 'Medicines', 'medicines'),
('c002', 'Lab Tests', 'lab-tests'),
('c003', 'Scans', 'scans'),
('c004', 'Home Care', 'home-care'),
('c005', 'Surgery', 'surgery');

-- Sub-Categories (Medicines)
INSERT INTO categories (name, parent_id) VALUES
('Prescription Medicines', 'c001'),
('OTC Medicines', 'c001'),
('Wellness', 'c001'),
('Healthcare Devices', 'c001'),
('Mother & Baby', 'c001');

-- B. Products (Module 1)
INSERT INTO products (name, category_id, composition, uses, manufacturer, price, prescription_required) VALUES
('Dolo 650', (SELECT id FROM categories WHERE name = 'OTC Medicines'), 'Paracetamol', ARRAY['Fever', 'Pain', 'Headache'], 'Micro Labs', 30.00, FALSE),
('Augmentin 625', (SELECT id FROM categories WHERE name = 'Prescription Medicines'), 'Amoxicillin + Clavulanic Acid', ARRAY['Bacterial Infection', 'Antibiotic'], 'GSK', 200.00, TRUE),
('Accu-Chek Active', (SELECT id FROM categories WHERE name = 'Healthcare Devices'), 'Glucometer', ARRAY['Diabetes', 'Blood Sugar'], 'Roche', 950.00, FALSE),
('Pampers Active Baby', (SELECT id FROM categories WHERE name = 'Mother & Baby'), 'Diapers', ARRAY['Baby Care', 'Hygiene'], 'P&G', 800.00, FALSE);

-- C. Doctors (Module 3)
INSERT INTO doctors (name, specialty, qualification, experience_years, fee) VALUES
('Dr. Ramesh Gupta', 'General Physician', 'MBBS, MD', 15, 500.00),
('Dr. Priya Sharma', 'Cardiologist', 'MD, DM', 12, 800.00),
('Dr. K. Sreenivas', 'Dentist', 'BDS, MDS', 8, 300.00),
('Dr. Anjali Rao', 'Gynecologist', 'MBBS, MS', 18, 600.00);

-- D. Services (Module 4 - Home Care & Scans)
INSERT INTO services (name, type, price, description) VALUES
('ICU Setup at Home', 'HOME_CARE', 5000.00, 'Ventilator, Monitor, Oxygen, ICU Nurse'),
('Post-Surgery Nursing', 'HOME_CARE', 1200.00, 'Wound dressing, IV fluids, Vitals'),
('MRI Brain', 'SCAN', 3500.00, 'Plain study of brain'),
('TIFFA Scan', 'SCAN', 2500.00, 'Targeted Imaging for Fetal Anomalies (Pregnancy)'),
('Surgery Second Opinion', 'SURGERY', 1000.00, 'Consultation with Senior Surgeon for advice');

-- E. Diabetes Program (Module 5)
INSERT INTO services (name, type, price, description) VALUES 
('Diabetes Reversal Program', 'SUBSCRIPTION', 8999.00, '6 Month Diet, Endo Consult, Glucometer');

-- INDEX for Search
CREATE INDEX products_search_idx ON products USING GIN (search_vector);

-- Migration: Seed Doctor Recommended Scans (UI Carousel)
DO $$
DECLARE
    v_carousel_id uuid;
BEGIN
    IF NOT EXISTS (SELECT 1 FROM ui_carousels WHERE name = 'doctor_recommended') THEN
        INSERT INTO ui_carousels (id, name, title, position, is_active)
        VALUES (gen_random_uuid(), 'doctor_recommended', 'Doctor Recommended', 'SCANS_TOP', true)
        RETURNING id INTO v_carousel_id;

        -- Oncologist
        INSERT INTO ui_carousel_items (carousel_id, title, subtitle, link_type, link_url, sort_order, is_active, image_url)
        VALUES (v_carousel_id, 'Oncologist', 'PET CT, Biopsy, Tumor Markers', 'internal', '/scans?doctor=oncologist', 1, true, 'oncology');

        -- Cardiologist
        INSERT INTO ui_carousel_items (carousel_id, title, subtitle, link_type, link_url, sort_order, is_active, image_url)
        VALUES (v_carousel_id, 'Cardiologist', '2D Echo, TMT, Lipid Profile', 'internal', '/scans?doctor=cardiologist', 2, true, 'cardiology');

        -- Neurologist
        INSERT INTO ui_carousel_items (carousel_id, title, subtitle, link_type, link_url, sort_order, is_active, image_url)
        VALUES (v_carousel_id, 'Neurologist', 'MRI Brain, EEG, NCV', 'internal', '/scans?doctor=neurologist', 3, true, 'neurology');

        -- Gastroenterologist
        INSERT INTO ui_carousel_items (carousel_id, title, subtitle, link_type, link_url, sort_order, is_active, image_url)
        VALUES (v_carousel_id, 'Gastroenterologist', 'Endoscopy, Liver Function, Ultrasound', 'internal', '/scans?doctor=gastroenterologist', 4, true, 'gastroenterology');
    END IF;
END $$;

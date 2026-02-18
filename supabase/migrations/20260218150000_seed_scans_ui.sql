-- Migration: Seed Scans UI Data
-- 1. Scan Categories Menu
DO $$
DECLARE
    v_menu_id uuid;
BEGIN
    IF NOT EXISTS (SELECT 1 FROM ui_menus WHERE name = 'scans_categories') THEN
        INSERT INTO ui_menus (id, name, title, menu_type, is_active)
        VALUES (gen_random_uuid(), 'scans_categories', 'Scan Categories', 'DESKTOP', true)
        RETURNING id INTO v_menu_id;

        -- MRI Scan
        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, badge_color)
        VALUES (v_menu_id, 'MRI Scan', 'radiology', 'mri', 1, true, 'blue');

        -- CT Scan
        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, badge_color)
        VALUES (v_menu_id, 'CT Scan', 'scanner', 'ct', 2, true, 'indigo');

        -- PET CT
        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, badge_color)
        VALUES (v_menu_id, 'PET CT', 'account_tree', 'pet', 3, true, 'amber');

        -- Ultrasound
        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, badge_color)
        VALUES (v_menu_id, 'Ultrasound', 'water_drop', 'ultrasound', 4, true, 'teal');

        -- X-Ray
        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, badge_color)
        VALUES (v_menu_id, 'X-Ray', 'skeleton', 'xray', 5, true, 'slate');

        -- Cardiac
        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, badge_color)
        VALUES (v_menu_id, 'Cardiac', 'ecg_heart', 'cardiac', 6, true, 'rose');

         -- Neuro
        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, badge_color)
        VALUES (v_menu_id, 'Neuro', 'neurology', 'neuro', 7, true, 'purple');

        -- Endoscopy
        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, badge_color)
        VALUES (v_menu_id, 'Endoscopy', 'gastronomy', 'endoscopy', 8, true, 'pink');

        -- Blood Tests
        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, badge_color)
        VALUES (v_menu_id, 'Blood Tests', 'hematology', 'pathology', 9, true, 'red');
    END IF;
END $$;

-- 2. Health Packages (Lab Tests & Pricing)
DO $$
DECLARE
    v_vendor_id uuid := '874845db-ae72-48c3-b891-84898c4f616f'; -- Vijaya Diagnostics
    v_pkg_fullbody_id uuid;
    v_pkg_senior_id uuid;
    v_pkg_women_id uuid;
BEGIN
    -- Comprehensive Full Body Checkup
    IF NOT EXISTS (SELECT 1 FROM lab_tests WHERE code = 'pkg_fullbody') THEN
        INSERT INTO lab_tests (id, name, code, category, includes, is_active, is_home_collection)
        VALUES (gen_random_uuid(), 'Comprehensive Full Body Checkup', 'pkg_fullbody', 'Package', ARRAY['Thyroid', 'Lipid', 'Liver', 'Kidney', 'Iron'], true, true)
        RETURNING id INTO v_pkg_fullbody_id;

        INSERT INTO lab_pricing (id, test_id, vendor_id, price, mrp, is_available)
        VALUES (gen_random_uuid(), v_pkg_fullbody_id, v_vendor_id, 999, 2999, true);
    ELSE
        SELECT id INTO v_pkg_fullbody_id FROM lab_tests WHERE code = 'pkg_fullbody';
    END IF;

    -- Senior Citizen Care Package
    IF NOT EXISTS (SELECT 1 FROM lab_tests WHERE code = 'pkg_senior') THEN
        INSERT INTO lab_tests (id, name, code, category, includes, is_active, is_home_collection)
        VALUES (gen_random_uuid(), 'Senior Citizen Care Package', 'pkg_senior', 'Package', ARRAY['HBA1C', 'Calcium', 'Bone Health', 'Vitamin D'], true, true)
        RETURNING id INTO v_pkg_senior_id;

        INSERT INTO lab_pricing (id, test_id, vendor_id, price, mrp, is_available)
        VALUES (gen_random_uuid(), v_pkg_senior_id, v_vendor_id, 1499, 3500, true);
    ELSE
         SELECT id INTO v_pkg_senior_id FROM lab_tests WHERE code = 'pkg_senior';
    END IF;

    -- Women Wellness Premium
    IF NOT EXISTS (SELECT 1 FROM lab_tests WHERE code = 'pkg_women') THEN
        INSERT INTO lab_tests (id, name, code, category, includes, is_active, is_home_collection)
        VALUES (gen_random_uuid(), 'Women Wellness Premium', 'pkg_women', 'Package', ARRAY['Hormones', 'PCOD Screen', 'Iron Studies', 'Thyroid'], true, true)
        RETURNING id INTO v_pkg_women_id;

        INSERT INTO lab_pricing (id, test_id, vendor_id, price, mrp, is_available)
        VALUES (gen_random_uuid(), v_pkg_women_id, v_vendor_id, 1899, 4200, true);
    ELSE
         SELECT id INTO v_pkg_women_id FROM lab_tests WHERE code = 'pkg_women';
    END IF;
END $$;

-- 3. Health Packages UI (Carousel)
DO $$
DECLARE
    v_carousel_id uuid;
BEGIN
    IF NOT EXISTS (SELECT 1 FROM ui_carousels WHERE name = 'health_packages') THEN
        INSERT INTO ui_carousels (id, name, title, position, is_active)
        VALUES (gen_random_uuid(), 'health_packages', 'Curated Health Packages', 'SCANS_TOP', true)
        RETURNING id INTO v_carousel_id;

        -- Full Body
        INSERT INTO ui_carousel_items (carousel_id, title, subtitle, link_type, link_url, sort_order, is_active, image_url)
        VALUES (v_carousel_id, 'Comprehensive Full Body Checkup', '85 Tests included', 'internal', '/scans/pkg_fullbody', 1, true, 'emerald');

        -- Senior
        INSERT INTO ui_carousel_items (carousel_id, title, subtitle, link_type, link_url, sort_order, is_active, image_url)
        VALUES (v_carousel_id, 'Senior Citizen Care Package', '65 Tests included', 'internal', '/scans/pkg_senior', 2, true, 'orange');

        -- Women
        INSERT INTO ui_carousel_items (carousel_id, title, subtitle, link_type, link_url, sort_order, is_active, image_url)
        VALUES (v_carousel_id, 'Women Wellness Premium', '72 Tests included', 'internal', '/scans/pkg_women', 3, true, 'pink');
    END IF;
END $$;

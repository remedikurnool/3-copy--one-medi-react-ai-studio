-- Migration: Seed Home Marketing & Navigation
-- 1. Mobile Sidebar Menu
DO $$
DECLARE
    v_menu_id uuid;
BEGIN
    IF NOT EXISTS (SELECT 1 FROM ui_menus WHERE name = 'mobile_sidebar') THEN
        INSERT INTO ui_menus (id, name, title, menu_type, is_active)
        VALUES (gen_random_uuid(), 'mobile_sidebar', 'Mobile Sidebar', 'MOBILE', true)
        RETURNING id INTO v_menu_id;

        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active) 
        VALUES (v_menu_id, 'Home', 'home', '/', 1, true);
        
        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active) 
        VALUES (v_menu_id, 'My Bookings', 'calendar_today', '/bookings', 2, true);

        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active) 
        VALUES (v_menu_id, 'My Orders', 'shopping_bag', '/profile/orders', 3, true);

        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active) 
        VALUES (v_menu_id, 'Prescriptions', 'description', '/prescriptions', 4, true);

        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active) 
        VALUES (v_menu_id, 'Lab Reports', 'lab_profile', '/profile/reports', 5, true);

        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active) 
        VALUES (v_menu_id, 'Saved Items', 'favorite', '/profile/saved', 6, true);

        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active) 
        VALUES (v_menu_id, 'Settings', 'settings', '/profile/settings', 7, true);

        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active) 
        VALUES (v_menu_id, 'Help & Support', 'help', '/support', 8, true);
    END IF;
END $$;

-- 2. Home Quick Access Grid
DO $$
DECLARE
    v_menu_id uuid;
BEGIN
    IF NOT EXISTS (SELECT 1 FROM ui_menus WHERE name = 'home_quick_access') THEN
        INSERT INTO ui_menus (id, name, title, menu_type, is_active)
        VALUES (gen_random_uuid(), 'home_quick_access', 'Quick Access', 'DESKTOP', true)
        RETURNING id INTO v_menu_id;

        -- We will store tailwind color classes/theme in badge_color or description. 
        -- Let's use badge_color for value (e.g. 'emerald', 'blue') and component will derive classes.
        
        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, badge_color) 
        VALUES (v_menu_id, 'Medicines', 'medication', '/medicines', 1, true, 'emerald');

        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, badge_color) 
        VALUES (v_menu_id, 'Lab Tests', 'biotech', '/lab-tests', 2, true, 'blue');

        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, badge_color) 
        VALUES (v_menu_id, 'Doctors', 'stethoscope', '/doctors', 3, true, 'indigo');

        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, badge_color) 
        VALUES (v_menu_id, 'Scans', 'radiology', '/scans', 4, true, 'purple');

        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, badge_color) 
        VALUES (v_menu_id, 'Surgeries', 'medical_services', '/surgeries', 5, true, 'rose');

        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, badge_color) 
        VALUES (v_menu_id, 'Insurance', 'security', '/insurance', 6, true, 'amber');

        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, badge_color) 
        VALUES (v_menu_id, 'Wellness', 'self_improvement', '/wellness', 7, true, 'teal');

        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, badge_color) 
        VALUES (v_menu_id, 'Emergency', 'ambulance', '/ambulance', 8, true, 'red');
    END IF;
END $$;

-- 3. Home Promo Banner
-- Using HOME_TOP as carousel_position since HOME_MIDDLE is not yet available and we fetch by name.
DO $$
DECLARE
    v_carousel_id uuid;
BEGIN
    IF NOT EXISTS (SELECT 1 FROM ui_carousels WHERE name = 'home_promo') THEN
        INSERT INTO ui_carousels (id, name, title, position, is_active)
        VALUES (gen_random_uuid(), 'home_promo', 'Home Promo Banners', 'HOME_TOP', true)
        RETURNING id INTO v_carousel_id;

        INSERT INTO ui_carousel_items (carousel_id, title, subtitle, link_type, link_url, sort_order, is_active, image_url)
        VALUES (v_carousel_id, 'Get 15% Additional Cashback', 'On all medicine orders above ₹999. Use code HEALTH15', 'internal', '/medicines', 1, true, 'promo_bg_1');
    END IF;
END $$;

-- Migration: Seed Medicine UI Data (Corrected)

-- 1. Medicine Categories Menu
DO $$
DECLARE
    v_menu_id uuid;
BEGIN
    -- Check if exists, if not create
    IF NOT EXISTS (SELECT 1 FROM ui_menus WHERE name = 'medicine_categories') THEN
        INSERT INTO ui_menus (id, name, title, menu_type, is_active)
        VALUES (gen_random_uuid(), 'medicine_categories', 'Medicine Categories', 'DESKTOP', true)
        RETURNING id INTO v_menu_id;

        -- Insert Items
        -- Diabetes Care
        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, badge_color)
        VALUES (v_menu_id, 'Diabetes Care', 'bloodtype', 'diabetes', 1, true, 'blue'); 

        -- Cardiac Care
        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, badge_color)
        VALUES (v_menu_id, 'Cardiac Care', 'cardiology', 'cardiac', 2, true, 'rose');

        -- Pain Relief
        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, badge_color)
        VALUES (v_menu_id, 'Pain Relief', 'healing', 'pain', 3, true, 'orange');

        -- Vitamins
        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, badge_color)
        VALUES (v_menu_id, 'Vitamins', 'nutrition', 'vitamins', 4, true, 'green');

        -- Stomach Care
        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, badge_color)
        VALUES (v_menu_id, 'Stomach Care', 'gastroenterology', 'stomach', 5, true, 'amber');

        -- Respiratory
        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, badge_color)
        VALUES (v_menu_id, 'Respiratory', 'pulmonology', 'respiratory', 6, true, 'indigo');
    END IF;
END $$;

-- 2. Medicine Deals Carousel
DO $$
DECLARE
    v_carousel_id uuid;
BEGIN
    -- Check if exists, if not create
    IF NOT EXISTS (SELECT 1 FROM ui_carousels WHERE name = 'medicine_deals') THEN
        INSERT INTO ui_carousels (id, name, title, position, is_active)
        VALUES (gen_random_uuid(), 'medicine_deals', 'Pharmacy Deals', 'HOME_TOP', true)
        RETURNING id INTO v_carousel_id;

        -- Insert Items
        -- Flat 25% OFF
        INSERT INTO ui_carousel_items (carousel_id, title, subtitle, link_type, link_url, sort_order, is_active, image_url)
        VALUES (v_carousel_id, 'Flat 25% OFF', 'On First Medicine Order | Code: FIRSTMED25', 'internal', '/medicines?offer=FIRSTMED25', 1, true, 'from-blue-500 to-cyan-500'); 
        
        -- Free Delivery
        INSERT INTO ui_carousel_items (carousel_id, title, subtitle, link_type, link_url, sort_order, is_active, image_url)
        VALUES (v_carousel_id, 'Free Delivery', 'Orders Above ₹499 | Code: FREEDEL', 'internal', '/medicines', 2, true, 'from-green-500 to-emerald-500');

        -- Mega Health Sale
        INSERT INTO ui_carousel_items (carousel_id, title, subtitle, link_type, link_url, sort_order, is_active, image_url)
        VALUES (v_carousel_id, 'Mega Health Sale', 'Extra 10% Cashback | Code: HEALTH10', 'internal', '/medicines', 3, true, 'from-rose-500 to-orange-500');
    END IF;
END $$;

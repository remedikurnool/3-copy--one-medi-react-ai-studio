-- Migration: Seed Surgery and Wellness UI Data
-- 1. Extend ui_menu_items with description
ALTER TABLE ui_menu_items ADD COLUMN IF NOT EXISTS description text;

-- 2. Surgery Specialties (Menu)
DO $$
DECLARE
    v_menu_id uuid;
BEGIN
    IF NOT EXISTS (SELECT 1 FROM ui_menus WHERE name = 'surgery_specialties') THEN
        INSERT INTO ui_menus (id, name, title, menu_type, is_active)
        VALUES (gen_random_uuid(), 'surgery_specialties', 'Surgery Specialties', 'DESKTOP', true)
        RETURNING id INTO v_menu_id;

        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, description)
        VALUES (v_menu_id, 'General Surgery', 'medical_services', 'general', 1, true, 'Hernia, Piles, Gallstones');

        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, description)
        VALUES (v_menu_id, 'Orthopedics', 'orthopedics', 'ortho', 2, true, 'Knee, Hip, Spine');

        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, description)
        VALUES (v_menu_id, 'Gynecology', 'woman', 'gynae', 3, true, 'Fibroids, Cyst, Hysterectomy');

        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, description)
        VALUES (v_menu_id, 'Urology', 'nephrology', 'uro', 4, true, 'Kidney Stones, Prostate');

        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, description)
        VALUES (v_menu_id, 'ENT', 'hearing', 'ent', 5, true, 'Sinus, Tonsils, Ear');

        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, description)
        VALUES (v_menu_id, 'Ophthalmology', 'visibility', 'ophth', 6, true, 'Cataract, LASIK');

        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, description)
        VALUES (v_menu_id, 'Cardiac', 'cardiology', 'cardio', 7, true, 'Bypass, Angioplasty');

        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, description)
        VALUES (v_menu_id, 'Aesthetics', 'face', 'plastic', 8, true, 'Liposuction, Gynecomastia');
    END IF;
END $$;

-- 3. Wellness Categories (Menu)
DO $$
DECLARE
    v_menu_id uuid;
BEGIN
    IF NOT EXISTS (SELECT 1 FROM ui_menus WHERE name = 'wellness_categories') THEN
        INSERT INTO ui_menus (id, name, title, menu_type, is_active)
        VALUES (gen_random_uuid(), 'wellness_categories', 'Wellness Categories', 'DESKTOP', true)
        RETURNING id INTO v_menu_id;

        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, badge_color)
        VALUES (v_menu_id, 'Weight Loss', 'monitor_weight', '/wellness/weight-loss', 1, true, 'orange');

        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, badge_color)
        VALUES (v_menu_id, 'Clinical Diet', 'stethoscope', '/wellness/clinical', 2, true, 'blue');

        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, badge_color)
        VALUES (v_menu_id, 'Fitness & Yoga', 'fitness_center', '/wellness/fitness', 3, true, 'purple');

        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, badge_color)
        VALUES (v_menu_id, 'Mental Wellness', 'self_improvement', '/wellness/mental', 4, true, 'teal');
    END IF;
END $$;

-- 4. Wellness Tools (Menu)
DO $$
DECLARE
    v_menu_id uuid;
BEGIN
    IF NOT EXISTS (SELECT 1 FROM ui_menus WHERE name = 'wellness_tools') THEN
        INSERT INTO ui_menus (id, name, title, menu_type, is_active)
        VALUES (gen_random_uuid(), 'wellness_tools', 'Wellness Tools', 'DESKTOP', true)
        RETURNING id INTO v_menu_id;

        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, badge_color)
        VALUES (v_menu_id, 'BMI Calculator', 'calculate', 'bmi', 1, true, 'indigo');

        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, badge_color)
        VALUES (v_menu_id, 'BMR Calculator', 'bolt', 'bmr', 2, true, 'amber');

        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, badge_color)
        VALUES (v_menu_id, 'Water Tracker', 'water_drop', 'water', 3, true, 'cyan');

        INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order, is_active, badge_color)
        VALUES (v_menu_id, 'Sleep Monitor', 'bedtime', 'sleep', 4, true, 'indigo');
    END IF;
END $$;

-- 5. Surgery Trust Signals (Carousel)
DO $$
DECLARE
    v_carousel_id uuid;
BEGIN
    IF NOT EXISTS (SELECT 1 FROM ui_carousels WHERE name = 'surgery_trust_signals') THEN
        INSERT INTO ui_carousels (id, name, title, position, is_active)
        VALUES (gen_random_uuid(), 'surgery_trust_signals', 'Surgery Trust Signals', 'SERVICE_PAGE', true)
        RETURNING id INTO v_carousel_id;

        INSERT INTO ui_carousel_items (carousel_id, title, subtitle, sort_order, is_active, image_url)
        VALUES (v_carousel_id, 'Expert Surgeons', '15+ Years Exp', 1, true, 'medal');

        INSERT INTO ui_carousel_items (carousel_id, title, subtitle, sort_order, is_active, image_url)
        VALUES (v_carousel_id, 'NABH Hospitals', 'Safety Certified', 2, true, 'verified_user');

        INSERT INTO ui_carousel_items (carousel_id, title, subtitle, sort_order, is_active, image_url)
        VALUES (v_carousel_id, 'Advanced Tech', 'Laser & Robotic', 3, true, 'precision_manufacturing');

        INSERT INTO ui_carousel_items (carousel_id, title, subtitle, sort_order, is_active, image_url)
        VALUES (v_carousel_id, 'Insurance Support', 'Cashless Claims', 4, true, 'health_and_safety');
    END IF;
END $$;

-- 6. Wellness Success Stories (Carousel)
DO $$
DECLARE
    v_carousel_id uuid;
BEGIN
    IF NOT EXISTS (SELECT 1 FROM ui_carousels WHERE name = 'wellness_success_stories') THEN
        INSERT INTO ui_carousels (id, name, title, position, is_active)
        VALUES (gen_random_uuid(), 'wellness_success_stories', 'Wellness Success Stories', 'SERVICE_PAGE', true)
        RETURNING id INTO v_carousel_id;

        INSERT INTO ui_carousel_items (carousel_id, title, subtitle, sort_order, is_active, image_url, link_type)
        VALUES (v_carousel_id, 'Priya K.', 'Lost 12kg in 3 months', 1, true, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100', 'internal');
        
        -- Using link_type or another field to store program name if needed, or stick to subtitle.
        -- Assuming subtitle 'Lost 12kg...' is enough.
        
        INSERT INTO ui_carousel_items (carousel_id, title, subtitle, sort_order, is_active, image_url, link_type)
        VALUES (v_carousel_id, 'Rahul M.', 'Reversed Pre-Diabetes', 2, true, 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100', 'internal');
    END IF;
END $$;

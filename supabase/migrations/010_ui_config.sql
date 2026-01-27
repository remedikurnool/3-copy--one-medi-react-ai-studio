-- ============================================================
-- ONE MEDI: Migration 010 - UI Configuration (Group I)
-- ============================================================
-- Tables: ui_menus, ui_menu_items, ui_carousels, ui_carousel_items
-- ============================================================

-- ============================================================
-- UI MENUS TABLE
-- Dynamic navigation menus
-- ============================================================
CREATE TABLE ui_menus (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_type menu_type NOT NULL, -- DESKTOP, MOBILE, FLOATING
  name TEXT NOT NULL,
  title TEXT,
  description TEXT,
  icon TEXT, -- Icon name or URL
  
  -- Targeting
  city_id UUID REFERENCES cities(id), -- NULL = all cities
  
  -- Display
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(menu_type, name, city_id)
);

-- ============================================================
-- UI MENU ITEMS TABLE
-- Items within navigation menus
-- ============================================================
CREATE TABLE ui_menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_id UUID NOT NULL REFERENCES ui_menus(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES ui_menu_items(id), -- For nested items
  
  -- Content
  title TEXT NOT NULL,
  subtitle TEXT,
  icon TEXT,
  image_url TEXT,
  
  -- Navigation
  route TEXT, -- Internal route (e.g., '/medicines')
  external_link TEXT, -- External URL
  
  -- Links to entities
  service_catalog_id UUID REFERENCES service_catalog(id),
  taxonomy_term_id UUID, -- Will reference taxonomy_terms after creation
  
  -- Display
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  badge_text TEXT, -- e.g., "New", "Sale"
  badge_color TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_menu_items_menu ON ui_menu_items(menu_id);
CREATE INDEX idx_menu_items_active ON ui_menu_items(is_active) WHERE is_active = TRUE;

-- ============================================================
-- UI CAROUSELS TABLE
-- Dynamic banner/carousel containers
-- ============================================================
CREATE TABLE ui_carousels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT,
  position carousel_position NOT NULL, -- HOME_TOP, SERVICE_PAGE, FOOTER
  
  -- Targeting
  city_id UUID REFERENCES cities(id),
  
  -- Configuration
  auto_rotate BOOLEAN DEFAULT TRUE,
  rotate_interval_ms INTEGER DEFAULT 5000,
  show_indicators BOOLEAN DEFAULT TRUE,
  show_arrows BOOLEAN DEFAULT TRUE,
  
  -- Display
  is_active BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(position, city_id)
);

-- ============================================================
-- UI CAROUSEL ITEMS TABLE
-- Individual slides within carousels
-- ============================================================
CREATE TABLE ui_carousel_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  carousel_id UUID NOT NULL REFERENCES ui_carousels(id) ON DELETE CASCADE,
  
  -- Content
  title TEXT,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  mobile_image_url TEXT, -- Different aspect ratio for mobile
  
  -- Action
  link_url TEXT,
  link_type TEXT, -- INTERNAL, EXTERNAL, SERVICE, CATEGORY
  
  -- Links to entities
  service_catalog_id UUID REFERENCES service_catalog(id),
  
  -- Display
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Analytics
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_carousel_items_carousel ON ui_carousel_items(carousel_id);
CREATE INDEX idx_carousel_items_active ON ui_carousel_items(is_active) WHERE is_active = TRUE;

-- ============================================================
-- DEFAULT MENUS
-- ============================================================

-- Desktop Main Navigation
INSERT INTO ui_menus (menu_type, name, title, sort_order) VALUES
  ('DESKTOP', 'main_nav', 'Main Navigation', 1);

-- Mobile Bottom Navigation
INSERT INTO ui_menus (menu_type, name, title, sort_order) VALUES
  ('MOBILE', 'bottom_nav', 'Bottom Navigation', 1);

-- Floating Action Menu
INSERT INTO ui_menus (menu_type, name, title, sort_order) VALUES
  ('FLOATING', 'quick_actions', 'Quick Actions', 1);

-- Default Menu Items for Mobile Bottom Nav
INSERT INTO ui_menu_items (menu_id, title, icon, route, sort_order)
SELECT id, 'Home', 'home', '/', 1 FROM ui_menus WHERE name = 'bottom_nav'
UNION ALL
SELECT id, 'Medicines', 'pill', '/medicines', 2 FROM ui_menus WHERE name = 'bottom_nav'
UNION ALL
SELECT id, 'Lab Tests', 'flask', '/lab-tests', 3 FROM ui_menus WHERE name = 'bottom_nav'
UNION ALL
SELECT id, 'Doctors', 'stethoscope', '/doctors', 4 FROM ui_menus WHERE name = 'bottom_nav'
UNION ALL
SELECT id, 'Account', 'user', '/profile', 5 FROM ui_menus WHERE name = 'bottom_nav';

-- Default Home Carousel
INSERT INTO ui_carousels (name, title, position, is_active) VALUES
  ('home_hero', 'Home Hero Banner', 'HOME_TOP', TRUE);

-- ============================================================
-- TRIGGERS
-- ============================================================
CREATE TRIGGER ui_menus_updated_at BEFORE UPDATE ON ui_menus
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER ui_menu_items_updated_at BEFORE UPDATE ON ui_menu_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER ui_carousels_updated_at BEFORE UPDATE ON ui_carousels
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER ui_carousel_items_updated_at BEFORE UPDATE ON ui_carousel_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

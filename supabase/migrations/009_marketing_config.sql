-- ============================================================
-- ONE MEDI: Migration 009 - Marketing & Config (Group H)
-- ============================================================
-- Tables: coupons, marketing_assets, feature_flags, 
--         (content_master already in 005)
-- ============================================================

-- ============================================================
-- COUPONS TABLE
-- Promo engine for discounts
-- ============================================================
CREATE TABLE coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name TEXT,
  description TEXT,
  
  -- Discount configuration
  discount_type discount_type NOT NULL, -- PERCENTAGE, FIXED
  discount_value DECIMAL(10,2) NOT NULL,
  max_discount_amount DECIMAL(10,2), -- Cap for percentage discounts
  
  -- Minimum requirements
  min_order_amount DECIMAL(10,2) DEFAULT 0,
  min_items INTEGER DEFAULT 1,
  
  -- Usage limits
  max_uses INTEGER, -- Total uses allowed
  max_uses_per_user INTEGER DEFAULT 1,
  current_uses INTEGER DEFAULT 0,
  
  -- Validity
  valid_from TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  valid_to TIMESTAMPTZ NOT NULL,
  
  -- Targeting
  applicable_service_types service_type[], -- Limit to specific services
  applicable_vendor_ids UUID[], -- Limit to specific vendors
  applicable_city_ids UUID[], -- Limit to specific cities
  
  -- User targeting
  first_order_only BOOLEAN DEFAULT FALSE,
  user_whitelist UUID[], -- Specific users only
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  is_public BOOLEAN DEFAULT TRUE, -- Show in app
  
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CHECK(valid_from < valid_to),
  CHECK(discount_value > 0)
);

CREATE INDEX idx_coupons_code ON coupons(code);
CREATE INDEX idx_coupons_valid ON coupons(valid_from, valid_to) WHERE is_active = TRUE;

-- ============================================================
-- COUPON USAGE TABLE
-- Track coupon usage per user
-- ============================================================
CREATE TABLE coupon_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coupon_id UUID NOT NULL REFERENCES coupons(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES profiles(id),
  order_id UUID REFERENCES orders(id),
  discount_amount DECIMAL(10,2),
  used_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(coupon_id, order_id)
);

CREATE INDEX idx_coupon_usage_coupon ON coupon_usage(coupon_id);
CREATE INDEX idx_coupon_usage_profile ON coupon_usage(profile_id);

-- ============================================================
-- MARKETING ASSETS TABLE
-- CMS for banners, carousels, promotions
-- ============================================================
CREATE TABLE marketing_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- BANNER, CAROUSEL, POPUP, NOTIFICATION
  
  -- Content
  title TEXT,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  mobile_image_url TEXT, -- Different image for mobile
  
  -- Action
  link_url TEXT,
  link_type TEXT, -- INTERNAL, EXTERNAL, SERVICE, CATEGORY
  link_target TEXT, -- Service ID, Category slug, etc.
  
  -- Targeting
  city_id UUID REFERENCES cities(id),
  position TEXT, -- HOME_HERO, HOME_MIDDLE, SERVICE_TOP, etc.
  
  -- Scheduling
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  
  -- Display
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Analytics
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_marketing_assets_type ON marketing_assets(type);
CREATE INDEX idx_marketing_assets_active ON marketing_assets(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_marketing_assets_city ON marketing_assets(city_id);

-- ============================================================
-- FEATURE FLAGS TABLE
-- ★ City-wise service rollouts without code deployment
-- ============================================================
CREATE TABLE feature_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_key TEXT NOT NULL, -- e.g., 'ENABLE_LAB_TESTS', 'ENABLE_INSURANCE'
  feature_name TEXT,
  description TEXT,
  
  -- Targeting
  city_id UUID REFERENCES cities(id), -- NULL = all cities
  
  -- Status
  enabled BOOLEAN DEFAULT FALSE,
  
  -- Rollout
  rollout_percentage INTEGER DEFAULT 100, -- For gradual rollouts
  
  -- Configuration
  config JSONB DEFAULT '{}', -- Feature-specific config
  
  -- Metadata
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(feature_key, city_id)
);

-- Default feature flags
INSERT INTO feature_flags (feature_key, feature_name, enabled) VALUES
  ('ENABLE_MEDICINES', 'Medicine Ordering', TRUE),
  ('ENABLE_LAB_TESTS', 'Lab Test Booking', TRUE),
  ('ENABLE_SCANS', 'Scan Booking', TRUE),
  ('ENABLE_DOCTOR_CONSULT', 'Doctor Consultations', TRUE),
  ('ENABLE_HOME_SERVICES', 'Home Healthcare Services', TRUE),
  ('ENABLE_INSURANCE', 'Insurance Products', TRUE),
  ('ENABLE_CONTENT', 'Health Content/Blogs', TRUE),
  ('ENABLE_COD', 'Cash on Delivery', TRUE),
  ('ENABLE_PRESCRIPTION_UPLOAD', 'Prescription Upload', TRUE);

CREATE INDEX idx_feature_flags_key ON feature_flags(feature_key);
CREATE INDEX idx_feature_flags_city ON feature_flags(city_id);

-- ============================================================
-- FUNCTION: Check Feature Enabled
-- ============================================================
CREATE OR REPLACE FUNCTION is_feature_enabled(
  p_feature_key TEXT,
  p_city_id UUID DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql STABLE
AS $$
DECLARE
  v_enabled BOOLEAN;
BEGIN
  -- First check city-specific flag
  SELECT enabled INTO v_enabled
  FROM feature_flags
  WHERE feature_key = p_feature_key 
    AND city_id = p_city_id;
  
  IF FOUND THEN
    RETURN v_enabled;
  END IF;
  
  -- Fall back to global flag
  SELECT enabled INTO v_enabled
  FROM feature_flags
  WHERE feature_key = p_feature_key 
    AND city_id IS NULL;
  
  RETURN COALESCE(v_enabled, FALSE);
END;
$$;

-- ============================================================
-- NOTIFICATIONS TABLE
-- Push/SMS/Email notification templates and logs
-- ============================================================
CREATE TABLE notification_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL, -- ORDER_PLACED, ORDER_SHIPPED, APPOINTMENT_REMINDER, etc.
  channel TEXT NOT NULL, -- PUSH, SMS, EMAIL, WHATSAPP
  
  -- Content
  title_template TEXT,
  body_template TEXT NOT NULL,
  
  -- Variables available (for documentation)
  available_variables TEXT[],
  
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE notification_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID REFERENCES notification_templates(id),
  profile_id UUID REFERENCES profiles(id),
  
  channel TEXT NOT NULL,
  recipient TEXT NOT NULL, -- Phone, email, device token
  
  title TEXT,
  body TEXT,
  
  -- Status
  status TEXT DEFAULT 'PENDING', -- PENDING, SENT, DELIVERED, FAILED
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  error_message TEXT,
  
  -- Context
  entity_type TEXT,
  entity_id UUID,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notification_logs_profile ON notification_logs(profile_id);
CREATE INDEX idx_notification_logs_created ON notification_logs USING BRIN (created_at);

-- ============================================================
-- TRIGGERS
-- ============================================================
CREATE TRIGGER coupons_updated_at BEFORE UPDATE ON coupons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER marketing_assets_updated_at BEFORE UPDATE ON marketing_assets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER feature_flags_updated_at BEFORE UPDATE ON feature_flags
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER notification_templates_updated_at BEFORE UPDATE ON notification_templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ONE MEDI: Migration 007 - Transactions (Group F)
-- ============================================================
-- Tables: carts, cart_items, orders, order_items,
--         service_bookings, order_artifacts
-- ============================================================

-- ============================================================
-- CARTS TABLE
-- Persistent shopping cart for abandonment tracking
-- ============================================================
CREATE TABLE carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  coupon_code TEXT,
  coupon_discount DECIMAL(10,2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(profile_id) -- One active cart per user
);

-- ============================================================
-- CART ITEMS TABLE
-- Items in the shopping cart
-- ============================================================
CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  service_catalog_id UUID NOT NULL REFERENCES service_catalog(id) ON DELETE CASCADE,
  vendor_id UUID REFERENCES vendors(id),
  branch_id UUID REFERENCES vendor_locations(id),
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(10,2),
  selected_slot_id UUID REFERENCES availability_slots(id),
  patient_id UUID REFERENCES family_members(id), -- Who is this for?
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(cart_id, service_catalog_id, vendor_id),
  CHECK(quantity > 0)
);

CREATE INDEX idx_cart_items_cart ON cart_items(cart_id);

-- ============================================================
-- ORDERS TABLE
-- Transaction parent record
-- ============================================================
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE, -- Human-readable order ID (e.g., OM-2026-000001)
  profile_id UUID NOT NULL REFERENCES profiles(id),
  
  -- Amounts
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  delivery_fee DECIMAL(10,2) DEFAULT 0,
  net_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  
  -- Coupon
  coupon_code TEXT,
  coupon_discount DECIMAL(10,2) DEFAULT 0,
  
  -- Status
  status order_status DEFAULT 'PENDING',
  payment_status payment_status DEFAULT 'AWAITING',
  payment_method TEXT, -- UPI, Card, COD, NetBanking
  payment_ref TEXT, -- Payment gateway reference
  payment_gateway TEXT, -- Razorpay, Paytm, etc.
  
  -- Delivery
  delivery_address_id UUID REFERENCES addresses(id),
  delivery_instructions TEXT,
  estimated_delivery TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  
  -- Prescription (if required)
  prescription_required BOOLEAN DEFAULT FALSE,
  prescription_verified BOOLEAN DEFAULT FALSE,
  prescription_verified_by UUID REFERENCES profiles(id),
  
  -- Metadata
  source TEXT DEFAULT 'web', -- web, app, whatsapp
  ip_address TEXT,
  user_agent TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- BRIN index for time-series queries
CREATE INDEX idx_orders_created ON orders USING BRIN (created_at);
CREATE INDEX idx_orders_profile ON orders(profile_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_number ON orders(order_number);

-- ============================================================
-- ORDER ITEMS TABLE
-- Individual items in an order with JSONB snapshots
-- ============================================================
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  service_catalog_id UUID NOT NULL REFERENCES service_catalog(id),
  vendor_id UUID NOT NULL REFERENCES vendors(id),
  branch_id UUID REFERENCES vendor_locations(id),
  
  -- Quantities & Pricing
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  mrp DECIMAL(10,2),
  discount_amount DECIMAL(10,2) DEFAULT 0,
  
  -- Tax (India GST)
  hsn_code TEXT,
  cgst_rate DECIMAL(5,2) DEFAULT 0,
  sgst_rate DECIMAL(5,2) DEFAULT 0,
  igst_rate DECIMAL(5,2) DEFAULT 0,
  cgst_amount DECIMAL(10,2) DEFAULT 0,
  sgst_amount DECIMAL(10,2) DEFAULT 0,
  igst_amount DECIMAL(10,2) DEFAULT 0,
  
  -- Line total
  line_total DECIMAL(10,2) NOT NULL,
  
  -- ★ CRITICAL: Service snapshot for historical accuracy
  service_snapshot JSONB NOT NULL,
  
  -- Status
  status order_status DEFAULT 'PENDING',
  fulfilled_at TIMESTAMPTZ,
  fulfilled_by UUID REFERENCES profiles(id),
  
  -- For whom (if booking for family member)
  patient_id UUID REFERENCES family_members(id),
  patient_name TEXT, -- Snapshot of name
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CHECK(quantity > 0)
);

CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_order_items_vendor ON order_items(vendor_id);
CREATE INDEX idx_order_items_status ON order_items(status);

-- ============================================================
-- SERVICE BOOKINGS TABLE
-- Appointment and booking execution details
-- ============================================================
CREATE TABLE service_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_item_id UUID NOT NULL REFERENCES order_items(id) ON DELETE CASCADE UNIQUE,
  
  -- Patient details
  patient_id UUID REFERENCES family_members(id),
  patient_profile_id UUID REFERENCES profiles(id), -- If booking for self
  patient_name TEXT NOT NULL,
  patient_phone TEXT,
  patient_age INTEGER,
  patient_gender TEXT,
  
  -- Slot details
  slot_id UUID REFERENCES availability_slots(id),
  scheduled_date DATE,
  scheduled_time TIMESTAMPTZ,
  
  -- Location
  service_location TEXT, -- HOME, CENTER
  service_address TEXT,
  service_coords GEOGRAPHY(POINT, 4326),
  
  -- Fulfillment
  fulfillment_status fulfillment_status DEFAULT 'SCHEDULED',
  assigned_staff_id UUID REFERENCES profiles(id),
  check_in_time TIMESTAMPTZ,
  check_out_time TIMESTAMPTZ,
  
  -- Clinical notes
  clinical_notes TEXT,
  internal_notes TEXT,
  
  -- Rescheduling
  rescheduled_from UUID REFERENCES service_bookings(id),
  reschedule_reason TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_bookings_order_item ON service_bookings(order_item_id);
CREATE INDEX idx_bookings_scheduled ON service_bookings(scheduled_date);
CREATE INDEX idx_bookings_status ON service_bookings(fulfillment_status);

-- ============================================================
-- ORDER ARTIFACTS TABLE
-- Prescription and report document vault
-- ============================================================
CREATE TABLE order_artifacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  order_item_id UUID REFERENCES order_items(id) ON DELETE CASCADE,
  
  type artifact_type NOT NULL,
  file_url TEXT NOT NULL,
  file_name TEXT,
  file_size INTEGER,
  mime_type TEXT,
  
  -- Metadata
  uploaded_by UUID REFERENCES profiles(id),
  verified BOOLEAN DEFAULT FALSE,
  verified_by UUID REFERENCES profiles(id),
  verified_at TIMESTAMPTZ,
  
  -- For prescriptions
  prescription_valid_until DATE,
  
  -- For reports
  report_generated_at TIMESTAMPTZ,
  report_parameters JSONB,
  
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_artifacts_order ON order_artifacts(order_id);
CREATE INDEX idx_artifacts_type ON order_artifacts(type);

-- ============================================================
-- FUNCTION: Generate Order Number
-- ============================================================
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
DECLARE
  v_year TEXT;
  v_sequence INTEGER;
BEGIN
  v_year := to_char(NOW(), 'YYYY');
  
  -- Get next sequence for this year
  SELECT COALESCE(MAX(
    NULLIF(regexp_replace(order_number, 'OM-' || v_year || '-', ''), '')::INTEGER
  ), 0) + 1
  INTO v_sequence
  FROM orders
  WHERE order_number LIKE 'OM-' || v_year || '-%';
  
  NEW.order_number := 'OM-' || v_year || '-' || lpad(v_sequence::TEXT, 6, '0');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_generate_number
  BEFORE INSERT ON orders
  FOR EACH ROW
  WHEN (NEW.order_number IS NULL)
  EXECUTE FUNCTION generate_order_number();

-- ============================================================
-- TRIGGERS
-- ============================================================
CREATE TRIGGER carts_updated_at BEFORE UPDATE ON carts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER cart_items_updated_at BEFORE UPDATE ON cart_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER order_items_updated_at BEFORE UPDATE ON order_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER service_bookings_updated_at BEFORE UPDATE ON service_bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

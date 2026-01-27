-- ============================================================
-- ONE MEDI: Migration 012 - Row Level Security (RLS)
-- ============================================================
-- Security policies for multi-tenant data isolation
-- ============================================================

-- ============================================================
-- ENABLE RLS ON ALL TABLES
-- ============================================================

-- Group A: Identity & Access
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

-- Group B: Vendor Ecosystem
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_kyc ENABLE ROW LEVEL SECURITY;

-- Group C: Service Catalog
ALTER TABLE service_catalog ENABLE ROW LEVEL SECURITY;

-- Group D: Service Masters
ALTER TABLE medicine_master ENABLE ROW LEVEL SECURITY;
ALTER TABLE medicine_alternatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE scans_master ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE services_master ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_master ENABLE ROW LEVEL SECURITY;

-- Group E: Pricing & Availability
ALTER TABLE medicine_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE scan_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_slots ENABLE ROW LEVEL SECURITY;

-- Group F: Transactions
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_artifacts ENABLE ROW LEVEL SECURITY;

-- Group G: Financial & Compliance
ALTER TABLE refunds ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Group H: Marketing & Config
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupon_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketing_assets ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- SECURITY DEFINER FUNCTIONS
-- ============================================================

-- ★ Centralized vendor access check (prevents policy drift)
CREATE OR REPLACE FUNCTION public.has_vendor_access(p_vendor_id UUID)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.vendor_staff
    WHERE user_id = auth.uid() AND vendor_id = p_vendor_id AND is_active = TRUE
  );
$$;

-- Check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles p
    INNER JOIN public.roles r ON r.id = p.role_id
    WHERE p.id = auth.uid() AND r.name = 'ADMIN'
  );
$$;

-- Get user's role name
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT
LANGUAGE sql STABLE SECURITY DEFINER
AS $$
  SELECT r.name 
  FROM public.profiles p
  INNER JOIN public.roles r ON r.id = p.role_id
  WHERE p.id = auth.uid();
$$;

-- ============================================================
-- POLICIES: GROUP A - Identity & Access
-- ============================================================

-- Profiles: Users can see/edit their own profile
CREATE POLICY "profiles_select_own" ON profiles
  FOR SELECT USING (id = auth.uid());

CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE USING (id = auth.uid());

CREATE POLICY "profiles_insert_own" ON profiles
  FOR INSERT WITH CHECK (id = auth.uid());

-- Admins can see all profiles
CREATE POLICY "profiles_admin_all" ON profiles
  FOR ALL USING (is_admin());

-- Family Members: Users can manage their own family
CREATE POLICY "family_select_own" ON family_members
  FOR SELECT USING (owner_id = auth.uid());

CREATE POLICY "family_insert_own" ON family_members
  FOR INSERT WITH CHECK (owner_id = auth.uid());

CREATE POLICY "family_update_own" ON family_members
  FOR UPDATE USING (owner_id = auth.uid());

CREATE POLICY "family_delete_own" ON family_members
  FOR DELETE USING (owner_id = auth.uid());

-- Addresses: Users can manage their own addresses
CREATE POLICY "addresses_select_own" ON addresses
  FOR SELECT USING (profile_id = auth.uid());

CREATE POLICY "addresses_insert_own" ON addresses
  FOR INSERT WITH CHECK (profile_id = auth.uid());

CREATE POLICY "addresses_update_own" ON addresses
  FOR UPDATE USING (profile_id = auth.uid());

CREATE POLICY "addresses_delete_own" ON addresses
  FOR DELETE USING (profile_id = auth.uid());

-- ============================================================
-- POLICIES: GROUP B - Vendor Ecosystem
-- ============================================================

-- Vendors: Public read for active vendors
CREATE POLICY "vendors_select_public" ON vendors
  FOR SELECT USING (is_active = TRUE);

-- Vendors: Staff can manage their vendor
CREATE POLICY "vendors_update_staff" ON vendors
  FOR UPDATE USING (has_vendor_access(id));

-- Vendor Locations: Public read for active locations
CREATE POLICY "vendor_locations_select_public" ON vendor_locations
  FOR SELECT USING (is_active = TRUE);

-- Vendor Locations: Staff can manage
CREATE POLICY "vendor_locations_manage" ON vendor_locations
  FOR ALL USING (has_vendor_access(vendor_id));

-- Vendor Staff: Staff can see their co-workers
CREATE POLICY "vendor_staff_select" ON vendor_staff
  FOR SELECT USING (has_vendor_access(vendor_id) OR user_id = auth.uid());

-- Vendor Staff: Only admins can manage staff
CREATE POLICY "vendor_staff_admin" ON vendor_staff
  FOR ALL USING (is_admin());

-- Vendor KYC: Only vendor owner and admin
CREATE POLICY "vendor_kyc_select" ON vendor_kyc
  FOR SELECT USING (has_vendor_access(vendor_id) OR is_admin());

CREATE POLICY "vendor_kyc_manage" ON vendor_kyc
  FOR ALL USING (is_admin());

-- ============================================================
-- POLICIES: GROUP C & D - Service Catalog & Masters
-- ============================================================

-- Service Catalog: Public read
CREATE POLICY "service_catalog_select" ON service_catalog
  FOR SELECT USING (is_active = TRUE);

-- Service Masters: Public read for all active items
CREATE POLICY "medicine_master_select" ON medicine_master
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "lab_tests_select" ON lab_tests
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "scans_master_select" ON scans_master
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "doctors_select" ON doctors
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "services_master_select" ON services_master
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "insurance_plans_select" ON insurance_plans
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "content_master_select" ON content_master
  FOR SELECT USING (is_published = TRUE);

-- Medicine Alternatives: Public read for approved
CREATE POLICY "medicine_alternatives_select" ON medicine_alternatives
  FOR SELECT USING (approved = TRUE);

-- Admin can manage all catalog data
CREATE POLICY "catalog_admin_all" ON service_catalog
  FOR ALL USING (is_admin());

CREATE POLICY "medicine_admin_all" ON medicine_master
  FOR ALL USING (is_admin());

CREATE POLICY "lab_admin_all" ON lab_tests
  FOR ALL USING (is_admin());

CREATE POLICY "scans_admin_all" ON scans_master
  FOR ALL USING (is_admin());

CREATE POLICY "doctors_admin_all" ON doctors
  FOR ALL USING (is_admin());

CREATE POLICY "services_admin_all" ON services_master
  FOR ALL USING (is_admin());

CREATE POLICY "insurance_admin_all" ON insurance_plans
  FOR ALL USING (is_admin());

CREATE POLICY "content_admin_all" ON content_master
  FOR ALL USING (is_admin());

CREATE POLICY "alternatives_admin_all" ON medicine_alternatives
  FOR ALL USING (is_admin());

-- ============================================================
-- POLICIES: GROUP E - Pricing & Availability
-- ============================================================

-- Public read for available inventory/pricing
CREATE POLICY "medicine_inventory_select" ON medicine_inventory
  FOR SELECT USING (is_available = TRUE);

CREATE POLICY "lab_pricing_select" ON lab_pricing
  FOR SELECT USING (is_available = TRUE);

CREATE POLICY "scan_pricing_select" ON scan_pricing
  FOR SELECT USING (is_available = TRUE);

CREATE POLICY "service_pricing_select" ON service_pricing
  FOR SELECT USING (is_available = TRUE);

CREATE POLICY "doctor_availability_select" ON doctor_availability
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "availability_slots_select" ON availability_slots
  FOR SELECT USING (is_blocked = FALSE);

-- Vendor staff can manage their pricing
CREATE POLICY "medicine_inventory_vendor" ON medicine_inventory
  FOR ALL USING (has_vendor_access(vendor_id));

CREATE POLICY "lab_pricing_vendor" ON lab_pricing
  FOR ALL USING (has_vendor_access(vendor_id));

CREATE POLICY "scan_pricing_vendor" ON scan_pricing
  FOR ALL USING (has_vendor_access(vendor_id));

CREATE POLICY "service_pricing_vendor" ON service_pricing
  FOR ALL USING (has_vendor_access(vendor_id));

CREATE POLICY "availability_slots_vendor" ON availability_slots
  FOR ALL USING (has_vendor_access(vendor_id));

-- ============================================================
-- POLICIES: GROUP F - Transactions
-- ============================================================

-- Carts: Users own their cart
CREATE POLICY "carts_select_own" ON carts
  FOR SELECT USING (profile_id = auth.uid());

CREATE POLICY "carts_insert_own" ON carts
  FOR INSERT WITH CHECK (profile_id = auth.uid());

CREATE POLICY "carts_update_own" ON carts
  FOR UPDATE USING (profile_id = auth.uid());

CREATE POLICY "carts_delete_own" ON carts
  FOR DELETE USING (profile_id = auth.uid());

-- Cart Items: Own cart items
CREATE POLICY "cart_items_own" ON cart_items
  FOR ALL USING (
    EXISTS (SELECT 1 FROM carts WHERE id = cart_items.cart_id AND profile_id = auth.uid())
  );

-- Orders: Patients see their orders
CREATE POLICY "orders_patient_select" ON orders
  FOR SELECT USING (profile_id = auth.uid());

CREATE POLICY "orders_patient_insert" ON orders
  FOR INSERT WITH CHECK (profile_id = auth.uid());

-- Orders: Vendors see orders with their items
CREATE POLICY "orders_vendor_select" ON orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM order_items oi 
      WHERE oi.order_id = orders.id AND has_vendor_access(oi.vendor_id)
    )
  );

-- Order Items: Patient can see own items
CREATE POLICY "order_items_patient" ON order_items
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE id = order_items.order_id AND profile_id = auth.uid())
  );

-- Order Items: Vendor can see/manage their items
CREATE POLICY "order_items_vendor" ON order_items
  FOR ALL USING (has_vendor_access(vendor_id));

-- Service Bookings: Similar to order items
CREATE POLICY "bookings_patient" ON service_bookings
  FOR SELECT USING (patient_profile_id = auth.uid());

CREATE POLICY "bookings_vendor" ON service_bookings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM order_items oi 
      WHERE oi.id = service_bookings.order_item_id AND has_vendor_access(oi.vendor_id)
    )
  );

-- Order Artifacts: Patient can see own
CREATE POLICY "artifacts_patient" ON order_artifacts
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE id = order_artifacts.order_id AND profile_id = auth.uid())
  );

-- Order Artifacts: Vendor can add artifacts
CREATE POLICY "artifacts_vendor" ON order_artifacts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM order_items oi 
      WHERE oi.id = order_artifacts.order_item_id AND has_vendor_access(oi.vendor_id)
    )
  );

-- ============================================================
-- POLICIES: GROUP G - Financial
-- ============================================================

-- Refunds: Patient can request/view their refunds
CREATE POLICY "refunds_patient" ON refunds
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM orders WHERE id = refunds.order_id AND profile_id = auth.uid())
  );

CREATE POLICY "refunds_patient_insert" ON refunds
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM orders WHERE id = order_id AND profile_id = auth.uid())
  );

-- Refunds: Admin can manage all
CREATE POLICY "refunds_admin" ON refunds
  FOR ALL USING (is_admin());

-- Vendor Payouts: Vendors see their own payouts
CREATE POLICY "payouts_vendor" ON vendor_payouts
  FOR SELECT USING (has_vendor_access(vendor_id));

-- Vendor Payouts: Admin manages all
CREATE POLICY "payouts_admin" ON vendor_payouts
  FOR ALL USING (is_admin());

-- Audit Logs: Admin only
CREATE POLICY "audit_admin" ON audit_logs
  FOR SELECT USING (is_admin());

-- ============================================================
-- POLICIES: GROUP H - Marketing
-- ============================================================

-- Coupons: Public read for active coupons
CREATE POLICY "coupons_select_public" ON coupons
  FOR SELECT USING (is_active = TRUE AND is_public = TRUE AND NOW() BETWEEN valid_from AND valid_to);

-- Coupon Usage: Users can see their usage
CREATE POLICY "coupon_usage_own" ON coupon_usage
  FOR SELECT USING (profile_id = auth.uid());

-- Marketing Assets: Public read
CREATE POLICY "marketing_assets_select" ON marketing_assets
  FOR SELECT USING (is_active = TRUE);

-- Admin manages marketing
CREATE POLICY "coupons_admin" ON coupons
  FOR ALL USING (is_admin());

CREATE POLICY "marketing_admin" ON marketing_assets
  FOR ALL USING (is_admin());

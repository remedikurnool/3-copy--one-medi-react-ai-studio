
-- ============================================================
-- Phase 2C: Consolidate overlapping permissive RLS policies
-- Replace ALL-scoped policies with INSERT/UPDATE/DELETE-only
-- so they no longer overlap with existing SELECT policies.
-- ============================================================

-- ---- GROUP A: Vendor-managed tables ----
-- Pattern: _manage (ALL) overlaps with _select (SELECT)

-- 1. availability_slots
DROP POLICY IF EXISTS availability_slots_manage ON availability_slots;
CREATE POLICY availability_slots_manage_write ON availability_slots
  FOR INSERT TO public
  WITH CHECK (has_vendor_access(vendor_id) OR is_admin());
CREATE POLICY availability_slots_manage_update ON availability_slots
  FOR UPDATE TO public
  USING (has_vendor_access(vendor_id) OR is_admin())
  WITH CHECK (has_vendor_access(vendor_id) OR is_admin());
CREATE POLICY availability_slots_manage_delete ON availability_slots
  FOR DELETE TO public
  USING (has_vendor_access(vendor_id) OR is_admin());

-- 2. doctor_availability
DROP POLICY IF EXISTS doctor_availability_manage ON doctor_availability;
CREATE POLICY doctor_availability_manage_write ON doctor_availability
  FOR INSERT TO public
  WITH CHECK (has_vendor_access(vendor_id) OR is_admin() OR (EXISTS (SELECT 1 FROM doctors d WHERE d.id = doctor_availability.doctor_id AND d.profile_id = (SELECT auth.uid()))));
CREATE POLICY doctor_availability_manage_update ON doctor_availability
  FOR UPDATE TO public
  USING (has_vendor_access(vendor_id) OR is_admin() OR (EXISTS (SELECT 1 FROM doctors d WHERE d.id = doctor_availability.doctor_id AND d.profile_id = (SELECT auth.uid()))))
  WITH CHECK (has_vendor_access(vendor_id) OR is_admin() OR (EXISTS (SELECT 1 FROM doctors d WHERE d.id = doctor_availability.doctor_id AND d.profile_id = (SELECT auth.uid()))));
CREATE POLICY doctor_availability_manage_delete ON doctor_availability
  FOR DELETE TO public
  USING (has_vendor_access(vendor_id) OR is_admin() OR (EXISTS (SELECT 1 FROM doctors d WHERE d.id = doctor_availability.doctor_id AND d.profile_id = (SELECT auth.uid()))));

-- 3. lab_pricing
DROP POLICY IF EXISTS lab_pricing_manage ON lab_pricing;
CREATE POLICY lab_pricing_manage_write ON lab_pricing
  FOR INSERT TO public
  WITH CHECK (has_vendor_access(vendor_id) OR is_admin());
CREATE POLICY lab_pricing_manage_update ON lab_pricing
  FOR UPDATE TO public
  USING (has_vendor_access(vendor_id) OR is_admin())
  WITH CHECK (has_vendor_access(vendor_id) OR is_admin());
CREATE POLICY lab_pricing_manage_delete ON lab_pricing
  FOR DELETE TO public
  USING (has_vendor_access(vendor_id) OR is_admin());

-- 4. medicine_inventory
DROP POLICY IF EXISTS medicine_inventory_manage ON medicine_inventory;
CREATE POLICY medicine_inventory_manage_write ON medicine_inventory
  FOR INSERT TO public
  WITH CHECK (has_vendor_access(vendor_id) OR is_admin());
CREATE POLICY medicine_inventory_manage_update ON medicine_inventory
  FOR UPDATE TO public
  USING (has_vendor_access(vendor_id) OR is_admin())
  WITH CHECK (has_vendor_access(vendor_id) OR is_admin());
CREATE POLICY medicine_inventory_manage_delete ON medicine_inventory
  FOR DELETE TO public
  USING (has_vendor_access(vendor_id) OR is_admin());

-- 5. scan_pricing
DROP POLICY IF EXISTS scan_pricing_manage ON scan_pricing;
CREATE POLICY scan_pricing_manage_write ON scan_pricing
  FOR INSERT TO public
  WITH CHECK (has_vendor_access(vendor_id) OR is_admin());
CREATE POLICY scan_pricing_manage_update ON scan_pricing
  FOR UPDATE TO public
  USING (has_vendor_access(vendor_id) OR is_admin())
  WITH CHECK (has_vendor_access(vendor_id) OR is_admin());
CREATE POLICY scan_pricing_manage_delete ON scan_pricing
  FOR DELETE TO public
  USING (has_vendor_access(vendor_id) OR is_admin());

-- 6. service_pricing
DROP POLICY IF EXISTS service_pricing_manage ON service_pricing;
CREATE POLICY service_pricing_manage_write ON service_pricing
  FOR INSERT TO public
  WITH CHECK (has_vendor_access(vendor_id) OR is_admin());
CREATE POLICY service_pricing_manage_update ON service_pricing
  FOR UPDATE TO public
  USING (has_vendor_access(vendor_id) OR is_admin())
  WITH CHECK (has_vendor_access(vendor_id) OR is_admin());
CREATE POLICY service_pricing_manage_delete ON service_pricing
  FOR DELETE TO public
  USING (has_vendor_access(vendor_id) OR is_admin());


-- ---- GROUP B: Admin-managed tables ----
-- Pattern: _admin (ALL) overlaps with _public (SELECT)

-- 7. cities
DROP POLICY IF EXISTS cities_admin ON cities;
CREATE POLICY cities_admin_write ON cities
  FOR INSERT TO public
  WITH CHECK (is_admin());
CREATE POLICY cities_admin_update ON cities
  FOR UPDATE TO public
  USING (is_admin())
  WITH CHECK (is_admin());
CREATE POLICY cities_admin_delete ON cities
  FOR DELETE TO public
  USING (is_admin());

-- 8. coupons
DROP POLICY IF EXISTS coupons_admin ON coupons;
CREATE POLICY coupons_admin_write ON coupons
  FOR INSERT TO public
  WITH CHECK (is_admin());
CREATE POLICY coupons_admin_update ON coupons
  FOR UPDATE TO public
  USING (is_admin())
  WITH CHECK (is_admin());
CREATE POLICY coupons_admin_delete ON coupons
  FOR DELETE TO public
  USING (is_admin());

-- 9. feature_flags
DROP POLICY IF EXISTS feature_flags_admin ON feature_flags;
CREATE POLICY feature_flags_admin_write ON feature_flags
  FOR INSERT TO public
  WITH CHECK (is_admin());
CREATE POLICY feature_flags_admin_update ON feature_flags
  FOR UPDATE TO public
  USING (is_admin())
  WITH CHECK (is_admin());
CREATE POLICY feature_flags_admin_delete ON feature_flags
  FOR DELETE TO public
  USING (is_admin());

-- 10. marketing_assets
DROP POLICY IF EXISTS marketing_assets_admin ON marketing_assets;
CREATE POLICY marketing_assets_admin_write ON marketing_assets
  FOR INSERT TO public
  WITH CHECK (is_admin());
CREATE POLICY marketing_assets_admin_update ON marketing_assets
  FOR UPDATE TO public
  USING (is_admin())
  WITH CHECK (is_admin());
CREATE POLICY marketing_assets_admin_delete ON marketing_assets
  FOR DELETE TO public
  USING (is_admin());

-- 11. medicine_alternatives
DROP POLICY IF EXISTS medicine_alternatives_admin ON medicine_alternatives;
CREATE POLICY medicine_alternatives_admin_write ON medicine_alternatives
  FOR INSERT TO public
  WITH CHECK (is_admin());
CREATE POLICY medicine_alternatives_admin_update ON medicine_alternatives
  FOR UPDATE TO public
  USING (is_admin())
  WITH CHECK (is_admin());
CREATE POLICY medicine_alternatives_admin_delete ON medicine_alternatives
  FOR DELETE TO public
  USING (is_admin());

-- 12. notification_templates
DROP POLICY IF EXISTS notification_templates_admin ON notification_templates;
CREATE POLICY notification_templates_admin_write ON notification_templates
  FOR INSERT TO public
  WITH CHECK (is_admin());
CREATE POLICY notification_templates_admin_update ON notification_templates
  FOR UPDATE TO public
  USING (is_admin())
  WITH CHECK (is_admin());
CREATE POLICY notification_templates_admin_delete ON notification_templates
  FOR DELETE TO public
  USING (is_admin());


-- ---- GROUP C: Multi-role overlap tables ----

-- 13. order_items: _vendor (ALL) overlaps with _customer (SELECT)
DROP POLICY IF EXISTS order_items_vendor ON order_items;
CREATE POLICY order_items_vendor_write ON order_items
  FOR INSERT TO public
  WITH CHECK (has_vendor_access(vendor_id) OR is_admin());
CREATE POLICY order_items_vendor_update ON order_items
  FOR UPDATE TO public
  USING (has_vendor_access(vendor_id) OR is_admin())
  WITH CHECK (has_vendor_access(vendor_id) OR is_admin());
CREATE POLICY order_items_vendor_delete ON order_items
  FOR DELETE TO public
  USING (has_vendor_access(vendor_id) OR is_admin());
-- Also add vendor SELECT since we removed their ALL:
CREATE POLICY order_items_vendor_select ON order_items
  FOR SELECT TO public
  USING (has_vendor_access(vendor_id) OR is_admin());
-- Now merge the two SELECT policies into one:
DROP POLICY IF EXISTS order_items_customer ON order_items;
DROP POLICY IF EXISTS order_items_vendor_select ON order_items;
CREATE POLICY order_items_read ON order_items
  FOR SELECT TO public
  USING (
    (EXISTS (SELECT 1 FROM orders o WHERE o.id = order_items.order_id AND o.profile_id = (SELECT auth.uid())))
    OR has_vendor_access(vendor_id)
    OR is_admin()
  );

-- 14. order_artifacts: _vendor (ALL) overlaps with _customer (SELECT) and _upload (INSERT)
DROP POLICY IF EXISTS order_artifacts_vendor ON order_artifacts;
DROP POLICY IF EXISTS order_artifacts_customer ON order_artifacts;
DROP POLICY IF EXISTS order_artifacts_upload ON order_artifacts;
-- Single consolidated SELECT:
CREATE POLICY order_artifacts_read ON order_artifacts
  FOR SELECT TO public
  USING (
    (EXISTS (SELECT 1 FROM orders o WHERE o.id = order_artifacts.order_id AND o.profile_id = (SELECT auth.uid())))
    OR (EXISTS (SELECT 1 FROM order_items oi WHERE oi.id = order_artifacts.order_item_id AND has_vendor_access(oi.vendor_id)))
    OR is_admin()
  );
-- Single consolidated INSERT:
CREATE POLICY order_artifacts_insert ON order_artifacts
  FOR INSERT TO public
  WITH CHECK (
    (EXISTS (SELECT 1 FROM orders o WHERE o.id = order_artifacts.order_id AND o.profile_id = (SELECT auth.uid())))
    OR (EXISTS (SELECT 1 FROM order_items oi WHERE oi.id = order_artifacts.order_item_id AND has_vendor_access(oi.vendor_id)))
    OR is_admin()
  );
-- Vendor/admin UPDATE:
CREATE POLICY order_artifacts_update ON order_artifacts
  FOR UPDATE TO public
  USING (
    (EXISTS (SELECT 1 FROM order_items oi WHERE oi.id = order_artifacts.order_item_id AND has_vendor_access(oi.vendor_id)))
    OR is_admin()
  )
  WITH CHECK (
    (EXISTS (SELECT 1 FROM order_items oi WHERE oi.id = order_artifacts.order_item_id AND has_vendor_access(oi.vendor_id)))
    OR is_admin()
  );
-- Vendor/admin DELETE:
CREATE POLICY order_artifacts_delete ON order_artifacts
  FOR DELETE TO public
  USING (
    (EXISTS (SELECT 1 FROM order_items oi WHERE oi.id = order_artifacts.order_item_id AND has_vendor_access(oi.vendor_id)))
    OR is_admin()
  );

-- 15. orders: _admin (ALL) overlaps with _customer (SELECT), _vendor (SELECT), _insert (INSERT)
DROP POLICY IF EXISTS orders_admin ON orders;
DROP POLICY IF EXISTS orders_customer ON orders;
DROP POLICY IF EXISTS orders_vendor ON orders;
DROP POLICY IF EXISTS orders_insert ON orders;
-- Single consolidated SELECT:
CREATE POLICY orders_read ON orders
  FOR SELECT TO public
  USING (
    profile_id = (SELECT auth.uid())
    OR (EXISTS (SELECT 1 FROM order_items oi WHERE oi.order_id = orders.id AND has_vendor_access(oi.vendor_id)))
    OR is_admin()
  );
-- Single consolidated INSERT:
CREATE POLICY orders_write_insert ON orders
  FOR INSERT TO public
  WITH CHECK (
    profile_id = (SELECT auth.uid())
    OR is_admin()
  );
-- Admin UPDATE:
CREATE POLICY orders_write_update ON orders
  FOR UPDATE TO public
  USING (is_admin())
  WITH CHECK (is_admin());
-- Admin DELETE:
CREATE POLICY orders_write_delete ON orders
  FOR DELETE TO public
  USING (is_admin());

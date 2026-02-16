
-- ============================================================
-- Phase 2C (part 2): Consolidate remaining overlapping policies
-- ============================================================

-- 1. cart_items: _manage (ALL, cart-owner) overlaps _select (SELECT, cart-owner)
-- Both have identical conditions, so just drop _select and split _manage
DROP POLICY IF EXISTS cart_items_manage ON cart_items;
DROP POLICY IF EXISTS cart_items_select ON cart_items;
CREATE POLICY cart_items_read ON cart_items
  FOR SELECT TO public
  USING (EXISTS (SELECT 1 FROM carts WHERE carts.id = cart_items.cart_id AND carts.profile_id = (SELECT auth.uid())));
CREATE POLICY cart_items_insert ON cart_items
  FOR INSERT TO public
  WITH CHECK (EXISTS (SELECT 1 FROM carts WHERE carts.id = cart_items.cart_id AND carts.profile_id = (SELECT auth.uid())));
CREATE POLICY cart_items_update ON cart_items
  FOR UPDATE TO public
  USING (EXISTS (SELECT 1 FROM carts WHERE carts.id = cart_items.cart_id AND carts.profile_id = (SELECT auth.uid())))
  WITH CHECK (EXISTS (SELECT 1 FROM carts WHERE carts.id = cart_items.cart_id AND carts.profile_id = (SELECT auth.uid())));
CREATE POLICY cart_items_delete ON cart_items
  FOR DELETE TO public
  USING (EXISTS (SELECT 1 FROM carts WHERE carts.id = cart_items.cart_id AND carts.profile_id = (SELECT auth.uid())));

-- 2. refunds: _admin (ALL, is_admin()) overlaps _customer (SELECT)
DROP POLICY IF EXISTS refunds_admin ON refunds;
DROP POLICY IF EXISTS refunds_customer ON refunds;
CREATE POLICY refunds_read ON refunds
  FOR SELECT TO public
  USING (
    (EXISTS (SELECT 1 FROM orders o WHERE o.id = refunds.order_id AND o.profile_id = (SELECT auth.uid())))
    OR is_admin()
  );
CREATE POLICY refunds_admin_insert ON refunds FOR INSERT TO public WITH CHECK (is_admin());
CREATE POLICY refunds_admin_update ON refunds FOR UPDATE TO public USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY refunds_admin_delete ON refunds FOR DELETE TO public USING (is_admin());

-- 3. roles: _admin (ALL) overlaps _public (SELECT, true)
DROP POLICY IF EXISTS roles_admin ON roles;
CREATE POLICY roles_admin_insert ON roles FOR INSERT TO public WITH CHECK (is_admin());
CREATE POLICY roles_admin_update ON roles FOR UPDATE TO public USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY roles_admin_delete ON roles FOR DELETE TO public USING (is_admin());

-- 4. service_bookings: _vendor (ALL) overlaps _customer (SELECT)
DROP POLICY IF EXISTS service_bookings_vendor ON service_bookings;
DROP POLICY IF EXISTS service_bookings_customer ON service_bookings;
CREATE POLICY service_bookings_read ON service_bookings
  FOR SELECT TO public
  USING (
    patient_profile_id = (SELECT auth.uid())
    OR (EXISTS (SELECT 1 FROM order_items oi WHERE oi.id = service_bookings.order_item_id AND has_vendor_access(oi.vendor_id)))
    OR is_admin()
  );
CREATE POLICY service_bookings_vendor_insert ON service_bookings
  FOR INSERT TO public
  WITH CHECK ((EXISTS (SELECT 1 FROM order_items oi WHERE oi.id = service_bookings.order_item_id AND has_vendor_access(oi.vendor_id))) OR is_admin());
CREATE POLICY service_bookings_vendor_update ON service_bookings
  FOR UPDATE TO public
  USING ((EXISTS (SELECT 1 FROM order_items oi WHERE oi.id = service_bookings.order_item_id AND has_vendor_access(oi.vendor_id))) OR is_admin())
  WITH CHECK ((EXISTS (SELECT 1 FROM order_items oi WHERE oi.id = service_bookings.order_item_id AND has_vendor_access(oi.vendor_id))) OR is_admin());
CREATE POLICY service_bookings_vendor_delete ON service_bookings
  FOR DELETE TO public
  USING ((EXISTS (SELECT 1 FROM order_items oi WHERE oi.id = service_bookings.order_item_id AND has_vendor_access(oi.vendor_id))) OR is_admin());

-- 5. service_taxonomy_map: _admin (ALL) overlaps _public (SELECT, true)
DROP POLICY IF EXISTS service_taxonomy_map_admin ON service_taxonomy_map;
CREATE POLICY service_taxonomy_map_admin_insert ON service_taxonomy_map FOR INSERT TO public WITH CHECK (is_admin());
CREATE POLICY service_taxonomy_map_admin_update ON service_taxonomy_map FOR UPDATE TO public USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY service_taxonomy_map_admin_delete ON service_taxonomy_map FOR DELETE TO public USING (is_admin());

-- 6. tax_slabs: _admin (ALL) overlaps _public (SELECT, true)
DROP POLICY IF EXISTS tax_slabs_admin ON tax_slabs;
CREATE POLICY tax_slabs_admin_insert ON tax_slabs FOR INSERT TO public WITH CHECK (is_admin());
CREATE POLICY tax_slabs_admin_update ON tax_slabs FOR UPDATE TO public USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY tax_slabs_admin_delete ON tax_slabs FOR DELETE TO public USING (is_admin());

-- 7. taxonomies: _admin (ALL) overlaps _public (SELECT, is_active=true)
DROP POLICY IF EXISTS taxonomies_admin ON taxonomies;
CREATE POLICY taxonomies_admin_insert ON taxonomies FOR INSERT TO public WITH CHECK (is_admin());
CREATE POLICY taxonomies_admin_update ON taxonomies FOR UPDATE TO public USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY taxonomies_admin_delete ON taxonomies FOR DELETE TO public USING (is_admin());

-- 8. taxonomy_terms: _admin (ALL) overlaps _public (SELECT, is_active=true)
DROP POLICY IF EXISTS taxonomy_terms_admin ON taxonomy_terms;
CREATE POLICY taxonomy_terms_admin_insert ON taxonomy_terms FOR INSERT TO public WITH CHECK (is_admin());
CREATE POLICY taxonomy_terms_admin_update ON taxonomy_terms FOR UPDATE TO public USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY taxonomy_terms_admin_delete ON taxonomy_terms FOR DELETE TO public USING (is_admin());

-- 9. ui_carousel_items: _admin (ALL) overlaps _public (SELECT, is_active=true)
DROP POLICY IF EXISTS ui_carousel_items_admin ON ui_carousel_items;
CREATE POLICY ui_carousel_items_admin_insert ON ui_carousel_items FOR INSERT TO public WITH CHECK (is_admin());
CREATE POLICY ui_carousel_items_admin_update ON ui_carousel_items FOR UPDATE TO public USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY ui_carousel_items_admin_delete ON ui_carousel_items FOR DELETE TO public USING (is_admin());

-- 10. ui_carousels: _admin (ALL) overlaps _public (SELECT, is_active=true)
DROP POLICY IF EXISTS ui_carousels_admin ON ui_carousels;
CREATE POLICY ui_carousels_admin_insert ON ui_carousels FOR INSERT TO public WITH CHECK (is_admin());
CREATE POLICY ui_carousels_admin_update ON ui_carousels FOR UPDATE TO public USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY ui_carousels_admin_delete ON ui_carousels FOR DELETE TO public USING (is_admin());

-- 11. ui_menu_items: _admin (ALL) overlaps _public (SELECT, is_active=true)
DROP POLICY IF EXISTS ui_menu_items_admin ON ui_menu_items;
CREATE POLICY ui_menu_items_admin_insert ON ui_menu_items FOR INSERT TO public WITH CHECK (is_admin());
CREATE POLICY ui_menu_items_admin_update ON ui_menu_items FOR UPDATE TO public USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY ui_menu_items_admin_delete ON ui_menu_items FOR DELETE TO public USING (is_admin());

-- 12. ui_menus: _admin (ALL) overlaps _public (SELECT, is_active=true)
DROP POLICY IF EXISTS ui_menus_admin ON ui_menus;
CREATE POLICY ui_menus_admin_insert ON ui_menus FOR INSERT TO public WITH CHECK (is_admin());
CREATE POLICY ui_menus_admin_update ON ui_menus FOR UPDATE TO public USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY ui_menus_admin_delete ON ui_menus FOR DELETE TO public USING (is_admin());

-- 13. vendor_kyc: _manage (ALL, vendor/admin) overlaps _select (SELECT, vendor/admin)
-- Identical conditions, merge into one SELECT + split writes
DROP POLICY IF EXISTS vendor_kyc_manage ON vendor_kyc;
DROP POLICY IF EXISTS vendor_kyc_select ON vendor_kyc;
CREATE POLICY vendor_kyc_read ON vendor_kyc
  FOR SELECT TO public
  USING (has_vendor_access(vendor_id) OR is_admin());
CREATE POLICY vendor_kyc_write_insert ON vendor_kyc
  FOR INSERT TO public
  WITH CHECK (has_vendor_access(vendor_id) OR is_admin());
CREATE POLICY vendor_kyc_write_update ON vendor_kyc
  FOR UPDATE TO public
  USING (has_vendor_access(vendor_id) OR is_admin())
  WITH CHECK (has_vendor_access(vendor_id) OR is_admin());
CREATE POLICY vendor_kyc_write_delete ON vendor_kyc
  FOR DELETE TO public
  USING (has_vendor_access(vendor_id) OR is_admin());

-- 14. vendor_locations: _manage (ALL, vendor/admin) overlaps _select (SELECT, true)
DROP POLICY IF EXISTS vendor_locations_manage ON vendor_locations;
CREATE POLICY vendor_locations_write_insert ON vendor_locations
  FOR INSERT TO public
  WITH CHECK (has_vendor_access(vendor_id) OR is_admin());
CREATE POLICY vendor_locations_write_update ON vendor_locations
  FOR UPDATE TO public
  USING (has_vendor_access(vendor_id) OR is_admin())
  WITH CHECK (has_vendor_access(vendor_id) OR is_admin());
CREATE POLICY vendor_locations_write_delete ON vendor_locations
  FOR DELETE TO public
  USING (has_vendor_access(vendor_id) OR is_admin());

-- 15. vendor_payouts: _admin (ALL) overlaps _vendor (SELECT)
DROP POLICY IF EXISTS vendor_payouts_admin ON vendor_payouts;
DROP POLICY IF EXISTS vendor_payouts_vendor ON vendor_payouts;
CREATE POLICY vendor_payouts_read ON vendor_payouts
  FOR SELECT TO public
  USING (has_vendor_access(vendor_id) OR is_admin());
CREATE POLICY vendor_payouts_admin_insert ON vendor_payouts FOR INSERT TO public WITH CHECK (is_admin());
CREATE POLICY vendor_payouts_admin_update ON vendor_payouts FOR UPDATE TO public USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY vendor_payouts_admin_delete ON vendor_payouts FOR DELETE TO public USING (is_admin());

-- 16. vendor_staff: _manage (ALL, vendor-admin/admin) overlaps _select (SELECT, vendor/self/admin)
DROP POLICY IF EXISTS vendor_staff_manage ON vendor_staff;
DROP POLICY IF EXISTS vendor_staff_select ON vendor_staff;
CREATE POLICY vendor_staff_read ON vendor_staff
  FOR SELECT TO public
  USING (has_vendor_access(vendor_id) OR user_id = (SELECT auth.uid()) OR is_admin());
CREATE POLICY vendor_staff_write_insert ON vendor_staff
  FOR INSERT TO public
  WITH CHECK (
    ((SELECT vs.access_level FROM vendor_staff vs WHERE vs.vendor_id = vendor_staff.vendor_id AND vs.user_id = (SELECT auth.uid())) = 'ADMIN')
    OR is_admin()
  );
CREATE POLICY vendor_staff_write_update ON vendor_staff
  FOR UPDATE TO public
  USING (
    ((SELECT vs.access_level FROM vendor_staff vs WHERE vs.vendor_id = vendor_staff.vendor_id AND vs.user_id = (SELECT auth.uid())) = 'ADMIN')
    OR is_admin()
  )
  WITH CHECK (
    ((SELECT vs.access_level FROM vendor_staff vs WHERE vs.vendor_id = vendor_staff.vendor_id AND vs.user_id = (SELECT auth.uid())) = 'ADMIN')
    OR is_admin()
  );
CREATE POLICY vendor_staff_write_delete ON vendor_staff
  FOR DELETE TO public
  USING (
    ((SELECT vs.access_level FROM vendor_staff vs WHERE vs.vendor_id = vendor_staff.vendor_id AND vs.user_id = (SELECT auth.uid())) = 'ADMIN')
    OR is_admin()
  );

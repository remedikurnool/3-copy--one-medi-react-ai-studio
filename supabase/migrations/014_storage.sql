-- ============================================================
-- ONE MEDI: Migration 014 - Storage Buckets Configuration
-- ============================================================
-- Storage buckets for files and media
-- ============================================================

-- ============================================================
-- CREATE STORAGE BUCKETS
-- ============================================================

-- 1. Static Media (Public)
-- Medicine images, banners, blog thumbnails
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'static-media',
  'static-media',
  TRUE,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
) ON CONFLICT (id) DO NOTHING;

-- 2. Prescriptions (Restricted)
-- User-uploaded prescription images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'prescriptions',
  'prescriptions',
  FALSE,
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
) ON CONFLICT (id) DO NOTHING;

-- 3. Lab Reports (Restricted)
-- Clinical output PDFs
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'lab-reports',
  'lab-reports',
  FALSE,
  20971520, -- 20MB
  ARRAY['application/pdf', 'image/jpeg', 'image/png']
) ON CONFLICT (id) DO NOTHING;

-- 4. Vendor Compliance (Admin Only)
-- KYC documents, licenses, GST certificates
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'vendor-compliance',
  'vendor-compliance',
  FALSE,
  10485760, -- 10MB
  ARRAY['application/pdf', 'image/jpeg', 'image/png']
) ON CONFLICT (id) DO NOTHING;

-- 5. User Avatars (Public read, authenticated write)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  TRUE,
  2097152, -- 2MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- STORAGE POLICIES
-- ============================================================

-- Static Media: Public read
CREATE POLICY "static_media_public_read" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'static-media');

-- Static Media: Admin write
CREATE POLICY "static_media_admin_write" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'static-media' AND is_admin());

-- Prescriptions: Owner can upload/view
CREATE POLICY "prescriptions_owner_insert" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'prescriptions' 
    AND auth.uid()::TEXT = (storage.foldername(name))[1]
  );

CREATE POLICY "prescriptions_owner_select" ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'prescriptions' 
    AND auth.uid()::TEXT = (storage.foldername(name))[1]
  );

-- Prescriptions: Vendor staff can view assigned orders
CREATE POLICY "prescriptions_vendor_select" ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'prescriptions'
    AND EXISTS (
      SELECT 1 FROM order_artifacts oa
      INNER JOIN order_items oi ON oi.id = oa.order_item_id
      WHERE oa.file_url LIKE '%' || name
        AND has_vendor_access(oi.vendor_id)
    )
  );

-- Lab Reports: Owner can view
CREATE POLICY "lab_reports_owner_select" ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'lab-reports' 
    AND auth.uid()::TEXT = (storage.foldername(name))[1]
  );

-- Lab Reports: Vendor can upload
CREATE POLICY "lab_reports_vendor_insert" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'lab-reports'
    AND EXISTS (
      SELECT 1 FROM vendor_staff vs
      WHERE vs.user_id = auth.uid() AND vs.is_active = TRUE
    )
  );

-- Vendor Compliance: Admin only
CREATE POLICY "vendor_compliance_admin" ON storage.objects
  FOR ALL
  USING (bucket_id = 'vendor-compliance' AND is_admin());

-- Vendor Compliance: Vendor owner can upload their own
CREATE POLICY "vendor_compliance_owner_insert" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'vendor-compliance'
    AND EXISTS (
      SELECT 1 FROM vendors v
      WHERE v.owner_id = auth.uid() 
        AND v.id::TEXT = (storage.foldername(name))[1]
    )
  );

-- Avatars: Public read
CREATE POLICY "avatars_public_read" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'avatars');

-- Avatars: Owner can manage
CREATE POLICY "avatars_owner_manage" ON storage.objects
  FOR ALL
  USING (
    bucket_id = 'avatars' 
    AND auth.uid()::TEXT = (storage.foldername(name))[1]
  );

-- ============================================================
-- ONE MEDI: Migration 013 - Indexes & Performance
-- ============================================================
-- Strategic indexes for optimal query performance
-- ============================================================

-- ============================================================
-- FULL-TEXT SEARCH INDEXES
-- ============================================================

-- Lab Tests search
ALTER TABLE lab_tests ADD COLUMN IF NOT EXISTS search_vector TSVECTOR
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(category, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'C')
  ) STORED;

CREATE INDEX idx_lab_tests_search ON lab_tests USING GIN (search_vector);

-- Scans search
ALTER TABLE scans_master ADD COLUMN IF NOT EXISTS search_vector TSVECTOR
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(body_part, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'C')
  ) STORED;

CREATE INDEX idx_scans_search ON scans_master USING GIN (search_vector);

-- Doctors search
ALTER TABLE doctors ADD COLUMN IF NOT EXISTS search_vector TSVECTOR
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(specialty, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(sub_specialty, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(bio, '')), 'D')
  ) STORED;

CREATE INDEX idx_doctors_search ON doctors USING GIN (search_vector);

-- Content search
ALTER TABLE content_master ADD COLUMN IF NOT EXISTS search_vector TSVECTOR
  GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(category, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(array_to_string(tags, ' '), '')), 'C')
  ) STORED;

CREATE INDEX idx_content_search ON content_master USING GIN (search_vector);

-- ============================================================
-- TRIGRAM INDEXES (for fuzzy/partial matching)
-- ============================================================

CREATE INDEX idx_medicine_name_trgm ON medicine_master 
  USING GIN (name gin_trgm_ops);

CREATE INDEX idx_medicine_generic_trgm ON medicine_master 
  USING GIN (generic_name gin_trgm_ops);

CREATE INDEX idx_lab_tests_name_trgm ON lab_tests 
  USING GIN (name gin_trgm_ops);

CREATE INDEX idx_doctors_name_trgm ON doctors 
  USING GIN (name gin_trgm_ops);

-- ============================================================
-- COMPOSITE INDEXES for common queries
-- ============================================================

-- Service catalog active + type
CREATE INDEX idx_service_catalog_type_active 
  ON service_catalog(service_type, is_active) 
  WHERE is_active = TRUE;

-- Orders by profile + status
CREATE INDEX idx_orders_profile_status 
  ON orders(profile_id, status);

-- Order items by vendor + status
CREATE INDEX idx_order_items_vendor_status 
  ON order_items(vendor_id, status);

-- Availability slots: vendor + date + availability
CREATE INDEX idx_slots_vendor_date 
  ON availability_slots(vendor_id, slot_date, start_time) 
  WHERE booked_count < capacity AND is_blocked = FALSE;

-- Lab pricing by test + availability
CREATE INDEX idx_lab_pricing_test_available 
  ON lab_pricing(test_id) 
  WHERE is_available = TRUE;

-- Medicine inventory by medicine + availability
CREATE INDEX idx_medicine_inventory_available 
  ON medicine_inventory(medicine_id) 
  WHERE is_available = TRUE AND stock_qty > 0;

-- ============================================================
-- PARTIAL INDEXES (for specific conditions)
-- ============================================================

-- Only pending orders
CREATE INDEX idx_orders_pending 
  ON orders(created_at) 
  WHERE status = 'PENDING';

-- Only awaiting payment
CREATE INDEX idx_orders_awaiting_payment 
  ON orders(created_at) 
  WHERE payment_status = 'AWAITING';

-- Featured services
CREATE INDEX idx_service_catalog_featured 
  ON service_catalog(sort_order) 
  WHERE is_featured = TRUE AND is_active = TRUE;

-- Active coupons
CREATE INDEX idx_coupons_active_valid 
  ON coupons(code) 
  WHERE is_active = TRUE AND valid_to > NOW();

-- ============================================================
-- BRIN INDEXES (for time-series data)
-- ============================================================

-- Already created: orders(created_at), audit_logs(created_at)

-- Notification logs
CREATE INDEX idx_notification_logs_brin 
  ON notification_logs USING BRIN (created_at);

-- Coupon usage
CREATE INDEX idx_coupon_usage_brin 
  ON coupon_usage USING BRIN (used_at);

-- ============================================================
-- COVERING INDEXES (include commonly selected columns)
-- ============================================================

-- For medicine search results
CREATE INDEX idx_medicine_master_listing 
  ON medicine_master(id) 
  INCLUDE (name, generic_name, form, strength, prescription_required, image_url)
  WHERE is_active = TRUE;

-- For lab test listings
CREATE INDEX idx_lab_tests_listing 
  ON lab_tests(id) 
  INCLUDE (name, sample_type, fasting_required, category)
  WHERE is_active = TRUE;

-- ============================================================
-- FUNCTION: Global Search
-- ============================================================
CREATE OR REPLACE FUNCTION global_search(
  p_query TEXT,
  p_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
  entity_type TEXT,
  entity_id UUID,
  name TEXT,
  subtitle TEXT,
  rank REAL
)
LANGUAGE sql STABLE
AS $$
  -- Medicines
  SELECT 
    'MEDICINE'::TEXT,
    id,
    name,
    generic_name,
    ts_rank(search_vector, websearch_to_tsquery('english', p_query))
  FROM medicine_master
  WHERE search_vector @@ websearch_to_tsquery('english', p_query)
    AND is_active = TRUE
  
  UNION ALL
  
  -- Lab Tests
  SELECT 
    'LAB_TEST'::TEXT,
    id,
    name,
    category,
    ts_rank(search_vector, websearch_to_tsquery('english', p_query))
  FROM lab_tests
  WHERE search_vector @@ websearch_to_tsquery('english', p_query)
    AND is_active = TRUE
  
  UNION ALL
  
  -- Doctors
  SELECT 
    'DOCTOR'::TEXT,
    id,
    name,
    specialty,
    ts_rank(search_vector, websearch_to_tsquery('english', p_query))
  FROM doctors
  WHERE search_vector @@ websearch_to_tsquery('english', p_query)
    AND is_active = TRUE
  
  UNION ALL
  
  -- Scans
  SELECT 
    'SCAN'::TEXT,
    id,
    name,
    body_part,
    ts_rank(search_vector, websearch_to_tsquery('english', p_query))
  FROM scans_master
  WHERE search_vector @@ websearch_to_tsquery('english', p_query)
    AND is_active = TRUE
  
  ORDER BY rank DESC
  LIMIT p_limit;
$$;

-- ============================================================
-- FUNCTION: Fuzzy Search (using trigram)
-- ============================================================
CREATE OR REPLACE FUNCTION fuzzy_medicine_search(
  p_query TEXT,
  p_limit INTEGER DEFAULT 20
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  generic_name TEXT,
  similarity_score REAL
)
LANGUAGE sql STABLE
AS $$
  SELECT 
    m.id,
    m.name,
    m.generic_name,
    GREATEST(
      similarity(m.name, p_query),
      similarity(COALESCE(m.generic_name, ''), p_query)
    ) as similarity_score
  FROM medicine_master m
  WHERE m.is_active = TRUE
    AND (
      m.name % p_query 
      OR m.generic_name % p_query
    )
  ORDER BY similarity_score DESC
  LIMIT p_limit;
$$;

-- ============================================================
-- ANALYZE STATISTICS
-- ============================================================

-- Update statistics for query planner
ANALYZE profiles;
ANALYZE orders;
ANALYZE order_items;
ANALYZE medicine_master;
ANALYZE lab_tests;
ANALYZE doctors;
ANALYZE service_catalog;
ANALYZE availability_slots;

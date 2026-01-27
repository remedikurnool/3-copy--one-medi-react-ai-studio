-- ============================================================
-- ONE MEDI: Migration 004 - Service Catalog (Group C)
-- ============================================================
-- The Service Catalog is the CORE abstraction layer.
-- All order_items reference this table, not the master tables.
-- ============================================================

-- ============================================================
-- SERVICE CATALOG TABLE
-- Unified registry for all purchasable items
-- ============================================================
CREATE TABLE service_catalog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_type service_type NOT NULL,
  ref_table TEXT NOT NULL,  -- e.g., 'medicine_master', 'lab_tests', 'doctors'
  ref_id UUID NOT NULL,     -- FK to the specific master table
  display_name TEXT,        -- Cached name for quick display
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ensure unique reference per service type
  UNIQUE(service_type, ref_id)
);

-- Index for quick lookups
CREATE INDEX idx_service_catalog_type ON service_catalog(service_type);
CREATE INDEX idx_service_catalog_ref ON service_catalog(ref_table, ref_id);
CREATE INDEX idx_service_catalog_active ON service_catalog(is_active) WHERE is_active = TRUE;

-- Trigger for updated_at
CREATE TRIGGER service_catalog_updated_at BEFORE UPDATE ON service_catalog
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- COMMENT: Architecture Note
-- ============================================================
COMMENT ON TABLE service_catalog IS 
  'Central abstraction layer. Orders reference this table instead of individual master tables. 
   This decouples the transaction layer from service definitions, enabling:
   - Unified cart/order processing
   - Service-agnostic analytics
   - Easy addition of new service types';

-- ============================================================
-- ONE MEDI: Migration 008 - Financial & Compliance (Group G)
-- ============================================================
-- Tables: tax_slabs, refunds, vendor_payouts, audit_logs
-- ============================================================

-- ============================================================
-- TAX SLABS TABLE
-- India GST compliance - HSN code wise tax rates
-- ============================================================
CREATE TABLE tax_slabs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hsn_code TEXT NOT NULL,
  description TEXT,
  cgst_rate DECIMAL(5,2) NOT NULL DEFAULT 0,
  sgst_rate DECIMAL(5,2) NOT NULL DEFAULT 0,
  igst_rate DECIMAL(5,2) NOT NULL DEFAULT 0, -- For inter-state
  cess_rate DECIMAL(5,2) DEFAULT 0,
  effective_from DATE DEFAULT CURRENT_DATE,
  effective_to DATE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Common HSN codes for healthcare
INSERT INTO tax_slabs (hsn_code, description, cgst_rate, sgst_rate, igst_rate) VALUES
  ('3003', 'Medicaments (bulk drugs)', 6.00, 6.00, 12.00),
  ('3004', 'Medicaments (retail)', 6.00, 6.00, 12.00),
  ('9018', 'Medical instruments and appliances', 6.00, 6.00, 12.00),
  ('9993', 'Healthcare services (exempted)', 0.00, 0.00, 0.00),
  ('9983', 'Professional services', 9.00, 9.00, 18.00),
  ('9963', 'Ambulance services (exempted)', 0.00, 0.00, 0.00);

CREATE INDEX idx_tax_slabs_hsn ON tax_slabs(hsn_code);

-- ============================================================
-- REFUNDS TABLE
-- Partial/Full refund management
-- ============================================================
CREATE TABLE refunds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  refund_number TEXT UNIQUE,
  order_id UUID NOT NULL REFERENCES orders(id),
  order_item_id UUID REFERENCES order_items(id), -- NULL if full order refund
  
  -- Amounts
  original_amount DECIMAL(10,2) NOT NULL,
  refund_amount DECIMAL(10,2) NOT NULL,
  
  -- Reason
  reason TEXT NOT NULL,
  reason_category TEXT, -- CANCELLED, DAMAGED, NOT_DELIVERED, QUALITY, OTHER
  customer_notes TEXT,
  
  -- Status
  status refund_status DEFAULT 'REQUESTED',
  
  -- Processing
  processed_by UUID REFERENCES profiles(id),
  processed_at TIMESTAMPTZ,
  rejection_reason TEXT,
  
  -- Payment reference
  refund_method TEXT, -- ORIGINAL_PAYMENT, WALLET, BANK
  refund_ref TEXT, -- Payment gateway refund ID
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CHECK(refund_amount <= original_amount)
);

-- Generate refund number
CREATE OR REPLACE FUNCTION generate_refund_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.refund_number := 'RF-' || to_char(NOW(), 'YYYYMMDD') || '-' || 
    lpad(floor(random() * 10000)::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER refunds_generate_number
  BEFORE INSERT ON refunds
  FOR EACH ROW
  WHEN (NEW.refund_number IS NULL)
  EXECUTE FUNCTION generate_refund_number();

CREATE INDEX idx_refunds_order ON refunds(order_id);
CREATE INDEX idx_refunds_status ON refunds(status);

-- ============================================================
-- VENDOR PAYOUTS TABLE
-- Settlement ledger for vendor payments
-- ============================================================
CREATE TABLE vendor_payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payout_number TEXT UNIQUE,
  vendor_id UUID NOT NULL REFERENCES vendors(id),
  
  -- Period
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  
  -- Amounts
  gross_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  commission_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  tds_amount DECIMAL(12,2) DEFAULT 0, -- Tax Deducted at Source
  adjustment_amount DECIMAL(12,2) DEFAULT 0,
  net_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
  
  -- Order counts
  order_count INTEGER DEFAULT 0,
  refund_count INTEGER DEFAULT 0,
  
  -- Status
  status payout_status DEFAULT 'PENDING',
  
  -- Payment details
  payment_date DATE,
  payment_ref TEXT,
  bank_account_last4 TEXT,
  
  -- Invoice
  invoice_url TEXT,
  
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CHECK(period_start <= period_end)
);

-- Generate payout number
CREATE OR REPLACE FUNCTION generate_payout_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.payout_number := 'PO-' || to_char(NEW.period_end, 'YYYYMM') || '-' || 
    lpad(floor(random() * 1000)::TEXT, 3, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER payouts_generate_number
  BEFORE INSERT ON vendor_payouts
  FOR EACH ROW
  WHEN (NEW.payout_number IS NULL)
  EXECUTE FUNCTION generate_payout_number();

CREATE INDEX idx_payouts_vendor ON vendor_payouts(vendor_id);
CREATE INDEX idx_payouts_period ON vendor_payouts(period_start, period_end);
CREATE INDEX idx_payouts_status ON vendor_payouts(status);

-- ============================================================
-- AUDIT LOGS TABLE
-- ★ Non-negotiable for healthcare compliance
-- ============================================================
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Who
  actor_id UUID REFERENCES profiles(id),
  actor_email TEXT,
  actor_role TEXT,
  
  -- What
  entity_type TEXT NOT NULL, -- Table name
  entity_id UUID NOT NULL,
  action TEXT NOT NULL, -- CREATE, UPDATE, DELETE, VIEW, EXPORT
  
  -- State changes
  before_state JSONB,
  after_state JSONB,
  changed_fields TEXT[], -- List of changed field names
  
  -- Context
  ip_address TEXT,
  user_agent TEXT,
  session_id TEXT,
  
  -- Additional metadata
  metadata JSONB,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ★ Critical: Make audit logs append-only
-- No updates or deletes allowed
ALTER TABLE audit_logs SET (autovacuum_enabled = true);

-- Indexes for common queries
CREATE INDEX idx_audit_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_actor ON audit_logs(actor_id);
CREATE INDEX idx_audit_created ON audit_logs USING BRIN (created_at);
CREATE INDEX idx_audit_action ON audit_logs(action);

-- ============================================================
-- FUNCTION: Create Audit Log Entry
-- ============================================================
CREATE OR REPLACE FUNCTION create_audit_log(
  p_actor_id UUID,
  p_entity_type TEXT,
  p_entity_id UUID,
  p_action TEXT,
  p_before_state JSONB DEFAULT NULL,
  p_after_state JSONB DEFAULT NULL,
  p_changed_fields TEXT[] DEFAULT NULL,
  p_metadata JSONB DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
AS $$
DECLARE
  v_log_id UUID;
BEGIN
  INSERT INTO audit_logs (
    actor_id, entity_type, entity_id, action,
    before_state, after_state, changed_fields, metadata
  ) VALUES (
    p_actor_id, p_entity_type, p_entity_id, p_action,
    p_before_state, p_after_state, p_changed_fields, p_metadata
  )
  RETURNING id INTO v_log_id;
  
  RETURN v_log_id;
END;
$$;

-- ============================================================
-- TRIGGERS
-- ============================================================
CREATE TRIGGER tax_slabs_updated_at BEFORE UPDATE ON tax_slabs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER refunds_updated_at BEFORE UPDATE ON refunds
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER vendor_payouts_updated_at BEFORE UPDATE ON vendor_payouts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

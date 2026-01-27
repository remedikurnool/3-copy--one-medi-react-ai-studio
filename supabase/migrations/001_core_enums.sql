-- ============================================================
-- ONE MEDI: Migration 001 - Core Enums & Extensions
-- ============================================================
-- This migration creates all custom ENUM types and enables
-- required PostgreSQL extensions for the ONE MEDI platform.
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pg_trgm;      -- Fuzzy text search
CREATE EXTENSION IF NOT EXISTS postgis;       -- Geospatial queries

-- ============================================================
-- SERVICE TYPE ENUM
-- Central classification for all purchasable items
-- ============================================================
CREATE TYPE service_type AS ENUM (
  'MEDICINE',
  'LAB_TEST',
  'SCAN',
  'DOCTOR_CONSULT',
  'HOME_SERVICE',
  'INSURANCE',
  'CONTENT'
);

-- ============================================================
-- VENDOR TYPE ENUM
-- Classification of vendor/partner types
-- ============================================================
CREATE TYPE vendor_type AS ENUM (
  'PHARMACY',
  'DIAGNOSTIC_LAB',
  'SCAN_CENTER',
  'HOSPITAL',
  'PHYSIO_AGENCY',
  'AMBULANCE_PROVIDER',
  'CONTENT_PARTNER'
);

-- ============================================================
-- ORDER STATUS ENUM
-- Tracks the lifecycle of an order
-- ============================================================
CREATE TYPE order_status AS ENUM (
  'PENDING',
  'CONFIRMED',
  'PROCESSING',
  'OUT_FOR_DELIVERY',
  'COMPLETED',
  'CANCELLED'
);

-- ============================================================
-- PAYMENT STATUS ENUM
-- Tracks payment state
-- ============================================================
CREATE TYPE payment_status AS ENUM (
  'AWAITING',
  'PAID',
  'FAILED',
  'REFUNDED'
);

-- ============================================================
-- FULFILLMENT STATUS ENUM
-- Tracks service booking fulfillment
-- ============================================================
CREATE TYPE fulfillment_status AS ENUM (
  'SCHEDULED',
  'IN_PROGRESS',
  'COMPLETED',
  'NO_SHOW',
  'CANCELLED'
);

-- ============================================================
-- UI CONFIGURATION ENUMS
-- ============================================================
CREATE TYPE menu_type AS ENUM ('DESKTOP', 'MOBILE', 'FLOATING');
CREATE TYPE carousel_position AS ENUM ('HOME_TOP', 'SERVICE_PAGE', 'FOOTER');
CREATE TYPE artifact_type AS ENUM ('PRESC', 'REPORT');
CREATE TYPE discount_type AS ENUM ('PERCENTAGE', 'FIXED');
CREATE TYPE content_type AS ENUM ('article', 'video');
CREATE TYPE refund_status AS ENUM ('REQUESTED', 'APPROVED', 'PROCESSED', 'REJECTED');
CREATE TYPE payout_status AS ENUM ('PENDING', 'PROCESSED', 'FAILED');

-- ============================================================
-- MODALITY ENUM (for scans)
-- ============================================================
CREATE TYPE scan_modality AS ENUM ('MRI', 'CT', 'ULTRASOUND', 'XRAY', 'PET', 'DEXA');

-- ============================================================
-- SAMPLE TYPE ENUM (for lab tests)
-- ============================================================
CREATE TYPE sample_type AS ENUM ('BLOOD', 'URINE', 'STOOL', 'SALIVA', 'SWAB', 'TISSUE', 'OTHER');

# ONE MEDI: Database Architecture v2.0 (Production-Grade)

> [!IMPORTANT]
> **STATUS: FROZEN & PRODUCTION-READY**
> 
> This is the canonical architecture for ONE MEDI. All refinements have been applied and verified. This design is:
> - ✅ Service-agnostic (covers all 16+ service modules)
> - ✅ India-compliant (GST, prescriptions, audits, vendor KYC)
> - ✅ Multi-tenant & RLS-safe (vendor isolation)
> - ✅ Scalable (1M+ orders, partition-ready)
> - ✅ Future-proof (dynamic UI, central taxonomies)
> 
> **DO NOT redesign core architecture.** All future features must fit within this model.

This document is the refined technical design, incorporating all architectural feedback for a scalable, India-compliant, healthcare super-app backend.

---

## 1. Core Mental Model

```
Auth (Supabase)
   ↓
Profiles + Roles
   ↓
Vendors & Locations
   ↓
Service Catalog (★ Abstraction Layer)
   ↓
Service Masters (medicine, lab, doctor, etc.)
   ↓
Taxonomies (specialty, body system, condition, surgery, risk)
   ↓
Pricing / Inventory / Availability
   ↓
Carts → Orders → Order Items (with snapshots)
   ↓
Bookings / Fulfillment
   ↓
Refunds → Vendor Payouts → Audit Logs → Analytics
   ↓
UI Configuration (menus, carousels, feature flags)
```

---

## 2. Key Architectural Refinements (v2)

| Change | Rationale |
| :--- | :--- |
| **`service_catalog`** | A unified abstraction layer. All `order_items` now reference `service_catalog.id`, decoupling orders from specific master tables. |
| **Medicine Versioning** | `medicine_master` now has `version` and `parent_id` to preserve historical accuracy. |
| **`medicine_alternatives`** | Explicit table for doctor-safe generic substitutions. |
| **`availability_slots`** | Generalized slot model for Doctors, Labs, Scans. `doctor_slots` becomes a specialization. |
| **`carts` / `cart_items`** | Persistent cart for abandonment tracking and cross-session recovery. |
| **`feature_flags`** | City-wise service enablement without code redeployment. |
| **`order_items.service_snapshot`** | JSONB snapshot of the service at the time of purchase to prevent historical data loss. |
| **Optimistic Locking** | `availability_slots` now uses a `version` column to prevent booking race conditions. |
| **UI Config Layer** | Dynamic, admin-controlled menus and carousels. |
| **Central Taxonomy** | Unified medical-grade tagging for all services (Specialties, Body Systems, etc.). |
| **RLS Security Definer Function** | `has_vendor_access(vendor_id)` centralizes vendor logic to prevent policy drift. |

---

## 3. Complete Table Definitions

### Group A: Identity & Access
| Table | Key Fields | Notes |
| :--- | :--- | :--- |
| `profiles` | `id`, `full_name`, `phone`, `role_id`, `created_at` | Links to `auth.users`. |
| `family_members` | `owner_id`, `name`, `relation`, `dob`, `medical_history (jsonb)` | For booking on behalf of dependents. |
| `addresses` | `profile_id`, `tag`, `line_1`, `city_id`, `coords (geography)`, `is_default` | Geolocation enabled. |
| `roles` | `id`, `name`, `permissions (jsonb)` | RBAC master (ADMIN, VENDOR_ADMIN, STAFF, PATIENT). |

---

### Group B: Vendor Ecosystem
| Table | Key Fields | Notes |
| :--- | :--- | :--- |
| `vendors` | `id`, `name`, `type (enum)`, `owner_id`, `commission_rate`, `is_active` | Parent entity. |
| `vendor_locations` | `vendor_id`, `city_id`, `coords (geography)`, `is_open_24x7` | Physical branches. |
| `vendor_staff` | `vendor_id`, `user_id`, `branch_id`, `access_level` | Multi-user portal access. |
| `vendor_kyc` | `vendor_id`, `gstin`, `dl_number`, `license_url`, `verified_at` | Compliance storage. |

---

### Group C: Service Catalog (★ NEW Abstraction)

> [!IMPORTANT]
> This is the single most important table for future-proofing. Orders reference this, not the individual master tables.

| Table | Key Fields | Notes |
| :--- | :--- | :--- |
| `service_catalog` | `id`, `service_type (enum)`, `ref_table`, `ref_id`, `is_active`, `created_at` | Central registry for all purchasable items. |

**`service_type` enum**: `MEDICINE`, `LAB_TEST`, `SCAN`, `DOCTOR_CONSULT`, `HOME_SERVICE`, `INSURANCE`, `CONTENT`.

---

### Group D: Service Masters (The "What")
| Table | Key Fields | Notes |
| :--- | :--- | :--- |
| `medicine_master` | `id`, `version`, `parent_id`, `name`, `generic_name`, `hsn_code`, `prescription_required` | **Versioned** for historical accuracy. |
| `medicine_alternatives` | `medicine_id`, `alternative_id`, `rank`, `approved (bool)` | Doctor-safe substitutions. |
| `lab_tests` | `id`, `name`, `code`, `sample_type`, `fasting_needed`, `category` | Master test list. |
| `scans_master` | `id`, `name`, `body_part`, `modality (MRI, CT, US)`, `contrast_required` | Master scan list. |
| `doctors` | `id`, `profile_id`, `specialty`, `reg_number`, `experience_years` | Clinical credentials. |
| `services_master` | `id`, `name`, `unit (per km, per session)` | Flexible for Physio, Ambulance, Nursing. |

---

### Group E: Pricing & Availability (The "Where & How Much")
| Table | Key Fields | Notes |
| :--- | :--- | :--- |
| `medicine_inventory` | `medicine_id`, `vendor_id`, `branch_id`, `stock_qty`, `price`, `mrp` | Real-time vendor stock. |
| `lab_pricing` | `test_id`, `vendor_id`, `price`, `mrp`, `nabl_accredited` | Vendor-specific rates. |
| `scan_pricing` | `scan_id`, `vendor_id`, `price`, `mrp` | Vendor-specific radiology rates. |
| `service_pricing` | `service_id`, `vendor_id`, `base_price`, `variable_price` | For dynamic services. |
| `availability_slots` | `service_catalog_id`, `vendor_id`, `start_time`, `end_time`, `capacity`, `booked_count`, `version (int)` | ★ Unified slot model. Uses **optimistic locking** (`version`). |

---

### Group F: Transactions (The "Flow")
| Table | Key Fields | Notes |
| :--- | :--- | :--- |
| `carts` | `id`, `profile_id`, `updated_at` | Persistent cart. |
| `cart_items` | `cart_id`, `service_catalog_id`, `qty` | FK to abstraction layer. |
| `orders` | `id`, `profile_id`, `net_amount`, `payment_status`, `payment_ref`, `status`, `created_at` | Transaction parent. |
| `order_items` | `order_id`, `service_catalog_id`, `vendor_id`, `qty`, `unit_price`, `cgst`, `sgst`, `service_snapshot (jsonb)` | Links to `service_catalog`. Snapshot for history. |
| `service_bookings` | `order_item_id`, `patient_id`, `slot_id`, `fulfillment_status`, `clinical_notes` | Execution details. |
| `order_artifacts` | `order_id`, `file_url`, `type (PRESC, REPORT)` | Prescription/Report vault links. |

---

### Group G: Financial & Compliance (★ Critical)
| Table | Key Fields | Notes |
| :--- | :--- | :--- |
| `tax_slabs` | `hsn_code`, `cgst`, `sgst`, `igst` | India GST compliance. |
| `refunds` | `order_item_id`, `amount`, `reason`, `status` | Partial/Full refund logic. |
| `vendor_payouts` | `vendor_id`, `period_start`, `period_end`, `gross`, `commission`, `net`, `status` | Settlement ledger. |
| `audit_logs` | `actor_id`, `entity_type`, `entity_id`, `action`, `before_state (jsonb)`, `after_state (jsonb)`, `created_at` | **Non-negotiable** for healthcare. |

---

### Group H: Marketing & Config
| Table | Key Fields | Notes |
| :--- | :--- | :--- |
| `coupons` | `code`, `discount_type`, `value`, `max_uses`, `valid_from`, `valid_to` | Promo engine. |
| `marketing_assets` | `type (BANNER, CAROUSEL)`, `image_url`, `link_url`, `city_id`, `sort_order` | CMS for homepage. |
| `feature_flags` | `feature_key`, `city_id`, `enabled (bool)` | ★ City-wise rollouts. |
| `content_master` | `title`, `type (article, video)`, `content_url`, `author_id` | Blogs & Videos. |

---

### Group I: UI Configuration Layer (Dynamic)
| Table | Key Fields | Notes |
| :--- | :--- | :--- |
| `ui_menus` | `id`, `menu_type (enum)`, `title`, `icon`, `route`, `sort_order`, `city_id`, `is_active` | Types: DESKTOP, MOBILE, FLOATING. |
| `ui_menu_items` | `menu_id`, `service_catalog_id`, `taxonomy_term_id`, `external_link`, `sort_order` | Flexible nesting. |
| `ui_carousels` | `id`, `title`, `position (enum)`, `city_id`, `is_active` | Positions: HOME_TOP, SERVICE_PAGE, FOOTER. |
| `ui_carousel_items` | `carousel_id`, `service_catalog_id`, `image_url`, `sort_order` | Dynamic banners. |

---

### Group J: Central Taxonomy & Filter Engine
| Table | Key Fields | Notes |
| :--- | :--- | :--- |
| `taxonomies` | `id`, `name`, `slug`, `applicable_service_types (service_type[])` | e.g., "Specialty", "Body System". |
| `taxonomy_terms` | `id`, `taxonomy_id`, `name`, `slug`, `parent_id` | e.g., "Cardiology". |
| `service_taxonomy_map` | `service_catalog_id`, `taxonomy_term_id` | Universal tagging engine. |

---

## 4. Row Level Security (RLS) v2

### A. Centralized Vendor Access Function
```sql
-- Security Definer Function (Reusable in all policies)
CREATE OR REPLACE FUNCTION public.has_vendor_access(p_vendor_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
As $$
  SELECT EXISTS (
    SELECT 1 FROM public.vendor_staff
    WHERE user_id = auth.uid() AND vendor_id = p_vendor_id
  );
$$;
```

### B. Policy Examples
- **`profiles`**: `auth.uid() = id`
- **`medicine_inventory`**: `has_vendor_access(vendor_id)`
- **`orders` (Patient)**: `profile_id = auth.uid()`
- **`orders` (Vendor)**: `EXISTS (SELECT 1 FROM order_items oi WHERE oi.order_id = orders.id AND has_vendor_access(oi.vendor_id))`

---

## 5. Indexing Strategy

| Type | Table / Column | Index |
| :--- | :--- | :--- |
| FTS | `medicine_master(name, generic_name)` | `GIN (to_tsvector(...))` |
| Geospatial | `vendor_locations(coords)` | `GIST` |
| Availability | `availability_slots(start_time) WHERE booked_count < capacity` | Partial B-Tree |
| Time-Series | `orders(created_at)` | BRIN |

---

## 6. Enums

```sql
CREATE TYPE service_type AS ENUM ('MEDICINE', 'LAB_TEST', 'SCAN', 'DOCTOR_CONSULT', 'HOME_SERVICE', 'INSURANCE', 'CONTENT');
CREATE TYPE vendor_type AS ENUM ('PHARMACY', 'DIAGNOSTIC_LAB', 'SCAN_CENTER', 'HOSPITAL', 'PHYSIO_AGENCY', 'AMBULANCE_PROVIDER', 'CONTENT_PARTNER');
CREATE TYPE order_status AS ENUM ('PENDING', 'CONFIRMED', 'PROCESSING', 'OUT_FOR_DELIVERY', 'COMPLETED', 'CANCELLED');
CREATE TYPE payment_status AS ENUM ('AWAITING', 'PAID', 'FAILED', 'REFUNDED');
```

---

## 7. Storage Buckets

| Bucket | Access | Contents |
| :--- | :--- | :--- |
| `static-media` | Public | Medicine images, Blog thumbnails, Banners. |
| `prescriptions` | Restricted | User-uploaded Rx images. RLS: Owner + Assigned Pharmacist. |
| `lab-reports` | Restricted | Clinical output PDFs. RLS: Owner + Assigned Pathologist. |
| `vendor-compliance` | Admin Only | KYC documents (License, GST Cert). |

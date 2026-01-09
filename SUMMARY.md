
# One Medi: Implementation Summary

**Date:** October 2025  
**Status:** High-Fidelity Functional Prototype / MVP Candidate

---

## 1. Technology Stack

*   **Frontend Framework:** React 18+ (Vite)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS v4 (Configured with custom color palette and animations)
*   **Routing:** React Router DOM v6+ (HashRouter implementation)
*   **State Management:** Zustand (Stores: `cartStore`, `userStore`, `locationStore`)
*   **Icons:** Google Material Symbols Outlined/Filled
*   **Fonts:** Lexend, Manrope, Inter

---

## 2. Architecture & Folder Structure

The project follows a **Feature-Based Modular Architecture**:

*   `/app`: Root layouts and providers.
*   `/components`:
    *   `/ui`: Reusable atoms (Footer, AdvancedSearch, LocationModal, PrescriptionUpload).
    *   `/cards`: Entity-specific cards (DoctorCard, MedicineCard, LabTestCard, ScanCard).
*   `/features`: (Proposed structure, currently flatter in `pages` for prototype speed).
*   `/pages`: Route-level components grouped by domain (medicines, doctors, scans, lab-tests, profile, etc.).
*   `/store`: Zustand state logic.
*   `/lib/supabase`: (Prepared for backend integration).
*   `/constants.ts`: Mock database acting as the temporary backend.

---

## 3. Implemented Modules & Features

### A. Core E-Commerce (Medicines)
*   **Catalog:** Searchable, filterable list of medicines.
*   **Product Detail:** Image zoom, dosage info, Rx requirements, "Add to Cart".
*   **Cart & Checkout:** Quantity management, bill calculation, prescription upload, address selection, payment mode selection (UI).

### B. Service Booking (Doctors, Labs, Scans)
*   **Doctors:** Listing by specialty, Profile with experience/stats, Slot booking (Clinic/Video/Home).
*   **Lab Tests:** Package comparison, Centre selection variants, Home collection toggle.
*   **Medical Scans:** Search by body part, Diagnostic center selection with price comparison.
*   **Home Care & Physio:** Service listing with duration/session-based pricing plans.

### C. Specialized Care
*   **Diabetes Care:** Dedicated landing page with curated packages, devices, and footwear categories.
*   **Hospitals:** Directory listing with filters for "Open 24x7" and "Insurance Accepted".

### D. User Profile & Utilities
*   **Dashboard:** Profile management, Stats (Height/Weight).
*   **Sub-pages:** Address management, Family member management, Saved Payment methods.
*   **Health Tools:** BMI Calculator, Water Intake tracker.
*   **Health Records:** Timeline view of vitals and reports.
*   **Chat:** Customer support chat UI.

---

## 4. UI/UX Design System

*   **Color Palette:**
    *   **Primary:** Medi Teal (`#0d9488`) - Trust and Health.
    *   **Secondary:** Blue (`#3b82f6`) - Technology and Professionalism.
    *   **Accent:** Amber/Orange - Call to actions and ratings.
*   **Layout Patterns:**
    *   **Mobile-First:** Sticky bottom buttons, touch-friendly targets.
    *   **Glassmorphism:** Headers and modals use `backdrop-blur`.
    *   **Bento Grids:** Home screen service selection.
    *   **Snap Scroll:** Horizontal carousels for easy browsing.
*   **Animations:**
    *   Custom `blob` background animation.
    *   `fade-in` and `slide-up` page transitions.

---

## 5. Data & State

*   **Data Source:** `constants.ts` contains rich mock data for Doctors, Medicines, Tests, Scans, and Hospitals to simulate a populated database.
*   **Persistence:** `userStore` and `locationStore` use `zustand/persist` to save user preferences and location to LocalStorage.
*   **Location:** Mock Geolocation API implementation to simulate "Detect Location".

---

## 6. Current Gaps (To be addressed)

*   **Backend:** No real database connection (Supabase pending).
*   **Auth:** No login/signup flow; User is hardcoded as "Siva Kumar".
*   **Payments:** Payment gateway integration is mocked.
*   **Map:** Static images used for maps instead of Google Maps/Mapbox API.

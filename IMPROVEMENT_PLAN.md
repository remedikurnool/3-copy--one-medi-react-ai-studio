
# One Medi: Product Enhancement & Improvement Plan

**Version:** 1.0  
**Target:** Production-Grade Healthcare Superapp (Kurnool, India)  
**Role:** Product Manager

---

## 1. Executive Summary
The current iteration of **One Medi** establishes a strong visual foundation and covers the breadth of a healthcare superapp (Medicines, Doctors, Labs, Scans, Home Care). However, to transition from a high-fidelity prototype to a functional production app, we need to focus on **User Retention (Sticky Features)**, **Operational Logic (Backend Integration)**, and **Hyper-local Utility (Kurnool Specifics)**.

---

## 2. UI/UX & Design Enhancements

### A. Visual Polish
*   **Micro-Interactions:** Add "Add to Cart" flying animations (product flies to cart icon). Add heart animations for adding to favorites.
*   **Skeleton Loading States:** Replace simple loading spinners with shimmer skeletons for Cards (Medicine, Doctor, Lab) to improve perceived performance.
*   **Dark Mode Toggle:** The codebase supports `dark:` classes, but lacks a user-accessible toggle in the Profile or Settings to switch themes manually.
*   **Glassmorphism Depth:** Increase the depth of the bottom navigation and sticky headers with stronger background blurs and border gradients to separate layers effectively on iOS.

### B. Navigation & Information Architecture
*   **Global "Command K" Search:** Transform the top search bar into a global search that finds Medicines, Doctors, Tests, and *Pages* (e.g., "Show me my orders") instantly.
*   **Breadcrumbs:** Add breadcrumb navigation on detail pages (e.g., `Home > Medicines > Pain Relief > Dolo 650`) for better web navigability.
*   **Smart Bottom Sheet:** On mobile, instead of full-page transitions for filters or quick-views, use draggable bottom sheets (Drawers) for a native app feel.

---

## 3. Feature Requirements & Expansion

### A. Medicines (E-Commerce)
*   **Generic Alternatives Engine:** When a user views a branded medicine, suggest cheaper generic alternatives available in Kurnool.
*   **Upload Prescription to Cart:** Allow users to upload a prescription *first* and let the pharmacist populate the cart (Concierge Order).
*   **Pill Reminder:** A utility feature allowing users to set reminders for the medicines they just bought.

### B. Doctor Consultation
*   **E-Prescription View:** After a booking is completed, generate a digital prescription PDF that serves as a valid document for buying meds.

### C. Lab Tests & Scans
*   **Health Trends Graph:** For users with multiple past reports (e.g., Thyroid/Diabetes), visualize the data points (HbA1c levels) on a line graph in the Health Records section.
*   **Compare Packages:** Allow users to select 2-3 health packages and compare parameters side-by-side.

---

## 4. Missing Pages & Flows

To make this a complete commercial application, the following pages must be built:

1.  **Authentication Flow:**
    *   Login / Sign Up (Mobile OTP based).
    *   OTP Verification Screen.
    *   Onboarding (User Name, Age, Gender setup).
2.  **Order Success & Tracking:**
    *   Order Success Animation Page.
    *   Live Order Tracking (Map view for delivery, Timeline for status).
3.  **Community/Feed:**
    *   A "Health Feed" page with articles, tips, and videos relevant to Indian health contexts.
4.  **Notifications Center:**
    *   A dedicated page listing order updates, offer alerts, and appointment reminders.


---


## 6. Hyper-Local Strategy (Kurnool Context)

*   **Language Toggle (Telugu):** The app must support a seamless switch between English and Telugu for the interface and content.
*   **WhatsApp Integration:** All order confirmations and appointment details should have a "Send to WhatsApp" button (using WhatsApp Business API).
*   **Offline Mode:** Cache core pages (Home, Profile, Active Orders) using React Query + LocalStorage so the app works in patchy network areas.

---

## 7. Simplifications

*   **Consolidate Bookings:** Currently, `DoctorBooking`, `ScanBooking`, and `LabBooking` are separate files with similar logic. Create a reusable `GenericBookingFlow` component to reduce code duplication.
*   **Unified Card Component:** Create a `UniversalCard` that takes a `type` prop to render Medicine, Doctor, or Test layouts, sharing common styles (shadows, borders).


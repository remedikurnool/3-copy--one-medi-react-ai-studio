
import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { FlyingCartAnimation } from './components/ui/FlyingCartAnimation';
import ScrollToTop from './components/ScrollToTop';
import { GlobalLoadingSkeleton } from './components/ui/Skeletons';

// -- Lazy Load Pages for Performance --

// Auth Pages
const Login = lazy(() => import('./pages/auth/Login'));
const OTP = lazy(() => import('./pages/auth/OTP'));

// Core Pages
const Home = lazy(() => import('./pages/Home'));
const Bookings = lazy(() => import('./pages/Bookings'));
const Chat = lazy(() => import('./pages/Chat'));
const Profile = lazy(() => import('./pages/Profile'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'));
const Notifications = lazy(() => import('./pages/Notifications'));
const Services = lazy(() => import('./pages/Services'));
const UploadRx = lazy(() => import('./pages/UploadRx'));

// Feature: Medicines
const MedicineList = lazy(() => import('./pages/medicines/MedicineList'));
const MedicineDetail = lazy(() => import('./pages/medicines/MedicineDetail'));

// Feature: Doctors
const DoctorList = lazy(() => import('./pages/doctors/DoctorList'));
const DoctorProfile = lazy(() => import('./pages/doctors/DoctorProfile'));
const DoctorBooking = lazy(() => import('./pages/doctors/DoctorBooking'));

// Feature: Scans
const ScanList = lazy(() => import('./pages/scans/ScanList'));
const ScanDetail = lazy(() => import('./pages/scans/ScanDetail'));
const ScanBooking = lazy(() => import('./pages/scans/ScanBooking'));
const PregnancyScans = lazy(() => import('./pages/scans/PregnancyScans'));

// Feature: Lab Tests
const LabTestList = lazy(() => import('./pages/lab-tests/LabTestList'));
const LabTestDetail = lazy(() => import('./pages/lab-tests/LabTestDetail'));
const LabBooking = lazy(() => import('./pages/lab-tests/LabBooking'));

// Feature: Specialized Care
const HomeCareList = lazy(() => import('./pages/home-care/HomeCareList'));
const HomeCareDetail = lazy(() => import('./pages/home-care/HomeCareDetail'));
const HomeCareBooking = lazy(() => import('./pages/home-care/HomeCareBooking'));
const ICUCalculator = lazy(() => import('./pages/home-care/ICUCalculator'));
const PhysioList = lazy(() => import('./pages/physiotherapy/PhysioList'));
const PhysioDetail = lazy(() => import('./pages/physiotherapy/PhysioDetail'));
const DiabetesCare = lazy(() => import('./pages/diabetes/DiabetesCare'));
const HospitalList = lazy(() => import('./pages/hospitals/HospitalList'));
const HospitalDetail = lazy(() => import('./pages/hospitals/HospitalDetail'));

// Feature: New Services (Expanded)
const AmbulanceBooking = lazy(() => import('./pages/ambulance/AmbulanceBooking'));
const BloodBankList = lazy(() => import('./pages/blood-bank/BloodBankList'));
const InsuranceList = lazy(() => import('./pages/insurance/InsuranceList'));
const SurgeryList = lazy(() => import('./pages/surgeries/SurgeryList'));
const SurgeryDetail = lazy(() => import('./pages/surgeries/SurgeryDetail'));
const SurgerySecondOpinion = lazy(() => import('./pages/surgeries/SurgerySecondOpinion'));
const WellnessCenter = lazy(() => import('./pages/wellness/WellnessCenter'));
const SkinHairCare = lazy(() => import('./pages/skin-hair/SkinHairCare'));
const HealthFeed = lazy(() => import('./pages/feed/HealthFeed'));

// Feature: Mother & Baby (Vertical)
const MotherBabyHome = lazy(() => import('./pages/mother-baby/MotherBabyHome'));
const VaccinationTracker = lazy(() => import('./pages/mother-baby/VaccinationTracker'));
const CareGuides = lazy(() => import('./pages/mother-baby/CareGuides'));

// Feature: Profile & Utilities
const ProfileEdit = lazy(() => import('./pages/ProfileEdit'));
const Addresses = lazy(() => import('./pages/profile/Addresses'));
const FamilyMembers = lazy(() => import('./pages/profile/FamilyMembers'));
const PaymentMethods = lazy(() => import('./pages/profile/PaymentMethods'));
const HealthRecords = lazy(() => import('./pages/profile/HealthRecords'));
const Calculators = lazy(() => import('./pages/profile/Calculators'));
const Prescriptions = lazy(() => import('./pages/Prescriptions'));

const App = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <FlyingCartAnimation />
      <Suspense fallback={<GlobalLoadingSkeleton />}>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<OTP />} />

          {/* Main Layout Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/bookings" element={<Layout><Bookings /></Layout>} />
          <Route path="/chat" element={<Layout><Chat /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          
          <Route path="/medicines" element={<Layout><MedicineList /></Layout>} />
          <Route path="/doctors" element={<Layout><DoctorList /></Layout>} />
          
          <Route path="/scans" element={<Layout><ScanList /></Layout>} />
          <Route path="/scans/pregnancy" element={<Layout><PregnancyScans /></Layout>} />
          
          <Route path="/lab-tests" element={<Layout><LabTestList /></Layout>} />
          
          <Route path="/home-care" element={<Layout><HomeCareList /></Layout>} />
          <Route path="/home-care/icu-calculator" element={<Layout><ICUCalculator /></Layout>} />
          <Route path="/home-care/booking" element={<Layout><HomeCareBooking /></Layout>} />
          
          <Route path="/physiotherapy" element={<Layout><PhysioList /></Layout>} />
          <Route path="/diabetes-care" element={<Layout><DiabetesCare /></Layout>} />
          <Route path="/hospitals" element={<Layout><HospitalList /></Layout>} />
          <Route path="/hospitals/:id" element={<HospitalDetail />} />

          {/* New Routes */}
          <Route path="/ambulance" element={<Layout><AmbulanceBooking /></Layout>} />
          <Route path="/blood-banks" element={<Layout><BloodBankList /></Layout>} />
          <Route path="/insurance" element={<Layout><InsuranceList /></Layout>} />
          
          <Route path="/surgeries" element={<Layout><SurgeryList /></Layout>} />
          <Route path="/surgeries/detail/:id" element={<SurgeryDetail />} />
          <Route path="/surgeries/second-opinion" element={<Layout><SurgerySecondOpinion /></Layout>} />
          
          <Route path="/wellness" element={<Layout><WellnessCenter /></Layout>} />
          <Route path="/skin-hair" element={<Layout><SkinHairCare /></Layout>} />
          <Route path="/health-feed" element={<Layout><HealthFeed /></Layout>} />

          {/* Mother & Baby Routes */}
          <Route path="/mother-baby" element={<Layout><MotherBabyHome /></Layout>} />
          <Route path="/mother-baby/vaccination-tracker" element={<Layout><VaccinationTracker /></Layout>} />
          <Route path="/mother-baby/guides" element={<Layout><CareGuides /></Layout>} />

          {/* Utilities */}
          <Route path="/upload-rx" element={<UploadRx />} />

          {/* Full Screen Pages */}
          <Route path="/medicines/:id" element={<MedicineDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/notifications" element={<Notifications />} />
          
          <Route path="/doctors/:id" element={<DoctorProfile />} />
          <Route path="/doctors/booking" element={<DoctorBooking />} />
          
          <Route path="/scans/detail" element={<ScanDetail />} />
          <Route path="/scans/booking" element={<ScanBooking />} />
          
          <Route path="/lab-tests/:id" element={<LabTestDetail />} />
          <Route path="/lab-tests/booking" element={<LabBooking />} />

          <Route path="/home-care/:id" element={<HomeCareDetail />} />
          <Route path="/physiotherapy/:id" element={<PhysioDetail />} />
          
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/profile/addresses" element={<Addresses />} />
          <Route path="/profile/family" element={<FamilyMembers />} />
          <Route path="/profile/payments" element={<PaymentMethods />} />
          <Route path="/profile/health-records" element={<HealthRecords />} />
          <Route path="/profile/calculators" element={<Calculators />} />
          <Route path="/prescriptions" element={<Prescriptions />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default App;

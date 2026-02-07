'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  useHeroCarousel,
  useMedicines,
  useDoctors,
  useLabTests,
  useSkinHairTreatments,
  useMedicalScans
} from '@/hooks';
import GlobalSearchBar from '@/components/ui/GlobalSearchBar';
import { useLocationStore } from '@/store/locationStore';
import LocationModal from '@/components/ui/LocationModal';
import MobileSidebar from '@/components/ui/MobileSidebar';

// New Components
import { HeroSlider } from '@/components/ui/HeroSlider';
import { CategoryPill } from '@/components/ui/CategoryPill';
import { BentoCard } from '@/components/cards/BentoCard';
import SectionHeader from '@/components/ui/SectionHeader';

// Cards
import { MedicineCard } from '@/components/cards/MedicineCard';
import { LabTestCard } from '@/components/cards/LabTestCard';
import { ScanCard } from '@/components/cards/ScanCard';
import { DoctorCard } from '@/components/cards/DoctorCard';

// --- Animations ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

// --- Background Components ---
const BackgroundBlobs = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
    <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-primary-500/5 dark:bg-primary-900/10 rounded-full blur-[120px] animate-float decoration-clone"></div>
    <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-accent-500/5 dark:bg-accent-900/10 rounded-full blur-[100px] animate-float animation-delay-2000"></div>
    <div className="absolute bottom-[-20%] left-[20%] w-[70%] h-[70%] bg-teal-400/5 dark:bg-teal-900/10 rounded-full blur-[120px] animate-float animation-delay-4000"></div>
  </div>
);

export default function Home() {
  const router = useRouter();
  const { city, address } = useLocationStore();
  const [isLocationModalOpen, setIsLocationModalOpen] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  // Data Hooks
  const { data: heroCarousel } = useHeroCarousel();
  const { data: medicines, loading: loadingMeds } = useMedicines(6);
  const { data: doctors, loading: loadingDocs } = useDoctors(5);
  const { data: labTests, loading: loadingLabs } = useLabTests(5);
  const { data: scans, loading: loadingScans } = useMedicalScans(5);

  return (
    <div className="flex flex-col relative isolate min-h-screen pb-28 lg:pb-12 max-w-[100vw] overflow-x-hidden">
      <BackgroundBlobs />
      <LocationModal isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)} />
      <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Mobile Header - Glassmorphism */}
      <header className="sticky top-0 z-40 lg:hidden transition-all duration-300">
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white text-[10px] font-bold py-1.5 text-center tracking-wider uppercase shadow-md">
          ⚡ Kurnool's #1 Healthcare App
        </div>
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-white/20 dark:border-slate-800 shadow-sm rounded-b-[2rem]">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="bg-surface-50 dark:bg-surface-800 p-2.5 rounded-xl text-slate-700 dark:text-white active:scale-95 transition-transform shadow-sm"
              >
                <span className="material-symbols-outlined text-2xl">menu</span>
              </button>
              <div className="flex flex-col" onClick={() => setIsLocationModalOpen(true)}>
                <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white leading-none font-lexend">ONE MEDI</h1>
                <div className="flex items-center gap-1 mt-0.5 text-slate-500 dark:text-slate-400">
                  <span className="material-symbols-outlined text-[12px] text-primary-500 filled">location_on</span>
                  <span className="text-[11px] font-bold max-w-[120px] truncate">{address || city || 'Select Location'}</span>
                  <span className="material-symbols-outlined text-[12px]">expand_more</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => router.push('/notifications')} className="relative p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-white">
                <span className="material-symbols-outlined text-xl">notifications</span>
                <span className="absolute top-2.5 right-3 size-2 bg-red-500 rounded-full border border-white dark:border-slate-900 animate-pulse"></span>
              </button>
            </div>
          </div>
          <div className="px-4 pb-4">
            <GlobalSearchBar />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <motion.main
        className="flex-1 lg:max-w-7xl lg:mx-auto w-full px-4 lg:px-8 lg:pt-8 space-y-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Hero Section */}
        <motion.section variants={itemVariants} className="mt-4 lg:mt-0">
          <HeroSlider items={heroCarousel?.items} />
        </motion.section>

        {/* Categories Section - Snap Scroll */}
        <motion.section variants={itemVariants}>
          <SectionHeader title="Our Services" subtitle="Explore" />
          <div className="flex lg:grid lg:grid-cols-8 gap-3 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 snap-x snap-mandatory scroll-pl-4">
            <CategoryPill onClick={() => router.push('/medicines')} icon="medication" label="Medicines" />
            <CategoryPill onClick={() => router.push('/lab-tests')} icon="biotech" label="Lab Tests" />
            <CategoryPill onClick={() => router.push('/doctors')} icon="stethoscope" label="Doctors" />
            <CategoryPill onClick={() => router.push('/hospitals')} icon="local_hospital" label="Hospitals" />
            <CategoryPill onClick={() => router.push('/ambulance')} icon="ambulance" label="Ambulance" />
            <CategoryPill onClick={() => router.push('/insurance')} icon="security" label="Insurance" />
            <CategoryPill onClick={() => router.push('/surgeries')} icon="medical_services" label="Surgeries" />
            <CategoryPill onClick={() => router.push('/wellness')} icon="self_improvement" label="Wellness" />
          </div>
        </motion.section>

        {/* Emergency Banner */}
        <motion.section variants={itemVariants}>
          <button
            onClick={() => router.push('/ambulance')}
            className="w-full relative group overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-500/30"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
            <div className="absolute -right-10 -bottom-20 size-64 bg-white/10 rounded-full blur-[60px] group-hover:scale-110 transition-transform duration-700"></div>

            <div className="relative z-10 flex items-center justify-between p-6 lg:p-8">
              <div className="flex items-center gap-6">
                <div className="size-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner animate-pulse-slow">
                  <span className="material-symbols-outlined text-4xl">ambulance</span>
                </div>
                <div className="text-left">
                  <h3 className="text-2xl lg:text-3xl font-black leading-none mb-1 font-lexend">Emergency SOS</h3>
                  <p className="text-red-100 font-medium text-sm lg:text-base">24/7 Ambulance & Freezer Box Services</p>
                </div>
              </div>
              <div className="size-14 rounded-full bg-white text-red-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl filled">call</span>
              </div>
            </div>
          </button>
        </motion.section>

        {/* Bento Grid */}
        <motion.section variants={itemVariants}>
          <SectionHeader title="Top Picks" subtitle="Featured" onSeeAll={() => router.push('/services')} />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-[minmax(180px,auto)]">
            <BentoCard
              onClick={() => router.push('/medicines')}
              title="Order<br/>Medicines"
              subtitle="Flat 20% OFF"
              icon="medication"
              bgClass="bg-blue-600"
              span="col-span-1 row-span-2"
              image="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=400"
              delay={0.1}
            />
            <BentoCard
              onClick={() => router.push('/scans')}
              title="Book<br/>Scans"
              subtitle="MRI & CT"
              icon="radiology"
              bgClass="bg-indigo-600"
              image="https://images.unsplash.com/photo-1516549882906-589db74c94f7?auto=format&fit=crop&q=80&w=400"
              delay={0.2}
            />
            <BentoCard
              onClick={() => router.push('/diabetes-care')}
              title="Diabetes<br/>Care"
              subtitle="Plans"
              icon="bloodtype"
              bgClass="bg-orange-600"
              image="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400"
              delay={0.3}
            />
            <BentoCard
              onClick={() => router.push('/services')}
              title="All<br/>Services"
              subtitle="View More"
              icon="grid_view"
              bgClass="bg-slate-800"
              image="https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=400"
              span="col-span-2 lg:col-span-1"
              delay={0.4}
            />
            <BentoCard
              onClick={() => router.push('/doctors')}
              title="Instant<br/>Video Consult"
              subtitle="Connect in 60s"
              icon="videocam"
              bgClass="bg-emerald-600"
              isLarge
              span="col-span-2 lg:col-span-1"
              delay={0.5}
            />
          </div>
        </motion.section>

        {/* Medicines Section */}
        <motion.section variants={itemVariants}>
          <SectionHeader title="Best Sellers" subtitle="Pharmacy" onSeeAll={() => router.push('/medicines')} actionLabel="View All" />
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-8 -mx-4 px-4 lg:mx-0 lg:px-0 snap-x snap-mandatory">
            {loadingMeds
              ? Array(6).fill(0).map((_, i) => <div key={i} className="min-w-[160px] h-[260px] rounded-[1.5rem] bg-surface-100 dark:bg-surface-800 animate-pulse" />)
              : (medicines || []).map((med) => (
                <div key={med.id} className="snap-start shrink-0">
                  <MedicineCard medicine={med} onClick={() => router.push(`/medicines/${med.id}`)} />
                </div>
              ))
            }
          </div>
        </motion.section>

        {/* Doctors Section */}
        <motion.section variants={itemVariants}>
          <SectionHeader title="Top Specialists" subtitle="Doctors" onSeeAll={() => router.push('/doctors')} />
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-8 -mx-4 px-4 lg:mx-0 lg:px-0 snap-x snap-mandatory">
            {loadingDocs
              ? Array(4).fill(0).map((_, i) => <div key={i} className="min-w-[280px] h-[140px] rounded-[1.8rem] bg-surface-100 dark:bg-surface-800 animate-pulse" />)
              : (doctors || []).map((doc) => (
                <div key={doc.id} className="snap-start shrink-0">
                  <DoctorCard doctor={doc} onClick={() => router.push(`/doctors/${doc.id}`)} />
                </div>
              ))
            }
          </div>
        </motion.section>

        {/* Lab Tests Section */}
        <motion.section variants={itemVariants}>
          <SectionHeader title="Popular Packages" subtitle="Lab Tests" onSeeAll={() => router.push('/lab-tests')} />
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-8 -mx-4 px-4 lg:mx-0 lg:px-0 snap-x snap-mandatory">
            {loadingLabs
              ? Array(4).fill(0).map((_, i) => <div key={i} className="min-w-[280px] h-[180px] rounded-[2rem] bg-surface-100 dark:bg-surface-800 animate-pulse" />)
              : (labTests || []).map((test) => (
                <div key={test.id} className="snap-start shrink-0">
                  <LabTestCard test={test} onClick={() => router.push(`/lab-tests/${test.id}`)} />
                </div>
              ))
            }
          </div>
        </motion.section>

        {/* Scans Section */}
        <motion.section variants={itemVariants} className="pb-8">
          <SectionHeader title="Diagnostics & Scans" subtitle="Radiology" onSeeAll={() => router.push('/scans')} />
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-8 -mx-4 px-4 lg:mx-0 lg:px-0 snap-x snap-mandatory">
            {loadingScans
              ? Array(4).fill(0).map((_, i) => <div key={i} className="min-w-[280px] h-[220px] rounded-[2rem] bg-surface-100 dark:bg-surface-800 animate-pulse" />)
              : (scans || []).map((scan) => (
                <div key={scan.id} className="snap-start shrink-0">
                  <ScanCard scan={scan} onClick={() => router.push(`/scans/detail?scanId=${scan.id}`)} />
                </div>
              ))
            }
          </div>
        </motion.section>

      </motion.main>
    </div>
  );
}

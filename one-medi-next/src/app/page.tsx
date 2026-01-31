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
import { PrescriptionPromo } from '@/components/ui/PrescriptionPromo';
import MobileSidebar from '@/components/ui/MobileSidebar';

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

// --- Components ---

const BackgroundBlobs = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
    <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-primary/5 rounded-full blur-[100px] animate-blob"></div>
    <div className="absolute top-[20%] right-[-10%] w-[70%] h-[70%] bg-accent/5 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-[-20%] left-[20%] w-[70%] h-[70%] bg-teal-400/5 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
  </div>
);

const CategoryPill = ({ icon, label, onClick }: any) => (
  <motion.button
    onClick={onClick}
    className="snap-start shrink-0 flex flex-col items-center gap-2 min-w-[76px] lg:min-w-[100px] group"
    whileHover={{ y: -5 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="size-[4.5rem] lg:size-24 rounded-[1.8rem] flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 group-hover:border-primary/30 group-hover:shadow-glow transition-all duration-300">
      <span className="material-symbols-outlined text-3xl lg:text-4xl text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">{icon}</span>
    </div>
    <span className="text-xs lg:text-sm font-bold text-slate-700 dark:text-slate-300 text-center leading-tight group-hover:text-primary transition-colors">{label}</span>
  </motion.button>
);

const BentoCard = ({ title, subtitle, icon, bgClass, onClick, span = "col-span-1", image, delay = 0 }: any) => (
  <motion.div
    onClick={onClick}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className={`${span} ${bgClass} relative rounded-[2rem] p-6 overflow-hidden cursor-pointer shadow-card hover:shadow-card-hover group h-full min-h-[160px]`}
  >
    {image ? (
      <>
        <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 transition-opacity" />
      </>
    ) : (
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
    )}

    <div className="relative z-10 h-full flex flex-col justify-between">
      <div className={`size-12 rounded-2xl ${image ? 'bg-white/20 backdrop-blur-md text-white' : 'bg-white/20 text-white'} flex items-center justify-center mb-3 shadow-inner`}>
        <span className="material-symbols-outlined text-2xl">{icon}</span>
      </div>
      <div>
        <h3 className="text-lg font-black leading-tight mb-1 text-white" dangerouslySetInnerHTML={{ __html: title }}></h3>
        <p className="text-xs font-bold text-white/80">{subtitle}</p>
      </div>
    </div>

    {/* Decor Icon */}
    <div className="absolute -right-4 -top-4 opacity-10 rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500">
      <span className="material-symbols-outlined text-[8rem] text-white">{icon}</span>
    </div>
  </motion.div>
);

const SectionHeader = ({ title, onSeeAll }: { title: string, onSeeAll: () => void }) => (
  <div className="flex items-center justify-between mb-4 px-1">
    <h2 className="text-xl lg:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
      {title}
    </h2>
    <button onClick={onSeeAll} className="text-xs lg:text-sm font-bold text-primary hover:bg-primary/5 px-2 py-1 rounded-lg transition-colors flex items-center gap-0.5">
      See All <span className="material-symbols-outlined text-sm">arrow_forward</span>
    </button>
  </div>
);

// Hero Carousel Component
const HeroSlider = ({ items = [] }: { items?: any[] }) => {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = React.useState(0);

  // Auto-play
  React.useEffect(() => {
    if (!items?.length) return;
    const interval = setInterval(() => {
      setActiveSlide(bs => (bs + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items]);

  const slides = items && items.length > 0 ? items : [
    {
      id: 1,
      title: "Medicines in 2 Hours",
      subtitle: "Flat 20% OFF | Fast Delivery",
      tag: "Pharmacy",
      bg: "bg-teal-900",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: '/medicines'
    }
  ];

  return (
    <div className="relative w-full h-[220px] lg:h-[320px] rounded-[2.5rem] overflow-hidden shadow-2xl group">
      {slides.map((slide, index) => (
        <motion.div
          key={slide.id}
          className="absolute inset-0 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: activeSlide === index ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          onClick={() => slide.link && router.push(slide.link)}
        >
          <img src={slide.image || slide.image_url} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[5000ms] ease-out scale-105 group-hover:scale-110" alt="" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

          <div className="absolute inset-0 p-8 flex flex-col justify-center max-w-lg">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: activeSlide === index ? 0 : 20, opacity: activeSlide === index ? 1 : 0 }}
              transition={{ delay: 0.2 }}
            >
              {slide.tag && (
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-white mb-4 border border-white/20">
                  {slide.tag}
                </span>
              )}
              <h2 className="text-3xl lg:text-5xl font-black text-white leading-tight mb-2">
                {slide.title}
              </h2>
              <p className="text-white/90 font-medium text-sm lg:text-base mb-6">
                {slide.subtitle}
              </p>
              <button className="bg-white text-slate-900 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-colors flex items-center gap-2 w-fit">
                Explore Now <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-6 left-8 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === idx ? 'w-8 bg-white' : 'w-2 bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const { city, address } = useLocationStore();
  const [isLocationModalOpen, setIsLocationModalOpen] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  // Data Hooks
  const { data: heroCarousel } = useHeroCarousel();
  const { data: medicines, loading: loadingMeds } = useMedicines(5);
  const { data: doctors, loading: loadingDocs } = useDoctors(5);
  const { data: labTests, loading: loadingLabs } = useLabTests(5);
  const { data: skinHairServices, loading: loadingSkin } = useSkinHairTreatments();
  const { data: scans, loading: loadingScans } = useMedicalScans(5);

  return (
    <div className="flex flex-col relative isolate min-h-screen pb-24 lg:pb-12 max-w-[100vw] overflow-x-hidden">
      <BackgroundBlobs />
      <LocationModal isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)} />
      <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Mobile Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm rounded-b-[2rem] transition-all duration-300 lg:hidden border-b border-white/20 dark:border-slate-800">
        <div className="bg-gradient-to-r from-primary to-primary-dark text-white text-[10px] font-bold py-1.5 text-center tracking-wider uppercase rounded-t-none">
          ⚡ Kurnool's #1 Healthcare App
        </div>
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="bg-slate-100 dark:bg-slate-800 p-2.5 rounded-xl text-slate-700 dark:text-white active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <div className="flex flex-col" onClick={() => setIsLocationModalOpen(true)}>
              <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white leading-none">ONE MEDI</h1>
              <div className="flex items-center gap-1 mt-0.5 text-slate-500 dark:text-slate-400">
                <span className="material-symbols-outlined text-[12px] text-primary filled">location_on</span>
                <span className="text-[11px] font-bold max-w-[120px] truncate">{address || city || 'Select Location'}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => router.push('/notifications')} className="relative p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-white">
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="absolute top-2.5 right-3 size-2 bg-red-500 rounded-full border border-white dark:border-slate-900"></span>
            </button>
          </div>
        </div>
        <div className="px-4 pb-4">
          <GlobalSearchBar />
        </div>
      </header>

      {/* Main Content */}
      <motion.main
        className="flex-1 lg:max-w-7xl lg:mx-auto w-full px-4 lg:px-0 lg:pt-8 space-y-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Hero Section */}
        <motion.section variants={itemVariants} className="mt-4 lg:mt-0">
          <HeroSlider items={heroCarousel?.items} />
        </motion.section>

        {/* Categories Section */}
        <motion.section variants={itemVariants}>
          <div className="flex justify-between items-end mb-4 px-1">
            <h2 className="text-lg lg:text-xl font-black text-slate-900 dark:text-white">Services</h2>
          </div>
          <div className="flex lg:grid lg:grid-cols-8 gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 snap-x snap-mandatory">
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

        {/* Emergency & Prescriptions */}
        <motion.section variants={itemVariants} className="lg:grid lg:grid-cols-3 lg:gap-6">
          <div className="mb-4 lg:mb-0 lg:col-span-1">
            <button
              onClick={() => router.push('/ambulance')}
              className="w-full h-full bg-gradient-to-br from-red-500 to-rose-600 rounded-[2rem] p-5 shadow-lg shadow-red-500/20 relative overflow-hidden group active:scale-[0.98] transition-transform"
            >
              <div className="absolute -right-4 -bottom-4 bg-white/10 size-32 rounded-full blur-2xl" />
              <div className="relative z-10 flex items-center justify-between h-full">
                <div className="text-left">
                  <div className="size-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-2 animate-pulse">
                    <span className="material-symbols-outlined text-white text-2xl">ambulance</span>
                  </div>
                  <h3 className="text-xl font-black text-white leading-tight">Emergency SOS</h3>
                  <p className="text-red-100 text-xs font-bold mt-0.5">24/7 Ambulance & Freezer</p>
                </div>
                <div className="size-12 bg-white rounded-full flex items-center justify-center text-red-600 shadow-xl group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl filled">call</span>
                </div>
              </div>
            </button>
          </div>

          <div className="lg:col-span-2">
            <PrescriptionPromo className="h-full flex items-center" />
          </div>
        </motion.section>

        {/* Bento Grid */}
        <motion.section variants={itemVariants}>
          <SectionHeader title="Top Selections" onSeeAll={() => router.push('/services')} />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
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
              title="Explore<br/>More"
              subtitle="18+ Services"
              icon="apps"
              bgClass="bg-slate-800"
              span="col-span-1 row-span-2 lg:col-span-1"
              image="https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=400"
              delay={0.4}
            />
            <BentoCard
              onClick={() => router.push('/doctors')}
              title="Doctors"
              subtitle="Instant"
              icon="stethoscope"
              bgClass="bg-purple-600"
              image="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400"
              delay={0.5}
            />
            <BentoCard
              onClick={() => router.push('/wellness')}
              title="Wellness"
              subtitle="Expert Care"
              icon="self_improvement"
              bgClass="bg-rose-600"
              image="https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&q=80&w=400"
              delay={0.6}
            />
          </div>
        </motion.section>

        {/* Medicines Section */}
        <motion.section variants={itemVariants}>
          <SectionHeader title="Best Sellers" onSeeAll={() => router.push('/medicines')} />
          <div className="flex lg:grid lg:grid-cols-6 gap-4 overflow-x-auto no-scrollbar pb-6 -mx-4 px-4 lg:mx-0 lg:px-0 snap-x snap-mandatory">
            {loadingMeds
              ? Array(6).fill(0).map((_, i) => <div key={i} className="min-w-[160px] h-[260px] rounded-[1.5rem] bg-slate-100 dark:bg-slate-800 animate-pulse" />)
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
          <SectionHeader title="Top Specialists" onSeeAll={() => router.push('/doctors')} />
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 -mx-4 px-4 lg:mx-0 lg:px-0 snap-x snap-mandatory">
            {loadingDocs
              ? Array(4).fill(0).map((_, i) => <div key={i} className="min-w-[280px] h-[120px] rounded-[1.8rem] bg-slate-100 dark:bg-slate-800 animate-pulse" />)
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
          <SectionHeader title="Popular Lab Packages" onSeeAll={() => router.push('/lab-tests')} />
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 -mx-4 px-4 lg:mx-0 lg:px-0 snap-x snap-mandatory">
            {loadingLabs
              ? Array(4).fill(0).map((_, i) => <div key={i} className="min-w-[280px] h-[180px] rounded-[2rem] bg-slate-100 dark:bg-slate-800 animate-pulse" />)
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
          <SectionHeader title="Diagnostics & Scans" onSeeAll={() => router.push('/scans')} />
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 -mx-4 px-4 lg:mx-0 lg:px-0 snap-x snap-mandatory">
            {loadingScans
              ? Array(4).fill(0).map((_, i) => <div key={i} className="min-w-[280px] h-[220px] rounded-[2rem] bg-slate-100 dark:bg-slate-800 animate-pulse" />)
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

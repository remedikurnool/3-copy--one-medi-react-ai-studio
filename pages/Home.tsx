
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useHeroCarousel,
  useMedicines,
  useDoctors,
  useLabTests,
  useSkinHairTreatments,
  useMedicalScans
} from '../hooks';
import GlobalSearchBar from '../components/ui/GlobalSearchBar';
import { useLocationStore } from '../store/locationStore';
import LocationModal from '../components/ui/LocationModal';
import { PrescriptionPromo } from '../components/ui/PrescriptionPromo';
import MobileSidebar from '../components/ui/MobileSidebar';

// Cards
import { MedicineCard } from '../components/cards/MedicineCard';
import { LabTestCard } from '../components/cards/LabTestCard';
import { ScanCard } from '../components/cards/ScanCard';
import { DoctorCard } from '../components/cards/DoctorCard';

// --- Components ---

const BackgroundBlobs = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
    <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-blue-400/10 rounded-full blur-[100px] animate-blob"></div>
    <div className="absolute top-[20%] right-[-10%] w-[70%] h-[70%] bg-purple-400/10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-[-20%] left-[20%] w-[70%] h-[70%] bg-teal-400/10 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
  </div>
);

const CategoryPill = ({ icon, label, color, gradient, onClick }: any) => (
  <button onClick={onClick} className="flex flex-col items-center gap-2 min-w-[76px] lg:min-w-[100px] group transition-transform active:scale-95">
    <div className={`size-[4.5rem] lg:size-24 rounded-[1.8rem] flex items-center justify-center shadow-sm border border-white/50 dark:border-white/5 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-float ${gradient}`}>
      <span className={`material-symbols-outlined text-3xl lg:text-4xl drop-shadow-sm group-hover:scale-110 transition-transform ${color}`}>{icon}</span>
    </div>
    <span className="text-xs lg:text-sm font-bold text-slate-700 dark:text-slate-300 text-center leading-tight group-hover:text-primary transition-colors">{label}</span>
  </button>
);

const BentoCard = ({ title, subtitle, icon, bgClass, textClass, iconClass, onClick, span = "col-span-1" }: any) => (
  <div
    onClick={onClick}
    className={`${span} ${bgClass} relative rounded-3xl p-5 overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] group border border-white/20`}
  >
    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500`}>
      <span className={`material-symbols-outlined text-[5rem] ${textClass}`}>{icon}</span>
    </div>

    <div className="relative z-10 h-full flex flex-col justify-between">
      <div className={`size-12 rounded-xl ${iconClass} flex items-center justify-center mb-3 shadow-sm`}>
        <span className="material-symbols-outlined text-2xl">{icon}</span>
      </div>
      <div>
        <h3 className={`text-lg font-bold leading-tight mb-1 ${textClass}`} dangerouslySetInnerHTML={{ __html: title }}></h3>
        <p className={`text-xs font-semibold opacity-70 ${textClass}`}>{subtitle}</p>
      </div>
    </div>
  </div>
);

const SectionHeader = ({ title, onSeeAll }: { title: string, onSeeAll: () => void }) => (
  <div className="flex items-center justify-between mb-4 px-1">
    <h2 className="text-lg lg:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
      {title}
    </h2>
    <button onClick={onSeeAll} className="text-xs lg:text-sm font-bold text-primary hover:bg-primary/5 px-2 py-1 rounded-lg transition-colors flex items-center gap-0.5">
      See All <span className="material-symbols-outlined text-[14px]">chevron_right</span>
    </button>
  </div>
);

const HeroSlider = ({ navigate, carouselData }: { navigate: any, carouselData: any }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = carouselData?.items || [];

  // Create fallback slides if data is missing or empty
  const displaySlides = slides.length > 0 ? slides : [
    {
      id: 1,
      title: "Medicines in 2 Hours",
      subtitle: "Flat 20% OFF | Fast Delivery",
      tag: "Pharmacy",
      bg: "from-teal-900 via-teal-800 to-emerald-900",
      img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link_value: '/medicines'
    }
  ];

  useEffect(() => {
    if (displaySlides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % displaySlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [displaySlides.length]);

  return (
    <div className="relative w-full h-52 lg:h-64 overflow-hidden rounded-[2.5rem] shadow-xl group">
      {displaySlides.map((slide: any, index: number) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          onClick={() => slide.link_value ? navigate(slide.link_value) : null}
        >
          {/* Default gradient if not provided in data */}
          <div className={`absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 z-10`}></div>
          <img src={slide.image_url || slide.img} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 transition-transform duration-[5000ms] ease-out scale-100 group-hover:scale-110" alt="" />

          <div className="absolute inset-0 z-20 p-8 flex flex-col justify-center">
            {slide.tag && (
              <div className="bg-white/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-4">
                {slide.tag}
              </div>
            )}
            <h3 className="text-white text-3xl lg:text-4xl font-black leading-tight mb-2 max-w-xs">{slide.title}</h3>
            <p className={`text-sm lg:text-base font-bold text-white/90 mb-6`}>{slide.subtitle}</p>
            <button className="bg-white text-slate-900 px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest w-fit hover:bg-opacity-90 transition-all flex items-center gap-2">
              Explore Now <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      ))}

      {/* Indicators */}
      {displaySlides.length > 1 && (
        <div className="absolute bottom-4 right-6 z-30 flex gap-2">
          {displaySlides.map((_: any, idx: number) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Home() {
  const navigate = useNavigate();
  const { city, address } = useLocationStore();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Data Hooks
  const { data: heroCarousel } = useHeroCarousel();
  const { data: medicines, loading: loadingMeds } = useMedicines(5);
  const { data: doctors, loading: loadingDocs } = useDoctors(5);
  const { data: labTests, loading: loadingLabs } = useLabTests(5);
  const { data: skinHairServices, loading: loadingSkin } = useSkinHairTreatments();
  const { data: scans, loading: loadingScans } = useMedicalScans(5);

  return (
    <div className="flex flex-col relative isolate min-h-screen pb-24 lg:pb-0 lg:max-w-7xl lg:mx-auto">
      <BackgroundBlobs />
      <LocationModal isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)} />
      <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl shadow-sm rounded-b-[2rem] transition-all duration-300 pb-2 lg:hidden border-b border-white/20 dark:border-gray-800">
        <div className="bg-gradient-to-r from-primary to-secondary text-white text-[10px] font-bold py-1 text-center tracking-wider uppercase rounded-t-none">
          ⚡ Kurnool's #1 Healthcare App
        </div>
        <div className="px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="bg-gray-100 dark:bg-gray-800 p-2.5 rounded-2xl text-slate-700 dark:text-white shadow-sm active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <div className="flex flex-col">
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">ONE MEDI</h1>
              <div
                onClick={() => setIsLocationModalOpen(true)}
                className="flex items-center gap-1 mt-0.5 text-slate-500 dark:text-gray-400 cursor-pointer hover:text-primary transition-colors group"
              >
                <span className="material-symbols-outlined text-[12px] fill-current text-primary">location_on</span>
                <span className="text-[11px] font-bold max-w-[120px] truncate">{address || city}</span>
                <span className="material-symbols-outlined text-[14px]">expand_more</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/notifications')} className="relative p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-slate-600 dark:text-white">
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="absolute top-2.5 right-3 size-2 bg-red-500 rounded-full border border-white dark:border-gray-900"></span>
            </button>
            <button id="cart-icon-target" onClick={() => navigate('/cart')} className="relative p-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-xl">shopping_cart</span>
            </button>
          </div>
        </div>
        <div className="px-5 pb-4">
          <GlobalSearchBar />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 lg:px-0 mt-4 animate-slide-up relative z-10">
        <HeroSlider navigate={navigate} carouselData={heroCarousel} />
      </section>

      {/* Dynamic Categories */}
      <section className="mt-6 px-4 lg:px-0 animate-slide-up relative z-10" style={{ animationDelay: '0.1s' }}>
        <div className="flex justify-between items-end px-1 mb-4">
          <h2 className="text-lg font-black text-slate-900 dark:text-white">Services</h2>
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest">View All</span>
        </div>
        <div className="flex lg:grid lg:grid-cols-8 gap-4 overflow-x-auto no-scrollbar pb-4 pt-2 px-1 lg:pb-0">
          <CategoryPill onClick={() => navigate('/medicines')} icon="medication" label="Medicines" gradient="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-900/10" color="text-blue-600 dark:text-blue-400" />
          <CategoryPill onClick={() => navigate('/lab-tests')} icon="biotech" label="Lab Tests" gradient="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-900/10" color="text-teal-600 dark:text-teal-400" />
          <CategoryPill onClick={() => navigate('/doctors')} icon="stethoscope" label="Doctors" gradient="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-900/10" color="text-purple-600 dark:text-purple-400" />
          <CategoryPill onClick={() => navigate('/hospitals')} icon="local_hospital" label="Hospitals" gradient="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/30 dark:to-emerald-900/10" color="text-emerald-600 dark:text-emerald-400" />
          <CategoryPill onClick={() => navigate('/ambulance')} icon="ambulance" label="Ambulance" gradient="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-900/10" color="text-red-600 dark:text-red-400" />
          <CategoryPill onClick={() => navigate('/insurance')} icon="security" label="Insurance" gradient="bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/30 dark:to-cyan-900/10" color="text-cyan-600 dark:text-cyan-400" />
          <CategoryPill onClick={() => navigate('/surgeries')} icon="medical_services" label="Surgeries" gradient="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/30 dark:to-indigo-900/10" color="text-indigo-600 dark:text-indigo-400" />
          <CategoryPill onClick={() => navigate('/wellness')} icon="self_improvement" label="Wellness" gradient="bg-gradient-to-br from-lime-50 to-lime-100 dark:from-lime-900/30 dark:to-lime-900/10" color="text-lime-600 dark:text-lime-400" />
        </div>
      </section>

      {/* Emergency & Prescriptions Row */}
      <div className="lg:grid lg:grid-cols-3 lg:gap-6 mt-4">
        <section className="px-4 lg:px-0 mb-4 lg:mb-0 lg:col-span-1">
          <button
            onClick={() => navigate('/ambulance')}
            className="w-full bg-gradient-to-r from-red-500 to-rose-600 hover:to-rose-700 text-white rounded-[2rem] p-5 shadow-lg shadow-red-500/30 flex items-center justify-between active:scale-[0.98] transition-all group h-full overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="size-12 bg-white/20 rounded-2xl flex items-center justify-center animate-pulse backdrop-blur-sm">
                <span className="material-symbols-outlined text-3xl">ambulance</span>
              </div>
              <div className="text-left">
                <h3 className="font-black text-xl leading-tight">Emergency SOS</h3>
                <p className="text-xs text-red-100 font-medium tracking-wide">24/7 Ambulance & Freezer</p>
              </div>
            </div>
            <div className="size-10 bg-white text-red-600 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform z-10">
              <span className="material-symbols-outlined filled">call</span>
            </div>
          </button>
        </section>

        <section className="px-4 lg:px-0 mb-8 lg:mb-0 lg:col-span-2 animate-slide-up relative z-10" style={{ animationDelay: '0.05s' }}>
          <PrescriptionPromo className="h-full flex items-center" />
        </section>
      </div>

      {/* Featured Bento Grid */}
      <section className="px-4 lg:px-0 mb-8 lg:mt-8 animate-slide-up relative z-10" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white">Top Selections</h2>
          <button
            onClick={() => navigate('/services')}
            className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all bg-primary/5 px-3 py-1 rounded-full"
          >
            All Services <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
          <BentoCard
            onClick={() => navigate('/medicines')}
            title="Order<br/>Medicines"
            subtitle="Flat 20% OFF"
            icon="medication"
            bgClass="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
            textClass="text-blue-700 dark:text-blue-300"
            iconClass="bg-white dark:bg-blue-800 text-blue-600"
            span="col-span-1 row-span-2"
          />
          <BentoCard
            onClick={() => navigate('/scans')}
            title="Book<br/>Scans"
            subtitle="MRI & CT"
            icon="radiology"
            bgClass="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 h-36 lg:h-full"
            textClass="text-indigo-700 dark:text-indigo-300"
            iconClass="bg-white dark:bg-indigo-800 text-indigo-600"
          />
          <BentoCard
            onClick={() => navigate('/diabetes-care')}
            title="Diabetes<br/>Care"
            subtitle="Plans & Devices"
            icon="bloodtype"
            bgClass="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 h-36 lg:h-full"
            textClass="text-orange-700 dark:text-orange-300"
            iconClass="bg-white dark:bg-orange-800 text-orange-600"
          />
          <BentoCard
            onClick={() => navigate('/services')}
            title="Explore<br/>More"
            subtitle="18+ Services"
            icon="apps"
            bgClass="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-700 dark:to-slate-800"
            textClass="text-white"
            iconClass="bg-white/10 text-white"
            span="col-span-1 row-span-2 lg:col-span-1"
          />
          <BentoCard
            onClick={() => navigate('/doctors')}
            title="Doctors"
            subtitle="Instant Consult"
            icon="stethoscope"
            bgClass="bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-purple-900/20 dark:to-fuchsia-900/20 h-36 lg:h-full"
            textClass="text-purple-700 dark:text-purple-300"
            iconClass="bg-white dark:bg-purple-800 text-purple-600"
          />
          <BentoCard
            onClick={() => navigate('/mother-baby')}
            title="Mother<br/>& Baby"
            subtitle="Expert Care"
            icon="pregnant_woman"
            bgClass="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 h-36 lg:h-full"
            textClass="text-rose-700 dark:text-rose-300"
            iconClass="bg-white dark:bg-rose-800 text-rose-600"
          />
        </div>
      </section>

      {/* 1. Best Sellers (Medicines) */}
      <section className="mb-8 pl-4 lg:px-0 animate-slide-up relative z-10" style={{ animationDelay: '0.3s' }}>
        <SectionHeader title="Best Sellers" onSeeAll={() => navigate('/medicines')} />
        <div className="flex lg:grid lg:grid-cols-5 gap-4 overflow-x-auto no-scrollbar pb-6 pr-4 lg:pr-0 lg:pb-0 snap-x snap-mandatory">
          {loadingMeds ? (
            // Loading Skeletons
            Array(5).fill(0).map((_, i) => (
              <div key={i} className="min-w-[160px] h-[240px] rounded-3xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
            ))
          ) : (
            medicines.map((med) => (
              <div key={med.id} className="snap-start shrink-0">
                <MedicineCard medicine={med} onClick={() => navigate(`/medicines/${med.id}`)} />
              </div>
            ))
          )}
        </div>
      </section>

      {/* 2. Top Doctors */}
      <section className="mb-8 pl-4 lg:px-0 animate-slide-up relative z-10" style={{ animationDelay: '0.4s' }}>
        <SectionHeader title="Top Specialists" onSeeAll={() => navigate('/doctors')} />
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 pr-4 lg:pr-0 lg:pb-0 snap-x snap-mandatory">
          {loadingDocs ? (
            Array(5).fill(0).map((_, i) => (
              <div key={i} className="min-w-[280px] h-[160px] rounded-3xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
            ))
          ) : (
            doctors.map((doc) => (
              <div key={doc.id} className="snap-start shrink-0">
                <DoctorCard doctor={doc} onClick={() => navigate(`/doctors/${doc.id}`)} />
              </div>
            ))
          )}
        </div>
      </section>

      {/* 3. Lab Tests */}
      <section className="mb-8 pl-4 lg:px-0 animate-slide-up relative z-10" style={{ animationDelay: '0.5s' }}>
        <SectionHeader title="Popular Lab Packages" onSeeAll={() => navigate('/lab-tests')} />
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 pr-4 lg:pr-0 lg:pb-0 snap-x snap-mandatory">
          {loadingLabs ? (
            Array(5).fill(0).map((_, i) => (
              <div key={i} className="min-w-[280px] h-[160px] rounded-3xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
            ))
          ) : (
            labTests.map((test) => (
              <div key={test.id} className="snap-start shrink-0">
                <LabTestCard test={test} onClick={() => navigate(`/lab-tests/${test.id}`)} />
              </div>
            ))
          )}
        </div>
      </section>

      {/* 4. Skin & Hair (Custom Card) */}
      <section className="mb-8 pl-4 lg:px-0 animate-slide-up relative z-10" style={{ animationDelay: '0.6s' }}>
        <SectionHeader title="Aesthetic Treatments" onSeeAll={() => navigate('/skin-hair')} />
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 pr-4 lg:pr-0 lg:pb-0 snap-x snap-mandatory">
          {loadingSkin ? (
            Array(5).fill(0).map((_, i) => (
              <div key={i} className="min-w-[220px] h-[280px] rounded-[2rem] bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
            ))
          ) : (
            skinHairServices.map((srv) => (
              <div key={srv.id} onClick={() => navigate('/skin-hair')} className="snap-start shrink-0 relative min-w-[220px] h-[280px] rounded-[2rem] overflow-hidden group cursor-pointer shadow-md">
                {/* Fallback image since service master doesn't generally have images, or we use a placeholder */}
                <img src="https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=400" alt={srv.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-5 w-full">
                  <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-1">{srv.category}</p>
                  <h3 className="text-white text-lg font-black leading-tight mb-2">{srv.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold text-sm">View</span>
                    <span className="size-8 rounded-full bg-white text-slate-900 flex items-center justify-center transition-transform group-hover:scale-110">
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 5. Scans */}
      <section className="mb-24 pl-4 lg:px-0 animate-slide-up relative z-10" style={{ animationDelay: '0.7s' }}>
        <SectionHeader title="Diagnostics & Scans" onSeeAll={() => navigate('/scans')} />
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 pr-4 lg:pr-0 lg:pb-0 snap-x snap-mandatory">
          {loadingScans ? (
            Array(5).fill(0).map((_, i) => (
              <div key={i} className="min-w-[280px] h-[160px] rounded-3xl bg-gray-100 dark:bg-gray-800 animate-pulse"></div>
            ))
          ) : (
            scans.map((scan) => (
              <div key={scan.id} className="snap-start shrink-0">
                <ScanCard scan={scan} onClick={() => navigate('/scans/detail', { state: { scanId: scan.id } })} />
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

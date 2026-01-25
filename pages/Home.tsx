
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MEDICINES, DOCTORS, LAB_TESTS, MEDICAL_SCANS, SKIN_HAIR_SERVICES, HOME_CARE_SERVICES } from '../constants';
import AdvancedSearch from '../components/ui/AdvancedSearch';
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

const CategoryPill = ({ icon, label, color, onClick }: any) => (
  <button onClick={onClick} className="flex flex-col items-center gap-2 min-w-[72px] lg:min-w-[100px] group transition-transform active:scale-95">
    <div className={`size-[4.5rem] lg:size-24 rounded-2xl flex items-center justify-center shadow-glass border border-white/50 backdrop-blur-sm transition-all group-hover:-translate-y-1 ${color}`}>
      <span className="material-symbols-outlined text-3xl lg:text-4xl drop-shadow-sm">{icon}</span>
    </div>
    <span className="text-xs lg:text-sm font-bold text-slate-700 dark:text-slate-300 text-center">{label}</span>
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
        <h3 className={`text-lg font-bold leading-tight mb-1 ${textClass}`} dangerouslySetInnerHTML={{__html: title}}></h3>
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

export default function Home() {
  const navigate = useNavigate();
  const { city, address } = useLocationStore();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col relative isolate min-h-screen pb-24 lg:pb-0 lg:max-w-7xl lg:mx-auto">
      <BackgroundBlobs />
      <LocationModal isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)} />
      <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <header className="sticky top-0 z-40 bg-primary dark:bg-gray-900 shadow-xl rounded-b-[2rem] transition-all duration-300 pb-2 lg:hidden">
        <div className="bg-black/10 text-white/90 text-[10px] font-bold py-1.5 text-center tracking-wider uppercase rounded-t-none">
          ⚡ Flash Sale: 20% OFF Medicines
        </div>
        <div className="px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="bg-white/10 p-2.5 rounded-2xl text-white shadow-sm active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <div className="flex flex-col">
              <h1 className="text-xl font-extrabold tracking-tight text-white leading-none">ONE MEDI</h1>
              <div 
                onClick={() => setIsLocationModalOpen(true)}
                className="flex items-center gap-1 mt-1 text-white/90 cursor-pointer hover:text-white transition-colors group"
              >
                <span className="material-symbols-outlined text-[14px] fill-current">location_on</span>
                <span className="text-xs font-semibold max-w-[120px] truncate border-b border-dashed border-white/40 pb-0.5 group-hover:border-white">{address || city}</span>
                <span className="material-symbols-outlined text-[14px]">expand_more</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
             <button onClick={() => navigate('/notifications')} className="relative p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white">
                <span className="material-symbols-outlined text-xl">notifications</span>
                <span className="absolute top-2.5 right-3 size-2 bg-red-500 rounded-full border border-primary"></span>
             </button>
             <button id="cart-icon-target" onClick={() => navigate('/cart')} className="relative p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white">
                <span className="material-symbols-outlined text-xl">shopping_cart</span>
             </button>
          </div>
        </div>
        <div className="px-5 pb-5">
          <AdvancedSearch />
        </div>
      </header>

      <section className="mt-6 px-4 lg:px-0 animate-slide-up relative z-10 lg:mt-10">
        <div className="flex lg:grid lg:grid-cols-8 gap-4 overflow-x-auto no-scrollbar pb-4 pt-2 px-1 lg:pb-0">
           <CategoryPill onClick={() => navigate('/medicines')} icon="medication" label="Medicines" color="bg-blue-50/80 text-blue-600 border-blue-100" />
           <CategoryPill onClick={() => navigate('/lab-tests')} icon="biotech" label="Lab Tests" color="bg-teal-50/80 text-teal-600 border-teal-100" />
           <CategoryPill onClick={() => navigate('/doctors')} icon="stethoscope" label="Doctors" color="bg-purple-50/80 text-purple-600 border-purple-100" />
           <CategoryPill onClick={() => navigate('/hospitals')} icon="local_hospital" label="Hospitals" color="bg-emerald-50/80 text-emerald-600 border-emerald-100" />
           <CategoryPill onClick={() => navigate('/ambulance')} icon="ambulance" label="Ambulance" color="bg-red-50/80 text-red-600 border-red-100" />
           <CategoryPill onClick={() => navigate('/blood-banks')} icon="bloodtype" label="Blood Bank" color="bg-red-50/80 text-red-700 border-red-100" />
           <CategoryPill onClick={() => navigate('/insurance')} icon="security" label="Insurance" color="bg-cyan-50/80 text-cyan-600 border-cyan-100" />
           <CategoryPill onClick={() => navigate('/surgeries')} icon="medical_services" label="Surgeries" color="bg-slate-100 text-slate-600 border-slate-200" />
           <CategoryPill onClick={() => navigate('/wellness')} icon="self_improvement" label="Wellness" color="bg-lime-50/80 text-lime-600 border-lime-100" />
           <CategoryPill onClick={() => navigate('/skin-hair')} icon="face" label="Skin & Hair" color="bg-amber-50/80 text-amber-600 border-amber-100" />
           <CategoryPill onClick={() => navigate('/mother-baby')} icon="pregnant_woman" label="Mother & Baby" color="bg-rose-50/80 text-rose-600 border-rose-100" />
           <CategoryPill onClick={() => navigate('/home-care')} icon="home_health" label="Home Care" color="bg-pink-50/80 text-pink-600 border-pink-100" />
        </div>
      </section>

      <div className="lg:grid lg:grid-cols-3 lg:gap-6 lg:mt-8">
        <section className="px-4 lg:px-0 mb-6 lg:mb-0 lg:col-span-1">
            <button 
            onClick={() => navigate('/ambulance')}
            className="w-full bg-red-500 hover:bg-red-600 text-white rounded-2xl p-4 lg:p-6 shadow-lg shadow-red-500/30 flex items-center justify-between active:scale-[0.98] transition-all group h-full"
            >
            <div className="flex items-center gap-3">
                <div className="size-10 lg:size-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                <span className="material-symbols-outlined text-2xl lg:text-3xl">ambulance</span>
                </div>
                <div className="text-left">
                <h3 className="font-bold text-lg lg:text-xl leading-tight">Emergency SOS</h3>
                <p className="text-xs lg:text-sm text-red-100 opacity-90">Book Ambulance in Kurnool</p>
                </div>
            </div>
            <div className="size-8 lg:size-10 bg-white text-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">call</span>
            </div>
            </button>
        </section>

        <section className="px-4 lg:px-0 mb-8 lg:mb-0 lg:col-span-2 animate-slide-up relative z-10" style={{animationDelay: '0.05s'}}>
            <PrescriptionPromo className="h-full flex items-center" />
        </section>
      </div>

      <section className="px-4 lg:px-0 mb-8 lg:mt-8 animate-slide-up relative z-10" style={{animationDelay: '0.1s'}}>
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white">Top Services</h2>
          <button 
            onClick={() => navigate('/services')} 
            className="text-sm font-black text-primary uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all"
          >
            All Services <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
           {/* Column 1: Medicines (Tall) */}
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
           
           {/* Column 2: Scans */}
           <BentoCard 
             onClick={() => navigate('/scans')}
             title="Book<br/>Scans"
             subtitle="MRI & CT"
             icon="radiology"
             bgClass="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 h-32 lg:h-full"
             textClass="text-indigo-700 dark:text-indigo-300"
             iconClass="bg-white dark:bg-indigo-800 text-indigo-600"
           />

           {/* Column 3: Diabetes */}
           <BentoCard 
             onClick={() => navigate('/diabetes-care')}
             title="Diabetes<br/>Care"
             subtitle="Specialized Plans"
             icon="bloodtype"
             bgClass="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 h-32 lg:h-full"
             textClass="text-orange-700 dark:text-orange-300"
             iconClass="bg-white dark:bg-orange-800 text-orange-600"
           />

           {/* Column 4: Explore (Tall) */}
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

           {/* Column 2 Row 2: Doctors */}
           <BentoCard 
             onClick={() => navigate('/doctors')}
             title="Doctors"
             subtitle="Instant Consult"
             icon="stethoscope"
             bgClass="bg-gradient-to-br from-purple-50 to-fuchsia-50 dark:from-purple-900/20 dark:to-fuchsia-900/20 h-32 lg:h-full"
             textClass="text-purple-700 dark:text-purple-300"
             iconClass="bg-white dark:bg-purple-800 text-purple-600"
           />

           {/* Column 3 Row 2: Mother & Baby */}
           <BentoCard 
             onClick={() => navigate('/mother-baby')}
             title="Mother<br/>& Baby"
             subtitle="Expert Care"
             icon="pregnant_woman"
             bgClass="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 h-32 lg:h-full"
             textClass="text-rose-700 dark:text-rose-300"
             iconClass="bg-white dark:bg-rose-800 text-rose-600"
           />
        </div>
      </section>

      {/* Snap Scroll Promo Banners */}
      <section className="px-4 lg:px-0 mb-8 animate-slide-up relative z-10" style={{animationDelay: '0.2s'}}>
        <div className="flex lg:grid lg:grid-cols-2 overflow-x-auto lg:overflow-visible snap-x snap-mandatory gap-4 no-scrollbar pb-4 lg:pb-0">
           <div className="snap-center shrink-0 w-[90%] sm:w-[60%] lg:w-full h-48 lg:h-56 rounded-3xl overflow-hidden relative shadow-lg group cursor-pointer active:scale-[0.98] transition-transform" onClick={() => navigate('/mother-baby')}>
              <div className="absolute inset-0 bg-gradient-to-r from-rose-900 via-rose-800/80 to-transparent z-10 flex flex-col justify-center p-6 pl-8">
                 <span className="bg-secondary text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-lg w-fit mb-3 tracking-wider shadow-sm">Premium Care</span>
                 <h3 className="text-white text-2xl lg:text-3xl font-extrabold leading-tight mb-2 drop-shadow-md">9-Month Journey<br/><span className="text-rose-200">Start @ ₹15,999</span></h3>
                 <button className="bg-white text-rose-800 px-5 py-2 rounded-xl text-xs font-bold w-fit shadow-lg hover:bg-gray-50 transition-colors">Book Now</button>
              </div>
              <div className="absolute right-0 top-0 h-full w-2/3 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1544126592-807daa215a75?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")'}}></div>
           </div>
           
           <div className="snap-center shrink-0 w-[90%] sm:w-[60%] lg:w-full h-48 lg:h-56 rounded-3xl overflow-hidden relative shadow-lg group cursor-pointer active:scale-[0.98] transition-transform" onClick={() => navigate('/medicines')}>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-900 via-teal-800/80 to-transparent z-10 flex flex-col justify-center p-6 pl-8">
                 <span className="bg-white/20 backdrop-blur-md text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-lg w-fit mb-3 tracking-wider border border-white/20">Fast Delivery</span>
                 <h3 className="text-white text-2xl lg:text-3xl font-extrabold leading-tight mb-2 drop-shadow-md">Medicines in<br/><span className="text-teal-200">2 Hours</span></h3>
                 <button className="bg-white text-teal-800 px-5 py-2 rounded-xl text-xs font-bold w-fit shadow-lg mt-4 hover:bg-gray-50 transition-colors">Order Now</button>
              </div>
              <div className="absolute right-0 top-0 h-full w-2/3 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80")'}}></div>
           </div>
        </div>
      </section>

      {/* 1. Best Sellers (Medicines) */}
      <section className="mb-8 pl-4 lg:px-0 animate-slide-up relative z-10" style={{animationDelay: '0.3s'}}>
         <SectionHeader title="Best Sellers" onSeeAll={() => navigate('/medicines')} />
         <div className="flex lg:grid lg:grid-cols-5 gap-4 overflow-x-auto no-scrollbar pb-6 pr-4 lg:pr-0 lg:pb-0 snap-x snap-mandatory">
            {MEDICINES.slice(0,5).map((med) => (
              <div key={med.id} className="snap-start shrink-0">
                <MedicineCard medicine={med} onClick={() => navigate(`/medicines/${med.id}`)} />
              </div>
            ))}
         </div>
      </section>

      {/* 2. Top Doctors */}
      <section className="mb-8 pl-4 lg:px-0 animate-slide-up relative z-10" style={{animationDelay: '0.4s'}}>
         <SectionHeader title="Top Specialists" onSeeAll={() => navigate('/doctors')} />
         <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 pr-4 lg:pr-0 lg:pb-0 snap-x snap-mandatory">
            {DOCTORS.map((doc) => (
              <div key={doc.id} className="snap-start shrink-0">
                <DoctorCard doctor={doc} onClick={() => navigate(`/doctors/${doc.id}`)} />
              </div>
            ))}
         </div>
      </section>

      {/* 3. Lab Tests */}
      <section className="mb-8 pl-4 lg:px-0 animate-slide-up relative z-10" style={{animationDelay: '0.5s'}}>
         <SectionHeader title="Popular Lab Packages" onSeeAll={() => navigate('/lab-tests')} />
         <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 pr-4 lg:pr-0 lg:pb-0 snap-x snap-mandatory">
            {LAB_TESTS.map((test) => (
              <div key={test.id} className="snap-start shrink-0">
                <LabTestCard test={test} onClick={() => navigate(`/lab-tests/${test.id}`)} />
              </div>
            ))}
         </div>
      </section>

      {/* 4. Skin & Hair (Custom Card) */}
      <section className="mb-8 pl-4 lg:px-0 animate-slide-up relative z-10" style={{animationDelay: '0.6s'}}>
         <SectionHeader title="Aesthetic Treatments" onSeeAll={() => navigate('/skin-hair')} />
         <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 pr-4 lg:pr-0 lg:pb-0 snap-x snap-mandatory">
            {SKIN_HAIR_SERVICES.map((srv) => (
              <div key={srv.id} onClick={() => navigate('/skin-hair')} className="snap-start shrink-0 relative min-w-[220px] h-[280px] rounded-[2rem] overflow-hidden group cursor-pointer shadow-md">
                 <img src={srv.image} alt={srv.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                 <div className="absolute bottom-0 left-0 p-5 w-full">
                    <p className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-1">{srv.concern}</p>
                    <h3 className="text-white text-lg font-black leading-tight mb-2">{srv.name}</h3>
                    <div className="flex justify-between items-center">
                       <span className="text-white font-bold">₹{srv.price}</span>
                       <span className="size-8 rounded-full bg-white text-slate-900 flex items-center justify-center transition-transform group-hover:scale-110">
                          <span className="material-symbols-outlined text-sm">arrow_forward</span>
                       </span>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </section>

      {/* 5. Scans */}
      <section className="mb-8 pl-4 lg:px-0 animate-slide-up relative z-10" style={{animationDelay: '0.7s'}}>
         <SectionHeader title="Diagnostics & Scans" onSeeAll={() => navigate('/scans')} />
         <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 pr-4 lg:pr-0 lg:pb-0 snap-x snap-mandatory">
            {MEDICAL_SCANS.map((scan) => (
              <div key={scan.id} className="snap-start shrink-0">
                <ScanCard scan={scan} onClick={() => navigate('/scans/detail', { state: { scanId: scan.id } })} />
              </div>
            ))}
         </div>
      </section>

      {/* 6. Home Care (Custom Card) */}
      <section className="mb-24 pl-4 lg:px-0 animate-slide-up relative z-10" style={{animationDelay: '0.8s'}}>
         <SectionHeader title="Home Healthcare" onSeeAll={() => navigate('/home-care')} />
         <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 pr-4 lg:pr-0 lg:pb-0 snap-x snap-mandatory">
            {HOME_CARE_SERVICES.slice(0, 5).map((srv) => (
              <div key={srv.id} onClick={() => navigate(`/home-care/${srv.id}`)} className="snap-start shrink-0 min-w-[260px] bg-white dark:bg-slate-900 rounded-[2rem] p-4 shadow-sm border border-slate-100 dark:border-slate-800 cursor-pointer active:scale-95 transition-transform hover:shadow-float">
                 <div className="h-32 w-full rounded-2xl bg-gray-100 overflow-hidden mb-3 relative">
                    <img src={srv.image} className="w-full h-full object-cover" alt="" />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded-lg text-[10px] font-bold">
                       ⭐ {srv.rating}
                    </div>
                 </div>
                 <h3 className="font-bold text-slate-900 dark:text-white text-base truncate">{srv.title}</h3>
                 <p className="text-xs text-slate-500 mb-3 line-clamp-1">{srv.description}</p>
                 <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-primary">₹{srv.price}<span className="text-[10px] text-gray-400 font-normal">/{srv.priceUnit}</span></span>
                    <button className="text-[10px] font-black bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-3 py-1.5 rounded-lg uppercase tracking-wide">Book</button>
                 </div>
              </div>
            ))}
         </div>
      </section>
    </div>
  );
}

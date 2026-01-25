
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MEDICINES, DOCTORS, LAB_TESTS, MEDICAL_SCANS } from '../constants';
import AdvancedSearch from '../components/ui/AdvancedSearch';
import { useLocationStore } from '../store/locationStore';
import { useUserStore } from '../store/userStore';
import LocationModal from '../components/ui/LocationModal';
import { PrescriptionPromo } from '../components/ui/PrescriptionPromo';
import MobileSidebar from '../components/ui/MobileSidebar';

import { MedicineCard } from '../components/cards/MedicineCard';
import { LabTestCard } from '../components/cards/LabTestCard';
import { DoctorCard } from '../components/cards/DoctorCard';

const BackgroundBlobs = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
    <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-primary/5 rounded-full blur-[100px] animate-blob"></div>
    <div className="absolute top-[20%] right-[-10%] w-[70%] h-[70%] bg-teal-500/5 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
  </div>
);

const CategoryPill = ({ icon, label, color, onClick }: any) => (
  <button onClick={onClick} className="flex flex-col items-center gap-2 min-w-[72px] lg:min-w-[100px] group transition-transform active:scale-95">
    <div className={`size-[4.5rem] lg:size-24 rounded-2xl flex items-center justify-center shadow-glass border border-white/50 backdrop-blur-sm transition-all group-hover:-translate-y-1 ${color}`}>
      <span className="material-symbols-outlined text-3xl lg:text-4xl drop-shadow-sm">{icon}</span>
    </div>
    <span className="text-xs lg:text-sm font-bold text-slate-700 dark:text-slate-300 text-center leading-tight">{label}</span>
  </button>
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
  const { language, setLanguage, profile } = useUserStore();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [orderCount, setOrderCount] = useState(524);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrderCount(prev => prev + Math.floor(Math.random() * 2));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const t = (en: string, te: string) => language === 'te' ? te : en;

  return (
    <div className="flex flex-col relative isolate min-h-screen pb-24 lg:pb-0 lg:max-w-7xl lg:mx-auto font-sans">
      <BackgroundBlobs />
      <LocationModal isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)} />
      <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <header className="sticky top-0 z-40 bg-primary dark:bg-gray-900 shadow-xl rounded-b-[2rem] transition-all duration-300 pb-2 lg:hidden">
        <div className="bg-black/10 text-white/90 text-[10px] font-black py-1.5 text-center tracking-wider uppercase rounded-t-none flex items-center justify-center gap-2">
          <span className="size-1.5 bg-red-500 rounded-full animate-pulse"></span>
          {orderCount}+ {t('Orders delivered in Kurnool today', 'ఈరోజు కర్నూలులో 500+ ఆర్డర్లు డెలివరీ చేయబడ్డాయి')}
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
              <h1 className="text-xl font-extrabold tracking-tight text-white leading-none uppercase tracking-tighter italic">One Medi <span className="not-italic text-teal-200">+</span></h1>
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
             <button 
                onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
                className="bg-white/10 px-3 py-1.5 rounded-xl text-white text-[10px] font-black uppercase border border-white/20 active:scale-95 transition-all"
             >
                {language === 'en' ? 'తెలుగు' : 'English'}
             </button>
             <button id="cart-icon-target" onClick={() => navigate('/cart')} className="relative p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white">
                <span className="material-symbols-outlined text-xl">shopping_cart</span>
                {profile.name !== 'Guest User' && <span className="absolute top-2 right-2 size-2 bg-red-50 rounded-full border border-primary"></span>}
             </button>
          </div>
        </div>
        <div className="px-5 pb-5">
          <AdvancedSearch />
        </div>
      </header>

      <section className="mt-4 px-4 lg:hidden">
          <div className="bg-gradient-to-r from-teal-600/10 to-blue-600/10 border border-teal-500/20 rounded-2xl p-4 flex items-center justify-between">
              <div>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{t("Kurnool's Own Healthcare App", "కర్నూలు సొంత హెల్త్‌కేర్ యాప్")}</h2>
                  <p className="text-[10px] font-bold text-slate-500 dark:text-gray-400 mt-1 uppercase tracking-widest">{t("Trusted by 10,000+ local families", "10,000+ స్థానిక కుటుంబాల నమ్మకం")}</p>
              </div>
              <div className="size-12 bg-white dark:bg-slate-800 rounded-xl shadow-sm flex items-center justify-center border border-teal-100">
                  <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
              </div>
          </div>
      </section>

      <section className="mt-6 px-4 lg:px-0 animate-slide-up relative z-10 lg:mt-10">
        <div className="flex lg:grid lg:grid-cols-8 gap-4 overflow-x-auto no-scrollbar pb-4 pt-2 px-1 lg:pb-0">
           <CategoryPill onClick={() => navigate('/medicines')} icon="medication" label={t("Medicines", "మందులు")} color="bg-blue-50/80 text-blue-600 border-blue-100" />
           <CategoryPill onClick={() => navigate('/lab-tests')} icon="biotech" label={t("Lab Tests", "ల్యాబ్ టెస్టులు")} color="bg-teal-50/80 text-teal-600 border-teal-100" />
           <CategoryPill onClick={() => navigate('/doctors')} icon="stethoscope" label={t("Doctors", "డాక్టర్లు")} color="bg-purple-50/80 text-purple-600 border-purple-100" />
           <CategoryPill onClick={() => navigate('/surgeries')} icon="medical_services" label={t("Surgeries", "సర్జరీలు")} color="bg-slate-50/80 text-slate-600 border-slate-100" />
           <CategoryPill onClick={() => navigate('/ambulance')} icon="ambulance" label={t("Ambulance", "అంబులెన్స్")} color="bg-red-50/80 text-red-600 border-red-100" />
           <CategoryPill onClick={() => navigate('/hospitals')} icon="local_hospital" label={t("Hospitals", "హాస్పిటల్స్")} color="bg-emerald-50/80 text-emerald-600 border-emerald-100" />
           <CategoryPill onClick={() => navigate('/mother-baby')} icon="pregnant_woman" label={t("Mother & Baby", "తల్లి & బిడ్డ")} color="bg-rose-50/80 text-rose-600 border-rose-100" />
           <CategoryPill onClick={() => navigate('/services')} icon="apps" label={t("More", "మరిన్ని")} color="bg-gray-50/80 text-gray-600 border-gray-100" />
        </div>
      </section>

      {!profile.isPlusMember && (
          <section className="mt-6 px-4">
              <div 
                onClick={() => navigate('/wellness')} 
                className="bg-slate-900 rounded-3xl p-5 text-white flex items-center justify-between border border-white/10 shadow-lg relative overflow-hidden group cursor-pointer"
              >
                  <div className="absolute top-0 right-0 size-32 bg-primary/20 blur-3xl -mr-10 -mt-10 group-hover:bg-primary/40 transition-colors"></div>
                  <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-primary px-2 py-0.5 rounded-lg text-[9px] font-black tracking-widest uppercase">Member Exclusive</span>
                      </div>
                      <h3 className="text-xl font-black italic tracking-tighter">ONE MEDI PLUS <span className="text-primary">+</span></h3>
                      <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{t("Free Delivery • Extra 5% Off • Priority SOS", "ఉచిత డెలివరీ • అదనపు 5% తగ్గింపు • ప్రాధాన్యత SOS")}</p>
                  </div>
                  <button className="relative z-10 bg-white text-slate-900 px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest active:scale-95 transition-all">
                      {t("Join @ ₹199", "చేరండి @ ₹199")}
                  </button>
              </div>
          </section>
      )}

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
                <h3 className="font-bold text-lg lg:text-xl leading-tight">{t("Emergency SOS", "అత్యవసర SOS")}</h3>
                <p className="text-xs lg:text-sm text-red-100 opacity-90">{t("Book Ambulance in Kurnool", "కర్నూలులో అంబులెన్స్ బుక్ చేయండి")}</p>
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

      <section className="px-4 mt-8">
          <SectionHeader title={t("Special Bundles", "ప్రత్యేక బండిల్స్")} onSeeAll={() => navigate('/lab-tests')} />
          <div className="bg-white dark:bg-slate-900 border border-teal-100 dark:border-slate-800 rounded-3xl p-5 flex items-center justify-between shadow-sm">
              <div className="flex gap-4 items-center">
                  <div className="size-16 bg-teal-50 dark:bg-teal-900/20 rounded-2xl flex items-center justify-center text-teal-600 shadow-inner border border-teal-50">
                      <span className="material-symbols-outlined text-4xl">health_metrics</span>
                  </div>
                  <div>
                      <h4 className="font-black text-lg leading-tight">{t("Total Health Shield", "టోటల్ హెల్త్ షీల్డ్")}</h4>
                      <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{t("Checkup + Free Doctor Consultation", "చెక్అప్ + ఉచిత డాక్టర్ సంప్రదింపులు")}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xl font-black text-primary">₹1,299</span>
                        <span className="text-xs text-slate-400 line-through">₹2,499</span>
                      </div>
                  </div>
              </div>
              <button className="bg-primary text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest active:scale-95 transition-all">{t('Book', 'బుక్')}</button>
          </div>
      </section>

      <section className="mt-10 mb-8 pl-4 lg:px-0 animate-slide-up relative z-10" style={{animationDelay: '0.3s'}}>
         <SectionHeader title={t("Popular Medicines", "ప్రముఖ మందులు")} onSeeAll={() => navigate('/medicines')} />
         <div className="flex lg:grid lg:grid-cols-5 gap-4 overflow-x-auto no-scrollbar pb-6 pr-4 lg:pr-0 lg:pb-0 snap-x snap-mandatory">
            {MEDICINES.slice(0,5).map((med) => (
              <div key={med.id} className="snap-start shrink-0">
                <MedicineCard medicine={med} onClick={() => navigate(`/medicines/${med.id}`)} />
              </div>
            ))}
         </div>
      </section>

      <div className="bg-amber-50 dark:bg-amber-900/20 py-3 px-4 mb-8 overflow-hidden whitespace-nowrap">
          <div className="animate-marquee inline-block">
              <span className="text-[11px] font-black uppercase text-amber-700 dark:text-amber-400 tracking-[0.2em] mx-8">
                🔥 {t("20% Off on Diabetic Medicines for Senior Citizens", "సీనియర్ సిటిజన్లకు మధుమేహ మందులపై 20% తగ్గింపు")}
              </span>
              <span className="text-[11px] font-black uppercase text-amber-700 dark:text-amber-400 tracking-[0.2em] mx-8">
                🚀 {t("Same Day Delivery to C-Camp & N.R. Peta", "సి-క్యాంప్ మరియు ఎన్.ఆర్. పేటకు అదే రోజు డెలివరీ")}
              </span>
          </div>
      </div>
    </div>
  );
}

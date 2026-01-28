
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useScan, useScanPricing } from '../../hooks/useScans';
import { useCartStore } from '../../store/cartStore';

// Mock Gallery Data
const SCAN_GALLERY = [
  { id: 1, title: 'Advanced MRI Unit', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 2, title: 'Sample Scan Output', image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  { id: 3, title: 'Comfort Patient Lounge', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
];

// Loading skeleton
const ScanDetailSkeleton = () => (
  <div className="min-h-screen bg-bg-light dark:bg-bg-dark pb-32 animate-pulse">
    <header className="flex items-center justify-between bg-white dark:bg-gray-900 px-4 py-3 h-16">
      <div className="size-10 rounded-2xl bg-gray-200 dark:bg-gray-700"></div>
      <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </header>
    <div className="p-4">
      <div className="h-40 rounded-[2.5rem] bg-gray-200 dark:bg-gray-700 mb-6"></div>
      <div className="flex gap-4 overflow-x-auto mb-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="min-w-[280px] h-44 rounded-[2rem] bg-gray-200 dark:bg-gray-700"></div>
        ))}
      </div>
      <div className="h-32 rounded-[2.5rem] bg-gray-200 dark:bg-gray-700 mb-6"></div>
      <div className="h-48 rounded-[2.5rem] bg-gray-200 dark:bg-gray-700"></div>
    </div>
  </div>
);

export default function ScanDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const state = location.state as { scanId?: string } | null;
  const scanId = id || state?.scanId;

  // Fetch scan from Supabase
  const { data: scan, loading, error } = useScan(scanId);
  const { data: pricing } = useScanPricing(scanId);

  const [selectedPricing, setSelectedPricing] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState('10:30 AM');
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    if (pricing && pricing.length > 0) {
      setSelectedPricing(pricing[0]);
    }
  }, [pricing]);

  const slots = ['10:30 AM', '11:00 AM', '02:15 PM', '04:30 PM'];

  // Show loading state
  if (loading) {
    return <ScanDetailSkeleton />;
  }

  // Show error or not found
  if (error || !scan) {
    return (
      <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex flex-col items-center justify-center p-8">
        <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">mri</span>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Scan not found</h2>
        <p className="text-gray-500 text-sm mb-6">The scan you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/scans')}
          className="bg-primary text-white px-6 py-3 rounded-xl font-bold"
        >
          Browse Scans
        </button>
      </div>
    );
  }

  const currentPrice = selectedPricing?.selling_price || scan.base_price || 2000;
  const currentMrp = selectedPricing?.mrp || currentPrice * 1.2;
  const discountPercent = currentMrp > 0 ? Math.round(((currentMrp - currentPrice) / currentMrp) * 100) : 0;

  const handleBook = () => {
    addToCart({
      id: scan.id,
      type: 'scan',
      name: `${scan.name} (${selectedPricing?.vendor_locations?.name || 'Center'})`,
      price: currentPrice,
      mrp: currentMrp,
      qty: 1,
      discount: discountPercent > 0 ? `${discountPercent}% OFF` : ''
    });
    navigate('/scans/booking');
  };

  return (
    <div className="bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white min-h-screen flex flex-col relative overflow-x-hidden font-sans pb-32">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl shadow-glass transition-colors duration-300 border-b border-white/20 dark:border-gray-800">
        <div className="flex items-center px-4 py-3 justify-between h-16">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center size-10 rounded-2xl bg-white dark:bg-gray-800 text-slate-900 dark:text-white shadow-soft hover:scale-110 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-xl font-black uppercase tracking-tight flex-1 text-center pr-10">Scan Details</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-6 px-4 pt-5">
        {/* Scan Info Card */}
        <section className="bg-white dark:bg-slate-900/60 rounded-[2.5rem] p-6 shadow-glass border border-white/40 dark:border-slate-800/50">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-black leading-tight text-slate-900 dark:text-white">{scan.name}</h2>
            <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-primary/20">
              {scan.modality || 'Scan'}
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-bold leading-relaxed mt-2 uppercase tracking-wide">
            {scan.description || `${scan.name} for diagnostic imaging`}
          </p>
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
              <span className="material-symbols-outlined text-slate-400 text-lg">timer</span>
              <span className="text-xs font-bold">{scan.scan_duration || '30 mins'}</span>
            </div>
            {scan.contrast_required && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900/30">
                <span className="material-symbols-outlined text-orange-500 text-lg">contrast</span>
                <span className="text-xs font-bold text-orange-600 dark:text-orange-400">Contrast Required</span>
              </div>
            )}
          </div>
        </section>

        {/* FACILITY IMAGES GALLERY SECTION */}
        <section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-1">Facility & Technology</h3>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory">
            {SCAN_GALLERY.map((item) => (
              <div
                key={item.id}
                className="relative min-w-[280px] h-44 rounded-[2rem] overflow-hidden snap-center shadow-float group"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* 3D Glassmorphic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 backdrop-blur-md bg-white/10 border border-white/20 p-3 rounded-2xl flex items-center justify-between">
                  <span className="text-xs font-black text-white uppercase tracking-wider">{item.title}</span>
                  <button className="size-8 rounded-full bg-white/20 flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-sm">visibility</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Preparation Guide */}
        <section className="bg-white dark:bg-slate-900/60 rounded-[2.5rem] p-6 shadow-glass border border-white/40 dark:border-slate-800/50">
          <h3 className="text-lg font-black text-slate-900 dark:text-white mb-5 flex items-center gap-3">
            <div className="size-8 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500">
              <span className="material-symbols-outlined">medical_information</span>
            </div>
            Preparation Guide
          </h3>
          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-4 group">
              <div className={`flex items-center justify-center rounded-2xl bg-orange-50 dark:bg-orange-900/20 shrink-0 size-12 shadow-sm`}>
                <span className="material-symbols-outlined text-orange-600 dark:text-orange-400">info</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Instructions</p>
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1 leading-relaxed">
                  {scan.preparation_notes || "No specific preparation required. Wear loose comfortable clothing."}
                </p>
              </div>
            </div>
            {scan.contrast_required && (
              <div className="flex items-start gap-4 group">
                <div className={`flex items-center justify-center rounded-2xl bg-purple-50 dark:bg-purple-900/20 shrink-0 size-12 shadow-sm`}>
                  <span className="material-symbols-outlined text-purple-600 dark:text-purple-400">bloodtype</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Creatinine Test</p>
                  <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1 leading-relaxed">
                    A recent Serum Creatinine report is mandatory for contrast studies.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Diagnostic Centers List */}
        {pricing && pricing.length > 0 && (
          <section>
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-1">Select Laboratory</h3>
            <div className="flex flex-col gap-4">
              {pricing.map((priceOption: any) => {
                const isSelected = selectedPricing?.id === priceOption.id;
                return (
                  <div
                    key={priceOption.id}
                    onClick={() => setSelectedPricing(priceOption)}
                    className={`relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-5 shadow-glass border transition-all duration-500 cursor-pointer ${isSelected
                        ? 'border-primary ring-4 ring-primary/5 shadow-float'
                        : 'border-white dark:border-slate-800/80 opacity-90 hover:opacity-100 hover:-translate-y-1'
                      }`}
                  >
                    <div className="flex gap-5 items-start">
                      <div className="size-20 shrink-0 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800 overflow-hidden relative p-3 flex items-center justify-center border border-white dark:border-slate-700/50">
                        <img
                          alt={priceOption.vendor_locations?.name}
                          className={`w-full h-full object-contain transition-all duration-500 ${!isSelected && 'grayscale opacity-50 group-hover:grayscale-0'}`}
                          src={priceOption.vendor_locations?.vendor?.logo_url || 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=100&q=80'}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <h4 className="text-lg font-black text-slate-900 dark:text-white truncate tracking-tight">
                            {priceOption.vendor_locations?.name || 'Diagnostic Center'}
                          </h4>
                          <span className="material-symbols-outlined filled text-blue-500 text-[18px]">verified</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-3">
                          <span className="material-symbols-outlined text-[14px]">location_on</span>
                          <span className="truncate">Nearby • {scan.report_time || '24 Hours'} Report</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex flex-col">
                            <span className="text-xs text-slate-400 line-through font-bold">₹{priceOption.mrp}</span>
                            <span className="text-xl font-black text-primary tracking-tighter">₹{priceOption.selling_price}</span>
                          </div>
                          {isSelected ? (
                            <div className="size-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg animate-in zoom-in duration-300">
                              <span className="material-symbols-outlined">check</span>
                            </div>
                          ) : (
                            <button className="h-10 px-6 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black text-xs uppercase tracking-widest shadow-xl">Select</button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Time Slots for Selected Center */}
                    {isSelected && (
                      <div className="animate-in fade-in slide-in-from-top-2 duration-500">
                        <div className="h-px bg-slate-50 dark:bg-slate-800 w-full my-5"></div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Available Slots</p>
                          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
                            {slots.map((slot) => (
                              <button
                                key={slot}
                                onClick={(e) => { e.stopPropagation(); setSelectedSlot(slot); }}
                                className={`shrink-0 flex flex-col items-center justify-center min-w-[85px] h-[70px] rounded-2xl transition-all duration-300 active:scale-90 border-2 ${selectedSlot === slot
                                    ? 'bg-primary text-white shadow-float border-primary'
                                    : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-50 dark:border-slate-700 hover:border-primary/30'
                                  }`}
                              >
                                <span className="text-sm font-black tracking-tight">{slot.split(' ')[0]}</span>
                                <span className={`text-[10px] font-bold uppercase ${selectedSlot === slot ? 'opacity-90' : 'text-slate-500'}`}>{slot.split(' ')[1]}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Trust Indicators */}
        <div className="flex justify-center gap-8 py-6 grayscale opacity-50">
          {['security', 'verified_user', 'support_agent'].map((icon, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span className="material-symbols-outlined text-2xl">{icon}</span>
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">{['Secure', 'Verified', '24/7 Help'][i]}</span>
            </div>
          ))}
        </div>
      </main>

      {/* Sticky Bottom Action Bar */}
      <footer className="fixed bottom-0 left-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-t border-white/20 dark:border-slate-800/50 shadow-glass p-4 z-50 pb-6">
        <div className="flex items-center gap-5 max-w-md mx-auto w-full">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Total Due</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">₹{currentPrice}</span>
              {discountPercent > 0 && (
                <span className="text-xs text-slate-400 line-through font-bold">₹{currentMrp}</span>
              )}
            </div>
          </div>
          <button
            onClick={handleBook}
            className="flex-1 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white font-black text-sm uppercase tracking-widest shadow-float hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 overflow-hidden relative group/btn"
          >
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000"></div>
            <span>Confirm Booking</span>
            <span className="material-symbols-outlined group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>
      </footer>
    </div>
  );
}

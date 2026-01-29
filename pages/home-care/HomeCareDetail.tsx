
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useService, ServiceMaster } from '../../hooks';

// Helper to generate plans since backend doesn't support them yet
const getServicePlans = (service: ServiceMaster) => {
  if (service.category === 'Medical Equipment' || service.category === 'Equipment') {
    return [
      { id: 'p1', name: 'Weekly Rental', duration: '7 Days', price: 2000, type: 'Rental' },
      { id: 'p2', name: 'Monthly Rental', duration: '30 Days', price: 7000, savings: 1000, type: 'Rental' },
      { id: 'p3', name: 'Purchase', duration: 'Lifetime', price: 45000, type: 'Purchase' }
    ];
  }
  // Default Home Care Plans
  return [
    { id: 'p1', name: 'Short Term', duration: '7 Days', price: service.duration_minutes ? (service.duration_minutes * 7 / 60 * 500) : 3500, title: 'Trial' }, // Mock price calc
    { id: 'p2', name: 'Medium Term', duration: '15 Days', price: service.duration_minutes ? (service.duration_minutes * 15 / 60 * 450) : 7000, savings: 500, title: 'Popular' },
    { id: 'p3', name: 'Long Term', duration: '30 Days', price: service.duration_minutes ? (service.duration_minutes * 30 / 60 * 400) : 12000, savings: 2000, title: 'Best Value' }
  ];
};

export default function HomeCareDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: service, loading, error } = useService(id);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [requestFemale, setRequestFemale] = useState(false);

  useEffect(() => {
    if (service) {
      const plans = getServicePlans(service);
      setSelectedPlan(plans[0]);
    }
  }, [service]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex flex-col items-center justify-center text-center p-6 text-slate-900 dark:text-white">
        <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">medical_services</span>
        <h2 className="text-xl font-bold">Service Not Found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 text-primary font-bold">Go Back</button>
      </div>
    );
  }

  const plans = getServicePlans(service);
  const isEquipment = service.category === 'Medical Equipment' || service.category === 'Equipment';
  const currentPrice = selectedPlan ? selectedPlan.price : 0;

  const getRentalUnit = (duration: string) => {
    const d = duration.toLowerCase();
    if (d.includes('30 days') || d.includes('month')) return '/mo';
    if (d.includes('7 days') || d.includes('week')) return '/wk';
    if (d.includes('day')) return '/day';
    return '';
  };

  const handleBook = () => {
    navigate('/home-care/booking', {
      state: {
        service: { ...service, title: service.name, image: service.description || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800' }, // Map back to Booking expected format
        plan: selectedPlan,
        isHomeVisit: service.is_home_service,
        preferences: { requestFemale }
      }
    });
  };

  // Check feature/requirements for equipment flag
  const equipmentRequired = service.requirements?.some(r => r.toLowerCase().includes('equipment') || r.toLowerCase().includes('kit'));

  return (
    <div className="relative min-h-screen flex flex-col bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white font-sans">
      {/* Top App Bar */}
      <div className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold">{isEquipment ? 'Product Details' : 'Service Details'}</h1>
        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <span className="material-symbols-outlined text-2xl">share</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Hero Image */}
        <div className="relative h-64 w-full">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800")` }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-secondary/90 backdrop-blur rounded-full text-xs font-bold uppercase tracking-wide text-white">{service.category}</span>
              <div className="flex items-center gap-1 bg-yellow-400/90 text-black px-2 py-1 rounded-full text-xs font-bold">
                <span className="material-symbols-outlined text-sm filled">star</span>
                <span>4.8</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold leading-tight mb-1">{service.name}</h2>
            <p className="text-white/80 text-sm font-medium">Verified • Kurnool</p>
          </div>
        </div>

        {/* Info Grid - Dynamic based on Service vs Equipment */}
        <div className="flex border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 justify-around text-center">
          {!isEquipment && (
            <>
              <div className="flex flex-col gap-1">
                <span className="material-symbols-outlined text-primary text-xl">medical_services</span>
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Staff</span>
                <span className="text-xs font-bold">Certified</span>
              </div>
              <div className="w-px bg-gray-100 dark:bg-gray-800"></div>
            </>
          )}
          <div className="flex flex-col gap-1">
            <span className="material-symbols-outlined text-secondary text-xl">{isEquipment ? 'inventory_2' : 'schedule'}</span>
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{isEquipment ? 'Availability' : 'Duration'}</span>
            <span className="text-xs font-bold">{isEquipment ? 'In Stock' : (service.duration_minutes ? `${service.duration_minutes} mins` : 'Flexible')}</span>
          </div>
          <div className="w-px bg-gray-100 dark:bg-gray-800"></div>
          <div className="flex flex-col gap-1">
            <span className="material-symbols-outlined text-green-500 text-xl">verified_user</span>
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Safety</span>
            <span className="text-xs font-bold">{isEquipment ? 'Sanitized' : 'Verified'}</span>
          </div>
        </div>

        <div className="p-4 space-y-6 bg-gray-50 dark:bg-black/20">

          {/* Plan/Variant Selection */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-4">{isEquipment ? 'Rental or Purchase?' : 'Choose Duration'}</h3>
            <div className="flex flex-col gap-3">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`relative flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedPlan?.id === plan.id
                      ? 'border-primary bg-blue-50/50 dark:bg-blue-900/10 shadow-sm'
                      : 'border-gray-100 dark:border-gray-700 hover:border-primary/50'
                    }`}
                >
                  {isEquipment ? (
                    <span className={`absolute -top-3 left-4 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${plan.type === 'Rental' ? 'bg-purple-500' : 'bg-green-600'}`}>
                      {plan.type}
                    </span>
                  ) : (
                    plan.title && <span className="absolute -top-3 left-4 bg-secondary text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">{plan.title}</span>
                  )}

                  <div className="mt-1">
                    <h4 className="font-bold text-slate-900 dark:text-white">{plan.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{plan.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-primary">₹{Math.floor(plan.price).toLocaleString()}</p>
                    {plan.savings && (
                      <p className="text-xs text-green-600 font-bold">Save ₹{plan.savings}</p>
                    )}
                  </div>
                  {selectedPlan?.id === plan.id && (
                    <div className="absolute right-[-10px] top-[-10px] bg-primary text-white rounded-full p-1 border-2 border-white dark:border-gray-900">
                      <span className="material-symbols-outlined text-sm font-bold block">check</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Gender Preference Toggle (Services Only) */}
          {!isEquipment && (
            <div className={`p-4 rounded-xl border transition-all flex items-center justify-between ${requestFemale ? 'bg-pink-50 dark:bg-pink-900/10 border-pink-200 dark:border-pink-800' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-sm'}`}>
              <div className="flex items-center gap-3">
                <div className={`size-10 rounded-full flex items-center justify-center transition-colors ${requestFemale ? 'bg-pink-100 dark:bg-pink-800 text-pink-600 dark:text-pink-200' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'}`}>
                  <span className="material-symbols-outlined">female</span>
                </div>
                <div>
                  <p className={`font-bold text-sm ${requestFemale ? 'text-pink-700 dark:text-pink-300' : 'text-slate-900 dark:text-white'}`}>Prefer Female Caretaker</p>
                  <p className={`text-xs ${requestFemale ? 'text-pink-600/70 dark:text-pink-400/70' : 'text-gray-500'}`}>{requestFemale ? 'Preference applied' : 'Tap to enable preference'}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={requestFemale} onChange={(e) => setRequestFemale(e.target.checked)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
              </label>
            </div>
          )}

          {/* Description */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-3">About</h3>
            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
              {service.description || "Professional home care service tailored to your needs."}
            </p>
          </div>

          {/* Features */}
          {service.requirements && service.requirements.length > 0 && (
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-4">What's Included</h3>
              <ul className="space-y-3">
                {service.requirements.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                      <span className="material-symbols-outlined text-sm font-bold">check</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-200 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Equipment Notice */}
          {equipmentRequired && !isEquipment && (
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-100 dark:border-amber-800 flex items-start gap-3">
              <span className="material-symbols-outlined text-amber-600 mt-0.5">info</span>
              <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                <strong>Note:</strong> Some supplies (cotton, syringes) might need to be purchased separately. Our team will bring standard kits.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="sticky bottom-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-5 py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="flex flex-col mb-1">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {selectedPlan ? selectedPlan.duration : 'Total Estimate'}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black">₹{currentPrice.toLocaleString()}</span>
                {selectedPlan && selectedPlan.type === 'Rental' && (
                  <span className="text-xs font-bold text-gray-400">
                    {selectedPlan.duration ? getRentalUnit(selectedPlan.duration) : '/mo'}
                  </span>
                )}
              </div>
            </div>
          </div>
          <button onClick={handleBook} className="flex-[2] bg-primary hover:bg-blue-600 text-white h-14 rounded-xl font-bold text-lg shadow-lg shadow-primary/30 flex items-center justify-center gap-2 active:scale-95 transition-transform">
            {isEquipment && selectedPlan?.type === 'Purchase' ? 'Buy Now' : 'Book Service'}
          </button>
        </div>
      </div>
    </div>
  );
}


import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HOME_CARE_SERVICES } from '../../constants';

export default function HomeCareDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = HOME_CARE_SERVICES.find(s => s.id === id);
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedPlan, setSelectedPlan] = useState(service?.plans ? service.plans[0] : null);

  if (!service) return <div className="p-8 text-center">Service not found</div>;

  const currentPrice = selectedPlan ? selectedPlan.price : service.price;

  return (
    <div className="relative min-h-screen flex flex-col bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white font-sans">
      {/* Top App Bar */}
      <div className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold">Service Details</h1>
        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <span className="material-symbols-outlined text-2xl">share</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Hero Image */}
        <div className="relative h-64 w-full">
          <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: `url("${service.image}")`}}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-secondary/90 backdrop-blur rounded-full text-xs font-bold uppercase tracking-wide text-white">Home Care</span>
              <div className="flex items-center gap-1 bg-yellow-400/90 text-black px-2 py-1 rounded-full text-xs font-bold">
                <span className="material-symbols-outlined text-sm filled">star</span>
                <span>{service.rating}</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold leading-tight mb-1">{service.title}</h2>
            <p className="text-white/80 text-sm font-medium">Verified Professionals • Kurnool</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-800 px-4 pt-4 gap-6 bg-white dark:bg-gray-900 sticky top-[64px] z-40 overflow-x-auto no-scrollbar">
          {['Overview', 'Plans', 'FAQ'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 border-b-2 font-medium whitespace-nowrap transition-colors ${activeTab === tab ? 'border-primary text-primary font-semibold' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-4 space-y-6 bg-gray-50 dark:bg-black/20">
          {/* Plan Selection */}
          {service.plans && (
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-4">Choose Duration</h3>
              <div className="flex flex-col gap-3">
                {service.plans.map((plan) => (
                  <div 
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan)}
                    className={`relative flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedPlan?.id === plan.id 
                      ? 'border-primary bg-blue-50/50 dark:bg-blue-900/10 shadow-sm' 
                      : 'border-gray-100 dark:border-gray-700 hover:border-primary/50'
                    }`}
                  >
                    {plan.label && (
                      <span className="absolute -top-3 left-4 bg-secondary text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {plan.label}
                      </span>
                    )}
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{plan.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{plan.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-primary">₹{plan.price}</p>
                      {plan.originalPrice > plan.price && (
                        <p className="text-xs text-gray-400 line-through">₹{plan.originalPrice}</p>
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
          )}

          {/* Description */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-3">About Service</h3>
            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Features */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold mb-4">What's Included</h3>
            <ul className="space-y-3">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-sm font-bold">check</span>
                  </div>
                  <span className="text-gray-700 dark:text-gray-200 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Booking Form */}
          <div className="pt-2">
            <h2 className="text-xl font-bold mb-4 px-1">Patient Details</h2>
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Patient Name</label>
                <input className="w-full h-12 rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:border-primary focus:ring-primary" placeholder="Enter full name" type="text"/>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Age</label>
                  <input className="w-full h-12 rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:border-primary focus:ring-primary" placeholder="Eg: 65" type="number"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Gender</label>
                  <select className="w-full h-12 rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:border-primary focus:ring-primary">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Home Address</label>
                <textarea className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:border-primary focus:ring-primary p-3" placeholder="Flat No, Street, Landmark..." rows={3}></textarea>
              </div>
            </div>
          </div>
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
                <span className="text-xl font-black">₹{currentPrice}</span>
                {selectedPlan && selectedPlan.savings && (
                  <span className="text-xs font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded">Save ₹{selectedPlan.savings}</span>
                )}
              </div>
            </div>
          </div>
          <button onClick={() => navigate('/bookings')} className="flex-[2] bg-primary hover:bg-blue-600 text-white h-14 rounded-xl font-bold text-lg shadow-lg shadow-primary/30 flex items-center justify-center gap-2 active:scale-95 transition-transform">
            Book Service
          </button>
        </div>
      </div>
    </div>
  );
}

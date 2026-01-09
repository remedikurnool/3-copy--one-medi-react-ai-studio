
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DIABETES_PACKAGES } from '../../constants';

// Mock data for diabetes product categories
const DIABETES_CATEGORIES = [
  { id: 'c1', title: 'Devices', icon: 'devices', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', link: '/medicines' },
  { id: 'c2', title: 'Medication', icon: 'medication', color: 'text-teal-500', bg: 'bg-teal-50 dark:bg-teal-900/20', link: '/medicines' },
  { id: 'c3', title: 'Mgmt Plans', icon: 'assignment', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20', link: '/lab-tests' },
  { id: 'c4', title: 'Footwear', icon: 'do_not_step', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20', link: '/medicines' },
];

export default function DiabetesCare() {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-bg-light dark:bg-bg-dark font-sans text-slate-900 dark:text-white pb-24">
      {/* Top App Bar */}
      <div className="sticky top-0 z-50 flex items-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm p-4 pb-2 border-b border-gray-100 dark:border-gray-800">
        <button onClick={() => navigate(-1)} className="flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <span className="material-symbols-outlined text-[28px]">arrow_back</span>
        </button>
        <h1 className="text-xl font-bold leading-tight flex-1 text-center pr-12">Diabetes Care</h1>
      </div>

      <div className="flex-1">
        {/* Hero Card with High Quality Image */}
        <div className="p-4">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-gray-800 shadow-glass border border-white dark:border-gray-700">
            <div className="flex flex-col">
              <div className="w-full h-56 bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1610484826967-09c5720778c7?auto=format&fit=crop&q=80&w=1200")'}}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <span className="inline-block px-3 py-1 mb-2 text-[10px] font-black tracking-widest text-white bg-secondary/80 backdrop-blur-md rounded-full uppercase">One Medi Care</span>
                  <h2 className="text-white text-3xl font-black leading-tight drop-shadow-md">Monitor. Control.<br/>Prevent.</h2>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-4">
                <p className="text-gray-600 dark:text-gray-300 text-base font-bold leading-relaxed">Manage your diabetes effectively with Kurnool's most comprehensive home care and tracking plans.</p>
                <button onClick={() => navigate('/lab-tests')} className="w-full py-4 bg-primary hover:bg-primary-dark active:scale-[0.98] transition-all rounded-2xl text-white font-black text-lg shadow-float flex items-center justify-center gap-3">
                  <span>Explore Care Packages</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="px-4 pb-6 mt-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-1">Specialized Categories</h3>
          <div className="grid grid-cols-4 gap-3">
            {DIABETES_CATEGORIES.map((cat) => (
              <button 
                key={cat.id}
                onClick={() => navigate(cat.link)}
                className="flex flex-col items-center gap-2 group"
              >
                <div className={`size-16 rounded-2xl flex items-center justify-center shadow-glass border-2 border-transparent group-hover:border-primary transition-all duration-300 ${cat.bg}`}>
                  <span className={`material-symbols-outlined text-3xl group-hover:scale-110 transition-transform ${cat.color}`}>{cat.icon}</span>
                </div>
                <span className="text-[10px] font-black text-center text-slate-700 dark:text-gray-300 leading-tight uppercase tracking-tighter">{cat.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="px-4 pb-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-1">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => navigate('/lab-tests')} className="relative flex flex-col items-center justify-center gap-3 p-5 bg-white dark:bg-gray-800 rounded-3xl shadow-glass border border-white dark:border-gray-700 active:scale-95 transition-transform h-36 group overflow-hidden">
              <div className="absolute top-[-10px] right-[-10px] opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
                <span className="material-symbols-outlined text-[80px]">hematology</span>
              </div>
              <div className="size-14 rounded-2xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-primary shadow-inner">
                <span className="material-symbols-outlined text-3xl">hematology</span>
              </div>
              <span className="text-sm font-black uppercase tracking-tight z-10">Book Tests</span>
            </button>
            <button onClick={() => navigate('/doctors')} className="relative flex flex-col items-center justify-center gap-3 p-5 bg-white dark:bg-gray-800 rounded-3xl shadow-glass border border-white dark:border-gray-700 active:scale-95 transition-transform h-36 group overflow-hidden">
               <div className="absolute top-[-10px] right-[-10px] opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
                <span className="material-symbols-outlined text-[80px]">medical_services</span>
              </div>
              <div className="size-14 rounded-2xl bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center text-secondary shadow-inner">
                <span className="material-symbols-outlined text-3xl">medical_services</span>
              </div>
              <span className="text-sm font-black uppercase tracking-tight z-10">Consult Doctor</span>
            </button>
          </div>
        </div>

        {/* Packages */}
        <div className="pt-6 px-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-secondary filled">verified_user</span>
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">Diabetes Packages</h3>
          </div>
          <div className="flex flex-col gap-5">
            {DIABETES_PACKAGES.map((pkg, i) => (
              <div key={pkg.id} className={`p-6 rounded-[2.5rem] border shadow-glass relative overflow-hidden transition-all hover:shadow-float ${i === 0 ? 'bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 border-blue-100 dark:border-blue-900' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700'}`}>
                {i === 0 && <div className="absolute -right-6 -top-6 size-32 bg-blue-400/10 rounded-full blur-3xl"></div>}
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div>
                    <h4 className="text-xl font-black text-slate-900 dark:text-white">{pkg.title}</h4>
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-wide">{pkg.description}</p>
                  </div>
                  {pkg.isPopular && <div className="bg-blue-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">POPULAR</div>}
                </div>
                <div className="flex flex-col gap-3 my-5 relative z-10">
                  {pkg.features.map(f => (
                    <div key={f} className="flex items-center gap-2.5 text-xs font-bold text-slate-600 dark:text-gray-300">
                      <span className="material-symbols-outlined text-secondary text-[20px] filled">check_circle</span>
                      {f}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 pt-5 border-t border-slate-100 dark:border-gray-700 relative z-10">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 font-bold line-through">₹{pkg.mrp}</span>
                    <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">₹{pkg.price}</span>
                  </div>
                  <button className={`${i === 0 ? 'bg-secondary hover:bg-blue-600 shadow-float shadow-secondary/20' : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'} text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95`}>
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips & Devices CTA */}
        <div className="pt-10 px-4 mb-12">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 ml-1">Essential Care Kits</h3>
          <div className="flex overflow-x-auto no-scrollbar gap-6 pb-4">
            <div className="min-w-[220px] bg-white dark:bg-gray-800 rounded-[2rem] p-5 shadow-glass border border-white dark:border-gray-700 flex flex-col gap-4 group cursor-pointer hover:shadow-float transition-all">
              <div className="size-24 rounded-3xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center mx-auto shadow-inner group-hover:scale-105 transition-transform">
                <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=200" alt="Glucometer" className="size-full object-cover rounded-3xl" />
              </div>
              <div className="text-center">
                <h5 className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-tight">Glucometer Kit</h5>
                <p className="text-[10px] font-bold text-primary uppercase mt-1">Starting @ ₹850</p>
                <button className="mt-4 w-full py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white border-2 border-slate-100 dark:border-slate-700 rounded-xl hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all">View Products</button>
              </div>
            </div>
            <div className="min-w-[220px] bg-white dark:bg-gray-800 rounded-[2rem] p-5 shadow-glass border border-white dark:border-gray-700 flex flex-col gap-4 group cursor-pointer hover:shadow-float transition-all">
              <div className="size-24 rounded-3xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center mx-auto shadow-inner group-hover:scale-105 transition-transform">
                <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=200" alt="Footwear" className="size-full object-cover rounded-3xl" />
              </div>
              <div className="text-center">
                <h5 className="font-black text-sm text-slate-900 dark:text-white uppercase tracking-tight">Diabetic Shoes</h5>
                <p className="text-[10px] font-bold text-primary uppercase mt-1">Starting @ ₹1,200</p>
                <button className="mt-4 w-full py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white border-2 border-slate-100 dark:border-slate-700 rounded-xl hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all">View Products</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

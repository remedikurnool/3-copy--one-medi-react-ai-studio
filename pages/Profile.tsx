
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';

const MenuLink = ({ icon, label, sub, onClick, color = "text-slate-600" }: any) => (
  <button onClick={onClick} className="flex items-center gap-4 w-full p-4 bg-white dark:bg-gray-800 border-b border-gray-50 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all group">
    <div className={`size-11 rounded-xl bg-slate-50 dark:bg-gray-700 flex items-center justify-center ${color} group-hover:scale-105 transition-transform shadow-sm`}>
      <span className="material-symbols-outlined">{icon}</span>
    </div>
    <div className="flex-1 text-left">
      <h3 className="font-bold text-slate-900 dark:text-white">{label}</h3>
      {sub && <p className="text-[11px] text-gray-400 font-medium uppercase tracking-tight">{sub}</p>}
    </div>
    <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors">chevron_right</span>
  </button>
);

export default function Profile() {
  const navigate = useNavigate();
  const { profile, isAuthenticated, logout } = useUserStore();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
        navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      logout();
      navigate('/login');
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark pb-32 animate-fade-in">
       {/* Header Profile Card */}
       <div className="bg-white dark:bg-gray-800 p-6 pb-8 rounded-b-[2.5rem] shadow-sm mb-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex justify-between items-center mb-6">
             <h1 className="text-2xl font-black dark:text-white tracking-tight">MY PROFILE</h1>
             <button 
               onClick={() => navigate('/profile/edit')}
               className="text-primary font-black text-xs bg-primary/10 px-4 py-2 rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
             >
               EDIT
             </button>
          </div>
          <div className="flex items-center gap-5">
             <div className="relative group">
                <div className="size-20 rounded-2xl bg-gray-200 border-4 border-white dark:border-gray-700 shadow-xl bg-cover bg-center overflow-hidden" style={{backgroundImage: `url("${profile.image}")`}}></div>
                <div className="absolute -bottom-1 -right-1 size-6 bg-green-500 border-2 border-white dark:border-gray-700 rounded-full flex items-center justify-center text-white shadow-md">
                   <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                </div>
             </div>
             <div>
                <h2 className="text-xl font-bold leading-tight dark:text-white">{profile.name}</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-0.5">{profile.phone}</p>
                <div className="flex items-center gap-1.5 mt-2 text-[10px] font-black text-primary bg-primary/10 px-2.5 py-1 rounded-lg w-fit uppercase tracking-wider">
                   <span className="material-symbols-outlined text-[14px] filled">verified</span> Verified Patient
                </div>
             </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 mt-8">
             <div className="bg-blue-50/50 dark:bg-gray-700/50 p-4 rounded-2xl text-center border border-blue-100/20 dark:border-gray-600">
                <span className="block text-xl font-black text-primary">{profile.bloodGroup || 'O+'}</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">Blood</span>
             </div>
             <div className="bg-purple-50/50 dark:bg-gray-700/50 p-4 rounded-2xl text-center border border-purple-100/20 dark:border-gray-600">
                <span className="block text-xl font-black text-purple-600">{profile.height || '175'}</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">Height</span>
             </div>
             <div className="bg-orange-50/50 dark:bg-gray-700/50 p-4 rounded-2xl text-center border border-orange-100/20 dark:border-gray-600">
                <span className="block text-xl font-black text-orange-600">{profile.weight || '72'}</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">Weight</span>
             </div>
          </div>
       </div>

       <div className="px-5 flex flex-col gap-8">
          <section>
             <h3 className="font-black text-gray-400 uppercase text-[10px] mb-3 px-1 tracking-[0.15em]">Health & Records</h3>
             <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800">
                <MenuLink icon="receipt_long" label="My Bookings" sub="Status: 2 Active" onClick={() => navigate('/bookings')} color="text-blue-500" />
                <MenuLink icon="prescriptions" label="Prescriptions" sub="Vault: 4 Records" onClick={() => navigate('/prescriptions')} color="text-teal-500" />
                <MenuLink icon="monitor_heart" label="Health Trends" sub="Vitals & Reports" onClick={() => navigate('/profile/health-records')} color="text-red-500" />
                <MenuLink icon="calculate" label="Health Tools" sub="BMI, Water & Sleep" onClick={() => navigate('/profile/calculators')} color="text-orange-500" />
             </div>
          </section>

          <section>
             <h3 className="font-black text-gray-400 uppercase text-[10px] mb-3 px-1 tracking-[0.15em]">Account Settings</h3>
             <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800">
                <MenuLink icon="location_on" label="Saved Addresses" sub="Home & Work" onClick={() => navigate('/profile/addresses')} color="text-indigo-500" />
                <MenuLink icon="family_restroom" label="Manage Dependents" sub="Add Family" onClick={() => navigate('/profile/family')} color="text-pink-500" />
                <MenuLink icon="account_balance_wallet" label="Payment Methods" sub="UPI & Cards" onClick={() => navigate('/profile/payments')} color="text-green-600" />
                
                {/* Dark Mode Toggle */}
                <div className="flex items-center gap-4 w-full p-4 border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                   <div className="size-11 rounded-xl bg-slate-50 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 shadow-sm">
                      <span className="material-symbols-outlined">{isDark ? 'dark_mode' : 'light_mode'}</span>
                   </div>
                   <div className="flex-1 text-left">
                      <h3 className="font-bold text-slate-900 dark:text-white">Appearance</h3>
                      <p className="text-[11px] font-bold text-gray-400 uppercase">{isDark ? 'Dark Mode Active' : 'Light Mode Active'}</p>
                   </div>
                   <button 
                     onClick={toggleDarkMode}
                     className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${isDark ? 'bg-primary' : 'bg-gray-300'}`}
                   >
                     <div className={`size-4 bg-white rounded-full shadow-md transition-transform duration-300 ${isDark ? 'translate-x-6' : 'translate-x-0'}`}></div>
                   </button>
                </div>
             </div>
          </section>

          <section>
             <h3 className="font-black text-gray-400 uppercase text-[10px] mb-3 px-1 tracking-[0.15em]">Support</h3>
             <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800">
                <MenuLink icon="help_center" label="Help & Feedback" sub="Instant Support" onClick={() => navigate('/chat')} color="text-emerald-500" />
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-4 w-full p-5 text-red-500 font-black text-sm uppercase tracking-widest hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                >
                  <div className="size-11 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
                    <span className="material-symbols-outlined">logout</span>
                  </div>
                  LOG OUT
                </button>
             </div>
          </section>
          
          <div className="flex flex-col items-center gap-1 mt-4 mb-8">
             <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">One Medi v2.4.0 (Stable)</p>
             <p className="text-[9px] font-bold text-gray-400 uppercase">Made with pride in Kurnool, AP</p>
          </div>
       </div>
    </div>
  );
}

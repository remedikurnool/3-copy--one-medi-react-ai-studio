import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SIDEBAR_SERVICES = [
  { label: 'Medicines', icon: 'medication', path: '/medicines', color: 'bg-blue-500' },
  { label: 'Lab Tests', icon: 'biotech', path: '/lab-tests', color: 'bg-teal-500' },
  { label: 'Doctors', icon: 'stethoscope', path: '/doctors', color: 'bg-purple-500' },
  { label: 'Scans', icon: 'radiology', path: '/scans', color: 'bg-indigo-500' },
  { label: 'Mother & Baby', icon: 'pregnant_woman', path: '/mother-baby', color: 'bg-rose-500' },
  { label: 'Home Care', icon: 'home_health', path: '/home-care', color: 'bg-pink-500' },
  { label: 'Hospitals', icon: 'local_hospital', path: '/hospitals', color: 'bg-emerald-500' },
];

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const navigate = useNavigate();
  const { profile } = useUserStore();

  const handleNav = (path: string) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden overflow-hidden">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      <div className="absolute top-0 left-0 bottom-0 w-[85%] max-w-[340px] bg-bg-light dark:bg-bg-dark shadow-2xl flex flex-col animate-in slide-in-from-left duration-500 ease-out border-r border-white/20 dark:border-slate-800">
        
        <div className="p-6 bg-primary pt-12 rounded-br-[3rem] shadow-lg relative overflow-hidden">
           <div className="absolute top-0 right-0 size-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
           <div className="relative z-10 flex items-center gap-4 mb-6">
              <div 
                className="size-16 rounded-2xl bg-white/20 border-2 border-white/40 p-0.5 shadow-xl bg-cover bg-center" 
                style={{backgroundImage: `url("${profile.image}")`}}
              ></div>
              <div>
                 <h2 className="text-white font-black text-lg tracking-tight leading-none mb-1">{profile.name}</h2>
                 <span className="text-white/70 text-[10px] font-black uppercase tracking-widest bg-black/10 px-2 py-0.5 rounded-full">Pro Member</span>
              </div>
           </div>
           
           <div className="relative z-10 grid grid-cols-2 gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20">
              <div className="flex flex-col">
                 <span className="text-[8px] font-black text-white/60 uppercase tracking-widest">Health Score</span>
                 <span className="text-white font-black text-sm">84 / 100</span>
              </div>
              <div className="flex flex-col">
                 <span className="text-[8px] font-black text-white/60 uppercase tracking-widest">Reports</span>
                 <span className="text-white font-black text-sm">4 New</span>
              </div>
           </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-8">
           <section>
              <div className="flex justify-between items-center mb-4">
                 <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Our Services</h3>
                 <button onClick={() => handleNav('/services')} className="text-[10px] font-black text-primary uppercase">View All</button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                 {SIDEBAR_SERVICES.map((s) => (
                    <button 
                      key={s.label}
                      onClick={() => handleNav(s.path)}
                      className="flex flex-col items-center gap-2 group"
                    >
                       <div className={`size-12 rounded-2xl ${s.color} bg-opacity-10 dark:bg-opacity-20 flex items-center justify-center text-primary group-active:scale-90 transition-transform`}>
                          <span className="material-symbols-outlined text-2xl">{s.icon}</span>
                       </div>
                       <span className="text-[9px] font-bold text-slate-600 dark:text-slate-400 text-center leading-tight">{s.label}</span>
                    </button>
                 ))}
              </div>
           </section>

           <section>
              <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">Quick Actions</h3>
              <div className="flex flex-col gap-3">
                 <button 
                  onClick={() => handleNav('/medicines')}
                  className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-2xl border border-white dark:border-slate-800 shadow-soft group active:scale-[0.98] transition-all"
                 >
                    <div className="size-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 flex items-center justify-center">
                       <span className="material-symbols-outlined text-xl">upload_file</span>
                    </div>
                    <div className="flex-1 text-left">
                       <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">Upload Prescription</p>
                       <p className="text-[9px] font-bold text-slate-400">Order meds in 2 mins</p>
                    </div>
                    <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
                 </button>
              </div>
           </section>

           <section className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
              {['Profile', 'My Bookings', 'Health Records', 'Settings'].map((link) => (
                 <button 
                    key={link} 
                    onClick={() => handleNav(`/${link.toLowerCase().replace(' ', '-')}`)}
                    className="flex items-center justify-between w-full text-sm font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest hover:text-primary transition-colors"
                 >
                    {link}
                    <span className="material-symbols-outlined text-slate-300 text-sm">arrow_forward</span>
                 </button>
              ))}
           </section>
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center gap-2">
           <div className="flex items-center gap-2 opacity-40">
              <span className="material-symbols-outlined text-primary text-lg">local_hospital</span>
              <span className="font-black text-sm tracking-tighter">ONE MEDI</span>
           </div>
           <p className="text-[8px] font-bold text-slate-400 tracking-[0.3em] uppercase">Built with pride in Kurnool</p>
        </div>

        <button 
          onClick={onClose}
          className="absolute top-4 right-[-50px] size-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-xl text-slate-900 dark:text-white"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>
  );
}
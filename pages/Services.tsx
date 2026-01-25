
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SERVICE_LIST = [
  {
    id: 'meds',
    title: 'Medicines',
    subtitle: 'Order healthcare products with 2hr delivery',
    icon: 'medication',
    path: '/medicines',
    color: 'from-blue-500 to-indigo-600',
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20'
  },
  {
    id: 'labs',
    title: 'Lab Tests',
    subtitle: 'Home sample collection & digital reports',
    icon: 'biotech',
    path: '/lab-tests',
    color: 'from-teal-400 to-emerald-600',
    iconColor: 'text-teal-500',
    bgColor: 'bg-teal-50 dark:bg-teal-900/20'
  },
  {
    id: 'docs',
    title: 'Doctor Consult',
    subtitle: 'Instant video or clinic appointments',
    icon: 'stethoscope',
    path: '/doctors',
    color: 'from-purple-500 to-fuchsia-600',
    iconColor: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20'
  },
  {
    id: 'scans',
    title: 'Scans & MRI',
    subtitle: 'High-quality diagnostics at lower prices',
    icon: 'radiology',
    path: '/scans',
    color: 'from-indigo-500 to-blue-700',
    iconColor: 'text-indigo-500',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/20'
  },
  {
    id: 'motherbaby',
    title: 'Mother & Baby',
    subtitle: 'Expert care for pregnancy & newborns',
    icon: 'pregnant_woman',
    path: '/mother-baby',
    color: 'from-rose-400 to-pink-600',
    iconColor: 'text-rose-500',
    bgColor: 'bg-rose-50 dark:bg-rose-900/20'
  },
  {
    id: 'homecare',
    title: 'Home Care',
    subtitle: 'Nursing & elderly support at your doorstep',
    icon: 'home_health',
    path: '/home-care',
    color: 'from-pink-500 to-rose-600',
    iconColor: 'text-pink-500',
    bgColor: 'bg-pink-50 dark:bg-pink-900/20'
  },
  {
    id: 'physio',
    title: 'Physiotherapy',
    subtitle: 'Expert rehab for pain and mobility',
    icon: 'accessibility_new',
    path: '/physiotherapy',
    color: 'from-sky-400 to-blue-500',
    iconColor: 'text-sky-500',
    bgColor: 'bg-sky-50 dark:bg-sky-900/20'
  },
  {
    id: 'feed',
    title: 'Health Feed',
    subtitle: 'Expert blogs, tips & videos for better health',
    icon: 'feed',
    path: '/health-feed',
    color: 'from-pink-500 to-red-500',
    iconColor: 'text-pink-500',
    bgColor: 'bg-pink-50 dark:bg-pink-900/20'
  },
  {
    id: 'diabetes',
    title: 'Diabetes Care',
    subtitle: 'Specialized kits and management plans',
    icon: 'bloodtype',
    path: '/diabetes-care',
    color: 'from-orange-400 to-red-500',
    iconColor: 'text-orange-500',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20'
  },
  {
    id: 'hospitals',
    title: 'Hospitals',
    subtitle: 'Find top multi-specialty care in Kurnool',
    icon: 'local_hospital',
    path: '/hospitals',
    color: 'from-emerald-500 to-teal-700',
    iconColor: 'text-emerald-500',
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
  },
  {
    id: 'blood',
    title: 'Blood Banks',
    subtitle: 'Find plasma and blood donors nearby',
    icon: 'bloodtype',
    path: '/blood-banks',
    color: 'from-red-500 to-red-700',
    iconColor: 'text-red-600',
    bgColor: 'bg-red-50 dark:bg-red-900/20'
  },
  {
    id: 'insurance',
    title: 'Insurance',
    subtitle: 'Compare family health plans',
    icon: 'security',
    path: '/insurance',
    color: 'from-blue-600 to-cyan-600',
    iconColor: 'text-cyan-600',
    bgColor: 'bg-cyan-50 dark:bg-cyan-900/20'
  },
  {
    id: 'surgery',
    title: 'Surgeries',
    subtitle: 'Estimates & second opinions',
    icon: 'medical_services',
    path: '/surgeries',
    color: 'from-slate-600 to-gray-700',
    iconColor: 'text-slate-600',
    bgColor: 'bg-gray-100 dark:bg-gray-800'
  },
  {
    id: 'wellness',
    title: 'Diet & Wellness',
    subtitle: 'Weight loss, yoga & mental health',
    icon: 'self_improvement',
    path: '/wellness',
    color: 'from-lime-500 to-green-600',
    iconColor: 'text-lime-600',
    bgColor: 'bg-lime-50 dark:bg-lime-900/20'
  },
  {
    id: 'skinhair',
    title: 'Skin & Hair',
    subtitle: 'Dermatology & aesthetic treatments',
    icon: 'face',
    path: '/skin-hair',
    color: 'from-amber-400 to-orange-500',
    iconColor: 'text-amber-500',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20'
  }
];

interface ServiceCardProps {
  service: typeof SERVICE_LIST[0];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate(service.path)}
      className="group relative flex flex-col items-stretch p-6 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-white dark:border-slate-800 shadow-glass hover:shadow-float transition-all duration-500 cursor-pointer active:scale-[0.98] overflow-hidden"
    >
      <div className={`absolute top-0 right-0 size-32 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity`}>
        <span className="material-symbols-outlined text-[120px] -mr-10 -mt-10">{service.icon}</span>
      </div>

      <div className="relative z-10 flex flex-col h-full gap-4">
        <div className={`size-14 rounded-2xl ${service.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
          <span className={`material-symbols-outlined text-3xl ${service.iconColor}`}>{service.icon}</span>
        </div>
        
        <div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight mb-1 group-hover:text-primary transition-colors">
            {service.title}
          </h3>
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 leading-relaxed uppercase tracking-wider">
            {service.subtitle}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-500">Explore</span>
          <div className="size-10 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center group-hover:bg-primary dark:group-hover:bg-primary group-hover:text-white transition-all">
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Services() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark pb-32">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-b border-white/20 dark:border-slate-800/50 p-4">
        <div className="flex items-center gap-4 max-w-7xl mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="size-12 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-soft flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">Our Services</h1>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-1">Unified Care Hub</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 lg:p-8 flex flex-col gap-8 animate-fade-in">
        <section className="relative h-64 rounded-[3rem] overflow-hidden group shadow-float">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] group-hover:scale-110" 
            style={{backgroundImage: 'url("https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")'}}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent"></div>
          
          <div className="relative z-10 h-full flex flex-col justify-center px-8 lg:px-16 max-w-2xl">
            <span className="bg-primary text-white text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full w-fit mb-4 border border-white/20">Premier Healthcare</span>
            <h2 className="text-4xl lg:text-6xl font-black text-white leading-[0.95] mb-4">Complete Wellness <br/><span className="text-primary">Evolved.</span></h2>
            <p className="text-slate-200 text-sm font-bold opacity-80 max-w-md">Access Kurnool's finest doctors, labs, and pharmacies through one seamless interface.</p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SERVICE_LIST.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
          
          <div 
            onClick={() => navigate('/ambulance')}
            className="group relative col-span-1 md:col-span-2 p-8 rounded-[2.5rem] bg-rose-500 shadow-[0_20px_40px_-10px_rgba(244,63,94,0.4)] cursor-pointer active:scale-[0.99] transition-all overflow-hidden"
          >
            <div className="absolute top-0 right-0 size-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl animate-pulse"></div>
            <div className="relative z-10 flex items-center justify-between gap-6 h-full">
              <div className="flex flex-col gap-2">
                <div className="size-16 rounded-3xl bg-white/20 backdrop-blur-xl flex items-center justify-center text-white mb-2">
                  <span className="material-symbols-outlined text-4xl filled">ambulance</span>
                </div>
                <h3 className="text-3xl font-black text-white leading-none">EMERGENCY SOS</h3>
                <p className="text-rose-100 font-bold text-sm">Instant Ambulance & Trauma Support in Kurnool</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="bg-white text-rose-600 px-6 py-2.5 rounded-2xl font-black text-lg shadow-xl">108</span>
                  <span className="text-white/80 font-black uppercase text-xs tracking-widest">CALL NOW</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

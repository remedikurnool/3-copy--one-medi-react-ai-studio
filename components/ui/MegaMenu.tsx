
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MENU_DATA = [
  {
    id: 'medicines',
    label: 'Medicines',
    icon: 'medication',
    color: 'text-blue-500',
    subCategories: [
      { name: 'Diabetes Care', link: '/diabetes-care', icon: 'bloodtype' },
      { name: 'Cardiac Care', link: '/medicines?cat=cardiac', icon: 'monitor_heart' },
      { name: 'Stomach Care', link: '/medicines?cat=stomach', icon: 'stomach' },
      { name: 'Pain Relief', link: '/medicines?cat=pain', icon: 'healing' },
      { name: 'Skin & Hair', link: '/medicines?cat=skin', icon: 'dermatology' },
      { name: 'Vitamins', link: '/medicines?cat=supplements', icon: 'pill' },
    ],
    featured: {
        title: 'Flat 25% OFF',
        subtitle: 'On First Medicine Order',
        image: 'https://cdn-icons-png.flaticon.com/512/3004/3004458.png',
        bg: 'bg-blue-50'
    }
  },
  {
    id: 'lab',
    label: 'Lab Tests',
    icon: 'biotech',
    color: 'text-teal-500',
    subCategories: [
      { name: 'Full Body Checkup', link: '/lab-tests/l1', icon: 'accessibility_new' },
      { name: 'Thyroid Profile', link: '/lab-tests/l3', icon: 'science' },
      { name: 'Diabetes Screening', link: '/lab-tests/l2', icon: 'water_drop' },
      { name: 'Lipid Profile', link: '/lab-tests/l4', icon: 'blood_pressure' },
      { name: 'Vitamin Tests', link: '/lab-tests/l5', icon: 'wb_sunny' },
      { name: 'Women Health', link: '/lab-tests', icon: 'female' },
    ],
    featured: {
        title: 'Home Collection',
        subtitle: 'Free for orders above ₹500',
        image: 'https://cdn-icons-png.flaticon.com/512/2966/2966334.png',
        bg: 'bg-teal-50'
    }
  },
  {
    id: 'doctors',
    label: 'Consult Doctors',
    icon: 'stethoscope',
    color: 'text-purple-500',
    subCategories: [
      { name: 'General Physician', link: '/doctors', icon: 'medical_services' },
      { name: 'Dermatologist', link: '/doctors', icon: 'face' },
      { name: 'Pediatrician', link: '/doctors', icon: 'child_care' },
      { name: 'Gynaecologist', link: '/doctors', icon: 'pregnant_woman' },
      { name: 'Orthopedic', link: '/doctors', icon: 'accessibility' },
      { name: 'Dentist', link: '/doctors', icon: 'dentistry' },
    ],
    featured: null
  },
  {
    id: 'motherbaby',
    label: 'Mother & Baby',
    icon: 'pregnant_woman',
    color: 'text-rose-500',
    subCategories: [
      { name: 'Pregnancy Care', link: '/mother-baby', icon: 'pregnant_woman' },
      { name: 'Vaccination Tracker', link: '/mother-baby/vaccination-tracker', icon: 'vaccines' },
      { name: 'Care Guides', link: '/mother-baby/guides', icon: 'auto_stories' },
      { name: 'Home Nursing', link: '/mother-baby', icon: 'home_health' },
    ],
    featured: {
        title: 'Mom Club',
        subtitle: 'Join for priority consults',
        image: 'https://cdn-icons-png.flaticon.com/512/3021/3021870.png',
        bg: 'bg-rose-50'
    }
  },
  {
    id: 'surgeries',
    label: 'Surgeries',
    icon: 'medical_services',
    color: 'text-slate-500',
    subCategories: [
      { name: 'All Surgeries', link: '/surgeries', icon: 'grid_view' },
      { name: 'Second Opinion', link: '/surgeries/second-opinion', icon: 'rate_review' },
      { name: 'Knee Replacement', link: '/surgeries/detail/sp1', icon: 'accessibility' },
      { name: 'Cataract', link: '/surgeries', icon: 'visibility' },
    ],
    featured: null
  },
  {
    id: 'wellness',
    label: 'Wellness & Aesthetics',
    icon: 'self_improvement',
    color: 'text-lime-500',
    subCategories: [
      { name: 'Diet & Nutrition', link: '/wellness', icon: 'restaurant_menu' },
      { name: 'Skin & Hair Clinic', link: '/skin-hair', icon: 'face' },
      { name: 'Mental Health', link: '/wellness', icon: 'psychology' },
      { name: 'Yoga & Fitness', link: '/wellness', icon: 'fitness_center' },
    ],
    featured: null
  },
  {
    id: 'scans',
    label: 'Scans & MRI',
    icon: 'radiology',
    color: 'text-indigo-500',
    subCategories: [
      { name: 'MRI Scan', link: '/scans', icon: 'document_scanner' },
      { name: 'CT Scan', link: '/scans', icon: 'scanner' },
      { name: 'Ultrasound', link: '/scans', icon: 'baby_changing_station' },
      { name: 'X-Ray', link: '/scans', icon: 'skeleton' },
    ],
    featured: null
  },
  {
    id: 'emergency',
    label: 'Emergency & More',
    icon: 'emergency',
    color: 'text-red-500',
    subCategories: [
      { name: 'Book Ambulance', link: '/ambulance', icon: 'ambulance' },
      { name: 'Blood Banks', link: '/blood-banks', icon: 'bloodtype' },
      { name: 'Health Insurance', link: '/insurance', icon: 'security' },
      { name: 'Hospitals', link: '/hospitals', icon: 'apartment' },
      { name: 'Health Feed', link: '/health-feed', icon: 'feed' },
    ],
    featured: null
  }
];

export default function MegaMenu({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(MENU_DATA[0]);

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div 
        className="absolute top-full left-0 w-[850px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex z-[60] animate-in fade-in slide-in-from-top-2 duration-200 mt-2"
        onMouseLeave={onClose}
    >
      <div className="w-64 bg-gray-50 dark:bg-gray-800/50 border-r border-gray-100 dark:border-gray-800 p-2 flex flex-col gap-1">
        {MENU_DATA.map((cat) => (
          <button
            key={cat.id}
            onMouseEnter={() => setActiveCategory(cat)}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
              activeCategory.id === cat.id
                ? 'bg-white dark:bg-gray-700 shadow-sm text-slate-900 dark:text-white font-bold ring-1 ring-gray-100 dark:ring-gray-600'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <span className={`material-symbols-outlined ${activeCategory.id === cat.id ? cat.color : ''}`}>
              {cat.icon}
            </span>
            <span className="text-sm">{cat.label}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
                <span className={`material-symbols-outlined text-2xl ${activeCategory.color}`}>{activeCategory.icon}</span>
                {activeCategory.label}
            </h3>
            <button 
                onClick={() => handleNavigate(activeCategory.subCategories[0].link)}
                className="text-xs font-bold text-primary hover:underline uppercase tracking-widest"
            >
                View Hub
            </button>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {activeCategory.subCategories.map((sub, idx) => (
                <button
                    key={idx}
                    onClick={() => handleNavigate(sub.link)}
                    className="flex items-center gap-4 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-left group"
                >
                    <div className="size-10 rounded-xl bg-white dark:bg-gray-700 shadow-sm border border-gray-100 dark:border-gray-600 flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:border-primary/20 transition-colors">
                        <span className="material-symbols-outlined">{sub.icon}</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-700 dark:text-gray-300 group-hover:text-primary transition-colors">
                        {sub.name}
                    </span>
                </button>
            ))}
        </div>

        {activeCategory.featured && (
            <div className={`mt-8 p-5 rounded-2xl flex items-center justify-between ${activeCategory.featured.bg} dark:bg-gray-800/80 border border-white dark:border-gray-700 shadow-inner`}>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Exclusive</p>
                    <h4 className="font-black text-lg text-slate-900 dark:text-white">{activeCategory.featured.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-bold">{activeCategory.featured.subtitle}</p>
                </div>
                <img src={activeCategory.featured.image} alt="Promo" className="h-14 w-14 object-contain drop-shadow-lg" />
            </div>
        )}
      </div>
    </div>
  );
}

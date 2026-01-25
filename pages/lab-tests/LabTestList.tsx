
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LAB_TESTS } from '../../constants';
import { useLocationStore } from '../../store/locationStore';
import LocationModal from '../../components/ui/LocationModal';
import { ServiceCardSkeleton } from '../../components/ui/Skeletons';

interface CategoryItemProps {
  icon: string;
  label: string;
  onClick: () => void;
  isActive: boolean;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ icon, label, onClick, isActive }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center gap-2 group shrink-0"
  >
    <div className={`size-16 rounded-2xl flex items-center justify-center border group-active:scale-95 transition-all duration-200 shadow-sm ${isActive ? 'bg-primary border-primary text-white' : 'bg-white dark:bg-gray-800 text-slate-600 border-gray-100 dark:border-gray-700'}`}>
      <span className={`material-symbols-outlined text-3xl`}>{icon}</span>
    </div>
    <span className={`text-[10px] font-black uppercase tracking-widest text-center leading-tight ${isActive ? 'text-primary' : 'text-slate-500'}`}>{label}</span>
  </button>
);

export default function LabTestList() {
  const navigate = useNavigate();
  const { city } = useLocationStore();
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { label: 'All', icon: 'grid_view' },
    { label: 'Full Body', icon: 'accessibility_new' },
    { label: 'Diabetes', icon: 'water_drop' },
    { label: 'Thyroid', icon: 'science' },
    { label: 'Fever', icon: 'thermometer' },
    { label: 'Women Health', icon: 'pregnant_woman' },
  ];

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, [selectedCat, search]);

  const filteredTests = LAB_TESTS.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCat === 'All' || test.category === selectedCat;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white pb-32 font-sans relative overflow-x-hidden">
      <LocationModal isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)} />

      <header className="sticky top-0 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full text-primary cursor-pointer hover:bg-primary/20 transition-colors">
              <span className="material-symbols-outlined text-2xl">arrow_back</span>
            </button>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Zone: Kurnool</span>
              <div onClick={() => setIsLocationModalOpen(true)} className="flex items-center gap-1 cursor-pointer">
                <h1 className="text-lg font-bold leading-none">{city || 'Kurnool'}</h1>
                <span className="material-symbols-outlined text-lg">expand_more</span>
              </div>
            </div>
          </div>
          <button onClick={() => navigate('/cart')} className="size-10 rounded-full bg-slate-100 dark:bg-gray-800 flex items-center justify-center">
            <span className="material-symbols-outlined">shopping_cart</span>
          </button>
        </div>
        
        <div className="px-4 pb-3">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">search</span>
            <input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl border-none bg-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-primary transition-all font-medium" 
              placeholder="Search health packages..." 
            />
          </div>
        </div>

        <div className="flex gap-4 px-4 py-4 overflow-x-auto no-scrollbar">
          {categories.map((c) => (
            <CategoryItem 
              key={c.label} 
              icon={c.icon} 
              label={c.label} 
              isActive={selectedCat === c.label}
              onClick={() => setSelectedCat(c.label)} 
            />
          ))}
        </div>
      </header>

      <main className="p-4 flex flex-col gap-4 max-w-lg mx-auto w-full">
        {isLoading ? (
          Array(4).fill(0).map((_, i) => <ServiceCardSkeleton key={i} />)
        ) : (
          filteredTests.map((test) => (
            <div 
              key={test.id} 
              onClick={() => navigate(`/lab-tests/${test.id}`)}
              className="bg-white dark:bg-gray-800 rounded-[2rem] p-5 border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden cursor-pointer active:scale-[0.98] transition-all"
            >
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-widest">{test.discount}</div>
              <div className="size-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-primary mb-4 shadow-inner">
                 <span className="material-symbols-outlined text-2xl">biotech</span>
              </div>
              <h4 className="text-xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">{test.name}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mb-4 line-clamp-1">{test.description}</p>
              
              <div className="flex items-center gap-3 mb-5">
                 <span className="px-2 py-0.5 bg-slate-50 dark:bg-gray-700 rounded-md text-[10px] font-black text-slate-400 uppercase tracking-tighter">{test.parameterCount} PARAMETERS</span>
                 <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 rounded-md text-[10px] font-black text-blue-500 uppercase tracking-tighter">REPORT: {test.reportTime}</span>
              </div>

              <div className="pt-4 border-t border-slate-50 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400 line-through font-bold">₹{test.mrp}</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">₹{test.price}</p>
                </div>
                <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 h-11 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all">
                   Book
                </button>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}

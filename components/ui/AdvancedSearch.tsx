
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MEDICINES, DOCTORS, LAB_TESTS, MEDICAL_SCANS } from '../../constants';
import { useCartStore } from '../../store/cartStore';
import { useUserStore } from '../../store/userStore';

type SearchResult = {
  id: string;
  name: string;
  type: 'medicine' | 'doctor' | 'lab' | 'scan';
  subText: string;
  image?: string;
  url: string;
};

const getSearchResults = (query: string): SearchResult[] => {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const results: SearchResult[] = [];

  MEDICINES.forEach(m => {
    if (m.name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q)) {
      results.push({ id: m.id, name: m.name, type: 'medicine', subText: `Medicine • ${m.category}`, image: m.image, url: `/medicines/${m.id}` });
    }
  });

  DOCTORS.forEach(d => {
    if (d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q)) {
      results.push({ id: d.id, name: d.name, type: 'doctor', subText: `Doctor • ${d.specialty}`, image: d.image, url: `/doctors/${d.id}` });
    }
  });

  LAB_TESTS.forEach(l => {
    if (l.name.toLowerCase().includes(q) || l.category?.toLowerCase().includes(q)) {
      results.push({ id: l.id, name: l.name, type: 'lab', subText: `Lab Test • ${l.parameterCount} Parameters`, url: `/lab-tests/${l.id}` });
    }
  });

  return results.slice(0, 10);
};

export default function AdvancedSearch() {
  const navigate = useNavigate();
  const { language } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const t = (en: string, te: string) => language === 'te' ? te : en;

  const placeholders = [
    t('Search "Dolo 650"', 'శోధించండి "డోలో 650"'),
    t('Search "Cardiologist"', 'శోధించండి "కార్డియాలజిస్ట్"'),
    t('Search "MRI Brain"', 'శోధించండి "MRI బ్రెయిన్"'),
    t('Search "Full Body Checkup"', 'శోధించండి "ఫుల్ బాడీ చెకప్"')
  ];

  useEffect(() => {
    if (isOpen) return;
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isOpen, placeholders.length]);

  useEffect(() => {
    if (query.length >= 2) setResults(getSearchResults(query));
    else setResults([]);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectResult = (result: SearchResult) => {
    setIsOpen(false);
    setQuery('');
    navigate(result.url);
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'medicine': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30';
      case 'doctor': return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30';
      case 'lab': return 'bg-teal-100 text-teal-600 dark:bg-teal-900/30';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div ref={containerRef} className="relative z-50 w-full">
      <form 
        onSubmit={(e) => e.preventDefault()}
        onClick={() => setIsOpen(true)}
        className={`relative flex items-center w-full h-[52px] bg-slate-100 dark:bg-gray-800 rounded-2xl transition-all duration-300 group ${
          isOpen 
          ? 'bg-white dark:bg-gray-800 shadow-xl ring-2 ring-primary scale-[1.02]' 
          : 'shadow-inner'
        }`}
      >
        <div className="pl-4 pr-3 text-slate-400 group-focus-within:text-primary transition-colors">
          <span className="material-symbols-outlined text-2xl">search</span>
        </div>
        
        <div className="flex-1 relative h-full flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            className="w-full h-full bg-transparent border-none focus:ring-0 text-base font-medium text-slate-900 dark:text-white placeholder-transparent z-10"
            autoComplete="off"
          />
          {!query && (
            <div className="absolute inset-0 flex items-center pointer-events-none">
              <span className="text-slate-400 dark:text-gray-500 text-sm font-bold animate-fade-in transition-all">
                {placeholders[placeholderIndex]}
              </span>
            </div>
          )}
        </div>

        {!query && (
            <button 
                type="button"
                onClick={(e) => { e.stopPropagation(); navigate('/upload-rx'); }}
                className="mr-2 size-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg active:scale-95 transition-all"
                title={t("Upload Medicine Photo", "మందుల ఫోటోను అప్‌లోడ్ చేయండి")}
            >
                <span className="material-symbols-outlined text-2xl">photo_camera</span>
            </button>
        )}

        {query && (
          <button 
            type="button"
            onClick={(e) => { e.stopPropagation(); setQuery(''); inputRef.current?.focus(); }}
            className="p-2 mr-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        )}
      </form>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-gray-900 rounded-2xl shadow-float border border-gray-100 dark:border-gray-800 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 max-h-[70vh] overflow-y-auto no-scrollbar">
          {query.length >= 2 && results.length > 0 && (
            <div className="py-2">
              <p className="px-4 py-2 text-xs font-black text-gray-400 uppercase tracking-widest">{t("Best Matches", "ఉత్తమ ఫలితాలు")}</p>
              {results.map((item) => (
                <div 
                  key={`${item.type}-${item.id}`}
                  onClick={() => handleSelectResult(item)}
                  className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer flex items-center gap-3 transition-colors border-b border-gray-50 dark:border-gray-800 last:border-0"
                >
                   <div className={`size-10 shrink-0 rounded-xl flex items-center justify-center ${getColor(item.type)}`}>
                      {item.image && item.type === 'medicine' ? (
                        <img src={item.image} className="size-full object-cover rounded-xl" alt="" />
                      ) : (
                        <span className="material-symbols-outlined text-xl">{item.type === 'medicine' ? 'pill' : item.type === 'doctor' ? 'stethoscope' : 'science'}</span>
                      )}
                   </div>
                   <div className="flex-1">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{item.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.subText}</p>
                   </div>
                   <span className="material-symbols-outlined text-gray-300 text-xl -rotate-45">arrow_upward</span>
                </div>
              ))}
            </div>
          )}

          {query.length < 2 && (
             <div className="p-4">
               <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                 <span className="material-symbols-outlined text-sm text-secondary">trending_up</span> {t("Trending in Kurnool", "కర్నూలులో ట్రెండింగ్")}
               </p>
               <div className="flex flex-wrap gap-2">
                  {['Fever', 'Dolo 650', 'Full Body Checkup', 'Dermatologist', 'MRI Scan'].map(tag => (
                    <button 
                      key={tag} 
                      onClick={() => setQuery(tag)}
                      className="px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm hover:border-primary transition-all"
                    >
                      {tag}
                    </button>
                  ))}
               </div>
             </div>
          )}
        </div>
      )}
    </div>
  );
}

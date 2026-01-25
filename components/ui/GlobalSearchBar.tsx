
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MEDICINES, DOCTORS, LAB_TESTS, MEDICAL_SCANS } from '../../constants';

type SearchResult = {
  id: string;
  name: string;
  type: 'Medicine' | 'Doctor' | 'Lab Test' | 'Scan' | 'Page';
  detail: string;
  url: string;
  matchType?: 'name' | 'composition' | 'symptom' | 'specialty';
};

const PAGES = [
    { id: 'p1', name: 'My Orders', type: 'Page', detail: 'Track active orders', url: '/bookings' },
    { id: 'p2', name: 'Profile', type: 'Page', detail: 'Edit details', url: '/profile' },
    { id: 'p3', name: 'Ambulance', type: 'Page', detail: 'Emergency Booking', url: '/ambulance' },
];

const getSmartResults = (query: string): SearchResult[] => {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: SearchResult[] = [];

  // 1. Medicines (Search Name, Composition, Indications)
  MEDICINES.forEach(m => {
    if (m.name.toLowerCase().includes(q)) {
        results.push({ id: m.id, name: m.name, type: 'Medicine', detail: `Contains ${m.composition}`, url: `/medicines/${m.id}`, matchType: 'name' });
    } else if (m.composition.toLowerCase().includes(q)) {
        results.push({ id: m.id, name: m.name, type: 'Medicine', detail: `Matches composition: ${m.composition}`, url: `/medicines/${m.id}`, matchType: 'composition' });
    } else if (m.indications.some(i => i.toLowerCase().includes(q))) {
        results.push({ id: m.id, name: m.name, type: 'Medicine', detail: `Used for: ${m.indications.join(', ')}`, url: `/medicines/${m.id}`, matchType: 'symptom' });
    }
  });

  // 2. Doctors (Search Name, Specialty)
  DOCTORS.forEach(d => {
    if (d.name.toLowerCase().includes(q)) {
        results.push({ id: d.id, name: d.name, type: 'Doctor', detail: d.specialty, url: `/doctors/${d.id}`, matchType: 'name' });
    } else if (d.specialty.toLowerCase().includes(q)) {
        results.push({ id: d.id, name: d.name, type: 'Doctor', detail: `Specialist in ${d.specialty}`, url: `/doctors/${d.id}`, matchType: 'specialty' });
    }
  });

  // 3. Labs
  LAB_TESTS.forEach(l => {
    if (l.name.toLowerCase().includes(q)) {
        results.push({ id: l.id, name: l.name, type: 'Lab Test', detail: l.category, url: `/lab-tests/${l.id}`, matchType: 'name' });
    }
  });

  // 4. Scans
  MEDICAL_SCANS.forEach(s => {
    if (s.name.toLowerCase().includes(q) || s.bodyPart.toLowerCase().includes(q)) {
        results.push({ id: s.id, name: s.name, type: 'Scan', detail: `Scan for ${s.bodyPart}`, url: `/scans/${s.id}`, matchType: 'name' });
    }
  });

  // 5. Pages
  PAGES.forEach(p => {
      if (p.name.toLowerCase().includes(q) || p.detail.toLowerCase().includes(q)) {
          results.push({ ...p, type: 'Page' } as any);
      }
  });

  return results.slice(0, 8); // Limit
};

export default function GlobalSearchBar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setResults(getSmartResults(query));
  }, [query]);

  // Click outside close
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
            setIsOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSelect = (res: SearchResult) => {
      setQuery('');
      setIsOpen(false);
      navigate(res.url);
  };

  const getTypeIcon = (type: string) => {
      switch(type) {
          case 'Medicine': return 'pill';
          case 'Doctor': return 'stethoscope';
          case 'Lab Test': return 'biotech';
          case 'Scan': return 'radiology';
          case 'Page': return 'link';
          default: return 'search';
      }
  };

  return (
    <div ref={containerRef} className="relative w-full z-50">
        <div className={`flex items-center h-12 bg-gray-50 dark:bg-gray-800 border rounded-xl px-4 transition-all ${isOpen ? 'border-primary ring-2 ring-primary/10' : 'border-gray-200 dark:border-gray-700'}`}>
            <span className="material-symbols-outlined text-gray-400">search</span>
            <input 
                className="w-full bg-transparent border-none focus:ring-0 text-sm ml-2 placeholder:text-gray-400 dark:text-white"
                placeholder="Search 'Paracetamol', 'Fever', 'Cardiologist'..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsOpen(true)}
            />
            {query && (
                <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600">
                    <span className="material-symbols-outlined text-lg">close</span>
                </button>
            )}
        </div>

        {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden max-h-[60vh] overflow-y-auto">
                {results.length > 0 ? (
                    <div>
                        <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50 text-[10px] font-bold text-gray-500 uppercase tracking-widest sticky top-0 backdrop-blur-sm">
                            Best Matches
                        </div>
                        {results.map((res) => (
                            <button 
                                key={`${res.type}-${res.id}`}
                                onClick={() => handleSelect(res)}
                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/10 text-left transition-colors border-b border-gray-50 dark:border-gray-800 last:border-0"
                            >
                                <div className="size-8 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 shrink-0">
                                    <span className="material-symbols-outlined text-lg">{getTypeIcon(res.type)}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">{res.name}</p>
                                    <p className="text-xs text-gray-500 flex items-center gap-1">
                                        <span className="opacity-75">{res.type}</span>
                                        <span className="size-1 rounded-full bg-gray-300"></span>
                                        <span className="text-primary">{res.detail}</span>
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                ) : query.length > 1 ? (
                    <div className="p-8 text-center text-gray-400">
                        <span className="material-symbols-outlined text-4xl mb-2">manage_search</span>
                        <p className="text-sm">No results found for "{query}"</p>
                        <p className="text-xs mt-1">Try searching for a symptom like "Fever"</p>
                    </div>
                ) : (
                    <div className="p-4">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Quick Links</p>
                        <div className="flex flex-wrap gap-2">
                            {['Dolo 650', 'Fever', 'Diabetes', 'MRI Brain', 'Dentist'].map(tag => (
                                <button key={tag} onClick={() => setQuery(tag)} className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-primary hover:text-white transition-colors">
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

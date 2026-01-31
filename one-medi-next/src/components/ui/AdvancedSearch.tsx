'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MEDICINES, DOCTORS, LAB_TESTS, MEDICAL_SCANS } from '../../constants';
import { useCartStore } from '../../store/cartStore';

// --- Types ---
type SearchResult = {
  id: string;
  name: string;
  type: 'medicine' | 'doctor' | 'lab' | 'scan';
  subText: string;
  image?: string;
  url: string;
};

// --- Helper: Fuzzy Search Logic ---
const getSearchResults = (query: string): SearchResult[] => {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: SearchResult[] = [];

  // 1. Medicines
  MEDICINES.forEach(m => {
    if (m.name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q)) {
      results.push({
        id: m.id,
        name: m.name,
        type: 'medicine',
        subText: `Medicine • ${m.category}`,
        image: m.image,
        url: `/medicines/${m.id}`
      });
    }
  });

  // 2. Doctors
  DOCTORS.forEach(d => {
    if (d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q)) {
      results.push({
        id: d.id,
        name: d.name,
        type: 'doctor',
        subText: `Doctor • ${d.specialty}`,
        image: d.image,
        url: `/doctors/${d.id}`
      });
    }
  });

  // 3. Lab Tests
  LAB_TESTS.forEach(l => {
    if (l.name.toLowerCase().includes(q) || l.category?.toLowerCase().includes(q)) {
      results.push({
        id: l.id,
        name: l.name,
        type: 'lab',
        subText: `Lab Test • ${l.parameterCount} Parameters`,
        url: `/lab-tests/${l.id}`
      });
    }
  });

  // 4. Scans
  MEDICAL_SCANS.forEach(s => {
    if (s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)) {
      results.push({
        id: s.id,
        name: s.name,
        type: 'scan',
        subText: `Scan • ${s.bodyPart}`,
        image: s.image,
        url: `/scans/detail` // Usually needs ID passing logic handled in component
      });
    }
  });

  // Simple Ranking: StartsWith > Includes
  return results.sort((a, b) => {
    const aStarts = a.name.toLowerCase().startsWith(q);
    const bStarts = b.name.toLowerCase().startsWith(q);
    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;
    return 0;
  }).slice(0, 10); // Limit results
};

export default function AdvancedSearch() {
  const router = useRouter();
  const setPrescription = useCartStore((state) => state.setPrescription);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const placeholders = [
    'Search "Dolo 650"',
    'Search "Cardiologist"',
    'Search "MRI Brain"',
    'Search "Full Body Checkup"',
    'Search "Diabetes"'
  ];

  // Load Recent Searches
  useEffect(() => {
    const saved = localStorage.getItem('oneMedi_recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Rotating Placeholder
  useEffect(() => {
    if (isOpen) return;
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Handle Search Input
  useEffect(() => {
    if (query.length >= 2) {
      setResults(getSearchResults(query));
    } else {
      setResults([]);
    }
  }, [query]);

  // Click Outside to Close
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
    saveRecent(result.name);
    setIsOpen(false);
    setQuery('');
    if (result.type === 'scan') {
      router.push(`${result.url}?scanId=${result.id}`);
    } else {
      router.push(result.url);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    saveRecent(query);
    setIsOpen(false);
    // Generic search page navigation could go here
    // navigate(`/search?q=${query}`);
  };

  const saveRecent = (term: string) => {
    const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('oneMedi_recentSearches', JSON.stringify(updated));
  };

  const removeRecent = (term: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = recentSearches.filter(s => s !== term);
    setRecentSearches(updated);
    localStorage.setItem('oneMedi_recentSearches', JSON.stringify(updated));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'medicine': return 'pill';
      case 'doctor': return 'stethoscope';
      case 'lab': return 'science';
      case 'scan': return 'radiology';
      default: return 'search';
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'medicine': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      case 'doctor': return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400';
      case 'lab': return 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400';
      case 'scan': return 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div ref={containerRef} className="relative z-50 w-full">
      {/* Search Bar Input */}
      <form
        onSubmit={handleSearchSubmit}
        onClick={() => setIsOpen(true)}
        className={`relative flex items-center w-full h-[52px] bg-slate-100 dark:bg-gray-800 rounded-2xl transition-all duration-300 group ${isOpen
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

          {/* Animated Placeholder */}
          {!query && (
            <div className="absolute inset-0 flex items-center pointer-events-none">
              <span className="text-slate-400 dark:text-gray-500 text-base animate-fade-in-up transition-all">
                {placeholders[placeholderIndex]}
              </span>
            </div>
          )}
        </div>

        {query && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setQuery(''); inputRef.current?.focus(); }}
            className="p-2 mr-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        )}

        {!isOpen && !query && (
          <div className="pr-2">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); router.push('/upload-rx'); }}
              className="bg-white dark:bg-gray-700 p-1.5 pl-2 pr-2.5 rounded-xl shadow-sm flex items-center gap-1 text-primary dark:text-blue-400 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">document_scanner</span>
              <span className="text-[10px] font-black uppercase tracking-wider hidden xs:inline-block">Rx</span>
            </button>
          </div>
        )}
      </form>

      {/* Expanded Overlay */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-gray-900 rounded-2xl shadow-float border border-gray-100 dark:border-gray-800 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 max-h-[70vh] overflow-y-auto no-scrollbar">

          {/* 1. Results List */}
          {query.length >= 2 && results.length > 0 && (
            <div className="py-2">
              <p className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Best Matches</p>
              {results.map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  onClick={() => handleSelectResult(item)}
                  className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer flex items-center gap-3 transition-colors border-b border-gray-50 dark:border-gray-800 last:border-0"
                >
                  <div className={`size-10 shrink-0 rounded-xl flex items-center justify-center ${getColor(item.type)} relative overflow-hidden`}>
                    {item.image && item.type !== 'scan' && item.type !== 'lab' ? (
                      <Image src={item.image} fill className="object-cover rounded-xl" alt="" unoptimized />
                    ) : (
                      <span className="material-symbols-outlined text-xl">{getIcon(item.type)}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight" dangerouslySetInnerHTML={{
                      __html: item.name.replace(new RegExp(query, 'gi'), (match) => `<span class="text-primary">${match}</span>`)
                    }}></h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.subText}</p>
                  </div>
                  <span className="material-symbols-outlined text-gray-300 text-xl -rotate-45">arrow_upward</span>
                </div>
              ))}
            </div>
          )}

          {/* 2. No Results State */}
          {query.length >= 2 && results.length === 0 && (
            <div className="p-8 text-center text-gray-400">
              <div className="bg-gray-50 dark:bg-gray-800 size-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="material-symbols-outlined text-3xl">search_off</span>
              </div>
              <p className="text-sm font-medium">No results found for "{query}"</p>
              <p className="text-xs mt-1">Try checking for typos or use broader terms.</p>
            </div>
          )}

          {/* 3. Recent Searches (Only when query is empty) */}
          {query.length < 2 && recentSearches.length > 0 && (
            <div className="py-2">
              <div className="flex justify-between items-center px-4 py-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Recent</p>
                <button onClick={() => { setRecentSearches([]); localStorage.removeItem('oneMedi_recentSearches'); }} className="text-[10px] font-bold text-primary hover:underline">Clear All</button>
              </div>
              {recentSearches.map((term, i) => (
                <div
                  key={i}
                  onClick={() => setQuery(term)}
                  className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer flex items-center gap-3 transition-colors group"
                >
                  <span className="material-symbols-outlined text-gray-400 text-xl">history</span>
                  <span className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-300">{term}</span>
                  <button onClick={(e) => removeRecent(term, e)} className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* 4. Trending Suggestions (Default State) */}
          {query.length < 2 && (
            <div className="py-2 bg-slate-50/50 dark:bg-gray-800/50">
              <p className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-secondary">trending_up</span> Trending Now
              </p>
              <div className="px-4 pb-3 flex flex-wrap gap-2">
                {['Fever', 'Dolo 650', 'Full Body Checkup', 'Dermatologist', 'MRI Scan'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm hover:border-primary hover:text-primary transition-colors"
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

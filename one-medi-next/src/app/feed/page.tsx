'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CARE_GUIDES } from '@/constants';

export default function HealthFeedPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('All');
    const [search, setSearch] = useState('');

    const tabs = ['All', 'Nutrition', 'Fitness', 'Ayurveda', 'General Health', 'Chronic Care'];

    // Featured Item (First featured or first item)
    const featuredItem = CARE_GUIDES.find(g => g.isFeatured) || CARE_GUIDES[0];

    // Filtered List (Excluding featured item if desired, but for now we keep behavior simple)
    // To avoid duplication we could filter out the featured item ID if we wanted.
    const feedItems = CARE_GUIDES.filter(item => {
        const matchesTab = activeTab === 'All' || item.category === activeTab;
        const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white pb-24 font-sans">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3 p-4">
                    <button onClick={() => router.back()} className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                    </button>
                    <div className="flex-1">
                        <h1 className="text-xl font-black tracking-tight leading-none">Health Feed</h1>
                        <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-0.5">Trusted Advice</p>
                    </div>
                    <button className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <span className="material-symbols-outlined text-[24px]">bookmark_border</span>
                    </button>
                </div>

                {/* Search & Filter */}
                <div className="px-4 pb-3 space-y-3">
                    <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2.5 border border-transparent focus-within:border-primary/30 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                        <span className="material-symbols-outlined text-gray-400 text-xl">search</span>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search health tips, videos..."
                            className="bg-transparent border-none focus:ring-0 w-full text-sm font-medium ml-2 placeholder:text-gray-400 focus:outline-none"
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`h-8 px-4 rounded-full text-xs font-black uppercase tracking-wide whitespace-nowrap transition-all ${activeTab === tab
                                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-slate-500'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <main className="p-4 flex flex-col gap-6">
                {/* Featured Hero Card */}
                {activeTab === 'All' && !search && featuredItem && (
                    <div className="relative h-[340px] rounded-[2.5rem] overflow-hidden shadow-xl group cursor-pointer animate-fade-in">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={featuredItem.image} alt={featuredItem.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                        <div className="absolute top-4 left-4 flex gap-2">
                            <span className="bg-red-500 text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest shadow-sm">Trending</span>
                            {featuredItem.type === 'video' && (
                                <span className="bg-black/50 backdrop-blur-md text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
                                    <span className="material-symbols-outlined text-xs filled">play_circle</span> Video
                                </span>
                            )}
                        </div>

                        <div className="absolute bottom-0 left-0 p-6 w-full">
                            <span className="text-orange-300 font-black text-[10px] uppercase tracking-[0.2em] mb-2 block">{featuredItem.category}</span>
                            <h2 className="text-white text-2xl font-black leading-tight mb-3 line-clamp-2">{featuredItem.title}</h2>
                            <div className="flex items-center gap-3 text-white/80 text-xs font-medium">
                                <div className="flex items-center gap-1.5">
                                    <div className="size-5 bg-white/20 rounded-full flex items-center justify-center text-white">
                                        <span className="material-symbols-outlined text-[14px]">person</span>
                                    </div>
                                    {featuredItem.author}
                                </div>
                                <span>•</span>
                                <span>{featuredItem.type === 'video' ? featuredItem.videoDuration : featuredItem.readTime}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Feed Grid */}
                <div className="grid grid-cols-1 gap-6">
                    {feedItems.map((item) => (
                        <div key={item.id} className="flex gap-4 group cursor-pointer">
                            {/* Thumbnail */}
                            <div className="relative w-32 h-24 sm:w-40 sm:h-28 shrink-0 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

                                {item.type === 'video' && (
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                        <div className="size-8 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-sm">
                                            <span className="material-symbols-outlined text-white text-lg filled">play_arrow</span>
                                        </div>
                                    </div>
                                )}

                                {item.type === 'video' && (
                                    <div className="absolute bottom-1 right-1 bg-black/70 px-1.5 py-0.5 rounded text-[8px] font-bold text-white">
                                        {item.videoDuration}
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 flex flex-col justify-between py-0.5">
                                <div>
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-[9px] font-black text-primary uppercase tracking-widest">{item.category}</span>
                                        <button className="text-gray-300 hover:text-gray-500"><span className="material-symbols-outlined text-lg">more_horiz</span></button>
                                    </div>
                                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>
                                </div>

                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-[10px] text-gray-500 font-medium">
                                        {item.authorRole ? `${item.author}, ${item.authorRole}` : item.author}
                                    </span>
                                    <span className="size-0.5 bg-gray-300 rounded-full"></span>
                                    <span className="text-[10px] text-gray-400 font-medium">{item.publishDate}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {feedItems.length === 0 && (
                    <div className="text-center py-12">
                        <div className="size-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                            <span className="material-symbols-outlined text-3xl">article</span>
                        </div>
                        <p className="text-gray-500 font-bold text-sm">No articles found.</p>
                    </div>
                )}
            </main>
        </div>
    );
}

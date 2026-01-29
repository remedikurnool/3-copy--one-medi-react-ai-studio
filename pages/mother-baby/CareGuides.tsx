
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHealthContentByCategory, HealthContent } from '../../hooks';

export default function CareGuides() {
   const navigate = useNavigate();
   const [activeCategory, setActiveCategory] = useState('Pregnancy');

   // Fetch mother-baby related content
   const { data: content, loading, error } = useHealthContentByCategory(activeCategory);

   // Category filters for mother-baby care
   const categories = ['Pregnancy', 'Newborn', 'Post-Delivery', 'Nutrition'];

   // Featured article
   const featuredArticle = useMemo(() => {
      if (!content || content.length === 0) return null;
      return content[0];
   }, [content]);

   return (
      <div className="min-h-screen bg-[#fffafa] dark:bg-bg-dark text-slate-900 dark:text-white pb-32 font-sans">
         <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl border-b border-rose-100 dark:border-gray-800">
            <div className="flex items-center gap-3 p-4">
               <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full bg-rose-50 dark:bg-gray-800 text-rose-500 transition-transform active:scale-90">
                  <span className="material-symbols-outlined">arrow_back</span>
               </button>
               <div className="flex flex-col">
                  <h1 className="text-xl font-black tracking-tight text-rose-600 dark:text-rose-400 uppercase leading-none">Care Guides</h1>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Knowledge is Care</p>
               </div>
            </div>
         </header>

         <main className="max-w-5xl mx-auto p-4 flex flex-col gap-8">
            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
               {categories.map(cat => (
                  <button
                     key={cat}
                     onClick={() => setActiveCategory(cat)}
                     className={`h-10 px-6 rounded-2xl border text-[10px] font-black uppercase tracking-widest shadow-sm transition-all ${activeCategory === cat
                           ? 'bg-rose-500 text-white border-rose-500'
                           : 'bg-white dark:bg-gray-800 border-rose-100 dark:border-gray-700'
                        }`}
                  >
                     {cat}
                  </button>
               ))}
            </div>

            {/* Loading State */}
            {loading && (
               <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-rose-500 border-t-transparent"></div>
               </div>
            )}

            {/* Error State */}
            {error && (
               <div className="text-center py-8 text-red-500">
                  <span className="material-symbols-outlined text-4xl mb-2">error</span>
                  <p className="text-sm">Failed to load guides. Please try again.</p>
               </div>
            )}

            {/* Featured Article */}
            {!loading && featuredArticle && (
               <section className="relative h-72 rounded-[3rem] overflow-hidden group shadow-float cursor-pointer">
                  <img
                     src={featuredArticle.thumbnail_url || 'https://images.unsplash.com/photo-1559839734-2b71f1e3c770?auto=format&fit=crop&q=80&w=1200'}
                     alt={featuredArticle.title}
                     className="size-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8">
                     <span className="bg-rose-500 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-3 inline-block">{featuredArticle.category}</span>
                     <h2 className="text-3xl font-black text-white leading-none mb-4">{featuredArticle.title}</h2>
                     <button className="flex items-center gap-2 text-white font-black text-[10px] uppercase tracking-widest group">
                        Start Reading <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                     </button>
                  </div>
               </section>
            )}

            {/* Article List */}
            {!loading && (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(content || []).slice(1).map(article => (
                     <div key={article.id} className="flex gap-4 p-4 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-rose-50 dark:border-slate-800 group cursor-pointer hover:shadow-md transition-all">
                        <div className="size-24 rounded-2xl overflow-hidden shrink-0">
                           <img
                              src={article.thumbnail_url || 'https://images.unsplash.com/photo-1559839734-2b71f1e3c770?auto=format&fit=crop&q=80&w=400'}
                              alt={article.title}
                              className="size-full object-cover group-hover:scale-110 transition-transform duration-500"
                           />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                           <div className="flex justify-between items-center mb-1">
                              <span className="text-[8px] font-black text-primary uppercase tracking-widest">{article.category}</span>
                              <span className="text-[8px] font-bold text-slate-400 uppercase">{article.read_time_minutes} min</span>
                           </div>
                           <h4 className="text-base font-black text-slate-900 dark:text-white leading-tight mb-2">{article.title}</h4>
                           <p className="text-[10px] text-slate-400 font-medium line-clamp-2">{article.content_body?.substring(0, 100) || 'Read more about this topic...'}</p>

                           <div className="flex items-center gap-2 mt-3 pt-3 border-t border-rose-50 dark:border-slate-800">
                              <div className="size-5 rounded-full bg-rose-100 flex items-center justify-center text-rose-500">
                                 <span className="material-symbols-outlined text-[14px]">person</span>
                              </div>
                              <p className="text-[9px] font-bold text-slate-500">By {article.author_name || 'OneMedi Team'} • {new Date(article.published_at).toLocaleDateString()}</p>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            )}

            {!loading && (!content || content.length === 0) && (
               <div className="text-center py-12">
                  <div className="size-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                     <span className="material-symbols-outlined text-3xl">article</span>
                  </div>
                  <p className="text-gray-500 font-bold text-sm">No guides found for this category.</p>
               </div>
            )}

            {/* Subscription Nudge */}
            <section className="bg-slate-900 rounded-[3rem] p-8 text-white text-center">
               <h3 className="text-2xl font-black mb-2">Want a Personalized Guide?</h3>
               <p className="text-slate-400 text-xs font-bold mb-6 max-w-xs mx-auto">Get trimester-wise content delivered to your WhatsApp weekly.</p>
               <button className="bg-white text-slate-900 px-8 h-12 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all">Join ONE MEDI Mom Club</button>
            </section>
         </main>
      </div>
   );
}

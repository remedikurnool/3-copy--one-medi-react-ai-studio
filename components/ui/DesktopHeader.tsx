import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useLocationStore } from '../../store/locationStore';
import { useUserStore } from '../../store/userStore';
import MegaMenu from './MegaMenu';
import LocationModal from './LocationModal';
import GlobalSearchBar from './GlobalSearchBar';

export default function DesktopHeader() {
  const navigate = useNavigate();
  const cartItemsCount = useCartStore((state) => state.items.length);
  const { city } = useLocationStore();
  const { isAuthenticated, profile } = useUserStore();
  
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  return (
    <>
      <LocationModal isOpen={isLocationModalOpen} onClose={() => setIsLocationModalOpen(false)} />
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 hidden lg:block">
        <div className="bg-primary/5 dark:bg-gray-800/50 py-1.5 px-4 border-b border-gray-50 dark:border-gray-800">
          <div className="max-w-7xl mx-auto flex justify-between items-center text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            <div className="flex gap-6">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">call</span> Support: 94296-90055</span>
              <span className="flex items-center gap-1 text-red-500"><span className="material-symbols-outlined text-sm">ambulance</span> Emergency: 108</span>
            </div>
            <div className="flex gap-6">
              <Link to="/bookings" className="hover:text-primary transition-colors">Track Order</Link>
              <Link to="/chat" className="hover:text-primary transition-colors">Help Center</Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="size-11 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
              <span className="material-symbols-outlined text-2xl">local_hospital</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-none">ONE MEDI</h1>
              <span className="text-[10px] font-black text-primary tracking-[0.2em] uppercase mt-0.5">Kurnool</span>
            </div>
          </Link>

          <div className="flex-1 flex items-center gap-4 max-w-2xl relative">
            <div className="relative" onMouseEnter={() => setIsMegaMenuOpen(true)}>
              <button className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${isMegaMenuOpen ? 'bg-primary text-white shadow-md' : 'bg-gray-50 dark:bg-gray-800 text-slate-700 dark:text-white hover:bg-gray-100'}`}>
                <span className="material-symbols-outlined">grid_view</span>
                All Services
                <span className={`material-symbols-outlined text-sm transition-transform duration-300 ${isMegaMenuOpen ? '-rotate-180' : ''}`}>expand_more</span>
              </button>
              {isMegaMenuOpen && <MegaMenu onClose={() => setIsMegaMenuOpen(false)} />}
            </div>

            <div className="flex-1 relative">
               <GlobalSearchBar />
            </div>

            <button 
              onClick={() => setIsLocationModalOpen(true)}
              className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-gray-300 hover:bg-primary/5 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-primary">location_on</span>
              <div className="flex flex-col items-start leading-none">
                <span className="text-[9px] text-gray-400 uppercase font-black tracking-tighter">City</span>
                <span>{city}</span>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/notifications" className="size-11 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-slate-600 dark:text-gray-300 transition-all active:scale-95">
              <span className="material-symbols-outlined">notifications</span>
            </Link>
            
            {isAuthenticated ? (
              <Link to="/profile" className="flex items-center gap-3 pl-1 pr-3 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer border border-transparent hover:border-gray-200">
                <div className="size-9 rounded-full bg-cover bg-center border border-gray-200" style={{backgroundImage: `url("${profile.image}")`}}></div>
                <div className="flex flex-col">
                   <span className="text-xs font-bold leading-tight">{profile.name.split(' ')[0]}</span>
                   <span className="text-[9px] font-bold text-primary">Pro Member</span>
                </div>
              </Link>
            ) : (
              <Link to="/login" className="px-5 py-2.5 rounded-xl text-sm font-bold text-primary bg-primary/10 hover:bg-primary hover:text-white transition-all">
                Login
              </Link>
            )}

            <Link 
              id="cart-icon-target"
              to="/cart"
              className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-xl font-black text-sm shadow-xl shadow-black/10 hover:shadow-2xl hover:-translate-y-0.5 transition-all"
            >
              <span className="material-symbols-outlined text-[22px]">shopping_cart</span>
              <span>CART</span>
              {cartItemsCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full ml-1 font-black">{cartItemsCount}</span>
              )}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
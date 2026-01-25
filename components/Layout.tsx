
import React from 'react';
import DesktopHeader from './ui/DesktopHeader';
import { FloatingBottomNav } from './ui/FloatingBottomNav';
import FloatingServiceMenu from './ui/FloatingServiceMenu';
import Footer from './ui/Footer';
import { useUserStore } from '../store/userStore';

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  const { language } = useUserStore();
  const t = (en: string, te: string) => language === 'te' ? te : en;

  const handleWhatsApp = () => {
      const msg = encodeURIComponent("Hi One Medi, I need help with my healthcare order in Kurnool.");
      window.open(`https://wa.me/919429690055?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark font-sans flex flex-col transition-colors duration-300">
      <DesktopHeader />
      <div className="flex-1 w-full max-w-[1920px] mx-auto overflow-x-hidden">
        {children}
      </div>
      <div className="hidden lg:block">
        <Footer />
      </div>
      
      <button 
        onClick={handleWhatsApp}
        className="fixed bottom-28 right-6 z-40 bg-emerald-500 text-white pl-4 pr-5 py-3 rounded-full shadow-2xl flex items-center gap-2 active:scale-90 transition-all group lg:bottom-10 lg:right-10"
      >
          <div className="size-6 bg-white/20 rounded-full flex items-center justify-center animate-pulse group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-sm filled">chat</span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">
              {t('Chat with Pharmacist', 'ఫార్మసిస్ట్‌తో చాట్')}
          </span>
      </button>

      <FloatingServiceMenu />
      <FloatingBottomNav />
    </div>
  );
};

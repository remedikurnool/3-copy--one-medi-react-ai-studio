
import React from 'react';
import DesktopHeader from './ui/DesktopHeader';
import FloatingBottomNav from './ui/FloatingBottomNav';
import FloatingServiceMenu from './ui/FloatingServiceMenu';
import Footer from './ui/Footer';
import { FlyingCartAnimation } from './ui/FlyingCartAnimation';

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 font-sans flex flex-col transition-colors duration-300 relative selection:bg-primary/20 selection:text-primary-900">
      {/* Background Mesh Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-100/50 dark:bg-primary-900/10 rounded-full blur-[120px] opacity-60" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-accent-100/40 dark:bg-accent-900/10 rounded-full blur-[100px] opacity-50" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-surface-200/30 dark:bg-surface-800/20 rounded-full blur-[150px] opacity-40" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <DesktopHeader />
        <main className="flex-1 w-full max-w-[1920px] mx-auto overflow-x-hidden">
          {children}
        </main>
        <div className="hidden lg:block">
          <Footer />
        </div>
      </div>

      <div className="relative z-50">
        <FloatingServiceMenu />
        <FloatingBottomNav />
        <FlyingCartAnimation />
      </div>
    </div>
  );
};

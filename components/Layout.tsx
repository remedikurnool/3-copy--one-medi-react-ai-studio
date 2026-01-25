
import React from 'react';
import DesktopHeader from './ui/DesktopHeader';
import { FloatingBottomNav } from './ui/FloatingBottomNav';
import FloatingServiceMenu from './ui/FloatingServiceMenu';
import Footer from './ui/Footer';

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark font-sans flex flex-col transition-colors duration-300">
      <DesktopHeader />
      <div className="flex-1 w-full max-w-[1920px] mx-auto overflow-x-hidden">
        {children}
      </div>
      <div className="hidden lg:block">
        <Footer />
      </div>
      <FloatingServiceMenu />
      <FloatingBottomNav />
    </div>
  );
};

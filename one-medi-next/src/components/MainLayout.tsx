'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import {
  TopOfferStrip,
  SmartHeader,
  MegaMenu,
  MobileNav,
  AdvancedFooter,
  ServiceDrawer
} from '@/components/layout';
import { FlyingCartAnimation } from './ui/FlyingCartAnimation';

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 font-sans flex flex-col transition-colors duration-300 relative selection:bg-primary/20 selection:text-primary-900">

      {/* Global Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary-100/40 dark:bg-primary-900/10 rounded-full blur-[150px] opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100/40 dark:bg-indigo-900/10 rounded-full blur-[150px] opacity-50" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {isHomePage && (
          <>
            <TopOfferStrip />
            <SmartHeader />
            <MegaMenu />
          </>
        )}

        <main className="flex-1 w-full max-w-[1920px] mx-auto overflow-x-hidden">
          {children}
        </main>

        <div className="hidden lg:block">
          <AdvancedFooter />
        </div>

        {/* Mobile Footer Spacing */}
        <div className="lg:hidden h-24"></div>
      </div>

      <div className="relative z-50">
        <MobileNav />
        <ServiceDrawer />
      </div>
    </div>
  );
};

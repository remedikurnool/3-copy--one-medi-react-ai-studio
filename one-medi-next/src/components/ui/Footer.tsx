'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();
  return (
    <footer className="bg-surface-950 text-white pt-16 pb-32 px-6 mt-20 rounded-t-[3rem] relative overflow-hidden z-0 border-t border-white/5">
      {/* Decorative background element in footer */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50"></div>
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-900/20 rounded-full blur-[80px]"></div>


      <div className="flex flex-col gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="size-12 rounded-2xl bg-gradient-to-br from-primary-900 to-primary-800 flex items-center justify-center text-primary-400 border border-primary-700/50 shadow-inner">
              <span className="material-symbols-outlined text-3xl">local_hospital</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight font-lexend">ONE MEDI</h2>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-medium">
            Kurnool's most trusted healthcare companion. Medicines, doctors, and diagnostics at your fingertips.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-white mb-4">Services</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li onClick={() => router.push('/medicines')} className="cursor-pointer hover:text-primary transition-colors">Order Medicine</li>
              <li onClick={() => router.push('/lab-tests')} className="cursor-pointer hover:text-primary transition-colors">Lab Tests</li>
              <li onClick={() => router.push('/doctors')} className="cursor-pointer hover:text-primary transition-colors">Find Doctors</li>
              <li onClick={() => router.push('/home-care')} className="cursor-pointer hover:text-primary transition-colors">Home Care</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="cursor-pointer hover:text-primary transition-colors">Privacy Policy</li>
              <li className="cursor-pointer hover:text-primary transition-colors">Terms of Service</li>
              <li className="cursor-pointer hover:text-primary transition-colors">Refund Policy</li>
              <li className="cursor-pointer hover:text-primary transition-colors">Contact Us</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col items-center gap-4">
          <div className="flex gap-4">
            {/* Social Icons */}
            {['facebook', 'water_drop', 'camera_alt'].map((icon, i) => (
              <div key={i} className="size-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all cursor-pointer">
                <span className="material-symbols-outlined text-lg">{icon}</span>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-xs text-center">© 2024 One Medi Technologies Pvt Ltd.<br />Made with ❤️ in Kurnool.</p>
        </div>
      </div>
    </footer>
  );
}

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const BentoItem = ({
    span,
    bgClass,
    title,
    subtitle,
    icon,
    image,
    onClick,
    delay
}: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        onClick={onClick}
        className={`group relative overflow-hidden rounded-[2rem] cursor-pointer ${span} ${bgClass} shadow-soft-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ring-1 ring-white/10`}
    >
        {/* Background Image / Pattern */}
        {image ? (
            <div className="absolute inset-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            </div>
        ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent group-hover:opacity-80 transition-opacity" />
        )}

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-5 text-white z-10">
            <div className="self-end bg-white/20 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-sm group-hover:bg-white/30 transition-colors">
                <span className="material-symbols-outlined text-xl">{icon}</span>
            </div>
            <div>
                <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest opacity-80 mb-1 flex items-center gap-1">
                    {subtitle}
                </p>
                <h3 className="text-lg lg:text-2xl font-black leading-none font-lexend tracking-tight" dangerouslySetInnerHTML={{ __html: title }} />
            </div>
        </div>
    </motion.div>
);

export default function BentoServiceGrid() {
    const router = useRouter();

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[160px] lg:auto-rows-[200px]">
            {/* 1. Medicines (Large) */}
            <BentoItem
                span="col-span-2 row-span-2"
                bgClass="bg-gradient-to-br from-purple-600 to-purple-800"
                title="Order<br/>Medicines"
                subtitle="Flat 20% OFF"
                icon="medication"
                image="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=400"
                onClick={() => router.push('/medicines')}
                delay={0}
            />

            {/* 2. Lab Tests (Tall) */}
            <BentoItem
                span="col-span-1 row-span-2"
                bgClass="bg-gradient-to-br from-blue-600 to-blue-800"
                title="Lab<br/>Tests"
                subtitle="Home Collection"
                icon="biotech"
                image="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=400"
                onClick={() => router.push('/lab-tests')}
                delay={0.1}
            />

            {/* 3. Doctors */}
            <BentoItem
                span="col-span-1 row-span-1"
                bgClass="bg-gradient-to-br from-emerald-600 to-emerald-800"
                title="Find<br/>Doctors"
                subtitle="Instant Consult"
                icon="stethoscope"
                onClick={() => router.push('/doctors')}
                delay={0.2}
            />

            {/* 4. Scans */}
            <BentoItem
                span="col-span-1 row-span-1"
                bgClass="bg-gradient-to-br from-indigo-500 to-indigo-700"
                title="Book<br/>Scans"
                subtitle="MRI, CT, X-Ray"
                icon="radiology"
                onClick={() => router.push('/scans')}
                delay={0.3}
            />

            {/* 5. Health Packages */}
            <BentoItem
                span="col-span-1 row-span-1"
                bgClass="bg-gradient-to-br from-rose-500 to-rose-700"
                title="Health<br/>Packages"
                subtitle="Full Body Check"
                icon="inventory_2"
                onClick={() => router.push('/health-packages')}
                delay={0.4}
            />

            {/* 6. Home Care */}
            <BentoItem
                span="col-span-1 row-span-1"
                bgClass="bg-gradient-to-br from-cyan-500 to-cyan-700"
                title="Home<br/>Care"
                subtitle="Nursing & Physio"
                icon="home_health"
                onClick={() => router.push('/home-care')}
                delay={0.5}
            />
        </div>
    );
}

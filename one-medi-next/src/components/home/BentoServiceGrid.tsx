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
        className={`group relative overflow-hidden rounded-[2rem] cursor-pointer ${span} ${bgClass} shadow-lg hover:shadow-xl transition-shadow`}
    >
        {/* Background Image / Pattern */}
        {image && (
            <div className="absolute inset-0">
                <img src={image} alt="" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
        )}

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-6 text-white z-10">
            <div className="self-end bg-white/20 backdrop-blur-md p-2 rounded-xl">
                <span className="material-symbols-outlined text-2xl">{icon}</span>
            </div>
            <div>
                <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">{subtitle}</p>
                <h3 className="text-xl lg:text-2xl font-black leading-tight font-lexend" dangerouslySetInnerHTML={{ __html: title }} />
            </div>
        </div>
    </motion.div>
);

export default function BentoServiceGrid() {
    const router = useRouter();

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px] lg:auto-rows-[220px]">
            {/* Large Featured Item */}
            <BentoItem
                span="col-span-2 row-span-2"
                bgClass="bg-blue-600"
                title="Diagnostic<br/>Packages"
                subtitle="Full Body Checkups"
                icon="biotech"
                image="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
                onClick={() => router.push('/lab-tests')}
                delay={0}
            />

            {/* Tall Item */}
            <BentoItem
                span="col-span-1 row-span-2"
                bgClass="bg-emerald-600"
                title="Consult<br/>Doctors"
                subtitle="Video / Clinic"
                icon="stethoscope"
                image="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400"
                onClick={() => router.push('/doctors')}
                delay={0.1}
            />

            {/* Standard Items */}
            <BentoItem
                span="col-span-1 row-span-1"
                bgClass="bg-purple-600"
                title="Order<br/>Medicines"
                subtitle="Flat 20% OFF"
                icon="medication"
                image="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=400"
                onClick={() => router.push('/medicines')}
                delay={0.2}
            />

            <BentoItem
                span="col-span-1 row-span-1"
                bgClass="bg-orange-600"
                title="Book<br/>Scans"
                subtitle="MRI, CT, X-Ray"
                icon="radiology"
                image=""
                onClick={() => router.push('/scans')}
                delay={0.3}
            />
        </div>
    );
}

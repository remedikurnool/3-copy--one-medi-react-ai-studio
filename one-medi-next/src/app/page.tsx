'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  DynamicHero,
  QuickAccessGrid,
  BentoServiceGrid,
  CategoryCarousel,
  PromoBanner,
  FeaturedPrograms,
  TestimonialsTrust,
  DownloadApp
} from '@/components/home';

// Data Hooks (reused from existing)
import {
  useMedicines,
  useDoctors,
  useLabTests,
  useMedicalScans
} from '@/hooks';

// --- Animations ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function Home() {
  // Data Fetching
  const { data: medicines } = useMedicines(8);
  const { data: doctors } = useDoctors(6);
  const { data: labTests } = useLabTests(5);

  // Transform Data for Carousels
  const medicineItems = (medicines || []).map(m => ({
    id: m.id,
    title: m.name,
    subtitle: m.manufacturer,
    image: m.image || 'https://images.unsplash.com/photo-1628771065518-0d82f0263320?auto=format&fit=crop&q=80&w=600',
    price: m.price,
    discount: m.discountPercent ? `${m.discountPercent}% OFF` : undefined,
    link: `/medicines/${m.id}`
  }));

  const doctorItems = (doctors || []).map(d => ({
    id: d.id,
    title: d.name,
    subtitle: d.specialization,
    image: d.image,
    tag: `${d.experienceYears} Years Exp`,
    link: `/doctors/${d.id}`
  }));

  const labItems = (labTests || []).map(l => ({
    id: l.id,
    title: l.name,
    subtitle: `${l.parametersIncluded?.length || 0} Tests Included`,
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=200', // Placeholder or l.image
    price: l.finalPrice,
    discount: l.discountPercent ? `${l.discountPercent}% OFF` : undefined,
    link: `/lab-tests/${l.id}`
  }));

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6 lg:space-y-12 pb-20 pt-4 lg:pt-8"
    >

      {/* 1. Hero Section */}
      <motion.section variants={itemVariants} className="px-4 lg:px-8">
        <DynamicHero />
      </motion.section>

      {/* 2. Quick Access Grid */}
      <motion.section variants={itemVariants} className="px-4 lg:px-8">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-lexend">Top Categories</h2>
          <a href="/services" className="text-xs font-bold text-primary-600 hover:text-primary-700 hover:underline flex items-center gap-1 transition-colors">
            View All
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </a>
        </div>
        <QuickAccessGrid />
      </motion.section>

      {/* 3. Bento Service Grid */}
      <motion.section variants={itemVariants} className="px-4 lg:px-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest mb-1 block">Discover</span>
            <h2 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white font-lexend">Top Categories</h2>
          </div>
        </div>
        <BentoServiceGrid />
      </motion.section>

      {/* 4. Medicines Carousel */}
      <motion.section variants={itemVariants}>
        <CategoryCarousel
          title="Order Medicines"
          subtitle="Pharmacy Essentials"
          items={medicineItems}
          type="medicine"
        />
      </motion.section>

      {/* 5. Promo Banner 1 */}
      <motion.section variants={itemVariants}>
        <PromoBanner />
      </motion.section>

      {/* 6. Doctors Carousel */}
      <motion.section variants={itemVariants}>
        <CategoryCarousel
          title="Top Doctors"
          subtitle="Book Appointments"
          items={doctorItems}
          type="doctor"
        />
      </motion.section>

      {/* 7. Featured Programs */}
      <motion.section variants={itemVariants}>
        <FeaturedPrograms />
      </motion.section>

      {/* 8. Lab Tests Carousel */}
      <motion.section variants={itemVariants}>
        <CategoryCarousel
          title="Popular Lab Tests"
          subtitle="Health Checkups"
          items={labItems}
          type="lab"
        />
      </motion.section>

      {/* 9. Trust Section */}
      <motion.section variants={itemVariants}>
        <TestimonialsTrust />
      </motion.section>

      {/* 10. Download App */}
      <motion.section variants={itemVariants}>
        <DownloadApp />
      </motion.section>

    </motion.div>
  );
}

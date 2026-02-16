// UI Configuration for Surgery pages
// Entity data (commonSurgeries) now comes from Supabase via useSurgeryPackages()
export const SURGERY_CONTENT_MASTER = {
    specialties: [
        { id: 'general', label: 'General Surgery', icon: 'medical_services', desc: 'Hernia, Piles, Gallstones' },
        { id: 'ortho', label: 'Orthopedics', icon: 'orthopedics', desc: 'Knee, Hip, Spine' },
        { id: 'gynae', label: 'Gynecology', icon: 'woman', desc: 'Fibroids, Cyst, Hysterectomy' },
        { id: 'uro', label: 'Urology', icon: 'nephrology', desc: 'Kidney Stones, Prostate' },
        { id: 'ent', label: 'ENT', icon: 'hearing', desc: 'Sinus, Tonsils, Ear' },
        { id: 'ophth', label: 'Ophthalmology', icon: 'visibility', desc: 'Cataract, LASIK' },
        { id: 'cardio', label: 'Cardiac', icon: 'cardiology', desc: 'Bypass, Angioplasty' },
        { id: 'plastic', label: 'Aesthetics', icon: 'face', desc: 'Liposuction, Gynecomastia' },
    ],
    trustSignals: [
        { title: 'Expert Surgeons', desc: '15+ Years Exp', icon: 'medal' },
        { title: 'NABH Hospitals', desc: 'Safety Certified', icon: 'verified_user' },
        { title: 'Advanced Tech', desc: 'Laser & Robotic', icon: 'precision_manufacturing' },
        { title: 'Insurance Support', desc: 'Cashless Claims', icon: 'health_and_safety' },
    ],
    faqs: [
        { q: 'Is the consultation free?', a: 'Yes, your first consultation with our expert coordinator is completely free.' },
        { q: 'Do you handle insurance?', a: 'We assist with all paperwork for cashless insurance claims across major providers.' },
        { q: 'What about post-surgery care?', a: 'We provide free follow-up consultations and diet plans during your recovery.' },
    ]
};

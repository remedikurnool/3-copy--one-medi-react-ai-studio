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
    commonSurgeries: [
        {
            id: 'hernia',
            title: 'Hernia Repair',
            icon: 'abdominal_repair', // simplified icon name
            category: 'General Surgery',
            tech: ['Laparoscopic', 'Open', 'Robotic'],
            recovery: '3-5 Days',
            price: '₹35,000 - ₹65,000',
            symptoms: ['Bulge in abdomen', 'Pain when lifting', 'Nausea']
        },
        {
            id: 'piles',
            title: 'Laser Piles Treatment',
            icon: 'rectal_care',
            category: 'Proctology',
            tech: ['Laser', 'Stapler'],
            recovery: '24 Hours',
            price: '₹40,000 - ₹55,000',
            symptoms: ['Bleeding', 'Pain', 'Itching']
        },
        {
            id: 'knee',
            title: 'Knee Replacement',
            icon: 'joints',
            category: 'Orthopedics',
            tech: ['Robotic', 'Minimally Invasive'],
            recovery: '4-6 Weeks',
            price: '₹1.5L - ₹2.5L',
            symptoms: ['Severe knee pain', 'Stiffness', 'Difficulty walking']
        },
        {
            id: 'cataract',
            title: 'Cataract Surgery',
            icon: 'eye_care',
            category: 'Ophthalmology',
            tech: ['Laser (MICS)', 'Phaco'],
            recovery: '24 Hours',
            price: '₹20,000 - ₹60,000',
            symptoms: ['Blurry vision', 'Glare at night', 'Faded colors']
        },
        {
            id: 'stones',
            title: 'Kidney Stone Removal',
            icon: 'kidney_care',
            category: 'Urology',
            tech: ['RIRS', 'Laser Lithotripsy'],
            recovery: '2 Days',
            price: '₹45,000 - ₹80,000',
            symptoms: ['Sharp side pain', 'Blood in urine', 'Nausea']
        },
        {
            id: 'gallstones',
            title: 'Gallbladder Removal',
            icon: 'digestive',
            category: 'General Surgery',
            tech: ['Laparoscopic'],
            recovery: '3 Days',
            price: '₹50,000 - ₹75,000',
            symptoms: ['Right upper belly pain', 'Indigestion', 'Vomiting']
        },
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

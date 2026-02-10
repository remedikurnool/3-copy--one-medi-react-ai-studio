export const SCANS_CONTENT_MASTER = {
    categories: [
        { id: 'mri', label: 'MRI Scan', icon: 'radiology', color: 'blue' },
        { id: 'ct', label: 'CT Scan', icon: 'scanner', color: 'indigo' },
        { id: 'pet', label: 'PET CT', icon: 'account_tree', color: 'amber' }, // energetic
        { id: 'ultrasound', label: 'Ultrasound', icon: 'water_drop', color: 'teal' },
        { id: 'xray', label: 'X-Ray', icon: 'skeleton', color: 'slate' },
        { id: 'cardiac', label: 'Cardiac', icon: 'ecg_heart', color: 'rose' },
        { id: 'neuro', label: 'Neuro', icon: 'neurology', color: 'purple' },
        { id: 'endoscopy', label: 'Endoscopy', icon: 'gastronomy', color: 'pink' },
        { id: 'pathology', label: 'Blood Tests', icon: 'hematology', color: 'red' },
    ],
    popularTests: [
        {
            id: 't_mri_brain',
            name: 'MRI Brain Plain',
            category: 'MRI Scan',
            price: 3500,
            mrp: 6000,
            discount: '40% OFF',
            tat: '24 Hours',
            preparation: 'Remove all metal objects',
            image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=200'
        },
        {
            id: 't_ct_chest',
            name: 'CT Chest HRCT',
            category: 'CT Scan',
            price: 2800,
            mrp: 4500,
            discount: '38% OFF',
            tat: '12 Hours',
            preparation: 'Fast for 4 hours',
            image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=200'
        },
        {
            id: 't_pet_whole',
            name: 'Whole Body PET CT',
            category: 'PET CT',
            price: 18000,
            mrp: 25000,
            discount: '28% OFF',
            tat: '48 Hours',
            preparation: 'Detailed specific prep required',
            image: 'https://images.unsplash.com/photo-1579152276506-44439679bb4c?auto=format&fit=crop&q=80&w=200'
        },
        {
            id: 't_echo',
            name: '2D Echo Cardiogram',
            category: 'Cardiac',
            price: 1200,
            mrp: 2000,
            discount: '40% OFF',
            tat: 'Immediate',
            preparation: 'No special prep',
            image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=200'
        },
        {
            id: 't_endo',
            name: 'Upper GI Endoscopy',
            category: 'Endoscopy',
            price: 4500,
            mrp: 6000,
            discount: '25% OFF',
            tat: 'Same Day',
            preparation: 'Overnight fasting mandatory',
            image: 'https://images.unsplash.com/photo-1516549655169-df83a0833860?auto=format&fit=crop&q=80&w=200'
        }
    ],
    packages: [
        {
            id: 'pkg_fullbody',
            title: 'Comprehensive Full Body Checkup',
            testsCount: 85,
            includes: ['Thyroid', 'Lipid', 'Liver', 'Kidney', 'Iron'],
            price: 999,
            mrp: 2999,
            color: 'emerald',
            recommended: 'General Wellness'
        },
        {
            id: 'pkg_senior',
            title: 'Senior Citizen Care Package',
            testsCount: 65,
            includes: ['HBA1C', 'Calcium', 'Bone Health', 'Vitamin D'],
            price: 1499,
            mrp: 3500,
            color: 'orange',
            recommended: 'Geriatric Care'
        },
        {
            id: 'pkg_women',
            title: 'Women Wellness Premium',
            testsCount: 72,
            includes: ['Hormones', 'PCOD Screen', 'Iron Studies', 'Thyroid'],
            price: 1899,
            mrp: 4200,
            color: 'pink',
            recommended: 'Gynecologist'
        }
    ],
    doctorRecommended: [
        { label: 'Oncologist', icon: 'oncology', tests: ['PET CT', 'Biopsy', 'Tumor Markers'] },
        { label: 'Cardiologist', icon: 'cardiology', tests: ['2D Echo', 'TMT', 'Lipid Profile'] },
        { label: 'Neurologist', icon: 'neurology', tests: ['MRI Brain', 'EEG', 'NCV'] },
        { label: 'Gastroenterologist', icon: 'gastroenterology', tests: ['Endoscopy', 'Liver Function', 'Ultrasound'] },
    ]
};

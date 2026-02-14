export const SCANS_CONTENT_MASTER = {
    categories: [
        { id: 'mri', label: 'MRI Scan', icon: 'radiology', color: 'blue' },
        { id: 'ct', label: 'CT Scan', icon: 'scanner', color: 'indigo' },
        { id: 'pet', label: 'PET CT', icon: 'account_tree', color: 'amber' },
        { id: 'ultrasound', label: 'Ultrasound', icon: 'water_drop', color: 'teal' },
        { id: 'xray', label: 'X-Ray', icon: 'skeleton', color: 'slate' },
        { id: 'cardiac', label: 'Cardiac', icon: 'ecg_heart', color: 'rose' },
        { id: 'neuro', label: 'Neuro', icon: 'neurology', color: 'purple' },
        { id: 'endoscopy', label: 'Endoscopy', icon: 'gastronomy', color: 'pink' },
        { id: 'pathology', label: 'Blood Tests', icon: 'hematology', color: 'red' },
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

import { ReactNode } from 'react';

export interface Service {
    id: string;
    label: string;
    icon: string; // Material Symbol name
    route: string;
    color: string;
    description: string;
    isNew?: boolean;
}

export const ALL_SERVICES: Service[] = [
    {
        id: 'medicines',
        label: 'Medicines',
        icon: 'medication',
        route: '/medicines',
        color: 'emerald',
        description: 'Order medicines & health products'
    },
    {
        id: 'lab-tests',
        label: 'Lab Tests',
        icon: 'biotech',
        route: '/lab-tests',
        color: 'teal',
        description: 'Pathology & diagnostics with home collection'
    },
    {
        id: 'scans',
        label: 'Scans',
        icon: 'radiology',
        route: '/scans',
        color: 'indigo',
        description: 'MRI, CT, X-Ray & more'
    },
    {
        id: 'doctors',
        label: 'Doctors',
        icon: 'stethoscope',
        route: '/doctors',
        color: 'blue',
        description: 'Book appointments with top specialists'
    },
    {
        id: 'home-care',
        label: 'Home Care',
        icon: 'home_health',
        route: '/home-care',
        color: 'cyan',
        description: 'Nursing, physiotherapy & patient care at home'
    },
    {
        id: 'diabetes-care',
        label: 'Diabetes Care',
        icon: 'water_drop',
        route: '/diabetes-care',
        color: 'sky',
        description: 'Comprehensive diabetes management'
    },
    {
        id: 'physiotherapy',
        label: 'Physiotherapy',
        icon: 'physical_therapy',
        route: '/physiotherapy',
        color: 'amber',
        description: 'Recover with expert physiotherapy'
    },
    {
        id: 'mother-baby',
        label: 'Mother & Baby',
        icon: 'child_care',
        route: '/mother-baby',
        color: 'pink',
        description: 'Care for mother and child',
        isNew: true
    },
    {
        id: 'skin-hair',
        label: 'Skin & Hair',
        icon: 'dermatology',
        route: '/skin-hair',
        color: 'rose',
        description: 'Dermatology and trichology treatments',
        isNew: true
    },
    {
        id: 'surgeries',
        label: 'Surgery Opinion',
        icon: 'surgical',
        route: '/surgeries',
        color: 'red',
        description: 'Expert surgical care & consultation'
    },
    {
        id: 'insurance',
        label: 'Insurance',
        icon: 'health_and_safety',
        route: '/insurance',
        color: 'purple',
        description: 'Health insurance claims & support'
    },
    {
        id: 'hospitals',
        label: 'Best Hospitals',
        icon: 'local_hospital',
        route: '/hospitals',
        color: 'blue',
        description: 'Find top hospitals near you',
        isNew: true
    },
    {
        id: 'blood-bank',
        label: 'Blood Banks',
        icon: 'bloodtype',
        route: '/blood-bank',
        color: 'red',
        description: 'Find blood donors & banks nearby'
    },
    {
        id: 'ambulance',
        label: 'Ambulance',
        icon: 'ambulance',
        route: '/ambulance',
        color: 'orange',
        description: '24/7 Emergency ambulance service'
    },
    {
        id: 'wellness',
        label: 'Diet & Wellness',
        icon: 'spa',
        route: '/wellness',
        color: 'green',
        description: 'Ayurveda, Yoga & holistic living'
    },
    {
        id: 'health-packages',
        label: 'Health Packages',
        icon: 'inventory_2',
        route: '/health-packages',
        color: 'violet',
        description: 'Full body checkups and more',
        isNew: true
    }
];

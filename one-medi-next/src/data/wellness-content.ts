// UI Configuration for Wellness pages
// Entity data (programs) now comes from Supabase via useWellnessPlans()
export const WELLNESS_CONTENT_MASTER = {
    categories: [
        { id: 'weight-loss', label: 'Weight Loss', icon: 'monitor_weight', color: 'bg-orange-100 text-orange-600', link: '/wellness/weight-loss' },
        { id: 'clinical', label: 'Clinical Diet', icon: 'stethoscope', color: 'bg-blue-100 text-blue-600', link: '/wellness/clinical' },
        { id: 'fitness', label: 'Fitness & Yoga', icon: 'fitness_center', color: 'bg-purple-100 text-purple-600', link: '/wellness/fitness' },
        { id: 'mental', label: 'Mental Wellness', icon: 'self_improvement', color: 'bg-teal-100 text-teal-600', link: '/wellness/mental' },
    ],
    tools: [
        { id: 'bmi', label: 'BMI Calculator', icon: 'calculate', color: 'indigo' },
        { id: 'bmr', label: 'BMR Calculator', icon: 'bolt', color: 'amber' },
        { id: 'water', label: 'Water Tracker', icon: 'water_drop', color: 'cyan' },
        { id: 'sleep', label: 'Sleep Monitor', icon: 'bedtime', color: 'indigo' },
    ],
    successStories: [
        { name: 'Priya K.', result: 'Lost 12kg in 3 months', program: 'Keto Transformation', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100' },
        { name: 'Rahul M.', result: 'Reversed Pre-Diabetes', program: 'Clinical Diet', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100' },
    ]
};

export const WELLNESS_CONTENT_MASTER = {
    categories: [
        { id: 'weight-loss', label: 'Weight Loss', icon: 'monitor_weight', color: 'bg-orange-100 text-orange-600', link: '/wellness/weight-loss' },
        { id: 'clinical', label: 'Clinical Diet', icon: 'stethoscope', color: 'bg-blue-100 text-blue-600', link: '/wellness/clinical' },
        { id: 'fitness', label: 'Fitness & Yoga', icon: 'fitness_center', color: 'bg-purple-100 text-purple-600', link: '/wellness/fitness' },
        { id: 'mental', label: 'Mental Wellness', icon: 'self_improvement', color: 'bg-teal-100 text-teal-600', link: '/wellness/mental' },
    ],
    programs: [
        {
            id: 'w_keto_30',
            name: '30-Day Keto Transformation',
            category: 'Weight Loss',
            image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=400',
            duration: '4 Weeks',
            price: 2499,
            mrp: 4999,
            expert: 'Dt. Anjali Sharma',
            rating: 4.8,
            tags: ['Low Carb', 'Fat Loss'],
            description: 'A structured ketogenic diet plan designed for rapid fat loss and improved mental clarity.',
            includes: ['Weekly Meal Plans', 'Daily Carb Tracker', 'Expert Chat Support']
        },
        {
            id: 'w_pcos_manage',
            name: 'PCOS Management Program',
            category: 'Clinical Diet',
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400',
            duration: '12 Weeks',
            price: 5999,
            mrp: 12000,
            expert: 'Dr. Riya Gupta',
            rating: 4.9,
            tags: ['Hormonal Balance', 'Gut Health'],
            description: 'Holistic approach to manage PCOS symptoms through nutrition and lifestyle changes.',
            includes: ['Hormone Balancing Diet', 'Yoga for PCOS', 'Monthly Doctor Consult']
        },
        {
            id: 'w_yoga_begin',
            name: 'Yoga for Beginners',
            category: 'Fitness & Yoga',
            image: 'https://images.unsplash.com/photo-1544367563-12123d8965cd?auto=format&fit=crop&q=80&w=400',
            duration: '8 Weeks',
            price: 1999,
            mrp: 3500,
            expert: 'Yogi Adarsh',
            rating: 4.7,
            tags: ['Flexibility', 'Stress Relief'],
            description: 'Start your yoga journey with easy-to-follow sessions for flexibility and mindfulness.',
            includes: ['Video Sessions', 'Pose Correction', 'Meditation Audio']
        },
        {
            id: 'w_mindful_stress',
            name: 'Stress & Anxiety Relief',
            category: 'Mental Wellness',
            image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400',
            duration: '21 Days',
            price: 999,
            mrp: 2000,
            expert: 'Mindful Team',
            rating: 4.9,
            tags: ['Meditation', 'Sleep'],
            description: 'Guided meditations and cognitive exercises to help you manage daily stress and anxiety.',
            includes: ['Daily Meditations', 'Sleep Stories', 'Mood Tracker']
        }
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

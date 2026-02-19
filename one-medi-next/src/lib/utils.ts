export const getServiceColor = (color: string) => {
    const colors: Record<string, { bg: string; text: string; lightBg: string; darkBg: string }> = {
        blue: { bg: 'bg-blue-50', text: 'text-blue-600', lightBg: 'bg-blue-100', darkBg: 'dark:bg-blue-900/20' },
        teal: { bg: 'bg-teal-50', text: 'text-teal-600', lightBg: 'bg-teal-100', darkBg: 'dark:bg-teal-900/20' },
        emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', lightBg: 'bg-emerald-100', darkBg: 'dark:bg-emerald-900/20' },
        indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', lightBg: 'bg-indigo-100', darkBg: 'dark:bg-indigo-900/20' },
        rose: { bg: 'bg-rose-50', text: 'text-rose-600', lightBg: 'bg-rose-100', darkBg: 'dark:bg-rose-900/20' },
        cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600', lightBg: 'bg-cyan-100', darkBg: 'dark:bg-cyan-900/20' },
        red: { bg: 'bg-red-50', text: 'text-red-600', lightBg: 'bg-red-100', darkBg: 'dark:bg-red-900/20' },
        purple: { bg: 'bg-purple-50', text: 'text-purple-600', lightBg: 'bg-purple-100', darkBg: 'dark:bg-purple-900/20' },
        amber: { bg: 'bg-amber-50', text: 'text-amber-600', lightBg: 'bg-amber-100', darkBg: 'dark:bg-amber-900/20' },
        lime: { bg: 'bg-lime-50', text: 'text-lime-600', lightBg: 'bg-lime-100', darkBg: 'dark:bg-lime-900/20' },
        fuchsia: { bg: 'bg-fuchsia-50', text: 'text-fuchsia-600', lightBg: 'bg-fuchsia-100', darkBg: 'dark:bg-fuchsia-900/20' },
        sky: { bg: 'bg-sky-50', text: 'text-sky-600', lightBg: 'bg-sky-100', darkBg: 'dark:bg-sky-900/20' },
        green: { bg: 'bg-green-50', text: 'text-green-600', lightBg: 'bg-green-100', darkBg: 'dark:bg-green-900/20' },
        orange: { bg: 'bg-orange-50', text: 'text-orange-600', lightBg: 'bg-orange-100', darkBg: 'dark:bg-orange-900/20' },
        slate: { bg: 'bg-slate-50', text: 'text-slate-600', lightBg: 'bg-slate-100', darkBg: 'dark:bg-slate-900/20' },
    };

    return colors[color] || colors.slate;
};

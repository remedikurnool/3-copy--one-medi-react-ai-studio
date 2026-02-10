import React from 'react';
import { motion } from 'framer-motion';

export type StageId = 'preg' | 'newborn' | 'toddler' | 'working';

export interface Stage {
    id: StageId;
    label: string;
    icon: string;
    sub: string;
    color: string;
}

interface StageSelectorProps {
    currentStage: StageId;
    onSelectStage: (id: StageId) => void;
}

export const STAGES: Stage[] = [
    { id: 'preg', label: 'Pregnancy', icon: 'pregnant_woman', sub: 'Weeks 1-40', color: 'rose' },
    { id: 'newborn', label: 'Newborn', icon: 'child_care', sub: '0-12 Months', color: 'teal' },
    { id: 'toddler', label: 'Toddler', icon: 'rowing', sub: '1-5 Years', color: 'orange' },
    { id: 'working', label: 'Working Mom', icon: 'business_center', sub: 'Care Balance', color: 'indigo' },
];

export default function StageSelector({ currentStage, onSelectStage }: StageSelectorProps) {
    return (
        <div className="py-2 overflow-x-auto no-scrollbar">
            <div className="flex gap-3 min-w-max px-1">
                {STAGES.map((stage) => {
                    const isSelected = currentStage === stage.id;
                    return (
                        <motion.button
                            key={stage.id}
                            onClick={() => onSelectStage(stage.id)}
                            whileTap={{ scale: 0.95 }}
                            className={`
                                relative flex flex-col items-center justify-center p-4 rounded-3xl border-2 transition-all duration-300 w-28 h-32
                                ${isSelected
                                    ? `bg-${stage.color}-500 border-${stage.color}-500 text-white shadow-lg shadow-${stage.color}-200`
                                    : 'bg-white dark:bg-gray-800 border-rose-50 dark:border-gray-700 text-slate-600 dark:text-gray-400 hover:border-rose-200'
                                }
                            `}
                        >
                            <span className={`material-symbols-outlined text-3xl mb-2 ${isSelected ? 'animate-bounce-subtle' : ''}`}>{stage.icon}</span>
                            <span className="text-xs font-black tracking-tight uppercase text-center leading-tight">{stage.label}</span>
                            <span className={`text-[9px] font-bold mt-1 ${isSelected ? 'opacity-90' : 'text-slate-400'}`}>{stage.sub}</span>

                            {isSelected && (
                                <motion.div
                                    layoutId="active-indicator"
                                    className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-current"
                                />
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}

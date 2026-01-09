import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Calculators() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bmi');
  
  // BMI State
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    if (height && weight) {
      const h = parseFloat(height) / 100;
      const w = parseFloat(weight);
      const val = w / (h * h);
      setBmi(parseFloat(val.toFixed(1)));
    }
  };

  const getBmiStatus = (val: number) => {
     if (val < 18.5) return { label: 'Underweight', color: 'text-blue-500' };
     if (val < 25) return { label: 'Normal', color: 'text-green-500' };
     if (val < 30) return { label: 'Overweight', color: 'text-orange-500' };
     return { label: 'Obese', color: 'text-red-500' };
  };

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white pb-10 font-sans">
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold">Health Tools</h1>
      </header>

      <main className="p-4 flex flex-col gap-6">
        {/* Tab Switcher */}
        <div className="flex p-1 bg-gray-200 dark:bg-gray-800 rounded-xl">
           <button onClick={() => setActiveTab('bmi')} className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'bmi' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-gray-500'}`}>BMI Calculator</button>
           <button onClick={() => setActiveTab('water')} className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'water' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-gray-500'}`}>Water Intake</button>
        </div>

        {activeTab === 'bmi' && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-5">
             <div className="flex justify-between gap-4">
                <div className="flex-1">
                   <label className="text-sm font-medium text-gray-500 mb-1 block">Height (cm)</label>
                   <input 
                     type="number" 
                     value={height}
                     onChange={(e) => setHeight(e.target.value)}
                     className="w-full h-14 px-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xl font-bold focus:ring-primary focus:border-primary"
                     placeholder="175"
                   />
                </div>
                <div className="flex-1">
                   <label className="text-sm font-medium text-gray-500 mb-1 block">Weight (kg)</label>
                   <input 
                     type="number" 
                     value={weight}
                     onChange={(e) => setWeight(e.target.value)}
                     className="w-full h-14 px-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-xl font-bold focus:ring-primary focus:border-primary"
                     placeholder="70"
                   />
                </div>
             </div>
             
             <button 
               onClick={calculateBMI}
               className="w-full h-14 bg-primary text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/30 active:scale-[0.98] transition-transform"
             >
               Calculate BMI
             </button>

             {bmi !== null && (
               <div className="mt-4 p-5 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800 text-center animate-in zoom-in duration-300">
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Your BMI is</p>
                  <p className="text-5xl font-black text-slate-900 dark:text-white my-2">{bmi}</p>
                  <p className={`text-lg font-bold ${getBmiStatus(bmi).color}`}>{getBmiStatus(bmi).label}</p>
               </div>
             )}
          </div>
        )}

        {activeTab === 'water' && (
           <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-5 text-center items-center justify-center min-h-[300px]">
              <div className="size-24 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 mb-2">
                 <span className="material-symbols-outlined text-5xl">water_drop</span>
              </div>
              <h3 className="text-xl font-bold">Daily Water Intake</h3>
              <p className="text-gray-500 text-sm max-w-[200px]">Based on your weight (72kg), you should drink approximately:</p>
              <p className="text-4xl font-black text-blue-600 dark:text-blue-400">2.4 Liters</p>
              <p className="text-xs text-gray-400">per day</p>
           </div>
        )}
      </main>
    </div>
  );
}
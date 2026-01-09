import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecordCard = ({ title, date, type, value, status }: any) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-2">
     <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
           <div className={`size-8 rounded-lg flex items-center justify-center text-white ${type === 'vitals' ? 'bg-red-500' : 'bg-blue-500'}`}>
              <span className="material-symbols-outlined text-sm">{type === 'vitals' ? 'monitor_heart' : 'article'}</span>
           </div>
           <div>
              <h4 className="font-bold text-sm">{title}</h4>
              <p className="text-[10px] text-gray-500">{date}</p>
           </div>
        </div>
        {status && <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${status === 'Normal' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{status}</span>}
     </div>
     {value && <p className="text-xl font-bold pl-10">{value}</p>}
  </div>
);

export default function HealthRecords() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('timeline');

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white pb-10 font-sans">
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-3">
             <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
               <span className="material-symbols-outlined text-[24px]">arrow_back</span>
             </button>
             <h1 className="text-lg font-bold">Health Records</h1>
           </div>
           <button onClick={() => navigate('/prescriptions')} className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-primary hover:text-white transition-colors">
             Rx Vault
           </button>
        </div>

        <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
           <button onClick={() => setActiveTab('timeline')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'timeline' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-gray-500'}`}>Timeline</button>
           <button onClick={() => setActiveTab('vitals')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'vitals' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-gray-500'}`}>Vitals</button>
           <button onClick={() => setActiveTab('reports')} className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'reports' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary' : 'text-gray-500'}`}>Reports</button>
        </div>
      </header>

      <main className="p-4 flex flex-col gap-4">
        {activeTab === 'timeline' && (
           <>
              <div className="flex items-center gap-2 mb-2">
                 <span className="material-symbols-outlined text-gray-400">calendar_today</span>
                 <h3 className="font-bold text-gray-500 text-sm uppercase">October 2023</h3>
              </div>
              <RecordCard title="Blood Pressure" date="14 Oct, 9:00 AM" type="vitals" value="120/80 mmHg" status="Normal" />
              <RecordCard title="Full Body Checkup" date="12 Oct, 11:30 AM" type="report" status="Completed" />
              
              <div className="flex items-center gap-2 mb-2 mt-4">
                 <span className="material-symbols-outlined text-gray-400">calendar_today</span>
                 <h3 className="font-bold text-gray-500 text-sm uppercase">September 2023</h3>
              </div>
              <RecordCard title="Fasting Sugar" date="25 Sep, 8:00 AM" type="vitals" value="95 mg/dL" status="Normal" />
           </>
        )}

        {activeTab === 'vitals' && (
           <div className="grid grid-cols-2 gap-3">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                 <div className="flex items-center gap-2 mb-2 text-red-500">
                    <span className="material-symbols-outlined">favorite</span>
                    <span className="text-xs font-bold uppercase">Heart Rate</span>
                 </div>
                 <p className="text-2xl font-bold">72 <span className="text-sm font-normal text-gray-400">bpm</span></p>
                 <p className="text-[10px] text-gray-400 mt-1">Last checked: 2 days ago</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                 <div className="flex items-center gap-2 mb-2 text-blue-500">
                    <span className="material-symbols-outlined">water_drop</span>
                    <span className="text-xs font-bold uppercase">Blood Sugar</span>
                 </div>
                 <p className="text-2xl font-bold">98 <span className="text-sm font-normal text-gray-400">mg/dL</span></p>
                 <p className="text-[10px] text-gray-400 mt-1">Fasting • 1 week ago</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 col-span-2">
                 <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2 text-purple-500">
                       <span className="material-symbols-outlined">monitor_weight</span>
                       <span className="text-xs font-bold uppercase">Weight Log</span>
                    </div>
                    <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded">-2 kg</span>
                 </div>
                 <div className="h-24 flex items-end justify-between gap-2 px-2">
                    {[74, 73.5, 73, 72.8, 72.2, 72].map((w, i) => (
                       <div key={i} className="flex flex-col items-center gap-1 group">
                          <div className="w-8 bg-purple-200 dark:bg-purple-900/40 rounded-t-lg group-hover:bg-purple-500 transition-colors relative" style={{height: `${(w-60)*4}px`}}>
                             <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white px-1.5 rounded">{w}</div>
                          </div>
                          <span className="text-[10px] text-gray-400">W{i+1}</span>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        )}

        {activeTab === 'reports' && (
           <div className="flex flex-col gap-3">
              {[1, 2, 3].map((i) => (
                 <div key={i} className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 items-center">
                    <div className="size-12 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl flex items-center justify-center shrink-0">
                       <span className="material-symbols-outlined">picture_as_pdf</span>
                    </div>
                    <div className="flex-1">
                       <h4 className="font-bold text-sm">Blood Test Report.pdf</h4>
                       <p className="text-xs text-gray-500">12 Oct 2023 • 2.4 MB</p>
                    </div>
                    <button className="size-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center">
                       <span className="material-symbols-outlined text-gray-400">download</span>
                    </button>
                 </div>
              ))}
           </div>
        )}
      </main>
      
      <div className="fixed bottom-6 right-6">
         <button className="size-14 bg-primary text-white rounded-full shadow-lg shadow-primary/40 flex items-center justify-center active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-2xl">add</span>
         </button>
      </div>
    </div>
  );
}
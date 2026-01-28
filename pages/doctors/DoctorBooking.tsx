
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DOCTORS } from '../../constants';

export default function DoctorBooking() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState('today');
  const [selectedTime, setSelectedTime] = useState('11:30 AM');
  const [patient, setPatient] = useState('self');

  const { doctorId, variant } = location.state || { doctorId: 'd1' };
  const doctor = DOCTORS.find(d => d.id === doctorId) || DOCTORS[0];
  
  // Fallback if variant isn't passed (e.g. direct nav)
  const currentVariant = variant || (doctor.variants && doctor.variants[0]) || { price: doctor.fee, type: 'Clinic Visit', icon: 'apartment' };

  const timeSlots = ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '06:00 PM', '06:30 PM'];

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark font-sans text-slate-900 dark:text-white pb-32">
      <div className="relative flex flex-col max-w-md mx-auto bg-white dark:bg-gray-900 shadow-xl min-h-screen">
        {/* TopAppBar */}
        <div className="sticky top-0 z-20 flex items-center bg-white dark:bg-gray-900 p-4 pb-2 justify-between border-b border-gray-200 dark:border-gray-800">
          <button 
            onClick={() => navigate(-1)}
            className="flex size-12 shrink-0 items-center justify-start cursor-pointer text-slate-900 dark:text-white hover:opacity-70 transition-opacity"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Review Booking</h2>
        </div>

        {/* Doctor Summary */}
        <div className="p-4 bg-white dark:bg-gray-900">
          <div className="flex gap-4 items-center p-3 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm">
            <div className="size-16 rounded-xl bg-gray-200 bg-cover bg-center shrink-0" style={{backgroundImage: `url("${doctor.image}")`}}></div>
            <div>
              <h3 className="font-bold text-lg leading-tight">{doctor.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{doctor.specialty}</p>
              <div className="flex items-center gap-1 text-xs font-bold text-primary mt-1">
                <span className="material-symbols-outlined text-[14px]">{currentVariant.icon}</span>
                {currentVariant.type}
              </div>
            </div>
          </div>
        </div>

        {/* Date & Time Selection */}
        <div className="flex flex-col px-4 pt-2">
          <h3 className="text-lg font-bold leading-tight pb-3">Select Slot</h3>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4">
             {['Mon, 14', 'Tue, 15', 'Wed, 16'].map((d, i) => (
               <button 
                 key={i}
                 onClick={() => setSelectedDate(d)}
                 className={`flex flex-col items-center justify-center min-w-[70px] h-[70px] rounded-xl border-2 transition-all ${selectedDate === d ? 'border-primary bg-blue-50 dark:bg-blue-900/20 text-primary' : 'border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800'}`}
               >
                 <span className="text-xs font-bold">{d.split(',')[0]}</span>
                 <span className="text-xl font-bold">{d.split(',')[1]}</span>
               </button>
             ))}
          </div>
          
          <div className="grid grid-cols-3 gap-3">
             {timeSlots.map(t => (
               <button 
                 key={t}
                 onClick={() => setSelectedTime(t)}
                 className={`py-2 rounded-lg text-sm font-bold border transition-all ${selectedTime === t ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-primary/50'}`}
               >
                 {t}
               </button>
             ))}
          </div>
        </div>

        {/* Fee Breakdown */}
        <div className="p-4 mt-4">
           <h3 className="text-lg font-bold leading-tight pb-3">Bill Details</h3>
           <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 space-y-2">
              <div className="flex justify-between text-sm">
                 <span className="text-gray-500">Consultation Fee</span>
                 <span className="font-bold">₹{currentVariant.price}</span>
              </div>
              <div className="flex justify-between text-sm">
                 <span className="text-gray-500">Service Fee</span>
                 <span className="font-bold text-green-600">FREE</span>
              </div>
              <div className="h-px bg-gray-100 dark:bg-gray-700 my-1"></div>
              <div className="flex justify-between text-base font-bold">
                 <span>Total Pay</span>
                 <span>₹{currentVariant.price}</span>
              </div>
           </div>
        </div>

        {/* Footer */}
        <div className="fixed bottom-0 w-full max-w-md bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 p-4 pb-6 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
           <button 
             onClick={() => navigate('/bookings')}
             className="w-full h-14 bg-primary hover:bg-primary-dark text-white rounded-xl text-lg font-bold shadow-lg shadow-primary/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
           >
             Confirm Booking
           </button>
        </div>
      </div>
    </div>
  );
}

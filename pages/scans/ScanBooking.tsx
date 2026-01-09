
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ScanBooking() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('today');
  const [selectedTime, setSelectedTime] = useState('10:30 AM');
  const [patient, setPatient] = useState('self');

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

        {/* Progress Steps */}
        <div className="bg-white dark:bg-gray-900 pt-4 pb-2 px-6">
          <div className="flex items-center justify-between relative">
            {/* Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 -z-0 -translate-y-1/2 rounded-full"></div>
            <div className="absolute top-1/2 left-0 w-2/3 h-1 bg-primary -z-0 -translate-y-1/2 rounded-full"></div>
            
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-1 z-10">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-xs shadow-md">
                <span className="material-symbols-outlined text-[16px]">check</span>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center gap-1 z-10">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm shadow-md ring-4 ring-white dark:ring-gray-900">
                2
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center gap-1 z-10">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 font-bold text-sm ring-4 ring-white dark:ring-gray-900">
                3
              </div>
            </div>
          </div>
          <div className="flex justify-between text-xs font-medium text-gray-500 mt-2">
            <span>Scan</span>
            <span className="text-primary font-bold">Details</span>
            <span>Payment</span>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 flex flex-col">
          {/* Scan Summary Card */}
          <div className="p-4">
            <div className="flex flex-col items-stretch justify-start rounded-xl shadow-sm bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="flex flex-row p-3 gap-4 items-center">
                <div 
                  className="w-24 h-24 shrink-0 bg-center bg-no-repeat bg-cover rounded-lg bg-gray-100" 
                  style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAvU61or4tnqOXJkziE50MDxEI0VyeZ_fVXRoC58Y4swryR7L1Bhr8uiOUQKQU6MnEg74ecIUtQdddjXcI6rVmCL_y4gFiDZfGSq30gFtofPm--QEggEOqk-BGHAHGmQGP75xqubTqKedutaFmh_drSI27_0IE0tboBEVBISbORqOkC_59KvPI3BhZdYPnXos-p7A6b2mG2sd2IWmnqwAIBpW0K-pCQmMZ5Fj-YEeCSvwpfNEDKwQGjGQTMVxdv0G8ZZn8MdPNv5t4")'}}
                ></div>
                <div className="flex flex-col grow justify-center gap-1">
                  <span className="inline-flex items-center gap-1 w-fit px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-primary text-xs font-bold mb-1">
                    <span className="material-symbols-outlined text-[14px] filled">verified</span> Verified Center
                  </span>
                  <p className="text-lg font-bold leading-tight">MRI Brain Plain</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">Kurnool Diagnostic Center</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-lg font-bold">₹3,500</p>
                    <span className="text-sm text-red-500 line-through">₹4,000</span>
                    <span className="text-xs font-bold text-secondary bg-teal-50 dark:bg-teal-900/20 px-1.5 py-0.5 rounded">12% OFF</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Patient Selector */}
          <div className="flex flex-col bg-white dark:bg-gray-900 pt-2">
            <h3 className="text-xl font-bold leading-tight px-4 pb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">person</span>
              Who is the patient?
            </h3>
            <div className="flex flex-col gap-3 px-4">
              <label className={`group flex items-center gap-4 rounded-xl border-2 p-4 cursor-pointer relative shadow-sm transition-all ${patient === 'self' ? 'border-primary bg-blue-50/30 dark:bg-blue-900/10' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                <input 
                  type="radio" 
                  name="patient" 
                  className="peer h-6 w-6 border-2 border-gray-300 bg-white text-primary focus:ring-primary focus:ring-offset-0 checked:border-primary checked:bg-primary"
                  checked={patient === 'self'}
                  onChange={() => setPatient('self')}
                />
                <div className="flex grow flex-col">
                  <p className="text-base font-bold leading-normal">Self (You)</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Male, 62 Years</p>
                </div>
                {patient === 'self' && (
                  <div className="absolute top-0 right-0 p-2 text-primary opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-[24px] filled">check_circle</span>
                  </div>
                )}
              </label>

              <label className={`group flex items-center gap-4 rounded-xl border-2 p-4 cursor-pointer relative shadow-sm transition-all ${patient === 'father' ? 'border-primary bg-blue-50/30 dark:bg-blue-900/10' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                <input 
                  type="radio" 
                  name="patient" 
                  className="peer h-6 w-6 border-2 border-gray-300 bg-white text-primary focus:ring-primary focus:ring-offset-0 checked:border-primary checked:bg-primary"
                  checked={patient === 'father'}
                  onChange={() => setPatient('father')}
                />
                <div className="flex grow flex-col">
                  <p className="text-base font-medium leading-normal">Ramesh (Father)</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Male, 85 Years</p>
                </div>
                 {patient === 'father' && (
                  <div className="absolute top-0 right-0 p-2 text-primary opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-[24px] filled">check_circle</span>
                  </div>
                )}
              </label>

              <button className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-primary/50 p-3 text-primary font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                <span className="material-symbols-outlined">add</span>
                Add New Member
              </button>
            </div>
          </div>

          <div className="h-2 bg-gray-50 dark:bg-gray-800 w-full my-6"></div>

          {/* Date & Time Selection */}
          <div className="flex flex-col px-4">
            <h3 className="text-xl font-bold leading-tight pb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">calendar_month</span>
              Select Slot
            </h3>
            
            {/* Date Scroll */}
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4">
              {/* Selected Date */}
              <div 
                onClick={() => setSelectedDate('today')}
                className={`flex flex-col items-center justify-center min-w-[72px] h-20 rounded-xl shadow-md cursor-pointer shrink-0 border-2 transition-all ${selectedDate === 'today' ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}
              >
                <p className={`text-xs font-medium uppercase tracking-wide ${selectedDate === 'today' ? 'opacity-90' : 'text-gray-500'}`}>Today</p>
                <p className="text-2xl font-bold">12</p>
                <p className={`text-xs font-medium ${selectedDate === 'today' ? '' : 'text-gray-500'}`}>Oct</p>
              </div>

              {/* Other Dates */}
              {[
                { day: 'Sun', date: '13', label: 'tomorrow' },
                { day: 'Mon', date: '14', label: 'mon' },
                { day: 'Tue', date: '15', label: 'tue' }
              ].map((item) => (
                <div 
                  key={item.label}
                  onClick={() => setSelectedDate(item.label)}
                  className={`flex flex-col items-center justify-center min-w-[72px] h-20 rounded-xl cursor-pointer shrink-0 border transition-all ${selectedDate === item.label ? 'bg-primary text-white border-primary shadow-md' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-primary/50'}`}
                >
                  <p className={`text-xs font-medium uppercase tracking-wide ${selectedDate === item.label ? 'opacity-90' : 'text-gray-500'}`}>{item.day}</p>
                  <p className="text-2xl font-bold">{item.date}</p>
                  <p className={`text-xs font-medium ${selectedDate === item.label ? '' : 'text-gray-500'}`}>Oct</p>
                </div>
              ))}
            </div>

            {/* Time Grid */}
            <div className="flex flex-col gap-3 mt-2">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Available Times (Morning)</p>
              <div className="grid grid-cols-3 gap-3">
                <button disabled className="py-2.5 px-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-400 bg-gray-50 dark:bg-gray-900 cursor-not-allowed line-through">
                  09:00 AM
                </button>
                <button 
                  onClick={() => setSelectedTime('10:30 AM')}
                  className={`py-2.5 px-2 rounded-lg border-2 text-sm font-bold shadow-sm relative overflow-hidden transition-all ${selectedTime === '10:30 AM' ? 'border-primary bg-primary text-white' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary'}`}
                >
                  10:30 AM
                  {selectedTime === '10:30 AM' && <div className="absolute top-0 right-0 size-2 bg-secondary rounded-bl-full"></div>}
                </button>
                <button 
                  onClick={() => setSelectedTime('11:45 AM')}
                  className={`py-2.5 px-2 rounded-lg border text-sm font-medium transition-all ${selectedTime === '11:45 AM' ? 'border-primary bg-primary text-white font-bold' : 'border-gray-200 dark:border-gray-700 text-slate-900 dark:text-white hover:border-primary hover:text-primary bg-white dark:bg-gray-800'}`}
                >
                  11:45 AM
                </button>
                 <button 
                  onClick={() => setSelectedTime('12:15 PM')}
                  className={`py-2.5 px-2 rounded-lg border text-sm font-medium transition-all ${selectedTime === '12:15 PM' ? 'border-primary bg-primary text-white font-bold' : 'border-gray-200 dark:border-gray-700 text-slate-900 dark:text-white hover:border-primary hover:text-primary bg-white dark:bg-gray-800'}`}
                >
                  12:15 PM
                </button>
              </div>
            </div>
          </div>

          <div className="h-2 bg-gray-50 dark:bg-gray-800 w-full my-6"></div>

          {/* Bill Details */}
          <div className="px-4 flex flex-col gap-3 mb-6">
            <h3 className="text-lg font-bold">Payment Details</h3>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 flex flex-col gap-3">
              <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
                <span>Scan Cost</span>
                <span>₹4,000</span>
              </div>
              <div className="flex justify-between items-center text-sm text-secondary font-medium">
                <span>Discount (OneMedi)</span>
                <span>- ₹500</span>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
                <span>Service Fee</span>
                <span>₹0</span>
              </div>
              <div className="h-px bg-gray-200 dark:bg-gray-700 my-1"></div>
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total Payable</span>
                <span>₹3,500</span>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-primary text-xs font-medium">
              <span className="material-symbols-outlined text-[16px]">lock</span>
              Payments are 100% secure and encrypted
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="fixed bottom-0 w-full max-w-md bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 shadow-[0_-4px_16px_rgba(0,0,0,0.1)] z-50">
          <div className="flex gap-4 items-center">
            <div className="flex flex-col">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 line-through">₹4,000</p>
              <p className="text-xl font-bold">₹3,500</p>
            </div>
            <button className="flex-1 bg-primary hover:bg-primary-dark text-white font-bold h-12 rounded-xl text-lg shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all active:scale-95">
              Proceed to Pay
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import PrescriptionUpload from '../../components/ui/PrescriptionUpload';

export default function LabBooking() {
  const navigate = useNavigate();
  const location = useLocation();
  const { test, variant } = location.state || {};

  const [serviceType, setServiceType] = useState('home'); // 'home' | 'lab'
  const [gender, setGender] = useState('male');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState('08:00 AM');
  const [prescription, setPrescription] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      if (user) {
        setPatientName(user.user_metadata?.full_name || '');
      }
    });
  }, []);

  // Generate next 4 dates
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 4; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push({
      id: d.toISOString().split('T')[0],
      label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' }),
      day: d.getDate().toString(),
      month: d.toLocaleDateString('en-US', { month: 'short' })
    });
  }

  useEffect(() => {
    if (dates.length > 0 && !selectedDate) {
      setSelectedDate(dates[0].id);
    }
  }, []);

  if (!test || !variant) {
    return (
      <div className="min-h-screen bg-bg-light dark:bg-bg-dark flex flex-col items-center justify-center p-6 text-center text-slate-900 dark:text-white">
        <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">error</span>
        <h2 className="text-xl font-bold">Booking Session Expired</h2>
        <button onClick={() => navigate('/lab-tests')} className="mt-4 text-primary font-bold">Go Back</button>
      </div>
    );
  }

  const timeSlots = [
    '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'
  ];

  const mrp = variant.mrp || Math.round(variant.price * 1.5);
  const discount = mrp - variant.price;

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-slate-900 dark:text-white pb-32 relative flex flex-col font-sans">
      {/* Top App Bar */}
      <header className="sticky top-0 z-20 bg-white dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Patient Details</h1>
        </div>
        {/* Progress Bar */}
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex justify-between items-end">
            <span className="text-xs font-semibold text-primary dark:text-blue-400">Step 2 of 3</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Review</span>
          </div>
          <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500 ease-out w-[66%]"></div>
          </div>
        </div>
      </header>

      {/* Scrollable Content */}
      <main className="flex-1 flex flex-col gap-5 p-4">
        {/* Service Type Switcher */}
        <section aria-label="Service Type">
          <h2 className="sr-only">Choose Service Type</h2>
          <div className="grid grid-cols-2 gap-3">
            {/* Option 1: Home Collection */}
            <label className="cursor-pointer relative group">
              <input
                checked={serviceType === 'home'}
                onChange={() => setServiceType('home')}
                className="peer sr-only"
                name="service_type"
                type="radio"
                value="home"
              />
              <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-gray-800 border-2 border-transparent peer-checked:border-primary peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/20 shadow-sm transition-all duration-200 h-32">
                <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-900/40 text-primary dark:text-blue-300 flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined">home_health</span>
                </div>
                <span className="text-sm font-bold text-center peer-checked:text-primary dark:peer-checked:text-blue-300">Home Sample<br />Collection</span>
                {/* Checkmark Badge */}
                <div className="absolute top-2 right-2 opacity-0 peer-checked:opacity-100 transition-opacity text-primary">
                  <span className="material-symbols-outlined filled">check_circle</span>
                </div>
              </div>
            </label>
            {/* Option 2: Lab Visit */}
            <label className="cursor-pointer relative group">
              <input
                checked={serviceType === 'lab'}
                onChange={() => setServiceType('lab')}
                className="peer sr-only"
                name="service_type"
                type="radio"
                value="lab"
              />
              <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-gray-800 border-2 border-transparent peer-checked:border-primary peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/20 shadow-sm transition-all duration-200 h-32 opacity-70 peer-checked:opacity-100 hover:opacity-100">
                <div className="size-10 rounded-full bg-teal-100 dark:bg-teal-900/30 text-secondary dark:text-teal-300 flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined">clinical_notes</span>
                </div>
                <span className="text-sm font-bold text-center peer-checked:text-primary dark:peer-checked:text-blue-300">Visit<br />Lab Center</span>
                {/* Checkmark Badge */}
                <div className="absolute top-2 right-2 opacity-0 peer-checked:opacity-100 transition-opacity text-primary">
                  <span className="material-symbols-outlined filled">check_circle</span>
                </div>
              </div>
            </label>
          </div>
        </section>

        {/* Patient Information Card */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary">person</span>
            <h2 className="text-lg font-bold">Patient Information</h2>
          </div>
          <div className="flex flex-col gap-4">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name *</label>
              <input
                className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-base focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                placeholder="e.g. Rajesh Kumar"
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
            </div>
            {/* Age & Gender Row */}
            <div className="flex gap-4">
              <div className="flex flex-col gap-1.5 w-1/3">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Age *</label>
                <input
                  className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-base focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-gray-400"
                  placeholder="45"
                  type="number"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5 w-2/3">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Gender *</label>
                <div className="flex bg-gray-50 dark:bg-gray-900 rounded-xl p-1 h-12 border border-gray-200 dark:border-gray-700">
                  {['male', 'female', 'other'].map((g) => (
                    <label key={g} className="flex-1 cursor-pointer">
                      <input
                        checked={gender === g}
                        onChange={() => setGender(g)}
                        className="peer sr-only"
                        name="gender"
                        type="radio"
                        value={g}
                      />
                      <div className="h-full w-full flex items-center justify-center rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 peer-checked:bg-white dark:peer-checked:bg-gray-800 peer-checked:text-primary peer-checked:shadow-sm transition-all capitalize">
                        {g}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-base">+91</span>
                <input className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-base focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-slate-900 dark:text-white" type="tel" defaultValue={user?.phone || '98765 43210'} />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500 material-symbols-outlined text-[20px]">verified</span>
              </div>
            </div>
          </div>
        </section>

        {/* Schedule Card */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary">calendar_clock</span>
            <h2 className="text-lg font-bold">Schedule Visit</h2>
          </div>
          {/* Date Picker */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Select Date</label>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar -mx-1 px-1">
              {dates.map((date) => (
                <div
                  key={date.id}
                  onClick={() => setSelectedDate(date.id)}
                  className={`flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-xl cursor-pointer transition-colors ${selectedDate === date.id
                    ? 'bg-primary text-white shadow-md border-2 border-primary'
                    : 'bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:border-primary'
                    }`}
                >
                  <span className={`text-xs font-medium uppercase ${selectedDate === date.id ? 'opacity-80' : 'text-gray-500'}`}>{date.label}</span>
                  <span className="text-xl font-bold">{date.day}</span>
                  <span className={`text-xs font-medium ${selectedDate === date.id ? '' : 'text-gray-500'}`}>{date.month}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Time Picker */}
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-2">Select Time Slot</label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 px-1 rounded-lg text-sm font-medium transition-colors ${selectedTime === time
                    ? 'bg-primary text-white shadow-sm ring-2 ring-primary ring-offset-1 ring-offset-white dark:ring-offset-gray-800'
                    : 'border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 hover:border-primary hover:text-primary text-gray-600 dark:text-gray-400'
                    }`}
                >
                  {time}
                </button>
              ))}
              <button disabled className="py-2 px-1 rounded-lg border border-dashed border-gray-200 dark:border-gray-700 bg-transparent text-sm font-medium text-gray-400 cursor-not-allowed">
                12:00 PM
              </button>
            </div>
          </div>
        </section>

        {/* Extras: Prescription & Coupon */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-6">
          {/* Upload Prescription */}
          <PrescriptionUpload
            onUpload={setPrescription}
            initialUrl={prescription}
            label="Upload Prescription"
            subLabel="Optional for record keeping"
          />

          {/* Coupon */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-500">local_offer</span>
              Apply Coupon
            </h3>
            <div className="relative flex items-center">
              <input className="w-full h-12 pl-4 pr-20 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-base focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all uppercase placeholder:normal-case" placeholder="Enter coupon code" type="text" />
              <button className="absolute right-2 top-2 bottom-2 px-3 bg-secondary/10 hover:bg-secondary/20 text-secondary text-sm font-bold rounded-lg transition-colors">
                APPLY
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 p-4 pb-6 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.1)] max-w-md mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Amount</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-slate-900 dark:text-white">₹{variant.price}</span>
              <span className="text-xs text-gray-400 line-through">₹{mrp}</span>
            </div>
          </div>
          <button onClick={() => navigate('/bookings')} className="flex-1 h-14 bg-primary hover:bg-primary-dark text-white rounded-xl text-lg font-bold shadow-lg shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <span>Checkout</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </footer>
    </div>
  );
}

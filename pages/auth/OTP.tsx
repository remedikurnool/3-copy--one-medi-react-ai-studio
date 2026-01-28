import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOTP, signInWithOTP } from '../../lib/supabase';

export default function OTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone || '';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Redirect if no phone number
    if (!phone) {
      navigate('/login');
      return;
    }

    // Focus first input
    inputsRef.current[0]?.focus();
  }, [phone, navigate]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto advance
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      pastedData.split('').forEach((char, i) => {
        if (i < 6) newOtp[i] = char;
      });
      setOtp(newOtp);
      if (pastedData.length === 6) {
        inputsRef.current[5]?.focus();
      }
    }
    e.preventDefault();
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) return;

    setIsVerifying(true);
    setError('');

    try {
      await verifyOTP(phone, enteredOtp);
      // Auth state change will be detected by AuthProvider
      // Navigate to home
      navigate('/', { replace: true });
    } catch (err: any) {
      console.error('Verification error:', err);
      setError(err.message || 'Invalid OTP. Please try again.');
      setOtp(['', '', '', '', '', '']);
      inputsRef.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setTimer(30);
    setError('');
    try {
      await signInWithOTP(phone);
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-bg-dark flex flex-col relative overflow-hidden font-sans">
      <div className="flex-1 flex flex-col px-6 py-6 max-w-md mx-auto w-full relative z-10">
        <button onClick={() => navigate(-1)} className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-slate-900 dark:text-white mb-8 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        <div className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Verification</h1>
          <p className="text-slate-500 dark:text-gray-400 font-medium">
            We've sent a 6-digit code to <br />
            <span className="text-slate-900 dark:text-white font-bold">+91 {phone}</span>
            <button onClick={() => navigate(-1)} className="text-primary text-sm font-bold ml-2 hover:underline">Edit</button>
          </p>
        </div>

        <div className="flex justify-between gap-2 sm:gap-4 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputsRef.current[index] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value.replace(/\D/g, ''))}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              disabled={isVerifying}
              className="w-full h-14 sm:h-16 rounded-xl sm:rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-center text-xl sm:text-2xl font-black text-slate-900 dark:text-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all caret-primary disabled:opacity-50"
            />
          ))}
        </div>

        {error && (
          <p className="text-sm text-red-500 font-bold mb-4 flex items-center gap-1 justify-center">
            <span className="material-symbols-outlined text-sm">error</span>
            {error}
          </p>
        )}

        <button
          onClick={handleVerify}
          disabled={otp.join('').length < 6 || isVerifying}
          className="h-14 bg-primary hover:bg-primary-dark disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white rounded-2xl font-black text-lg shadow-lg shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mb-6"
        >
          {isVerifying ? (
            <>
              <span className="material-symbols-outlined animate-spin">progress_activity</span> Verifying...
            </>
          ) : (
            'Verify & Login'
          )}
        </button>

        <div className="text-center">
          {timer > 0 ? (
            <p className="text-sm font-bold text-gray-400">
              Resend code in <span className="text-primary">{timer}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              disabled={isVerifying}
              className="text-sm font-black text-primary hover:underline uppercase tracking-wide disabled:opacity-50"
            >
              Resend Code
            </button>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          Check your SMS inbox for the verification code from Supabase
        </p>
      </div>
    </div>
  );
}
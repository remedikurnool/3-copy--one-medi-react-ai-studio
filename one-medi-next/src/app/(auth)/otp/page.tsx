'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUserStore } from '../../../store/userStore';
import { supabase } from '../../../lib/supabase';

function OTPContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useUserStore();
    const phone = searchParams.get('phone') || '9876543210';

    const [otp, setOtp] = useState(['', '', '', '']);
    const [timer, setTimer] = useState(30);
    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        // Focus first input
        if (inputsRef.current[0]) {
            inputsRef.current[0].focus();
        }

        // Simulate sending OTP alert - kept from legacy for testing flow
        const t = setTimeout(() => {
            //   alert(`Your One Medi OTP is: 1234`); // Commented out to be less intrusive in dev
            console.log('OTP sent for dev: 1234');
        }, 1000);

        return () => clearTimeout(t);
    }, []);

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

        // Auto advance
        if (value && index < 3) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleVerify = async () => {
        const enteredOtp = otp.join('');
        if (enteredOtp.length !== 4) return;

        setIsVerifying(true);
        setError(null);

        try {
            const { data: { session }, error: verifyError } = await supabase.auth.verifyOtp({
                phone: `+91${phone}`,
                token: enteredOtp,
                type: 'sms',
            });

            if (verifyError) throw verifyError;

            if (session) {
                // AuthProvider syncUserData will handle the rest via onAuthStateChange listener
                router.push('/');
            }
        } catch (err: any) {
            setError(err.message || 'Invalid OTP. Please try again.');
            setOtp(['', '', '', '']);
            inputsRef.current[0]?.focus();
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResend = () => {
        setTimer(30);
        // alert(`Your One Medi OTP is: 1234`);
        console.log('OTP resent: 1234');
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col relative overflow-hidden font-sans">
            <div className="flex-1 flex flex-col px-6 py-6 max-w-md mx-auto w-full relative z-10">
                <button onClick={() => router.back()} className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-slate-900 dark:text-white mb-8 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>

                <div className="mb-10">
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Verification</h1>
                    <p className="text-slate-500 dark:text-gray-400 font-medium">
                        We've sent a 4-digit code to <br />
                        <span className="text-slate-900 dark:text-white font-bold">+91 {phone}</span>
                        <button onClick={() => router.back()} className="text-primary text-sm font-bold ml-2 hover:underline">Edit</button>
                    </p>
                </div>

                <div className="flex justify-between gap-4 mb-10">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => { inputsRef.current[index] = el; }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-full h-16 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-center text-2xl font-black text-slate-900 dark:text-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all caret-primary"
                        />
                    ))}
                </div>

                <button
                    onClick={handleVerify}
                    disabled={otp.join('').length < 4 || isVerifying}
                    className="h-14 bg-primary hover:bg-primary-dark disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white rounded-2xl font-black text-lg shadow-lg shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mb-6 w-full"
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
                            className="text-sm font-black text-primary hover:underline uppercase tracking-wide"
                        >
                            Resend Code
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function OTPPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OTPContent />
        </Suspense>
    );
}

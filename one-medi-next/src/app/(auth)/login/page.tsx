'use client';

import React, { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useUserStore } from '../../../store/userStore';
import { supabase } from '../../../lib/supabase';

function LoginForm() {
    const router = useRouter();
    const { googleLogin } = useUserStore();
    const [phone, setPhone] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (phone.length !== 10) {
            setError('Please enter a valid 10-digit mobile number');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithOtp({
                phone: `+91${phone}`,
            });

            if (error) throw error;

            // Success: navigate to OTP screen with query param
            router.push(`/otp?phone=${phone}`);
        } catch (err: any) {
            setError(err.message || 'Failed to send OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        googleLogin();
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col relative overflow-hidden font-sans">
            {/* Background Blobs */}
            <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[50%] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[40%] bg-secondary/10 rounded-full blur-[80px] pointer-events-none"></div>

            {/* Close Button */}
            <button
                onClick={() => router.push('/')}
                className="absolute top-6 right-6 z-50 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-slate-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
                aria-label="Close"
            >
                <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <div className="flex-1 flex flex-col justify-center px-6 py-10 max-w-md mx-auto w-full relative z-10">
                <div className="mb-10 text-center">
                    <div className="size-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-float text-white">
                        <span className="material-symbols-outlined text-4xl">local_hospital</span>
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Welcome Back</h1>
                    <p className="text-slate-500 dark:text-gray-400 font-medium">Login to access your health records and orders</p>
                </div>

                <form onSubmit={handleSendOtp} className="space-y-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider ml-1">Mobile Number</label>
                        <div className={`flex items-center h-14 bg-gray-50 dark:bg-gray-800 rounded-2xl border transition-all overflow-hidden ${error ? 'border-red-500 ring-1 ring-red-500/20' : 'border-gray-200 dark:border-gray-700 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10'}`}>
                            <div className="pl-4 pr-3 flex items-center gap-2 border-r border-gray-200 dark:border-gray-700 h-full">
                                <div className="w-6 relative h-4">
                                    <Image src="https://flagcdn.com/w40/in.png" alt="India" fill className="object-cover rounded-sm" unoptimized />
                                </div>
                                <span className="font-bold text-slate-700 dark:text-gray-300">+91</span>
                            </div>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                    setPhone(val);
                                    setError('');
                                }}
                                className="flex-1 bg-transparent border-none h-full px-4 font-bold text-lg text-slate-900 dark:text-white focus:ring-0 placeholder:text-gray-300 tracking-widest outline-none"
                                placeholder="00000 00000"
                                autoFocus
                            />
                        </div>
                        {error && <p className="text-xs text-red-500 font-bold ml-1 flex items-center gap-1"><span className="material-symbols-outlined text-sm">error</span>{error}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={phone.length < 10}
                        className="h-14 bg-primary hover:bg-primary-dark disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white rounded-2xl font-black text-lg shadow-lg shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 w-full"
                    >
                        Get OTP <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </form>

                <div className="relative my-8 text-center">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 dark:bg-gray-800"></div>
                    <span className="relative bg-white dark:bg-slate-900 px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Or continue with</span>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    className="h-14 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl font-bold text-slate-700 dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3 w-full"
                >
                    <div className="w-6 h-6 relative">
                        <Image src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" fill className="object-contain" unoptimized />
                    </div>
                    Google
                </button>

                <p className="text-center text-xs text-gray-400 font-medium mt-8 leading-relaxed">
                    By continuing, you agree to our <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                </p>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
        </Suspense>
    )
}

'use client';

import React, { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '../../../lib/supabase';

type AuthMode = 'phone' | 'email';
type EmailStep = 'form' | 'success';

function LoginForm() {
    const router = useRouter();

    // Tab state
    const [authMode, setAuthMode] = useState<AuthMode>('email');

    // Phone OTP state
    const [phone, setPhone] = useState('');

    // Email/password state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [emailStep, setEmailStep] = useState<EmailStep>('form');
    const [showPassword, setShowPassword] = useState(false);

    // Shared state
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // ── Phone OTP ──────────────────────────────────────────────
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
            router.push(`/otp?phone=${phone}`);
        } catch (err: any) {
            setError(err.message || 'Failed to send OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // ── Email / Password ───────────────────────────────────────
    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            if (isSignUp) {
                // Sign up
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: { full_name: name },
                    },
                });
                if (error) throw error;
                setEmailStep('success');
            } else {
                // Sign in — if user not found, auto-create account
                const { error } = await supabase.auth.signInWithPassword({ email, password });

                if (error) {
                    // If credentials are wrong, try signing up
                    if (
                        error.message.toLowerCase().includes('invalid') ||
                        error.message.toLowerCase().includes('not found') ||
                        error.message.toLowerCase().includes('no user')
                    ) {
                        setIsSignUp(true);
                        setError('No account found. Please fill in your name to create one.');
                    } else {
                        throw error;
                    }
                } else {
                    router.push('/');
                }
            }
        } catch (err: any) {
            setError(err.message || 'Authentication failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // ── Google OAuth ───────────────────────────────────────────
    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/callback`,
                },
            });
            if (error) throw error;
        } catch (err: any) {
            setError(err.message || 'Failed to initiate Google login.');
            setIsLoading(false);
        }
    };

    // ── Success screen ─────────────────────────────────────────
    if (emailStep === 'success') {
        return (
            <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col items-center justify-center px-6 relative overflow-hidden font-sans">
                <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[50%] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[40%] bg-secondary/10 rounded-full blur-[80px] pointer-events-none" />
                <div className="relative z-10 text-center max-w-sm">
                    <div className="size-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="material-symbols-outlined text-4xl text-green-500">mark_email_read</span>
                    </div>
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Check your email</h1>
                    <p className="text-slate-500 dark:text-gray-400 font-medium mb-8">
                        We sent a confirmation link to <strong className="text-slate-700 dark:text-white">{email}</strong>. Click it to activate your account.
                    </p>
                    <button
                        onClick={() => { setEmailStep('form'); setIsSignUp(false); }}
                        className="text-primary font-bold hover:underline"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col relative overflow-hidden font-sans">
            {/* Background Blobs */}
            <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[50%] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[40%] bg-secondary/10 rounded-full blur-[80px] pointer-events-none" />

            {/* Close Button */}
            <button
                onClick={() => router.push('/')}
                className="absolute top-6 right-6 z-50 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-slate-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
                aria-label="Close"
            >
                <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <div className="flex-1 flex flex-col justify-center px-6 py-10 max-w-md mx-auto w-full relative z-10">
                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="size-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-float text-white">
                        <span className="material-symbols-outlined text-4xl">local_hospital</span>
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">
                        {isSignUp ? 'Create Account' : 'Welcome Back'}
                    </h1>
                    <p className="text-slate-500 dark:text-gray-400 font-medium text-sm">
                        {isSignUp ? 'Join One Medi for better healthcare' : 'Login to access your health records and orders'}
                    </p>
                </div>

                {/* Auth Mode Tabs */}
                <div className="flex bg-gray-100 dark:bg-gray-800 rounded-2xl p-1 mb-6 gap-1">
                    <button
                        onClick={() => { setAuthMode('email'); setError(null); }}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${authMode === 'email'
                            ? 'bg-white dark:bg-slate-700 text-primary shadow-sm'
                            : 'text-slate-500 dark:text-gray-400 hover:text-slate-700'
                            }`}
                    >
                        Email
                    </button>
                    <button
                        onClick={() => { setAuthMode('phone'); setError(null); setIsSignUp(false); }}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${authMode === 'phone'
                            ? 'bg-white dark:bg-slate-700 text-primary shadow-sm'
                            : 'text-slate-500 dark:text-gray-400 hover:text-slate-700'
                            }`}
                    >
                        Phone OTP
                    </button>
                </div>

                {/* ── EMAIL FORM ── */}
                {authMode === 'email' && (
                    <form onSubmit={handleEmailAuth} className="space-y-4">
                        {/* Name field (signup only) */}
                        {isSignUp && (
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider ml-1">Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => { setName(e.target.value); setError(null); }}
                                    placeholder="Your full name"
                                    className="h-14 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 font-semibold text-slate-900 dark:text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                                    autoFocus
                                />
                            </div>
                        )}

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setError(null); }}
                                placeholder="you@example.com"
                                className="h-14 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 font-semibold text-slate-900 dark:text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                                autoFocus={!isSignUp}
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider ml-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setError(null); }}
                                    placeholder={isSignUp ? 'Min. 6 characters' : 'Your password'}
                                    className="w-full h-14 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 pr-12 font-semibold text-slate-900 dark:text-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    <span className="material-symbols-outlined text-xl">
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <p className="text-xs text-red-500 font-bold flex items-center gap-1 ml-1">
                                <span className="material-symbols-outlined text-sm">error</span>
                                {error}
                            </p>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={!email || !password || isLoading || (isSignUp && !name)}
                            className="h-14 bg-primary hover:bg-primary-dark disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white rounded-2xl font-black text-lg shadow-lg shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 w-full mt-2"
                        >
                            {isLoading ? (
                                <><span className="material-symbols-outlined animate-spin">progress_activity</span> {isSignUp ? 'Creating...' : 'Signing in...'}</>
                            ) : (
                                <>{isSignUp ? 'Create Account' : 'Sign In'} <span className="material-symbols-outlined">arrow_forward</span></>
                            )}
                        </button>

                        {/* Toggle sign in / sign up */}
                        <p className="text-center text-sm text-slate-500 dark:text-gray-400 pt-1">
                            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                            <button
                                type="button"
                                onClick={() => { setIsSignUp(!isSignUp); setError(null); }}
                                className="text-primary font-bold hover:underline"
                            >
                                {isSignUp ? 'Sign In' : 'Sign Up'}
                            </button>
                        </p>
                    </form>
                )}

                {/* ── PHONE OTP FORM ── */}
                {authMode === 'phone' && (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                        <div className="flex flex-col gap-1.5">
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
                                        setError(null);
                                    }}
                                    className="flex-1 bg-transparent border-none h-full px-4 font-bold text-lg text-slate-900 dark:text-white focus:ring-0 placeholder:text-gray-300 tracking-widest outline-none"
                                    placeholder="00000 00000"
                                    autoFocus
                                />
                            </div>
                            {error && (
                                <p className="text-xs text-red-500 font-bold flex items-center gap-1 ml-1">
                                    <span className="material-symbols-outlined text-sm">error</span>
                                    {error}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={phone.length < 10 || isLoading}
                            className="h-14 bg-primary hover:bg-primary-dark disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white rounded-2xl font-black text-lg shadow-lg shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 w-full"
                        >
                            {isLoading ? (
                                <><span className="material-symbols-outlined animate-spin">progress_activity</span> Sending...</>
                            ) : (
                                <>Get OTP <span className="material-symbols-outlined">arrow_forward</span></>
                            )}
                        </button>
                    </form>
                )}

                {/* Divider */}
                <div className="relative my-7 text-center">
                    <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200 dark:bg-gray-800" />
                    <span className="relative bg-white dark:bg-slate-900 px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Or continue with</span>
                </div>

                {/* Google */}
                <button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="h-14 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl font-bold text-slate-700 dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3 w-full disabled:opacity-50"
                >
                    <div className="w-6 h-6 relative">
                        <Image src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" fill className="object-contain" unoptimized />
                    </div>
                    Continue with Google
                </button>

                <p className="text-center text-xs text-gray-400 font-medium mt-7 leading-relaxed">
                    By continuing, you agree to our{' '}
                    <a href="#" className="text-primary hover:underline">Terms of Service</a> and{' '}
                    <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
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
    );
}

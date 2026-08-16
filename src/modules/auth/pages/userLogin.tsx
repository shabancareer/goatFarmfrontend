import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

import { login } from '../../../store/thunks/auth/auth.thunks';
import type { AppDispatch, RootState } from '../../../store/store';
import { clearError } from '../../../store/slices/auth/auth.slice';
import d1 from '../../../assets/goatsImgs/d-1.jpg';

// ---- Small inline icons ----

const IconMail = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
        <path d="M4.5 7l7 5.5 7-5.5" />
    </svg>
);

const IconLock = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
);

const IconEye = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const IconEyeOff = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 3l18 18" />
        <path d="M10.6 5.7A9.9 9.9 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a14.4 14.4 0 0 1-2.9 3.6M6.4 6.4C4 8 2.5 12 2.5 12a14.6 14.6 0 0 0 4.1 4.8M9.5 14.5a3 3 0 0 0 4.2-4.2" />
    </svg>
);

const IconHoof = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <ellipse cx="12" cy="14.5" rx="5" ry="4.2" />
        <ellipse cx="6.3" cy="8" rx="2" ry="2.6" transform="rotate(-15 6.3 8)" />
        <ellipse cx="11" cy="6" rx="2.1" ry="2.8" />
        <ellipse cx="16" cy="6.3" rx="2" ry="2.7" transform="rotate(10 16 6.3)" />
        <ellipse cx="18.8" cy="9.2" rx="1.7" ry="2.3" transform="rotate(25 18.8 9.2)" />
    </svg>
);

const IconCheckCircle = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

export const UserLogin: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [searchParams] = useSearchParams();

    const { status, error } = useSelector((state: RootState) => state.auth);
    const isLoading = status === 'loading';

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isVerifiedNotice, setIsVerifiedNotice] = useState(false);

    useEffect(() => {
        if (searchParams.get('verified') === 'true') {
            setIsVerifiedNotice(true);
            toast.success('Email verified successfully! Please log in.');
        }
    }, [searchParams]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const result = await dispatch(login(formData));

            if (login.fulfilled.match(result)) {
                toast.success('Logged in successfully!');
                dispatch(clearError());
                navigate('/dashboard');
            } else if (login.rejected.match(result)) {
                toast.error((result.payload as string) || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            toast.error('An unexpected error occurred.');
        }
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-amber-50/40 via-stone-100 to-emerald-900/10">
            {/* LEFT — branding / hero panel matching Register page */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-emerald-950 text-white flex-col justify-between overflow-hidden p-12">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
                    style={{ backgroundImage: `url(${d1})` }}
                />

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/70 to-emerald-900/40" />

                {/* Top branding */}
                <div className="relative z-10 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-emerald-800/80 border border-emerald-600/50 flex items-center justify-center shadow-inner">
                        <IconHoof className="h-5 w-5 text-amber-400" />
                    </div>
                    <span className="font-serif text-xl tracking-wider text-amber-100 font-semibold">
                        GOAT FARM OS
                    </span>
                </div>

                {/* Center hero text */}
                <div className="relative z-10 max-w-md my-auto">
                    <span className="inline-block px-3 py-1 bg-emerald-900/80 border border-emerald-700/60 rounded-full text-xs font-medium tracking-wide text-amber-300 uppercase mb-4">
                        Management System
                    </span>
                    <h2 className="text-4xl font-serif font-bold leading-tight text-stone-100">
                        Welcome Back to Your Herd
                    </h2>
                    <p className="mt-4 text-stone-300 text-base leading-relaxed">
                        Access your farm dashboard, monitor animals, track breeding cycles, and manage team permissions seamlessly.
                    </p>

                    <div className="mt-8 space-y-3.5 border-t border-emerald-800/60 pt-6">
                        {[
                            'Real-time herd statistics & analytics',
                            'Automated health & breeding schedules',
                            'Role-based access & team management',
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-stone-300 text-sm">
                                <span className="h-5 w-5 rounded-full bg-emerald-800/60 flex items-center justify-center text-amber-300 text-xs font-bold">
                                    ✓
                                </span>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom pasture decoration */}
                <div className="relative z-10 border-t border-emerald-900/80 pt-4">
                    <svg viewBox="0 0 400 90" className="w-full h-auto opacity-80" preserveAspectRatio="none">
                        <path d="M0 70 Q100 40 200 60 T400 50 V90 H0 Z" fill="#0f3d2a" opacity="0.6" />
                        {[20, 70, 120, 170, 220, 270, 320, 370].map((x) => (
                            <g key={x} stroke="#d6b370" strokeWidth="2">
                                <line x1={x} y1="55" x2={x} y2="78" />
                                <line x1={x - 14} y1="62" x2={x + 14} y2="62" />
                                <line x1={x - 14} y1="70" x2={x + 14} y2="70" />
                            </g>
                        ))}
                    </svg>
                </div>
            </div>

            {/* RIGHT — form panel */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
                <div className="w-full max-w-md border-1 border-green-500 p-3">
                    <div className="flex flex-col items-center text-center mb-8 lg:hidden">
                        <div className="h-12 w-12 rounded-full bg-emerald-900 flex items-center justify-center mb-3">
                            <IconHoof className="h-6 w-6 text-amber-300" />
                        </div>
                    </div>

                    <div className="mb-7">
                        <h1 className="text-3xl font-serif font-semibold text-emerald-950">
                            Sign In
                        </h1>
                        <p className="text-stone-500 mt-2 text-[15px]">
                            Enter your email and password to access your farm dashboard.
                        </p>
                    </div>

                    {isVerifiedNotice && (
                        <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg p-3.5 text-sm flex items-start gap-3">
                            <IconCheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                            <div>
                                <p className="font-semibold text-emerald-900">Email Verified Successfully!</p>
                                <p className="text-emerald-700 text-xs mt-0.5">Your email address has been verified. You can now log in to your account.</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1.5">
                                Email Address
                            </label>
                            <div className="relative">
                                <IconMail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-emerald-700/60" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-stone-300 rounded-lg pl-10 pr-4 py-3 text-stone-800 placeholder:text-stone-400 focus:ring-2 focus:ring-emerald-700/40 focus:border-emerald-700 focus:outline-none transition"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-sm font-medium text-stone-700">
                                    Password
                                </label>
                            </div>
                            <div className="relative">
                                <IconLock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-emerald-700/60" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-stone-300 rounded-lg pl-10 pr-11 py-3 text-stone-800 placeholder:text-stone-400 focus:ring-2 focus:ring-emerald-700/40 focus:border-emerald-700 focus:outline-none transition"
                                    placeholder="********"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-emerald-700 transition"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <IconEyeOff className="h-4.5 w-4.5" /> : <IconEye className="h-4.5 w-4.5" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group w-full bg-emerald-900 hover:bg-emerald-800 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                                        <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                    </svg>
                                    Signing In...
                                </>
                            ) : (
                                <>
                                    Sign In
                                    <IconHoof className="h-4 w-4 text-amber-300 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-stone-500 mt-6">
                        Don't have an account?{' '}
                        <button
                            type="button"
                            onClick={() => navigate('/auth/register')}
                            className="text-emerald-800 font-medium hover:underline"
                        >
                            Create an account
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};
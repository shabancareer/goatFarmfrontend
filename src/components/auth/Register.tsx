import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { registerSuperOwner } from '../../features/auth/thunks/auth.thunks';
import type { AppDispatch, RootState } from '../../store/store';
import { clearError } from '../../features/auth/slice/auth.slice';
import { useNavigate } from 'react-router-dom';
import d1 from "../../assets/goatsImgs/d-1.jpg";
import toast from 'react-hot-toast';

// ---- Small inline icons (no external icon package required) ----

const IconUser = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5" />
    </svg>
);

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

const IconBuilding = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="4" y="3" width="9" height="18" rx="1" />
        <rect x="13" y="9" width="7" height="12" rx="1" />
        <path d="M7.5 7h2M7.5 11h2M7.5 15h2" />
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

// Hoofprint used as the feature-list bullet / motion marker
const IconHoof = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <ellipse cx="12" cy="14.5" rx="5" ry="4.2" />
        <ellipse cx="6.3" cy="8" rx="2" ry="2.6" transform="rotate(-15 6.3 8)" />
        <ellipse cx="11" cy="6" rx="2.1" ry="2.8" />
        <ellipse cx="16" cy="6.3" rx="2" ry="2.7" transform="rotate(10 16 6.3)" />
        <ellipse cx="18.8" cy="9.2" rx="1.7" ry="2.3" transform="rotate(25 18.8 9.2)" />
    </svg>
);

export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { status, error } = useSelector(
        (state: RootState) => state.auth
    );
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        organizationName: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        try {
            const result = await dispatch(
                registerSuperOwner(formData)
            );

            if (registerSuperOwner.fulfilled.match(result)) {
                toast.success('Registration successful!');
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    organizationName: '',
                });
            }
        } catch (err) {
            console.error(err);
            dispatch(clearError());
            toast.error('Registration failed!');
        }
        navigate('/');
    };

    const isLoading = status === 'loading';

    const fields = [
        { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe', icon: IconUser },
        { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com', icon: IconMail },
        { name: 'organizationName', label: 'Organization Name', type: 'text', placeholder: 'Acme Farms', icon: IconBuilding },
    ] as const;

    const features = [
        'Track herd health & vaccination schedules',
        'Manage breeding records and lineage',
        'Coordinate your whole farm team in one place',
    ];

    return (
        <div className="min-h-screen w-full flex bg-stone-50">
            {/* local keyframes for the goat-farm motion touches */}
            <style>{`
                @keyframes pasturePan {
                    0% { background-position: 50% 50%; }
                    100% { background-position: 56% 46%; }
                }
                @keyframes stepIn {
                    from { opacity: 0; transform: translateX(-8px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .pasture-bg { animation: pasturePan 18s ease-in-out infinite alternate; }
                .step-in { animation: stepIn 0.5s ease-out both; }
            `}</style>

            {/* LEFT — brand / story panel */}
            <div className="hidden lg:flex lg:w-[44%] relative overflow-hidden">
                <div
                    className="absolute inset-0 pasture-bg"
                    style={{
                        backgroundImage: `url(${d1})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/90 via-emerald-900/80 to-emerald-800/70" />

                <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
                    <div className="flex items-center gap-2.5">
                        <div className="h-9 w-9 rounded-full bg-amber-400/20 ring-1 ring-amber-300/40 flex items-center justify-center">
                            <IconHoof className="h-5 w-5 text-amber-300" />
                        </div>
                        <span className="font-semibold tracking-wide text-emerald-50/90 text-sm uppercase">
                            Herd Manager
                        </span>
                    </div>

                    <div>
                        <h2 className="text-4xl font-serif font-semibold leading-tight mb-4">
                            Welcome to<br />the Herd.
                        </h2>
                        <p className="text-emerald-100/80 mb-10 max-w-sm leading-relaxed">
                            Set up your organization and start managing your goat farm
                            with confidence — from kidding season to market day.
                        </p>

                        <ul className="space-y-4">
                            {features.map((f, i) => (
                                <li
                                    key={f}
                                    className="step-in flex items-start gap-3 text-emerald-50/90"
                                    style={{ animationDelay: `${i * 150}ms` }}
                                >
                                    <IconHoof className="h-5 w-5 mt-0.5 text-amber-300 shrink-0 -rotate-12" />
                                    <span className="text-sm leading-relaxed">{f}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* simple pasture / fence-line illustration */}
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
                            Create Account
                        </h1>
                        <p className="text-stone-500 mt-2 text-[15px]">
                            Register your organization and start managing your team.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {fields.map(({ name, label, type, placeholder, icon: Icon }) => (
                            <div key={name}>
                                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                                    {label}
                                </label>
                                <div className="relative">
                                    <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-emerald-700/60" />
                                    <input
                                        type={type}
                                        name={name}
                                        value={formData[name]}
                                        onChange={handleChange}
                                        required
                                        className="w-full border border-stone-300 rounded-lg pl-10 pr-4 py-3 text-stone-800 placeholder:text-stone-400 focus:ring-2 focus:ring-emerald-700/40 focus:border-emerald-700 focus:outline-none transition"
                                        placeholder={placeholder}
                                    />
                                </div>
                            </div>
                        ))}

                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <IconLock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-emerald-700/60" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength={6}
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
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    Register
                                    <IconHoof className="h-4 w-4 text-amber-300 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-stone-500 mt-6">
                        Already have an account?{' '}
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="text-emerald-800 font-medium hover:underline"
                        >
                            Sign in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import d1 from '../../../assets/goatsImgs/d-1.jpg';

const IconMailCheck = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9" />
        <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        <path d="M16 19l2 2 4-4" />
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

export const VerifyEmailPending: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || 'your email address';

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-amber-50/40 via-stone-100 to-emerald-900/10">
            {/* LEFT — Hero branding panel */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-emerald-950 text-white flex-col justify-between overflow-hidden p-12">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
                    style={{ backgroundImage: `url(${d1})` }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/70 to-emerald-900/40" />

                <div className="relative z-10 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-emerald-800/80 border border-emerald-600/50 flex items-center justify-center shadow-inner">
                        <IconHoof className="h-5 w-5 text-amber-400" />
                    </div>
                    <span className="font-serif text-xl tracking-wider text-amber-100 font-semibold">
                        GOAT FARM OS
                    </span>
                </div>

                <div className="relative z-10 max-w-md my-auto">
                    <span className="inline-block px-3 py-1 bg-emerald-900/80 border border-emerald-700/60 rounded-full text-xs font-medium tracking-wide text-amber-300 uppercase mb-4">
                        Account Verification
                    </span>
                    <h2 className="text-4xl font-serif font-bold leading-tight text-stone-100">
                        Check Your Inbox
                    </h2>
                    <p className="mt-4 text-stone-300 text-base leading-relaxed">
                        We sent a verification link to your email. Confirming your email ensures secure access to your organization dashboard.
                    </p>
                </div>

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

            {/* RIGHT — Message Content */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
                <div className="w-full max-w-md border border-emerald-500/40 rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-xl text-center">
                    <div className="mx-auto h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
                        <IconMailCheck className="h-8 w-8 text-emerald-800" />
                    </div>

                    <h1 className="text-2xl font-serif font-bold text-emerald-950 mb-3">
                        Verify Your Email
                    </h1>

                    <p className="text-stone-600 text-sm leading-relaxed mb-6">
                        We have sent a verification link to:
                        <br />
                        <span className="font-semibold text-emerald-900 bg-emerald-50 px-3 py-1 rounded-md inline-block mt-2 text-base border border-emerald-200">
                            {email}
                        </span>
                    </p>

                    <div className="bg-amber-50/70 border border-amber-200/80 text-amber-900 rounded-xl p-4 text-xs text-left mb-6 space-y-1">
                        <p className="font-semibold text-amber-950">Next Steps:</p>
                        <p>1. Open your email inbox.</p>
                        <p>2. Click on the <strong>"Verify Email Address"</strong> link in the email.</p>
                        <p>3. You will be automatically redirected to the login page.</p>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigate('/auth/login')}
                        className="w-full bg-emerald-900 hover:bg-emerald-800 text-white font-semibold py-3 rounded-lg transition text-sm shadow-md"
                    >
                        Go to Sign In Page
                    </button>
                </div>
            </div>
        </div>
    );
};

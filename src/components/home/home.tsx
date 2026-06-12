import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Menu, X, ArrowRight, ShieldCheck, Activity, Sparkles, Download,
    Printer, TrendingUp, Bell, FileText, Check, ChevronLeft, ChevronRight,
    DollarSign, Users, Heart, ClipboardList, Layers, BarChart3, AlertTriangle, HelpCircle
} from 'lucide-react';

// Imports of generated assets
import heroGoatPasture from "../../assets/goatsImgs/hero_goat_pasture.png";
import goatSalesTagMock from "../../assets/goatsImgs/goat_sales_tag_mock.png";
import farmManagementDashboard from "../../assets/goatsImgs/farm_management_dashboard.png";

export default function Home() {
    const navigate = useNavigate();
    const [activeSlide, setActiveSlide] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
    const [demoFormSubmitted, setDemoFormSubmitted] = useState(false);
    const [activeTab, setActiveTab] = useState('herd');

    const [demoFormData, setDemoFormData] = useState({
        name: '',
        email: '',
        phone: '',
        farmName: '',
        herdSize: '',
        message: ''
    });

    const heroSlides = [
        {
            title: "Helps you to keep the progress of",
            boldText: "animals, employee and farm",
            subtitle: "Application allows to record animal data, employee functions and farmers and agents network.",
            badgeText: "V2.5 Live Update",
            gradient: "from-emerald-950/90 via-slate-900/90 to-teal-950/90",
            image: heroGoatPasture
        },
        {
            title: "Sell Animals by printing sales Tag",
            boldText: "to save time in sales transactions.",
            subtitle: "Print sales tag which contains information of animal's weight, age, breed and price which can display on Animal neck.",
            badgeText: "Smart Printing Enabled",
            gradient: "from-slate-900/95 via-stone-900/90 to-emerald-950/90",
            image: goatSalesTagMock
        },
        {
            title: "Optimize Breeding & Health Vaccination",
            boldText: "schedules with simple logging.",
            subtitle: "Keep track of heat cycles, breeding lines, vaccination schedules, deworming, and health history logs.",
            badgeText: "Automated Records Log",
            gradient: "from-teal-950/95 via-slate-900/90 to-amber-950/90",
            image: farmManagementDashboard
        }
    ];

    useEffect(() => {
        const handleScroll = (e: Event) => {
            const target = e.target as HTMLElement;
            if (target.scrollTop > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        const container = document.getElementById('landing-container');
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % heroSlides.length);
        }, 6000);
        return () => clearInterval(slideInterval);
    }, []);

    const handleNextSlide = () => {
        setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    };

    const handlePrevSlide = () => {
        setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    };

    const handleDemoSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setDemoFormSubmitted(true);
        setTimeout(() => {
            setDemoFormSubmitted(false);
            setIsDemoModalOpen(false);
            setDemoFormData({
                name: '',
                email: '',
                phone: '',
                farmName: '',
                herdSize: '',
                message: ''
            });
        }, 3000);
    };

    const handleDemoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setDemoFormData({
            ...demoFormData,
            [e.target.name]: e.target.value
        });
    };

    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <div
            id="landing-container"
            className="h-screen w-screen overflow-y-auto overflow-x-hidden bg-slate-50 text-slate-800 scroll-smooth relative"
        >
            {/* CLICKUP SIMILAR HEADER NAVBAR */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${isScrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-sm border-slate-200/80 py-2.5 text-slate-800'
                    : 'bg-slate-900/90 backdrop-blur-md border-slate-700/50 py-3 text-white'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    {/* Logo Brand */}
                    <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => scrollToSection('home')}>
                        <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center shadow-md shadow-emerald-600/20">
                            <Activity className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <span className="font-black text-xl tracking-tight bg-gradient-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent">Farming</span>
                            <span className={`font-bold text-xl ${isScrolled ? 'text-slate-800' : 'text-white'}`}>Goat</span>
                        </div>
                    </div>

                    {/* ClickUp Style Product Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        <button onClick={() => scrollToSection('home')} className="px-3 py-1.5 rounded-md font-medium text-sm transition-colors hover:bg-slate-500/10 tracking-wide">Home</button>

                        {/* Features Dropdown Indicator Grid */}
                        <div className="relative group">
                            <button onClick={() => scrollToSection('features')} className="px-3 py-1.5 rounded-md font-medium text-sm transition-colors hover:bg-slate-500/10 flex items-center gap-1 tracking-wide">
                                Features
                                <span className="text-[10px] opacity-60">▼</span>
                            </button>

                            {/* Massive Mega Menu Popover */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[560px] bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 p-5 grid grid-cols-2 gap-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                                <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer" onClick={() => scrollToSection('features')}>
                                    <div className="p-2 bg-emerald-100 text-emerald-600 rounded-md"><Layers className="w-4 h-4" /></div>
                                    <div>
                                        <h5 className="font-bold text-xs text-slate-900">Herd Management</h5>
                                        <p className="text-[11px] text-slate-500">Track lifecycle, lineages, and parameters.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer" onClick={() => scrollToSection('features')}>
                                    <div className="p-2 bg-rose-100 text-rose-600 rounded-md"><Heart className="w-4 h-4" /></div>
                                    <div>
                                        <h5 className="font-bold text-xs text-slate-900">Health & Vaccination</h5>
                                        <p className="text-[11px] text-slate-500">Prevent sickness with smart health logs.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer" onClick={() => scrollToSection('features')}>
                                    <div className="p-2 bg-blue-100 text-blue-600 rounded-md"><ClipboardList className="w-4 h-4" /></div>
                                    <div>
                                        <h5 className="font-bold text-xs text-slate-900">Feed & Inventory</h5>
                                        <p className="text-[11px] text-slate-500">Formulate rations and monitor stocks.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer" onClick={() => scrollToSection('features')}>
                                    <div className="p-2 bg-amber-100 text-amber-600 rounded-md"><DollarSign className="w-4 h-4" /></div>
                                    <div>
                                        <h5 className="font-bold text-xs text-slate-900">Sales & Revenue</h5>
                                        <p className="text-[11px] text-slate-500">Tag management and invoice tracking.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer" onClick={() => scrollToSection('features')}>
                                    <div className="p-2 bg-purple-100 text-purple-600 rounded-md"><BarChart3 className="w-4 h-4" /></div>
                                    <div>
                                        <h5 className="font-bold text-xs text-slate-900">Reports & Analysis</h5>
                                        <p className="text-[11px] text-slate-500">Generate real-time margins and charts.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer" onClick={() => scrollToSection('features')}>
                                    <div className="p-2 bg-orange-100 text-orange-600 rounded-md"><Bell className="w-4 h-4" /></div>
                                    <div>
                                        <h5 className="font-bold text-xs text-slate-900">Alerts & Notifications</h5>
                                        <p className="text-[11px] text-slate-500">Automated SMS/Email breeding alerts.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button onClick={() => scrollToSection('metrics-overview')} className="px-3 py-1.5 rounded-md font-medium text-sm transition-colors hover:bg-slate-500/10 tracking-wide">Live Metrics</button>
                        <button onClick={() => scrollToSection('consultation-call')} className="px-3 py-1.5 rounded-md font-medium text-sm transition-colors hover:bg-slate-500/10 tracking-wide">Consultation Forum</button>
                    </nav>

                    {/* Desktop Authentication Registration Actions */}
                    <div className="hidden lg:flex items-center gap-3">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className={`font-semibold text-xs px-4 py-2 rounded-md tracking-wider uppercase border transition-colors ${isScrolled ? 'border-slate-300 text-slate-700 hover:bg-slate-100' : 'border-slate-700 text-white hover:bg-white/10'
                                }`}
                        >
                            Log In
                        </button>
                        <button
                            onClick={() => navigate('/auth/register')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-wider uppercase px-4 py-2.5 rounded-md transition-all shadow-sm"
                        >
                            Sign up
                        </button>
                    </div>

                    {/* Mobile Menu Toggle Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-1.5 rounded-md hover:bg-slate-500/10 focus:outline-none"
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Mobile Navigation Drawer Overlay */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-slate-200 flex flex-col p-5 gap-4 text-slate-800">
                        <button onClick={() => scrollToSection('home')} className="text-left font-semibold py-1.5 border-b border-slate-100">Home</button>
                        <button onClick={() => scrollToSection('features')} className="text-left font-semibold py-1.5 border-b border-slate-100">Features</button>
                        <button onClick={() => scrollToSection('metrics-overview')} className="text-left font-semibold py-1.5 border-b border-slate-100">Live Metrics Overview</button>
                        <button onClick={() => scrollToSection('consultation-call')} className="text-left font-semibold py-1.5 border-b border-slate-100">Get Consultation</button>

                        <div className="grid grid-cols-2 gap-3 pt-2">
                            <button
                                onClick={() => { setIsMobileMenuOpen(false); navigate('/dashboard'); }}
                                className="border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold py-2.5 rounded-md text-center text-xs uppercase tracking-wider"
                            >
                                Log In
                            </button>
                            <button
                                onClick={() => { setIsMobileMenuOpen(false); navigate('/auth/register'); }}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-md text-center text-xs uppercase tracking-wider"
                            >
                                Sign Up Free
                            </button>
                        </div>
                    </div>
                )}
            </header>

            {/* HERO SECTION CAROUSEL SLIDER */}
            <section id="home" className="h-[85vh] min-h-[500px] relative bg-slate-900 overflow-hidden pt-12">
                {heroSlides.map((slide, idx) => (
                    <div
                        key={idx}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${idx === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                    >
                        <div className="absolute inset-0">
                            <img
                                src={slide.image}
                                alt="Goat Farm Pasture"
                                className="w-full h-full object-cover object-center"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />
                        </div>

                        <div className="absolute inset-0 flex items-center">
                            <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
                                <div className="text-white space-y-5">
                                    <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase">
                                        <Sparkles className="w-3.5 h-3.5" />
                                        {slide.badgeText}
                                    </div>

                                    <h1 className="text-3xl md:text-5xl lg:text-5xl font-black tracking-tight leading-tight">
                                        {slide.title} <br />
                                        <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                                            {slide.boldText}
                                        </span>
                                    </h1>

                                    <p className="text-base text-slate-300 max-w-xl leading-relaxed">
                                        {slide.subtitle}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-4 pt-2">
                                        <button
                                            onClick={() => navigate('/auth/register')}
                                            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2 group text-sm"
                                        >
                                            Start Managing Free
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                        <button
                                            onClick={() => scrollToSection('consultation-call')}
                                            className="bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-3 rounded-lg backdrop-blur-md border border-white/20 transition-all text-sm"
                                        >
                                            Get Free Consultation
                                        </button>
                                    </div>
                                </div>

                                {/* Right Decorative Mockup Layout */}
                                <div className="hidden lg:flex justify-center items-center">
                                    <div className="w-[360px] bg-slate-950/80 p-4 rounded-2xl border border-slate-700/60 shadow-2xl backdrop-blur-md">
                                        <div className="flex justify-between items-center mb-3 text-xs text-slate-400">
                                            <span className="font-bold flex items-center gap-1.5 text-emerald-400">
                                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                                FarmingGoat Core Engine
                                            </span>
                                            <span>v2.5 Live</span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg flex justify-between items-center">
                                                <span className="text-xs text-slate-300">Herd Health Registry</span>
                                                <span className="text-[10px] bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded font-bold uppercase">Automated</span>
                                            </div>
                                            <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg flex justify-between items-center">
                                                <span className="text-xs text-slate-300">Feed Stock Inventory Optimization</span>
                                                <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded font-bold uppercase">Active</span>
                                            </div>
                                            <div className="bg-slate-900 border border-slate-800 p-2.5 rounded-lg flex justify-between items-center">
                                                <span className="text-xs text-slate-300">Revenue Logs & Analysis</span>
                                                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold uppercase">Realtime</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Controls */}
                <div className="absolute bottom-4 left-6 right-6 z-20 max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex gap-2">
                        {heroSlides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveSlide(idx)}
                                className={`h-2 rounded-full transition-all ${idx === activeSlide ? 'w-6 bg-emerald-500' : 'w-2 bg-white/40'}`}
                            />
                        ))}
                    </div>
                    <div className="flex gap-1.5">
                        <button onClick={handlePrevSlide} className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center border border-white/10 hover:bg-white/20"><ChevronLeft className="w-4 h-4" /></button>
                        <button onClick={handleNextSlide} className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center border border-white/10 hover:bg-white/20"><ChevronRight className="w-4 h-4" /></button>
                    </div>
                </div>
            </section>

            {/* DASHBOARD METRICS LIVE OVERVIEW SECTION */}
            <section id="metrics-overview" className="py-20 bg-slate-900 text-white relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                        <div>
                            <div className="text-emerald-400 font-bold text-xs uppercase tracking-widest mb-2">Live Metrics Synchronization</div>
                            <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight">
                                Realtime Data Overview Layout
                            </h2>
                            <p className="text-slate-400 text-sm mt-1">Directly mirroring updates synced to your live server interface at <code className="text-emerald-300 bg-slate-800 px-1.5 py-0.5 rounded">http://localhost:5173/dashboard</code></p>
                        </div>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-lg shadow-md shrink-0 flex items-center gap-2"
                        >
                            Open Full Dashboard Grid <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {/* Total Goats */}
                        <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-5 hover:border-emerald-500/50 transition-all">
                            <span className="text-xs text-slate-400 font-semibold block uppercase">Total Goats</span>
                            <div className="text-3xl font-black text-white mt-2 flex items-baseline gap-1.5">
                                1,482
                                <span className="text-xs font-bold text-emerald-400">+4.2%</span>
                            </div>
                            <div className="text-[11px] text-slate-500 mt-1">Active items in herd</div>
                        </div>

                        {/* Sick Goats */}
                        <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-5 hover:border-rose-500/50 transition-all">
                            <span className="text-xs text-slate-400 font-semibold block uppercase">Sick Goats</span>
                            <div className="text-3xl font-black text-rose-400 mt-2 flex items-baseline gap-1.5">
                                12
                                <span className="text-xs font-medium text-slate-400">Isolate</span>
                            </div>
                            <div className="text-[11px] text-slate-500 mt-1">Requires vaccination</div>
                        </div>

                        {/* Pregnant Goats */}
                        <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-5 hover:border-amber-500/50 transition-all">
                            <span className="text-xs text-slate-400 font-semibold block uppercase">Pregnant Goats</span>
                            <div className="text-3xl font-black text-amber-400 mt-2">84</div>
                            <div className="text-[11px] text-slate-500 mt-1">Kidding alerts monitored</div>
                        </div>

                        {/* Feed Stock */}
                        <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-5 hover:border-blue-500/50 transition-all">
                            <span className="text-xs text-slate-400 font-semibold block uppercase">Feed Stock</span>
                            <div className="text-3xl font-black text-blue-400 mt-2">4.8 <span className="text-xs text-slate-400">Tons</span></div>
                            <div className="text-[11px] text-slate-500 mt-1">Estimated 18 days left</div>
                        </div>

                        {/* Kids Born This Month */}
                        <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-5 hover:border-emerald-500/50 transition-all">
                            <span className="text-xs text-slate-400 font-semibold block uppercase">Kids Born (Month)</span>
                            <div className="text-3xl font-black text-emerald-400 mt-2">42</div>
                            <div className="text-[11px] text-slate-500 mt-1">Tagged automatically</div>
                        </div>

                        {/* Goats Ready For Breeding */}
                        <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-5 hover:border-purple-500/50 transition-all">
                            <span className="text-xs text-slate-400 font-semibold block uppercase">Ready For Breeding</span>
                            <div className="text-3xl font-black text-purple-400 mt-2">116</div>
                            <div className="text-[11px] text-slate-500 mt-1">Weight standards matched</div>
                        </div>

                        {/* Daily Feed Uses */}
                        <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-5 hover:border-cyan-500/50 transition-all">
                            <span className="text-xs text-slate-400 font-semibold block uppercase">Daily Feed Uses</span>
                            <div className="text-3xl font-black text-cyan-400 mt-2">265 <span className="text-xs text-slate-400">KG</span></div>
                            <div className="text-[11px] text-slate-500 mt-1">Ration formula optimization</div>
                        </div>

                        {/* Profit This Month */}
                        <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl p-5 hover:border-teal-500/50 transition-all">
                            <span className="text-xs text-slate-400 font-semibold block uppercase">Profit This Month</span>
                            <div className="text-3xl font-black text-teal-400 mt-2">$8,450</div>
                            <div className="text-[11px] text-slate-500 mt-1">Invoiced transactions tracked</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMPREHENSIVE SOFTWARE MAJOR FEATURES GRID */}
            <section id="features" className="py-24 bg-white border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                        <div className="text-emerald-600 font-bold text-xs uppercase tracking-widest bg-emerald-50 px-3.5 py-1.5 rounded-full w-fit mx-auto">
                            Production Architecture
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
                            Major Modules Built for Scaling SaaS Operations
                        </h2>
                        <p className="text-slate-500 text-sm">Advanced parameters built intentionally to scale commercial goat farms globally.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Health & Vaccination */}
                        <div className="border border-slate-200/80 bg-slate-50/50 p-6 rounded-2xl hover:bg-white hover:shadow-xl hover:border-emerald-500/40 transition-all group">
                            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mb-5 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                                <Heart className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Health & Vaccination</h3>
                            <p className="text-slate-600 text-xs leading-relaxed">
                                Log disease symptoms, manage medication treatment regimes, track withdrawals, and coordinate PPR/FMD vaccine batches seamlessly.
                            </p>
                        </div>

                        {/* Feed & Inventory */}
                        <div className="border border-slate-200/80 bg-slate-50/50 p-6 rounded-2xl hover:bg-white hover:shadow-xl hover:border-emerald-500/40 transition-all group">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <ClipboardList className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Feed & Inventory</h3>
                            <p className="text-slate-600 text-xs leading-relaxed">
                                Formulate nutrition plans by age or animal condition parameters. Get automated alerts when concentrate silage reserves drop below minimums.
                            </p>
                        </div>

                        {/* Sales & Revenue */}
                        <div className="border border-slate-200/80 bg-slate-50/50 p-6 rounded-2xl hover:bg-white hover:shadow-xl hover:border-emerald-500/40 transition-all group">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                <DollarSign className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Sales & Revenue</h3>
                            <p className="text-slate-600 text-xs leading-relaxed">
                                Generate and print customizable sales tags with integrated QR IDs linked directly to individual breeding and live metrics parameters.
                            </p>
                        </div>

                        {/* Reports & Analysis */}
                        <div className="border border-slate-200/80 bg-slate-50/50 p-6 rounded-2xl hover:bg-white hover:shadow-xl hover:border-emerald-500/40 transition-all group">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-5 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                                <BarChart3 className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Reports & Analysis</h3>
                            <p className="text-slate-600 text-xs leading-relaxed">
                                Export clean PDF audit logs mapping out growth curves, dynamic feed-to-weight conversions, and overall farm performance indexes.
                            </p>
                        </div>

                        {/* Alerts & Notifications */}
                        <div className="border border-slate-200/80 bg-slate-50/50 p-6 rounded-2xl hover:bg-white hover:shadow-xl hover:border-emerald-500/40 transition-all group">
                            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-5 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                <Bell className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Alerts & Notifications</h3>
                            <p className="text-slate-600 text-xs leading-relaxed">
                                Receive proactive automated updates tracking upcoming gestation cycles, periodic health interventions, and employee shifts.
                            </p>
                        </div>

                        {/* Herd Management */}
                        <div className="border border-slate-200/80 bg-slate-50/50 p-6 rounded-2xl hover:bg-white hover:shadow-xl hover:border-emerald-500/40 transition-all group">
                            <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center mb-5 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                                <Layers className="w-5 h-5" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">Herd Management</h3>
                            <p className="text-slate-600 text-xs leading-relaxed">
                                Structure your herd allocations into custom tags or parameters. Track dams, sires, inbreeding indexes, and child lineages seamlessly.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CUSTOMER QUERIES FORUM SECTION (GET FREE CONSULTATION CALL) */}
            <section id="consultation-call" className="py-20 bg-slate-50 border-t border-slate-200/80">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    <div className="lg:col-span-5 space-y-5">
                        <div className="text-emerald-600 font-bold text-xs uppercase tracking-widest bg-emerald-100/60 px-3 py-1 rounded-md w-fit">
                            Grower Forum & Hub
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                            Get A Free Personalized Farm Consultation Call
                        </h2>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Have specific constraints regarding structural pen arrangements, custom breeding models, feed optimization algorithms, or tagging hardware deployments?
                        </p>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Submit your inquiry right onto our query forum queue. An experienced livestock management technical expert will pick up the ticket and get in touch with you directly over the phone.
                        </p>

                        <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-sm">
                            <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wide">Recent Inquiries Answered</h4>
                            <div className="text-[11px] text-slate-600 border-b border-slate-100 pb-2">
                                <strong>Q:</strong> "What scale of inventory tracking is recommended for 500 Boer items?" <br />
                                <span className="text-emerald-600 font-semibold">Answered by Tech Staff (2h ago)</span>
                            </div>
                            <div className="text-[11px] text-slate-600">
                                <strong>Q:</strong> "Can we print tags using local off-grid Bluetooth zebra printers?" <br />
                                <span className="text-emerald-600 font-semibold">Answered by Product Team (5h ago)</span>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Consultation Form Container */}
                    <div className="lg:col-span-7 bg-white border border-slate-200 shadow-xl rounded-2xl p-6 md:p-8">
                        <h3 className="text-lg font-bold text-slate-900 mb-1">Submit Your Requirements</h3>
                        <p className="text-xs text-slate-500 mb-6">Our livestock operations specialist will analyze your herd size requirements.</p>

                        <form onSubmit={handleDemoSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide mb-1">Your Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={demoFormData.name}
                                        onChange={handleDemoChange}
                                        placeholder="e.g. John Doe"
                                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide mb-1">Phone Number (With Country Code)</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={demoFormData.phone}
                                        onChange={handleDemoChange}
                                        placeholder="e.g. +1 (555) 000-0000"
                                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide mb-1">Farm / Business Name</label>
                                    <input
                                        type="text"
                                        name="farmName"
                                        value={demoFormData.farmName}
                                        onChange={handleDemoChange}
                                        placeholder="e.g. Apex Livestock Ltd"
                                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide mb-1">Estimated Herd Size</label>
                                    <select
                                        name="herdSize"
                                        value={demoFormData.herdSize}
                                        onChange={handleDemoChange}
                                        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none bg-white"
                                    >
                                        <option value="">Select herd parameters</option>
                                        <option value="1-50">1 - 50 Goats/Sheep</option>
                                        <option value="51-200">51 - 200 Goats/Sheep</option>
                                        <option value="201-1000">201 - 1,000 Goats/Sheep</option>
                                        <option value="1000+">1,000+ Commercial Scale</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wide mb-1">Your Requirements / Specific Constraints</label>
                                <textarea
                                    name="message"
                                    rows={3}
                                    value={demoFormData.message}
                                    onChange={handleDemoChange}
                                    placeholder="Tell us about your breeding frequency, local disease pressures, or tag printer requirements..."
                                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg shadow-md uppercase tracking-wider text-xs transition-colors mt-2"
                            >
                                Submit Consultation Request Ticket
                            </button>
                        </form>
                    </div>

                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-white">
                            <Activity className="w-5 h-5 text-emerald-500" />
                            <span className="font-bold text-lg">FarmingGoat</span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Modern livestock software record keeping application designed to optimize productivity, trace lineage breeding, monitor health parameters, and streamline transactions globally.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Quick System Anchors</h4>
                        <div className="flex flex-col gap-2 text-xs">
                            <button onClick={() => scrollToSection('home')} className="text-left hover:text-white transition-colors">Top Overview</button>
                            <button onClick={() => scrollToSection('features')} className="text-left hover:text-white transition-colors">Product Modules</button>
                            <button onClick={() => scrollToSection('metrics-overview')} className="text-left hover:text-white transition-colors">Live Dashboard Feed</button>
                            <button onClick={() => scrollToSection('consultation-call')} className="text-left hover:text-white transition-colors">Consultation Forum</button>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Contact Support Hub</h4>
                        <p className="text-xs text-slate-400">Available 24x7 for enterprise livestock operations scaling deployments.</p>
                        <p className="text-emerald-400 text-xs font-semibold mt-2">support@farminggoat.saas</p>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-6 border-t border-slate-800 mt-8 pt-6 text-center text-xs text-slate-500">
                    © {new Date().getFullYear()} FarmingGoat Software. All Rights Reserved.
                </div>
            </footer>

            {/* POPUP INTERACTIVE DIALOG MODAL FOR GETTING FREE CALL RESPONSES */}
            {isDemoModalOpen && (
                <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl border border-slate-100">
                        <button
                            onClick={() => setIsDemoModalOpen(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {demoFormSubmitted ? (
                            <div className="text-center py-6 space-y-3">
                                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                                    <Check className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">Consultation Request Submitted!</h3>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Thank you for reaching out. A farm management expert will call you shortly to customize FarmingGoat for your herd.
                                </p>
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-base font-bold text-slate-900 mb-1">Request Farm Consultation Call</h3>
                                <p className="text-xs text-slate-500 mb-4">Provide details below and a system specialist will queue your call parameters.</p>

                                <form onSubmit={handleDemoSubmit} className="space-y-3.5">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Full Name</label>
                                        <input type="text" required name="name" value={demoFormData.name} onChange={handleDemoChange} className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-emerald-500" placeholder="John Doe" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Phone Number</label>
                                        <input type="tel" required name="phone" value={demoFormData.phone} onChange={handleDemoChange} className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-emerald-500" placeholder="+1 (555) 000-0000" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Herd Size Range</label>
                                        <select name="herdSize" value={demoFormData.herdSize} onChange={handleDemoChange} className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none bg-white">
                                            <option value="">Select range</option>
                                            <option value="1-50">1-50 Goats</option>
                                            <option value="51-200">51-200 Goats</option>
                                            <option value="200+">200+ Goats</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-wider transition-colors mt-2">
                                        Request Call Now
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
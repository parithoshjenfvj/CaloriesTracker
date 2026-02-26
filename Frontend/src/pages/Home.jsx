import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [activeFeature, setActiveFeature] = useState(0);
    const [calorieCount, setCalorieCount] = useState(0);
    const [proteinCount, setProteinCount] = useState(0);
    const [mealsCount, setMealsCount] = useState(0);

    // Feedback form state
    const [feedbackEmail, setFeedbackEmail] = useState('');
    const [feedbackText, setFeedbackText] = useState('');
    const [feedbackRating, setFeedbackRating] = useState(0);
    const [feedbackHoverRating, setFeedbackHoverRating] = useState(0);
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
    const [feedbackErrors, setFeedbackErrors] = useState({});

    const handleFeedbackSubmit = async (e) => {
        e.preventDefault();
        const errors = {};
        if (!feedbackEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(feedbackEmail)) {
            errors.email = 'Please enter a valid email address';
        }
        if (!feedbackText.trim()) {
            errors.feedback = 'Please enter your feedback';
        }
        if (feedbackRating === 0) {
            errors.rating = 'Please select a rating';
        }
        if (Object.keys(errors).length > 0) {
            setFeedbackErrors(errors);
            return;
        }
        setFeedbackErrors({});
        try {
            const res = await fetch('http://localhost:3000/user/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: feedbackEmail,
                    feedback: feedbackText,
                    rating: feedbackRating,
                }),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.message || 'Something went wrong');
            }
            setFeedbackSubmitted(true);
            setTimeout(() => {
                setFeedbackSubmitted(false);
                setFeedbackEmail('');
                setFeedbackText('');
                setFeedbackRating(0);
            }, 3000);
        } catch (err) {
            setFeedbackErrors({ submit: err.message || 'Failed to submit feedback. Please try again.' });
        }
    };

    useEffect(() => {
        setIsVisible(true);

        // Animate counters
        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;

        let step = 0;
        const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setCalorieCount(Math.round(2450 * ease));
            setProteinCount(Math.round(148 * ease));
            setMealsCount(Math.round(1250 * ease));
            if (step >= steps) clearInterval(timer);
        }, interval);

        // Auto-rotate features
        const featureTimer = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % 4);
        }, 3000);

        return () => {
            clearInterval(timer);
            clearInterval(featureTimer);
        };
    }, []);

    const features = [
        {
            icon: '🔥',
            title: 'Calorie Tracking',
            description: 'Log every meal and track your daily calorie intake with precision.',
            gradient: 'from-orange-500 to-red-500',
            bg: 'from-orange-500/10 to-red-500/10',
            border: 'border-orange-500/20'
        },
        {
            icon: '💪',
            title: 'Protein Goals',
            description: 'Hit your daily protein targets to fuel muscle growth and recovery.',
            gradient: 'from-emerald-500 to-teal-500',
            bg: 'from-emerald-500/10 to-teal-500/10',
            border: 'border-emerald-500/20'
        },
        {
            icon: '📊',
            title: 'Smart Analytics',
            description: 'Visualize your nutrition trends and make data-driven health decisions.',
            gradient: 'from-indigo-500 to-purple-500',
            bg: 'from-indigo-500/10 to-purple-500/10',
            border: 'border-indigo-500/20'
        },
        {
            icon: '🎯',
            title: 'Calorie Deficit',
            description: 'Calculate your exact daily deficit for sustainable weight loss.',
            gradient: 'from-pink-500 to-rose-500',
            bg: 'from-pink-500/10 to-rose-500/10',
            border: 'border-pink-500/20'
        }
    ];

    const testimonials = [
        { name: 'Arjun P.', lost: '12 kg', time: '3 months', avatar: '🧑‍💻' },
        { name: 'Sneha R.', lost: '8 kg', time: '2 months', avatar: '👩‍🔬' },
        { name: 'Vikram S.', lost: '15 kg', time: '4 months', avatar: '🧑‍🏫' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 overflow-hidden">
            {/* Animated Background Orbs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/8 blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/8 blur-[120px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
                <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-pink-600/5 blur-[100px] animate-pulse" style={{ animationDuration: '7s', animationDelay: '4s' }} />
            </div>

            {/* Floating Particles */}
            <div className="fixed inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-white/20"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>

            {/* Header */}
            <header className={`sticky top-0 z-50 backdrop-blur-xl bg-slate-950/60 border-b border-white/5 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                <path d="M2 17l10 5 10-5" />
                                <path d="M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent tracking-tight">
                            Calorie Deficit
                        </h1>
                    </div>

                    <button
                        onClick={() => navigate('/login')}
                        className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold rounded-xl cursor-pointer transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                            <polyline points="10 17 15 12 10 7" />
                            <line x1="15" y1="12" x2="3" y2="12" />
                        </svg>
                        Login
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-24">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Text Content */}
                    <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-xs font-semibold text-indigo-300 tracking-wide uppercase">Your Fitness Journey Starts Here</span>
                        </div>

                        <h2 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-6 tracking-tight">
                            Track.{' '}
                            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Transform.
                            </span>
                            <br />
                            Triumph.
                        </h2>

                        <p className="text-lg text-purple-300/70 mb-8 leading-relaxed max-w-lg">
                            Your all-in-one nutrition tracker that helps you understand what you eat,
                            how much you burn, and exactly what you need to reach your dream physique.
                        </p>

                        <div className="flex flex-wrap gap-4 mb-10">
                            <button
                                onClick={() => navigate('/register')}
                                className="group px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl cursor-pointer transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-2xl hover:shadow-indigo-500/40 hover:-translate-y-1 active:translate-y-0 flex items-center gap-2 text-base"
                            >
                                Start Free Today
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </button>
                            <button
                                className="px-8 py-3.5 bg-white/5 border border-white/15 text-purple-200 font-semibold rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-white/25 hover:-translate-y-1 flex items-center gap-2 text-base"
                                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                            >
                                See How It Works
                            </button>
                        </div>

                        {/* Social Proof */}
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {['🧑‍💻', '👩‍🔬', '🧑‍🏫', '👨‍🎨'].map((avatar, i) => (
                                    <div
                                        key={i}
                                        className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-500/30 border-2 border-slate-950 flex items-center justify-center text-sm"
                                        style={{ animationDelay: `${i * 100}ms` }}
                                    >
                                        {avatar}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">1,250+ Active Users</p>
                                <p className="text-xs text-purple-400/60">Join the community today</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Animated Dashboard Card */}
                    <div className={`relative transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
                        <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-2xl shadow-purple-900/20">
                            {/* Mock Dashboard Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                </div>
                                <span className="text-xs text-purple-400/50 font-mono">Today's Dashboard</span>
                            </div>

                            {/* Live Stats */}
                            <div className="grid grid-cols-3 gap-3 mb-6">
                                <div className="rounded-xl bg-gradient-to-br from-orange-500/15 to-red-500/10 border border-orange-500/15 p-4 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/10">
                                    <span className="text-xl mb-1 block">🔥</span>
                                    <p className="text-2xl font-bold text-white tabular-nums">{calorieCount}</p>
                                    <p className="text-xs text-orange-300/60 font-medium">kcal burned</p>
                                </div>
                                <div className="rounded-xl bg-gradient-to-br from-emerald-500/15 to-teal-500/10 border border-emerald-500/15 p-4 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/10">
                                    <span className="text-xl mb-1 block">💪</span>
                                    <p className="text-2xl font-bold text-white tabular-nums">{proteinCount}g</p>
                                    <p className="text-xs text-emerald-300/60 font-medium">protein</p>
                                </div>
                                <div className="rounded-xl bg-gradient-to-br from-indigo-500/15 to-purple-500/10 border border-indigo-500/15 p-4 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/10">
                                    <span className="text-xl mb-1 block">📦</span>
                                    <p className="text-2xl font-bold text-white tabular-nums">{mealsCount}+</p>
                                    <p className="text-xs text-indigo-300/60 font-medium">users</p>
                                </div>
                            </div>

                            {/* Animated Progress Bar */}
                            <div className="rounded-xl bg-white/5 border border-white/10 p-4 mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-semibold text-purple-200">Daily Goal Progress</span>
                                    <span className="text-sm font-bold text-emerald-400">78%</span>
                                </div>
                                <div className="h-3 rounded-full bg-white/5 overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-[2000ms] ease-out"
                                        style={{ width: isVisible ? '78%' : '0%' }}
                                    />
                                </div>
                            </div>

                            {/* Mini Food Log */}
                            <div className="space-y-2">
                                {[
                                    { name: 'Grilled Chicken', cal: 280, emoji: '🍗' },
                                    { name: 'Greek Yogurt Bowl', cal: 180, emoji: '🥣' },
                                    { name: 'Protein Smoothie', cal: 320, emoji: '🥤' }
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className={`flex items-center justify-between px-4 py-2.5 rounded-lg bg-white/5 border border-white/5 transition-all duration-700 hover:bg-white/10 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                                            }`}
                                        style={{ transitionDelay: `${1200 + i * 200}ms` }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span>{item.emoji}</span>
                                            <span className="text-sm text-purple-200 font-medium">{item.name}</span>
                                        </div>
                                        <span className="text-sm text-purple-400/70 font-semibold">{item.cal} kcal</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Decorative glow behind card */}
                        <div className="absolute -inset-4 bg-gradient-to-br from-indigo-600/15 to-purple-600/15 rounded-3xl blur-2xl -z-10" />
                    </div>
                </div>
            </section>

            {/* Animated Stats Bar */}
            <section className="relative border-y border-white/5 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: '50K+', label: 'Meals Tracked', icon: '🍽️' },
                            { value: '1.2K+', label: 'Active Users', icon: '👥' },
                            { value: '98%', label: 'Goal Success', icon: '🎯' },
                            { value: '4.9★', label: 'User Rating', icon: '⭐' }
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className={`text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                                style={{ transitionDelay: `${800 + i * 150}ms` }}
                            >
                                <span className="text-2xl mb-2 block">{stat.icon}</span>
                                <p className="text-3xl font-black text-white mb-1">{stat.value}</p>
                                <p className="text-sm text-purple-400/60 font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="max-w-7xl mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-5">
                        <span className="text-xs font-semibold text-purple-300 tracking-wide uppercase">Powerful Features</span>
                    </div>
                    <h3 className="text-4xl font-black text-white mb-4 tracking-tight">
                        Everything You Need to{' '}
                        <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            Crush Your Goals
                        </span>
                    </h3>
                    <p className="text-purple-300/60 text-lg max-w-xl mx-auto">
                        Built for people serious about their health. Simple, beautiful, and incredibly powerful.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            onClick={() => setActiveFeature(i)}
                            className={`relative rounded-2xl border p-6 cursor-pointer transition-all duration-500 group ${activeFeature === i
                                ? `bg-gradient-to-br ${feature.bg} ${feature.border} shadow-xl scale-[1.03]`
                                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]'
                                }`}
                        >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.bg} border ${feature.border} flex items-center justify-center mb-4 transition-transform duration-500 ${activeFeature === i ? 'scale-110 rotate-3' : 'group-hover:scale-105'}`}>
                                <span className="text-xl">{feature.icon}</span>
                            </div>
                            <h4 className={`text-base font-bold mb-2 transition-colors ${activeFeature === i ? 'text-white' : 'text-purple-200/90'}`}>
                                {feature.title}
                            </h4>
                            <p className={`text-sm leading-relaxed transition-colors ${activeFeature === i ? 'text-purple-200/80' : 'text-purple-400/50'}`}>
                                {feature.description}
                            </p>

                            {/* Active indicator */}
                            {activeFeature === i && (
                                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-t-full bg-gradient-to-r ${feature.gradient}`} />
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section className="max-w-7xl mx-auto px-6 pb-24">
                <div className="text-center mb-16">
                    <h3 className="text-4xl font-black text-white mb-4 tracking-tight">
                        3 Steps to a{' '}
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                            Healthier You
                        </span>
                    </h3>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            step: '01',
                            title: 'Create Your Profile',
                            desc: 'Sign up in seconds. Enter your weight, height, and fitness goals.',
                            icon: '📝',
                            gradient: 'from-indigo-500 to-blue-500'
                        },
                        {
                            step: '02',
                            title: 'Log Your Meals',
                            desc: 'Add food items manually or snap a photo. We handle the rest.',
                            icon: '📸',
                            gradient: 'from-purple-500 to-pink-500'
                        },
                        {
                            step: '03',
                            title: 'Watch The Results',
                            desc: 'Track your deficit, hit your protein goals, and transform your body.',
                            icon: '📈',
                            gradient: 'from-emerald-500 to-teal-500'
                        }
                    ].map((item, i) => (
                        <div key={i} className="relative group">
                            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 text-center transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 hover:shadow-xl">
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mx-auto mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg`}>
                                    <span className="text-2xl">{item.icon}</span>
                                </div>
                                <span className={`text-xs font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent tracking-widest uppercase`}>
                                    Step {item.step}
                                </span>
                                <h4 className="text-lg font-bold text-white mt-2 mb-3">{item.title}</h4>
                                <p className="text-sm text-purple-300/60 leading-relaxed">{item.desc}</p>
                            </div>

                            {/* Connector line for larger screens */}
                            {i < 2 && (
                                <div className="hidden md:block absolute top-1/2 -right-4 w-8 border-t border-dashed border-white/10" />
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="border-t border-white/5 bg-white/[0.02]">
                <div className="max-w-7xl mx-auto px-6 py-24">
                    <div className="text-center mb-14">
                        <h3 className="text-4xl font-black text-white mb-4 tracking-tight">
                            Real People.{' '}
                            <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                                Real Results.
                            </span>
                        </h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <div
                                key={i}
                                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-xl">
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white">{t.name}</p>
                                        <p className="text-xs text-purple-400/60">Lost {t.lost} in {t.time}</p>
                                    </div>
                                </div>
                                <div className="flex gap-1 mb-3">
                                    {[...Array(5)].map((_, j) => (
                                        <span key={j} className="text-yellow-400 text-sm">★</span>
                                    ))}
                                </div>
                                <p className="text-sm text-purple-300/60 leading-relaxed">
                                    "This app completely changed how I approach nutrition. The calorie tracking is so easy and the deficit calculator is a game-changer!"
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 p-12 md:p-16 text-center overflow-hidden">
                    {/* Background pulse */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 animate-pulse" style={{ animationDuration: '4s' }} />

                    <div className="relative z-10">
                        <span className="text-5xl mb-5 block">🚀</span>
                        <h3 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                            Ready to Transform?
                        </h3>
                        <p className="text-lg text-purple-300/70 mb-8 max-w-lg mx-auto">
                            Join thousands of users who are already crushing their fitness goals. It's free to start.
                        </p>
                        <button
                            onClick={() => navigate('/register')}
                            className="group px-10 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-xl cursor-pointer transition-all duration-300 shadow-xl shadow-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/50 hover:-translate-y-1 active:translate-y-0 text-lg flex items-center gap-3 mx-auto"
                        >
                            Create Your Free Account
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* Feedback Section */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-10 md:p-14 overflow-hidden">
                    {/* Background glow */}
                    <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full bg-cyan-600/8 blur-[100px]" />
                    <div className="absolute -bottom-20 -left-20 w-[250px] h-[250px] rounded-full bg-indigo-600/8 blur-[100px]" />

                    <div className="relative z-10">
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-5">
                                <span className="text-xs font-semibold text-cyan-300 tracking-wide uppercase">We Value Your Opinion</span>
                            </div>
                            <h3 className="text-4xl font-black text-white mb-4 tracking-tight">
                                Share Your{' '}
                                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                    Feedback
                                </span>
                            </h3>
                            <p className="text-purple-300/60 text-lg max-w-xl mx-auto">
                                Help us improve your experience. Drop us your thoughts and rate our app!
                            </p>
                        </div>

                        {feedbackSubmitted ? (
                            <div className="flex flex-col items-center justify-center py-12 animate-[fadeIn_0.5s_ease-out]">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-5 shadow-lg shadow-emerald-500/30 animate-[bounceIn_0.6s_ease-out]">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <h4 className="text-2xl font-bold text-white mb-2">Thank You!</h4>
                                <p className="text-purple-300/60 text-sm">Your feedback has been received. We appreciate your input!</p>
                            </div>
                        ) : (
                            <form onSubmit={handleFeedbackSubmit} className="max-w-2xl mx-auto space-y-6">
                                {/* Email */}
                                <div>
                                    <label htmlFor="feedback-email" className="block text-sm font-semibold text-purple-200 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        id="feedback-email"
                                        type="email"
                                        value={feedbackEmail}
                                        onChange={(e) => { setFeedbackEmail(e.target.value); setFeedbackErrors(prev => ({ ...prev, email: undefined })); }}
                                        placeholder="your@email.com"
                                        className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-purple-400/40 outline-none transition-all duration-300 focus:border-cyan-500/50 focus:bg-white/10 focus:shadow-lg focus:shadow-cyan-500/10 text-sm"
                                    />
                                    {feedbackErrors.email && (
                                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                                            <span>⚠️</span> {feedbackErrors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Feedback Text */}
                                <div>
                                    <label htmlFor="feedback-text" className="block text-sm font-semibold text-purple-200 mb-2">
                                        Your Feedback
                                    </label>
                                    <textarea
                                        id="feedback-text"
                                        rows={4}
                                        value={feedbackText}
                                        onChange={(e) => { setFeedbackText(e.target.value); setFeedbackErrors(prev => ({ ...prev, feedback: undefined })); }}
                                        placeholder="Tell us what you love or what we can improve..."
                                        className="w-full px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-purple-400/40 outline-none transition-all duration-300 focus:border-cyan-500/50 focus:bg-white/10 focus:shadow-lg focus:shadow-cyan-500/10 text-sm resize-none"
                                    />
                                    {feedbackErrors.feedback && (
                                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                                            <span>⚠️</span> {feedbackErrors.feedback}
                                        </p>
                                    )}
                                </div>

                                {/* Rating */}
                                <div>
                                    <label className="block text-sm font-semibold text-purple-200 mb-3">
                                        Rating <span className="text-purple-400/50 font-normal">(1 - 10)</span>
                                    </label>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                                            const isActive = num <= (feedbackHoverRating || feedbackRating);
                                            const gradient = num <= 3
                                                ? 'from-red-500 to-orange-500'
                                                : num <= 6
                                                    ? 'from-yellow-500 to-amber-500'
                                                    : num <= 8
                                                        ? 'from-emerald-500 to-teal-500'
                                                        : 'from-cyan-400 to-blue-500';
                                            return (
                                                <button
                                                    key={num}
                                                    type="button"
                                                    onClick={() => { setFeedbackRating(num); setFeedbackErrors(prev => ({ ...prev, rating: undefined })); }}
                                                    onMouseEnter={() => setFeedbackHoverRating(num)}
                                                    onMouseLeave={() => setFeedbackHoverRating(0)}
                                                    className={`w-10 h-10 rounded-xl font-bold text-sm cursor-pointer transition-all duration-300 border ${isActive
                                                        ? `bg-gradient-to-br ${gradient} border-transparent text-white shadow-lg scale-110`
                                                        : 'bg-white/5 border-white/10 text-purple-400/60 hover:bg-white/10 hover:border-white/20'
                                                        }`}
                                                >
                                                    {num}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {feedbackRating > 0 && (
                                        <p className="mt-2 text-xs text-purple-300/50">
                                            {feedbackRating <= 3 ? '😔 We can do better!' : feedbackRating <= 6 ? '🙂 Good, but room to grow!' : feedbackRating <= 8 ? '😊 Glad you like it!' : '🤩 Amazing! Thank you!'}
                                        </p>
                                    )}
                                    {feedbackErrors.rating && (
                                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                                            <span>⚠️</span> {feedbackErrors.rating}
                                        </p>
                                    )}
                                </div>

                                {/* Submit Error */}
                                {feedbackErrors.submit && (
                                    <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 flex items-center gap-2">
                                        <span>⚠️</span> {feedbackErrors.submit}
                                    </div>
                                )}

                                {/* Submit */}
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="group w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl cursor-pointer transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-2xl hover:shadow-cyan-500/40 hover:-translate-y-1 active:translate-y-0 text-base flex items-center justify-center gap-2"
                                    >
                                        Submit Feedback
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="22" y1="2" x2="11" y2="13" />
                                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/5 bg-slate-950/50">
                <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                <path d="M2 17l10 5 10-5" />
                                <path d="M2 12l10 5 10-5" />
                            </svg>
                        </div>
                        <span className="text-sm font-semibold text-purple-300/60">Calorie Deficit © 2026</span>
                    </div>
                    <p className="text-xs text-purple-400/40">Built with ❤️ for your fitness journey</p>
                </div>
            </footer>

            {/* Global Animations via inline style */}
            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
          50% { transform: translateY(-30px) scale(1.5); opacity: 0.6; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.1); }
          70% { transform: scale(0.95); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
        </div>
    );
};

export default Home;

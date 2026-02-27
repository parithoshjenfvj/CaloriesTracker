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
    const [focusedField, setFocusedField] = useState(null);

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
            const res = await fetch('https://caloriestracker-u1ca.onrender.com/user/feedback', {
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
        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;
        let step = 0;
        const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const ease = 1 - Math.pow(1 - progress, 3);
            setCalorieCount(Math.round(2450 * ease));
            setProteinCount(Math.round(148 * ease));
            setMealsCount(Math.round(1250 * ease));
            if (step >= steps) clearInterval(timer);
        }, interval);

        const featureTimer = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % 4);
        }, 3000);

        return () => {
            clearInterval(timer);
            clearInterval(featureTimer);
        };
    }, []);

    const features = [
        { icon: '🔥', title: 'Calorie Tracking', description: 'Log every meal and track your daily calorie intake with precision.', accent: 'var(--accent-amber)', dim: 'var(--accent-amber-dim)' },
        { icon: '💪', title: 'Protein Goals', description: 'Hit your daily protein targets to fuel muscle growth and recovery.', accent: 'var(--accent-teal)', dim: 'var(--accent-teal-dim)' },
        { icon: '📊', title: 'Smart Analytics', description: 'Visualize your nutrition trends and make data-driven health decisions.', accent: 'var(--accent-blue)', dim: 'var(--accent-blue-dim)' },
        { icon: '🎯', title: 'Calorie Deficit', description: 'Calculate your exact daily deficit for sustainable weight loss.', accent: 'var(--accent-coral)', dim: 'var(--accent-coral-dim)' }
    ];

    const testimonials = [
        { name: 'Arjun P.', lost: '12 kg', time: '3 months', avatar: '🧑‍💻' },
        { name: 'Sneha R.', lost: '8 kg', time: '2 months', avatar: '👩‍🔬' },
        { name: 'Vikram S.', lost: '15 kg', time: '4 months', avatar: '🧑‍🏫' }
    ];

    return (
        <div className="min-h-screen overflow-hidden bg-dot-pattern" style={{ background: 'var(--bg-primary)' }}>
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute rounded-full blur-[160px]" style={{ width: 500, height: 500, top: '-15%', left: '-8%', background: 'var(--accent-amber-dim)', animation: 'float 8s ease-in-out infinite' }} />
                <div className="absolute rounded-full blur-[140px]" style={{ width: 450, height: 450, bottom: '-15%', right: '-8%', background: 'var(--accent-teal-dim)', animation: 'float 10s ease-in-out infinite 3s' }} />
                <div className="absolute rounded-full blur-[120px]" style={{ width: 300, height: 300, top: '40%', right: '20%', background: 'var(--accent-coral-dim)', opacity: 0.4, animation: 'float 9s ease-in-out infinite 5s' }} />
            </div>

            {/* Floating Particles */}
            <div className="fixed inset-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full"
                        style={{
                            background: 'rgba(245, 158, 11, 0.25)',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>

            {/* Header */}
            <header
                className={`sticky top-0 z-50 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
                style={{
                    background: 'rgba(10, 10, 15, 0.75)',
                    backdropFilter: 'blur(20px)',
                    borderBottom: '1px solid var(--border-subtle)',
                }}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                            style={{
                                background: 'linear-gradient(135deg, var(--accent-amber), #e67e22)',
                                boxShadow: '0 4px 16px rgba(245, 158, 11, 0.2)',
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2c.5 5-3 7.5-3 12a6 6 0 0 0 12 0c0-4.5-3.5-7-3-12" />
                            </svg>
                        </div>
                        <h1 className="text-xl font-bold text-gradient-amber tracking-tight">Calorie Deficit</h1>
                    </div>

                    <button
                        onClick={() => navigate('/login')}
                        className="px-6 py-2.5 text-sm font-semibold rounded-xl cursor-pointer transition-all duration-300 flex items-center gap-2 btn-press"
                        style={{
                            background: 'linear-gradient(135deg, var(--accent-amber), #e67e22)',
                            color: '#fff',
                            boxShadow: '0 4px 16px rgba(245, 158, 11, 0.2)',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(245,158,11,0.35)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(245,158,11,0.2)'; }}
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

            {/* Hero */}
            <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-24">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left */}
                    <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
                        <div
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                            style={{ background: 'var(--accent-amber-dim)', border: '1px solid rgba(245,158,11,0.15)' }}
                        >
                            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--accent-teal)' }} />
                            <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: 'var(--accent-amber)' }}>Your Fitness Journey Starts Here</span>
                        </div>

                        <h2 className="text-5xl lg:text-6xl font-black leading-tight mb-6 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                            Track.{' '}
                            <span className="text-gradient-amber">Transform.</span>
                            <br />
                            Triumph.
                        </h2>

                        <p className="text-lg mb-8 leading-relaxed max-w-lg" style={{ color: 'var(--text-muted)' }}>
                            Your all-in-one nutrition tracker that helps you understand what you eat,
                            how much you burn, and exactly what you need to reach your dream physique.
                        </p>

                        <div className="flex flex-wrap gap-4 mb-10">
                            <button
                                onClick={() => navigate('/register')}
                                className="group px-8 py-3.5 font-bold rounded-xl cursor-pointer transition-all duration-300 flex items-center gap-2 text-base btn-press"
                                style={{
                                    background: 'linear-gradient(135deg, var(--accent-amber), #e67e22)',
                                    color: '#fff',
                                    boxShadow: '0 6px 24px rgba(245, 158, 11, 0.25)',
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(245,158,11,0.4)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(245,158,11,0.25)'; }}
                            >
                                Start Free Today
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </button>
                            <button
                                className="px-8 py-3.5 font-semibold rounded-xl cursor-pointer transition-all duration-300 flex items-center gap-2 text-base"
                                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-medium)', color: 'var(--text-secondary)' }}
                                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-medium)'; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.transform = 'translateY(0)'; }}
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
                                        className="w-9 h-9 rounded-full flex items-center justify-center text-sm"
                                        style={{
                                            background: 'var(--bg-card)',
                                            border: '2px solid var(--bg-primary)',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                                        }}
                                    >
                                        {avatar}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>1,250+ Active Users</p>
                                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Join the community today</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Dashboard Preview */}
                    <div className={`relative transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
                        <div
                            className="relative rounded-2xl p-6"
                            style={{
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-subtle)',
                                boxShadow: '0 8px 48px rgba(0,0,0,0.4)',
                            }}
                        >
                            {/* Window dots */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ background: '#ef4444' }} />
                                    <div className="w-3 h-3 rounded-full" style={{ background: '#f59e0b' }} />
                                    <div className="w-3 h-3 rounded-full" style={{ background: '#22c55e' }} />
                                </div>
                                <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>Today's Dashboard</span>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-3 mb-6">
                                {[
                                    { icon: '🔥', val: calorieCount, label: 'kcal burned', accent: 'var(--accent-amber)', dim: 'var(--accent-amber-dim)' },
                                    { icon: '💪', val: `${proteinCount}g`, label: 'protein', accent: 'var(--accent-teal)', dim: 'var(--accent-teal-dim)' },
                                    { icon: '📦', val: `${mealsCount}+`, label: 'users', accent: 'var(--accent-blue)', dim: 'var(--accent-blue-dim)' },
                                ].map((s, i) => (
                                    <div
                                        key={i}
                                        className="rounded-xl p-4 transition-all duration-500 cursor-default"
                                        style={{ background: s.dim, border: `1px solid ${s.dim}` }}
                                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = `0 4px 20px ${s.dim}`; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
                                    >
                                        <span className="text-xl mb-1 block">{s.icon}</span>
                                        <p className="text-2xl font-bold tabular-nums" style={{ color: 'var(--text-primary)' }}>{s.val}</p>
                                        <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Progress Bar */}
                            <div className="rounded-xl p-4 mb-4" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Daily Goal Progress</span>
                                    <span className="text-sm font-bold" style={{ color: 'var(--accent-teal)' }}>78%</span>
                                </div>
                                <div className="h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                                    <div
                                        className="h-full rounded-full transition-all duration-[2000ms] ease-out"
                                        style={{
                                            width: isVisible ? '78%' : '0%',
                                            background: 'linear-gradient(90deg, var(--accent-amber), var(--accent-teal))',
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Food Log */}
                            <div className="space-y-2">
                                {[
                                    { name: 'Grilled Chicken', cal: 280, emoji: '🍗' },
                                    { name: 'Greek Yogurt Bowl', cal: 180, emoji: '🥣' },
                                    { name: 'Protein Smoothie', cal: 320, emoji: '🥤' }
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className={`flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-700 cursor-default ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
                                        style={{
                                            background: 'var(--bg-elevated)',
                                            border: '1px solid var(--border-subtle)',
                                            transitionDelay: `${1200 + i * 200}ms`,
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-card-hover)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-elevated)'}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span>{item.emoji}</span>
                                            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{item.name}</span>
                                        </div>
                                        <span className="text-sm font-semibold" style={{ color: 'var(--accent-amber)' }}>{item.cal} kcal</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Glow behind card */}
                        <div className="absolute -inset-4 rounded-3xl blur-2xl -z-10" style={{ background: 'var(--accent-amber-dim)', opacity: 0.5 }} />
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.01)' }}>
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
                                <p className="text-3xl font-black mb-1" style={{ color: 'var(--text-primary)' }}>{stat.value}</p>
                                <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="max-w-7xl mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
                        style={{ background: 'var(--accent-teal-dim)', border: '1px solid rgba(20,184,166,0.15)' }}
                    >
                        <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: 'var(--accent-teal)' }}>Powerful Features</span>
                    </div>
                    <h3 className="text-4xl font-black mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                        Everything You Need to{' '}
                        <span className="text-gradient-amber">Crush Your Goals</span>
                    </h3>
                    <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
                        Built for people serious about their health. Simple, beautiful, and incredibly powerful.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            onClick={() => setActiveFeature(i)}
                            className="relative rounded-2xl p-6 cursor-pointer transition-all duration-500 group"
                            style={{
                                background: activeFeature === i ? feature.dim : 'var(--bg-card)',
                                border: `1px solid ${activeFeature === i ? feature.accent : 'var(--border-subtle)'}`,
                                boxShadow: activeFeature === i ? `0 8px 32px ${feature.dim}` : 'var(--shadow-card)',
                                transform: activeFeature === i ? 'scale(1.03)' : 'scale(1)',
                            }}
                            onMouseEnter={(e) => { if (activeFeature !== i) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.transform = 'scale(1.02)'; } }}
                            onMouseLeave={(e) => { if (activeFeature !== i) { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.transform = 'scale(1)'; } }}
                        >
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-500"
                                style={{
                                    background: feature.dim,
                                    border: `1px solid ${feature.dim}`,
                                    transform: activeFeature === i ? 'scale(1.1) rotate(3deg)' : 'scale(1)',
                                }}
                            >
                                <span className="text-xl">{feature.icon}</span>
                            </div>
                            <h4 className="text-base font-bold mb-2 transition-colors" style={{ color: activeFeature === i ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                                {feature.title}
                            </h4>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                                {feature.description}
                            </p>
                            {activeFeature === i && (
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-t-full" style={{ background: feature.accent }} />
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* How It Works */}
            <section className="max-w-7xl mx-auto px-6 pb-24">
                <div className="text-center mb-16">
                    <h3 className="text-4xl font-black mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                        3 Steps to a{' '}
                        <span className="text-gradient-teal">Healthier You</span>
                    </h3>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { step: '01', title: 'Create Your Profile', desc: 'Sign up in seconds. Enter your weight, height, and fitness goals.', icon: '📝', accent: 'var(--accent-blue)' },
                        { step: '02', title: 'Log Your Meals', desc: 'Add food items manually or snap a photo. We handle the rest.', icon: '📸', accent: 'var(--accent-amber)' },
                        { step: '03', title: 'Watch The Results', desc: 'Track your deficit, hit your protein goals, and transform your body.', icon: '📈', accent: 'var(--accent-teal)' }
                    ].map((item, i) => (
                        <div key={i} className="relative group">
                            <div
                                className="rounded-2xl p-8 text-center transition-all duration-500 hover-lift"
                                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-card)' }}
                            >
                                <div
                                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                                    style={{ background: 'linear-gradient(135deg, var(--accent-amber), #e67e22)', boxShadow: '0 6px 20px rgba(245,158,11,0.2)' }}
                                >
                                    <span className="text-2xl">{item.icon}</span>
                                </div>
                                <span className="text-xs font-bold tracking-widest uppercase text-gradient-amber">
                                    Step {item.step}
                                </span>
                                <h4 className="text-lg font-bold mt-2 mb-3" style={{ color: 'var(--text-primary)' }}>{item.title}</h4>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                            </div>
                            {i < 2 && (
                                <div className="hidden md:block absolute top-1/2 -right-4 w-8" style={{ borderTop: '1px dashed var(--border-medium)' }} />
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section style={{ borderTop: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.01)' }}>
                <div className="max-w-7xl mx-auto px-6 py-24">
                    <div className="text-center mb-14">
                        <h3 className="text-4xl font-black mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                            Real People.{' '}
                            <span className="text-gradient-amber">Real Results.</span>
                        </h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((t, i) => (
                            <div
                                key={i}
                                className="rounded-2xl p-6 transition-all duration-500 hover-lift"
                                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-card)' }}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className="w-11 h-11 rounded-full flex items-center justify-center text-xl"
                                        style={{ background: 'var(--accent-amber-dim)', border: '1px solid rgba(245,158,11,0.15)' }}
                                    >
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{t.name}</p>
                                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Lost {t.lost} in {t.time}</p>
                                    </div>
                                </div>
                                <div className="flex gap-1 mb-3">
                                    {[...Array(5)].map((_, j) => (
                                        <span key={j} className="text-sm" style={{ color: 'var(--accent-amber)' }}>★</span>
                                    ))}
                                </div>
                                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                                    "This app completely changed how I approach nutrition. The calorie tracking is so easy and the deficit calculator is a game-changer!"
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div
                    className="relative rounded-3xl p-12 md:p-16 text-center overflow-hidden"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
                >
                    {/* Background accent */}
                    <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(ellipse at center, var(--accent-amber-dim), transparent 70%)' }} />

                    <div className="relative z-10">
                        <span className="text-5xl mb-5 block" style={{ animation: 'float 3s ease-in-out infinite' }}>🚀</span>
                        <h3 className="text-4xl md:text-5xl font-black mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                            Ready to Transform?
                        </h3>
                        <p className="text-lg mb-8 max-w-lg mx-auto" style={{ color: 'var(--text-muted)' }}>
                            Join thousands of users who are already crushing their fitness goals. It's free to start.
                        </p>
                        <button
                            onClick={() => navigate('/register')}
                            className="group px-10 py-4 font-bold rounded-xl cursor-pointer transition-all duration-300 text-lg flex items-center gap-3 mx-auto btn-press"
                            style={{
                                background: 'linear-gradient(135deg, var(--accent-amber), #e67e22)',
                                color: '#fff',
                                boxShadow: '0 8px 32px rgba(245,158,11,0.3)',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 48px rgba(245,158,11,0.5)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(245,158,11,0.3)'; }}
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

            {/* Feedback */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div
                    className="relative rounded-3xl p-10 md:p-14 overflow-hidden"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
                >
                    {/* Background glow */}
                    <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full blur-[100px]" style={{ background: 'var(--accent-teal-dim)', opacity: 0.5 }} />
                    <div className="absolute -bottom-20 -left-20 w-[250px] h-[250px] rounded-full blur-[100px]" style={{ background: 'var(--accent-amber-dim)', opacity: 0.5 }} />

                    <div className="relative z-10">
                        <div className="text-center mb-10">
                            <div
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
                                style={{ background: 'var(--accent-teal-dim)', border: '1px solid rgba(20,184,166,0.15)' }}
                            >
                                <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: 'var(--accent-teal)' }}>We Value Your Opinion</span>
                            </div>
                            <h3 className="text-4xl font-black mb-4 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                                Share Your{' '}
                                <span className="text-gradient-teal">Feedback</span>
                            </h3>
                            <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
                                Help us improve your experience. Drop us your thoughts and rate our app!
                            </p>
                        </div>

                        {feedbackSubmitted ? (
                            <div className="flex flex-col items-center justify-center py-12 animate-fade-in-up">
                                <div
                                    className="w-20 h-20 rounded-full flex items-center justify-center mb-5 animate-bounce-in"
                                    style={{ background: 'linear-gradient(135deg, var(--accent-teal), #0d9488)', boxShadow: '0 8px 24px rgba(20,184,166,0.3)' }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <h4 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Thank You!</h4>
                                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Your feedback has been received. We appreciate your input!</p>
                            </div>
                        ) : (
                            <form onSubmit={handleFeedbackSubmit} className="max-w-2xl mx-auto space-y-6">
                                {/* Email */}
                                <div>
                                    <label htmlFor="feedback-email" className="block text-sm font-semibold mb-2 transition-colors duration-300"
                                        style={{ color: focusedField === 'fb-email' ? 'var(--accent-teal)' : 'var(--text-secondary)' }}
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        id="feedback-email"
                                        type="email"
                                        value={feedbackEmail}
                                        onChange={(e) => { setFeedbackEmail(e.target.value); setFeedbackErrors(prev => ({ ...prev, email: undefined })); }}
                                        onFocus={() => setFocusedField('fb-email')}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder="your@email.com"
                                        className="w-full px-5 py-3.5 rounded-xl text-sm transition-all duration-300 focus-glow"
                                        style={{
                                            background: 'var(--bg-elevated)',
                                            border: `1px solid ${focusedField === 'fb-email' ? 'var(--accent-teal)' : 'var(--border-medium)'}`,
                                            color: 'var(--text-primary)',
                                            outline: 'none',
                                        }}
                                    />
                                    {feedbackErrors.email && (
                                        <p className="mt-1.5 text-xs flex items-center gap-1" style={{ color: 'var(--accent-coral)' }}>
                                            <span>⚠️</span> {feedbackErrors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Feedback Text */}
                                <div>
                                    <label htmlFor="feedback-text" className="block text-sm font-semibold mb-2 transition-colors duration-300"
                                        style={{ color: focusedField === 'fb-text' ? 'var(--accent-teal)' : 'var(--text-secondary)' }}
                                    >
                                        Your Feedback
                                    </label>
                                    <textarea
                                        id="feedback-text"
                                        rows={4}
                                        value={feedbackText}
                                        onChange={(e) => { setFeedbackText(e.target.value); setFeedbackErrors(prev => ({ ...prev, feedback: undefined })); }}
                                        onFocus={() => setFocusedField('fb-text')}
                                        onBlur={() => setFocusedField(null)}
                                        placeholder="Tell us what you love or what we can improve..."
                                        className="w-full px-5 py-3.5 rounded-xl text-sm transition-all duration-300 resize-none focus-glow"
                                        style={{
                                            background: 'var(--bg-elevated)',
                                            border: `1px solid ${focusedField === 'fb-text' ? 'var(--accent-teal)' : 'var(--border-medium)'}`,
                                            color: 'var(--text-primary)',
                                            outline: 'none',
                                        }}
                                    />
                                    {feedbackErrors.feedback && (
                                        <p className="mt-1.5 text-xs flex items-center gap-1" style={{ color: 'var(--accent-coral)' }}>
                                            <span>⚠️</span> {feedbackErrors.feedback}
                                        </p>
                                    )}
                                </div>

                                {/* Rating */}
                                <div>
                                    <label className="block text-sm font-semibold mb-3" style={{ color: 'var(--text-secondary)' }}>
                                        Rating <span style={{ color: 'var(--text-muted)' }}>(1 - 10)</span>
                                    </label>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                                            const isActive = num <= (feedbackHoverRating || feedbackRating);
                                            const getAccent = () => {
                                                if (num <= 3) return { bg: 'var(--accent-coral)', dim: 'var(--accent-coral-dim)' };
                                                if (num <= 6) return { bg: 'var(--accent-amber)', dim: 'var(--accent-amber-dim)' };
                                                if (num <= 8) return { bg: 'var(--accent-teal)', dim: 'var(--accent-teal-dim)' };
                                                return { bg: 'var(--accent-blue)', dim: 'var(--accent-blue-dim)' };
                                            };
                                            const accent = getAccent();
                                            return (
                                                <button
                                                    key={num}
                                                    type="button"
                                                    onClick={() => { setFeedbackRating(num); setFeedbackErrors(prev => ({ ...prev, rating: undefined })); }}
                                                    onMouseEnter={() => setFeedbackHoverRating(num)}
                                                    onMouseLeave={() => setFeedbackHoverRating(0)}
                                                    className="w-10 h-10 rounded-xl font-bold text-sm cursor-pointer transition-all duration-300"
                                                    style={isActive
                                                        ? { background: accent.bg, border: '1px solid transparent', color: '#fff', boxShadow: `0 4px 12px ${accent.dim}`, transform: 'scale(1.1)' }
                                                        : { background: 'var(--bg-elevated)', border: '1px solid var(--border-medium)', color: 'var(--text-muted)' }
                                                    }
                                                >
                                                    {num}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {feedbackRating > 0 && (
                                        <p className="mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                                            {feedbackRating <= 3 ? '😔 We can do better!' : feedbackRating <= 6 ? '🙂 Good, but room to grow!' : feedbackRating <= 8 ? '😊 Glad you like it!' : '🤩 Amazing! Thank you!'}
                                        </p>
                                    )}
                                    {feedbackErrors.rating && (
                                        <p className="mt-1.5 text-xs flex items-center gap-1" style={{ color: 'var(--accent-coral)' }}>
                                            <span>⚠️</span> {feedbackErrors.rating}
                                        </p>
                                    )}
                                </div>

                                {feedbackErrors.submit && (
                                    <div className="px-4 py-3 rounded-xl text-sm flex items-center gap-2" style={{ background: 'var(--accent-coral-dim)', border: '1px solid rgba(244,63,94,0.2)', color: 'var(--accent-coral)' }}>
                                        <span>⚠️</span> {feedbackErrors.submit}
                                    </div>
                                )}

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="group w-full px-8 py-4 font-bold rounded-xl cursor-pointer transition-all duration-300 text-base flex items-center justify-center gap-2 btn-press"
                                        style={{
                                            background: 'linear-gradient(135deg, var(--accent-teal), #0d9488)',
                                            color: '#fff',
                                            boxShadow: '0 6px 24px rgba(20,184,166,0.25)',
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(20,184,166,0.4)'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(20,184,166,0.25)'; }}
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
            <footer style={{ borderTop: '1px solid var(--border-subtle)', background: 'rgba(10,10,15,0.5)' }}>
                <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, var(--accent-amber), #e67e22)' }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2c.5 5-3 7.5-3 12a6 6 0 0 0 12 0c0-4.5-3.5-7-3-12" />
                            </svg>
                        </div>
                        <span className="text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>Calorie Deficit © 2026</span>
                    </div>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Built with ❤️ for your fitness journey</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;

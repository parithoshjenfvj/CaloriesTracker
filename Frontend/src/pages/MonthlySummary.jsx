import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MonthlySummary = () => {
    const navigate = useNavigate();
    const [summary, setSummary] = useState([]);
    const [loading, setLoading] = useState(true);

    const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

    useEffect(() => {
        const fetchMonthlySummary = async () => {
            try {
                const response = await fetch('http://localhost:3000/user/monthly-summary', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                });
                const data = await response.json();
                setSummary(data.summary);
            } catch (error) {
                console.error('Error fetching monthly summary:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMonthlySummary();
    }, []);

    const grandTotals = summary.reduce(
        (acc, day) => ({
            calories: acc.calories + day.totalCalories,
            protein: acc.protein + day.totalProtein,
            fat: acc.fat + day.totalFat,
            fiber: acc.fiber + day.totalFiber
        }),
        { calories: 0, protein: 0, fat: 0, fiber: 0 }
    );

    const formatDate = (dateStr) => {
        const date = new Date(dateStr + 'T00:00:00');
        return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    };

    const totalStats = [
        { label: 'Total Calories', value: grandTotals.calories, icon: '🔥', accent: 'var(--accent-amber)', dim: 'var(--accent-amber-dim)' },
        { label: 'Total Protein', value: grandTotals.protein + 'g', icon: '💪', accent: 'var(--accent-teal)', dim: 'var(--accent-teal-dim)' },
        { label: 'Total Fat', value: grandTotals.fat + 'g', icon: '🥑', accent: 'var(--accent-coral)', dim: 'var(--accent-coral-dim)' },
        { label: 'Total Fiber', value: grandTotals.fiber + 'g', icon: '🌿', accent: 'var(--accent-blue)', dim: 'var(--accent-blue-dim)' },
    ];

    return (
        <div className="min-h-screen bg-dot-pattern" style={{ background: 'var(--bg-primary)' }}>
            {/* Header */}
            <header
                className="sticky top-0 z-50 animate-fade-in-down"
                style={{
                    background: 'rgba(10, 10, 15, 0.85)',
                    backdropFilter: 'blur(20px)',
                    borderBottom: '1px solid var(--border-subtle)',
                }}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300"
                            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-medium)', color: 'var(--text-secondary)' }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-medium)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <h1 className="text-xl font-bold text-gradient-amber tracking-tight">Monthly Summary</h1>
                    </div>
                    <span
                        className="text-sm font-medium px-4 py-1.5 rounded-full"
                        style={{ background: 'var(--accent-amber-dim)', color: 'var(--accent-amber)', border: '1px solid rgba(245,158,11,0.15)' }}
                    >
                        📅 {currentMonth}
                    </span>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-10">
                {/* Grand Totals */}
                {!loading && summary.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                        {totalStats.map((stat, i) => (
                            <div
                                key={stat.label}
                                className="relative overflow-hidden rounded-2xl p-6 transition-all duration-400 hover-lift animate-fade-in-up cursor-default"
                                style={{
                                    background: 'var(--bg-card)',
                                    border: '1px solid var(--border-subtle)',
                                    boxShadow: 'var(--shadow-card)',
                                    animationDelay: `${i * 0.08}s`,
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.borderColor = stat.accent}
                                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
                            >
                                {/* Accent glow */}
                                <div
                                    className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-30"
                                    style={{ background: stat.accent, transform: 'translate(30%, -30%)' }}
                                />
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-3">
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                                            style={{ background: stat.dim }}
                                        >
                                            {stat.icon}
                                        </div>
                                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)' }}>
                                            THIS MONTH
                                        </span>
                                    </div>
                                    <p className="text-3xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{stat.value}</p>
                                    <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Daily Breakdown */}
                <div
                    className="rounded-2xl overflow-hidden animate-fade-in-up"
                    style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-subtle)',
                        boxShadow: 'var(--shadow-card)',
                        animationDelay: '0.3s',
                    }}
                >
                    <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" style={{ color: 'var(--accent-amber)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            Daily Breakdown
                        </h3>
                        <span
                            className="text-xs font-medium px-3 py-1 rounded-full"
                            style={{ background: 'var(--accent-teal-dim)', color: 'var(--accent-teal)', border: '1px solid rgba(20,184,166,0.15)' }}
                        >
                            {summary.length} {summary.length === 1 ? 'day' : 'days'} tracked
                        </span>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            {/* Shimmer skeleton */}
                            <div className="w-full px-6 space-y-3">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="shimmer-bg rounded-xl h-16" style={{ animationDelay: `${i * 0.15}s` }} />
                                ))}
                            </div>
                        </div>
                    ) : summary.length > 0 ? (
                        <div>
                            {summary.map((day, index) => (
                                <div
                                    key={day._id}
                                    className="group px-6 py-4 flex items-center justify-between gap-4 transition-all duration-300 animate-fade-in-up"
                                    style={{
                                        borderBottom: '1px solid var(--border-subtle)',
                                        animationDelay: `${0.35 + index * 0.05}s`,
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-card-hover)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                >
                                    {/* Date */}
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div
                                            className="w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0"
                                            style={{ background: 'var(--accent-amber-dim)', border: '1px solid rgba(245,158,11,0.1)' }}
                                        >
                                            <span className="text-[10px] font-bold uppercase leading-none" style={{ color: 'var(--accent-amber)' }}>
                                                {new Date(day._id + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short' })}
                                            </span>
                                            <span className="text-lg font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
                                                {new Date(day._id + 'T00:00:00').getDate()}
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold transition-colors" style={{ color: 'var(--text-primary)' }}>
                                                {formatDate(day._id)}
                                            </h4>
                                        </div>
                                    </div>

                                    {/* Nutrition badges */}
                                    <div className="flex items-center gap-2 flex-wrap justify-end">
                                        {[
                                            { emoji: '🔥', val: `${day.totalCalories} cal`, accent: 'var(--accent-amber)', dim: 'var(--accent-amber-dim)' },
                                            { emoji: '💪', val: `${day.totalProtein}g`, accent: 'var(--accent-teal)', dim: 'var(--accent-teal-dim)' },
                                            { emoji: '🥑', val: `${day.totalFat}g`, accent: 'var(--accent-coral)', dim: 'var(--accent-coral-dim)' },
                                            { emoji: '🌿', val: `${day.totalFiber}g`, accent: 'var(--accent-blue)', dim: 'var(--accent-blue-dim)' },
                                        ].map((badge) => (
                                            <span
                                                key={badge.emoji}
                                                className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg"
                                                style={{ background: badge.dim, color: badge.accent, border: `1px solid ${badge.dim}` }}
                                            >
                                                {badge.emoji} {badge.val}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 px-6 animate-fade-in-up">
                            <div
                                className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                                style={{ background: 'var(--accent-amber-dim)' }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9" style={{ color: 'var(--accent-amber)', opacity: 0.6 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                            </div>
                            <p className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>No data this month</p>
                            <p className="text-sm mb-6 text-center max-w-sm" style={{ color: 'var(--text-muted)' }}>
                                Start tracking your food items to see your monthly summary here.
                            </p>
                            <button
                                onClick={() => navigate('/create-food-item')}
                                className="px-6 py-2.5 text-sm font-semibold rounded-xl cursor-pointer transition-all duration-300 btn-press"
                                style={{
                                    background: 'linear-gradient(135deg, var(--accent-amber), #e67e22)',
                                    color: '#fff',
                                    boxShadow: '0 4px 16px rgba(245,158,11,0.2)',
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(245,158,11,0.35)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(245,158,11,0.2)'; }}
                            >
                                Create Food Item
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default MonthlySummary;

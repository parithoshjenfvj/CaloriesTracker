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

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
            {/* Header */}
            <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-white/10 shadow-lg shadow-purple-900/20">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="w-10 h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-white/25 hover:-translate-y-0.5"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent tracking-tight">
                            Monthly Summary
                        </h1>
                    </div>
                    <span className="text-sm font-medium text-purple-400/60 bg-purple-500/10 px-4 py-1.5 rounded-full border border-purple-500/15">
                        📅 {currentMonth}
                    </span>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-10">
                {/* Grand Totals */}
                {!loading && summary.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                        {[
                            { label: 'Total Calories', value: grandTotals.calories, icon: '🔥', color: 'from-orange-500/20 to-orange-600/10', border: 'border-orange-500/20' },
                            { label: 'Total Protein', value: grandTotals.protein + 'g', icon: '💪', color: 'from-emerald-500/20 to-emerald-600/10', border: 'border-emerald-500/20' },
                            { label: 'Total Fat', value: grandTotals.fat + 'g', icon: '🥑', color: 'from-purple-500/20 to-purple-600/10', border: 'border-purple-500/20' },
                            { label: 'Total Fiber', value: grandTotals.fiber + 'g', icon: '🌿', color: 'from-green-500/20 to-green-600/10', border: 'border-green-500/20' },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.color} border ${stat.border} p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-2xl">{stat.icon}</span>
                                    <span className="text-[10px] font-medium text-purple-400/50 bg-white/5 px-2 py-0.5 rounded-full">THIS MONTH</span>
                                </div>
                                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                                <p className="text-sm text-purple-300/70 font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Day-by-Day Breakdown */}
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            Daily Breakdown
                        </h3>
                        <span className="text-xs font-medium text-purple-400/60 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/15">
                            {summary.length} {summary.length === 1 ? 'day' : 'days'} tracked
                        </span>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-10 h-10 border-3 border-purple-500/30 border-t-purple-400 rounded-full animate-spin mb-4"></div>
                            <p className="text-purple-300/60 text-sm">Loading monthly data...</p>
                        </div>
                    ) : summary.length > 0 ? (
                        <div className="divide-y divide-white/5">
                            {summary.map((day, index) => (
                                <div
                                    key={day._id}
                                    className="group px-6 py-4 flex items-center justify-between gap-4 transition-all duration-300 hover:bg-white/[0.03]"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    {/* Date */}
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/15 flex flex-col items-center justify-center flex-shrink-0">
                                            <span className="text-[10px] font-bold text-purple-400/70 uppercase leading-none">
                                                {new Date(day._id + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short' })}
                                            </span>
                                            <span className="text-lg font-bold text-white leading-tight">
                                                {new Date(day._id + 'T00:00:00').getDate()}
                                            </span>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-white group-hover:text-purple-100 transition-colors">
                                                {formatDate(day._id)}
                                            </h4>
                                        </div>
                                    </div>

                                    {/* Nutrition badges */}
                                    <div className="flex items-center gap-3 flex-wrap justify-end">
                                        <span className="inline-flex items-center gap-1 text-xs font-medium text-orange-300/80 bg-orange-500/10 px-2.5 py-1 rounded-lg border border-orange-500/10">
                                            🔥 {day.totalCalories} cal
                                        </span>
                                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-300/80 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/10">
                                            💪 {day.totalProtein}g
                                        </span>
                                        <span className="inline-flex items-center gap-1 text-xs font-medium text-purple-300/80 bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/10">
                                            🥑 {day.totalFat}g
                                        </span>
                                        <span className="inline-flex items-center gap-1 text-xs font-medium text-green-300/80 bg-green-500/10 px-2.5 py-1 rounded-lg border border-green-500/10">
                                            🌿 {day.totalFiber}g
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 px-6">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-purple-400/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                            </div>
                            <p className="text-white/80 text-lg font-medium mb-2">No data this month</p>
                            <p className="text-purple-300/50 text-sm mb-6 text-center max-w-sm">
                                Start tracking your food items to see your monthly summary here.
                            </p>
                            <button
                                onClick={() => navigate('/create-food-item')}
                                className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold rounded-xl cursor-pointer transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5"
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

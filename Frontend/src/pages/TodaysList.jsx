import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TodaysList = () => {
    const navigate = useNavigate();
    const [foodItems, setFoodItems] = useState([]);
    const [totals, setTotals] = useState({ calories: 0, protein: 0, fat: 0, fiber: 0 });
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    const fetchTodayItems = async () => {
        try {
            const response = await fetch("https://caloriestracker-u1ca.onrender.com/user/gettoday", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });
            const data = await response.json();
            const items = data.foodItems || [];
            setFoodItems(items);

            // Calculate totals
            let totalCalories = 0, totalProtein = 0, totalFat = 0, totalFiber = 0;
            items.forEach(item => {
                totalCalories += item.calories || 0;
                totalProtein += item.protein || 0;
                totalFat += item.fat || 0;
                totalFiber += item.fiber || 0;
            });
            setTotals({ calories: totalCalories, protein: totalProtein, fat: totalFat, fiber: totalFiber });
        } catch (error) {
            console.error('Error fetching today items:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodayItems();
    }, []);

    const handleDelete = async (id) => {
        setDeletingId(id);
        try {
            const response = await fetch(`https://caloriestracker-u1ca.onrender.com/user/delete/${id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });
            if (response.ok) {
                setFoodItems(prev => prev.filter(item => item._id !== id));
                // Recalculate totals
                setFoodItems(prev => {
                    let totalCalories = 0, totalProtein = 0, totalFat = 0, totalFiber = 0;
                    prev.forEach(item => {
                        totalCalories += item.calories || 0;
                        totalProtein += item.protein || 0;
                        totalFat += item.fat || 0;
                        totalFiber += item.fiber || 0;
                    });
                    setTotals({ calories: totalCalories, protein: totalProtein, fat: totalFat, fiber: totalFiber });
                    return prev;
                });
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        } finally {
            setDeletingId(null);
        }
    };

    const stats = [
        { label: 'Total Items', value: foodItems.length, icon: '📦', accent: 'var(--accent-blue)', accentDim: 'var(--accent-blue-dim)' },
        { label: 'Calories', value: totals.calories, icon: '🔥', accent: 'var(--accent-amber)', accentDim: 'var(--accent-amber-dim)' },
        { label: 'Protein', value: `${totals.protein}g`, icon: '💪', accent: 'var(--accent-teal)', accentDim: 'var(--accent-teal-dim)' },
        { label: 'Fat', value: `${totals.fat}g`, icon: '🥑', accent: 'var(--accent-coral)', accentDim: 'var(--accent-coral-dim)' },
    ];

    return (
        <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
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
                            style={{
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-medium)',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-amber)'; e.currentTarget.style.transform = 'translateX(-2px)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-medium)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-gradient-amber tracking-tight">
                                Today's List
                            </h1>
                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-10">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    {stats.map((stat, i) => (
                        <div
                            key={stat.label}
                            className="relative overflow-hidden rounded-2xl p-5 transition-all duration-400 hover-lift animate-fade-in-up cursor-default"
                            style={{
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-subtle)',
                                boxShadow: 'var(--shadow-card)',
                                animationDelay: `${0.1 + i * 0.08}s`,
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = stat.accent}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
                        >
                            <div
                                className="absolute top-0 right-0 w-16 h-16 rounded-full blur-2xl opacity-30"
                                style={{ background: stat.accent, transform: 'translate(30%, -30%)' }}
                            />
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-3">
                                    <div
                                        className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
                                        style={{ background: stat.accentDim }}
                                    >
                                        {stat.icon}
                                    </div>
                                </div>
                                <p className="text-2xl font-bold mb-0.5" style={{ color: 'var(--text-primary)' }}>
                                    {stat.value}
                                </p>
                                <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                                    {stat.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Food Items List */}
                <div
                    className="rounded-2xl overflow-hidden animate-fade-in-up"
                    style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-subtle)',
                        boxShadow: 'var(--shadow-card)',
                        animationDelay: '0.4s',
                    }}
                >
                    <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" style={{ color: 'var(--accent-amber)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                            </svg>
                            All Items Today
                        </h3>
                        <span
                            className="text-xs font-medium px-3 py-1 rounded-full"
                            style={{ background: 'var(--accent-teal-dim)', color: 'var(--accent-teal)', border: '1px solid rgba(20,184,166,0.15)' }}
                        >
                            {foodItems.length} {foodItems.length === 1 ? 'item' : 'items'}
                        </span>
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 px-6">
                            <div
                                className="w-10 h-10 rounded-full border-3 animate-spin"
                                style={{ border: '3px solid var(--border-subtle)', borderTopColor: 'var(--accent-amber)' }}
                            />
                            <p className="text-sm mt-4" style={{ color: 'var(--text-muted)' }}>Loading today's items...</p>
                        </div>
                    ) : foodItems.length > 0 ? (
                        <div>
                            {foodItems.map((item, i) => (
                                <div
                                    key={item._id}
                                    className="group px-6 py-4 flex items-center justify-between gap-4 transition-all duration-300 animate-fade-in-up"
                                    style={{
                                        borderBottom: i < foodItems.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                                        animationDelay: `${0.5 + i * 0.06}s`,
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-card-hover)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                >
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-semibold truncate mb-2 transition-colors" style={{ color: 'var(--text-primary)' }}>
                                            {item.itemName}
                                        </h4>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            {[
                                                { emoji: '🔥', val: `${item.calories} cal`, accent: 'var(--accent-amber)', dim: 'var(--accent-amber-dim)' },
                                                { emoji: '💪', val: `${item.protein}g`, accent: 'var(--accent-teal)', dim: 'var(--accent-teal-dim)' },
                                                { emoji: '🥑', val: `${item.fat}g`, accent: 'var(--accent-coral)', dim: 'var(--accent-coral-dim)' },
                                                { emoji: '🌿', val: `${item.fiber}g`, accent: 'var(--accent-blue)', dim: 'var(--accent-blue-dim)' },
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

                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        disabled={deletingId === item._id}
                                        className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-300 btn-press"
                                        style={deletingId === item._id
                                            ? { background: 'var(--accent-coral-dim)', border: '1px solid rgba(244,63,94,0.25)', color: 'var(--accent-coral)', opacity: 0.7 }
                                            : { background: 'var(--accent-coral-dim)', border: '1px solid rgba(244,63,94,0.25)', color: 'var(--accent-coral)' }
                                        }
                                        onMouseEnter={(e) => { if (deletingId !== item._id) { e.currentTarget.style.background = 'var(--accent-coral)'; e.currentTarget.style.color = '#fff'; } }}
                                        onMouseLeave={(e) => { if (deletingId !== item._id) { e.currentTarget.style.background = 'var(--accent-coral-dim)'; e.currentTarget.style.color = 'var(--accent-coral)'; } }}
                                    >
                                        {deletingId === item._id ? (
                                            <>
                                                <div className="w-4 h-4 rounded-full border-2 animate-spin" style={{ borderColor: 'transparent', borderTopColor: 'var(--accent-coral)' }} />
                                                Deleting...
                                            </>
                                        ) : (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="3 6 5 6 21 6" />
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                </svg>
                                                Delete
                                            </>
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 px-6 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                            <div
                                className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                                style={{ background: 'var(--accent-amber-dim)' }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9" style={{ color: 'var(--accent-amber)', opacity: 0.6 }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                </svg>
                            </div>
                            <p className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>No items yet today</p>
                            <p className="text-sm mb-6 text-center max-w-sm" style={{ color: 'var(--text-muted)' }}>
                                You haven't added any food items today. Start tracking to see them here.
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
                                Add Your First Item
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default TodaysList;

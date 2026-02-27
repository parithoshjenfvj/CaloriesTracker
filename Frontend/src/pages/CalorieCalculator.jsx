import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CalorieCalculator = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        currentWeight: '',
        targetWeight: '',
        height: '',
        age: '',
        gender: 'male',
        physicalActivityLevel: 'sedentary'
    });
    const [result, setResult] = useState(null);
    const [focusedField, setFocusedField] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const response = await fetch("https://caloriestracker-u1ca.onrender.com/user/calorie-deficit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        setIsSubmitting(false);
        alert("your calorie deficit is " + data.dailyCalories);
    };

    const activityLevels = [
        { value: 'sedentary', label: 'Sedentary', description: 'Little or no exercise', icon: '🪑' },
        { value: 'light', label: 'Light', description: 'Exercise 1-3 days/week', icon: '🚶' },
        { value: 'moderate', label: 'Moderate', description: 'Exercise 3-5 days/week', icon: '🏃' },
        { value: 'active', label: 'Active', description: 'Exercise 6-7 days/week', icon: '💪' },
        { value: 'very active', label: 'Very Active', description: 'Hard exercise daily', icon: '🏋️' }
    ];

    const numberFields = [
        { name: 'currentWeight', label: 'Current Weight', unit: 'kg', placeholder: '75' },
        { name: 'targetWeight', label: 'Target Weight', unit: 'kg', placeholder: '65' },
        { name: 'height', label: 'Height', unit: 'cm', placeholder: '175' },
        { name: 'age', label: 'Age', unit: 'yrs', placeholder: '25', max: 120 },
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
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300"
                        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-medium)', color: 'var(--text-secondary)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-medium)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                    <h1 className="text-xl font-bold text-gradient-amber tracking-tight">Daily Calorie Calculator</h1>
                </div>
            </header>

            {/* Main */}
            <main className="max-w-2xl mx-auto px-6 py-12">
                {/* Hero */}
                <div className="text-center mb-10 animate-fade-in-up">
                    <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                        style={{ background: 'var(--accent-amber-dim)', border: '1px solid rgba(245,158,11,0.15)' }}
                    >
                        <span className="text-3xl" style={{ animation: 'float 3s ease-in-out infinite' }}>🔥</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-3 tracking-tight" style={{ color: 'var(--text-primary)' }}>
                        Calculate Your Calorie Deficit
                    </h2>
                    <p className="text-base max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
                        Enter your details below to find out how many calories you need to reach your target weight.
                    </p>
                </div>

                {/* Form Card */}
                <div
                    className="rounded-2xl overflow-hidden animate-fade-in-up delay-2"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-card)' }}
                >
                    <div className="px-6 py-4 flex items-center gap-2" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" style={{ color: 'var(--accent-amber)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Your Details</h3>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Number Fields - 2x2 grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {numberFields.map((field, i) => (
                                <div key={field.name} className="space-y-2 animate-fade-in-up" style={{ animationDelay: `${0.15 + i * 0.07}s` }}>
                                    <label htmlFor={field.name} className="block text-sm font-medium transition-colors duration-300"
                                        style={{ color: focusedField === field.name ? 'var(--accent-teal)' : 'var(--text-secondary)' }}
                                    >
                                        {field.label} <span style={{ color: 'var(--text-muted)' }}>({field.unit})</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            id={field.name}
                                            name={field.name}
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField(field.name)}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder={field.placeholder}
                                            required
                                            min="1"
                                            max={field.max}
                                            className="w-full px-4 py-3.5 rounded-xl text-sm transition-all duration-300 focus-glow [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            style={{
                                                background: 'var(--bg-elevated)',
                                                border: `1px solid ${focusedField === field.name ? 'var(--accent-teal)' : 'var(--border-medium)'}`,
                                                color: 'var(--text-primary)',
                                                outline: 'none',
                                            }}
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                                            {field.unit}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Gender */}
                        <div className="space-y-3 animate-fade-in-up delay-5">
                            <label className="block text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Gender</label>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { value: 'male', label: 'Male', emoji: '👨', accent: 'var(--accent-blue)', dim: 'var(--accent-blue-dim)' },
                                    { value: 'female', label: 'Female', emoji: '👩', accent: 'var(--accent-coral)', dim: 'var(--accent-coral-dim)' },
                                ].map((g) => (
                                    <button
                                        key={g.value}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, gender: g.value }))}
                                        className="px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 btn-press"
                                        style={formData.gender === g.value
                                            ? { background: g.dim, border: `1px solid ${g.accent}`, color: g.accent, boxShadow: `0 4px 16px ${g.dim}` }
                                            : { background: 'var(--bg-elevated)', border: '1px solid var(--border-medium)', color: 'var(--text-muted)' }
                                        }
                                        onMouseEnter={(e) => { if (formData.gender !== g.value) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'var(--text-primary)'; } }}
                                        onMouseLeave={(e) => { if (formData.gender !== g.value) { e.currentTarget.style.borderColor = 'var(--border-medium)'; e.currentTarget.style.color = 'var(--text-muted)'; } }}
                                    >
                                        <span className="text-lg">{g.emoji}</span>
                                        {g.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Activity Level */}
                        <div className="space-y-3 animate-fade-in-up delay-6">
                            <label className="block text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Physical Activity Level</label>
                            <div className="space-y-2">
                                {activityLevels.map((level, i) => {
                                    const isSelected = formData.physicalActivityLevel === level.value;
                                    return (
                                        <button
                                            key={level.value}
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, physicalActivityLevel: level.value }))}
                                            className="w-full px-4 py-3.5 rounded-xl text-left transition-all duration-300 cursor-pointer group animate-fade-in-up"
                                            style={{
                                                background: isSelected ? 'var(--accent-amber-dim)' : 'var(--bg-elevated)',
                                                border: `1px solid ${isSelected ? 'var(--accent-amber)' : 'var(--border-medium)'}`,
                                                boxShadow: isSelected ? '0 4px 16px rgba(245,158,11,0.1)' : 'none',
                                                animationDelay: `${0.4 + i * 0.05}s`,
                                            }}
                                            onMouseEnter={(e) => { if (!isSelected) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.background = 'var(--bg-card-hover)'; } }}
                                            onMouseLeave={(e) => { if (!isSelected) { e.currentTarget.style.borderColor = 'var(--border-medium)'; e.currentTarget.style.background = 'var(--bg-elevated)'; } }}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-lg">{level.icon}</span>
                                                    <div>
                                                        <p className="text-sm font-semibold" style={{ color: isSelected ? 'var(--accent-amber)' : 'var(--text-primary)' }}>
                                                            {level.label}
                                                        </p>
                                                        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                                                            {level.description}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div
                                                    className="w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300"
                                                    style={{
                                                        border: `2px solid ${isSelected ? 'var(--accent-amber)' : 'rgba(255,255,255,0.15)'}`,
                                                        background: isSelected ? 'var(--accent-amber)' : 'transparent',
                                                    }}
                                                >
                                                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3.5 text-sm font-bold rounded-xl cursor-pointer transition-all duration-300 btn-press flex items-center justify-center gap-2"
                            style={{
                                background: 'linear-gradient(135deg, var(--accent-amber), #e67e22)',
                                color: '#fff',
                                boxShadow: '0 6px 20px rgba(245,158,11,0.3)',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(245,158,11,0.45)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(245,158,11,0.3)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            {isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" style={{ animation: 'spin 0.6s linear infinite' }} />
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                        <polyline points="22 4 12 14.01 9 11.01" />
                                    </svg>
                                    Calculate Calorie Deficit
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Info Card */}
                <div
                    className="mt-8 rounded-2xl p-6 animate-fade-in-up delay-7"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
                >
                    <div className="flex items-start gap-3">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                            style={{ background: 'var(--accent-teal-dim)', border: '1px solid rgba(20,184,166,0.15)' }}
                        >
                            <span className="text-lg">💡</span>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>How it works</h4>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                                We use the Mifflin-St Jeor equation to estimate your Basal Metabolic Rate (BMR), then factor in your activity level to determine your Total Daily Energy Expenditure (TDEE). The calorie deficit is calculated based on the difference between your current and target weight.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CalorieCalculator;

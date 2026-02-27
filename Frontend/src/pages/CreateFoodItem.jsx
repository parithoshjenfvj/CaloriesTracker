import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateFoodItem = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('manual');
    const [itemName, setItemName] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [fiber, setFiber] = useState('');
    const [fat, setFat] = useState('');
    const [focusedField, setFocusedField] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch("http://localhost:3000/user/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ itemName, calories, protein, fiber, fat })
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data.foodItem);
                alert("added");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const nutritionFields = [
        { id: 'calories', label: 'Calories', icon: '🔥', value: calories, setter: setCalories, unit: 'kcal', accent: 'var(--accent-amber)' },
        { id: 'protein', label: 'Protein', icon: '💪', value: protein, setter: setProtein, unit: 'grams', accent: 'var(--accent-teal)' },
        { id: 'fiber', label: 'Fiber', icon: '🌿', value: fiber, setter: setFiber, unit: 'grams', accent: 'var(--accent-blue)' },
        { id: 'fat', label: 'Fat', icon: '🥑', value: fat, setter: setFat, unit: 'grams', accent: 'var(--accent-coral)' },
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
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
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
                        onClick={() => navigate('/dashboard')}
                        className="group px-5 py-2.5 text-sm font-semibold rounded-xl cursor-pointer transition-all duration-300 flex items-center gap-2"
                        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-medium)', color: 'var(--text-secondary)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-medium)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        Back to Dashboard
                    </button>
                </div>
            </header>

            {/* Main */}
            <main className="max-w-2xl mx-auto px-6 py-12">
                <div className="mb-8 animate-fade-in-up">
                    <h2 className="text-3xl font-bold mb-2 tracking-tight" style={{ color: 'var(--text-primary)' }}>Create Food Item</h2>
                    <p className="text-base" style={{ color: 'var(--text-muted)' }}>Add a new food item to your nutrition tracker.</p>
                </div>

                {/* Tabs */}
                <div
                    className="flex gap-1 p-1 rounded-xl mb-8 animate-fade-in-up delay-2"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
                >
                    {[
                        { id: 'manual', label: '✏️ Manual Entry' },
                        { id: 'ai', label: '🤖 AI Entry' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer"
                            style={activeTab === tab.id
                                ? { background: 'linear-gradient(135deg, var(--accent-amber), #e67e22)', color: '#fff', boxShadow: '0 4px 16px rgba(245,158,11,0.2)' }
                                : { color: 'var(--text-muted)' }
                            }
                            onMouseEnter={(e) => { if (activeTab !== tab.id) e.currentTarget.style.color = 'var(--text-primary)'; }}
                            onMouseLeave={(e) => { if (activeTab !== tab.id) e.currentTarget.style.color = 'var(--text-muted)'; }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div
                    className="rounded-2xl overflow-hidden animate-fade-in-up delay-3"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-card)' }}
                >
                    {activeTab === 'manual' ? (
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            {/* Item Name */}
                            <div className="flex flex-col gap-2 animate-fade-in-up delay-4">
                                <label
                                    htmlFor="itemName"
                                    className="text-xs font-semibold uppercase tracking-widest transition-colors duration-300"
                                    style={{ color: focusedField === 'itemName' ? 'var(--accent-teal)' : 'var(--text-secondary)' }}
                                >
                                    Item Name
                                </label>
                                <input
                                    type="text"
                                    id="itemName"
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
                                    onFocus={() => setFocusedField('itemName')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="e.g. Grilled Chicken Breast"
                                    className="px-4 py-3.5 rounded-xl text-sm transition-all duration-300 focus-glow"
                                    style={{
                                        background: 'var(--bg-elevated)',
                                        border: `1px solid ${focusedField === 'itemName' ? 'var(--accent-teal)' : 'var(--border-medium)'}`,
                                        color: 'var(--text-primary)',
                                        outline: 'none',
                                    }}
                                    required
                                />
                            </div>

                            {/* Nutrition Grid */}
                            <div className="grid grid-cols-2 gap-5">
                                {nutritionFields.map((field, i) => (
                                    <div key={field.id} className="flex flex-col gap-2 animate-fade-in-up" style={{ animationDelay: `${0.3 + i * 0.07}s` }}>
                                        <label
                                            htmlFor={field.id}
                                            className="text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5 transition-colors duration-300"
                                            style={{ color: focusedField === field.id ? field.accent : 'var(--text-secondary)' }}
                                        >
                                            <span>{field.icon}</span> {field.label}
                                        </label>
                                        <input
                                            type="number"
                                            id={field.id}
                                            value={field.value}
                                            onChange={(e) => field.setter(e.target.value)}
                                            onFocus={() => setFocusedField(field.id)}
                                            onBlur={() => setFocusedField(null)}
                                            placeholder={field.unit}
                                            min="0"
                                            className="px-4 py-3.5 rounded-xl text-sm transition-all duration-300 focus-glow"
                                            style={{
                                                background: 'var(--bg-elevated)',
                                                border: `1px solid ${focusedField === field.id ? field.accent : 'var(--border-medium)'}`,
                                                color: 'var(--text-primary)',
                                                outline: 'none',
                                            }}
                                            required
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3.5 text-sm font-bold uppercase tracking-wide rounded-xl cursor-pointer transition-all duration-300 mt-2 btn-press flex items-center justify-center gap-2"
                                style={{
                                    background: 'linear-gradient(135deg, var(--accent-amber), #e67e22)',
                                    color: '#fff',
                                    boxShadow: '0 6px 20px rgba(245, 158, 11, 0.3)',
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(245,158,11,0.45)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(245,158,11,0.3)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                {isSubmitting ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" style={{ animation: 'spin 0.6s linear infinite' }} />
                                ) : (
                                    'Add Food Item'
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 px-6 animate-fade-in-up">
                            <div
                                className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                                style={{ background: 'var(--accent-teal-dim)' }}
                            >
                                <span className="text-4xl" style={{ animation: 'float 3s ease-in-out infinite' }}>🤖</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>AI Entry</h3>
                            <p className="text-sm text-center max-w-sm" style={{ color: 'var(--text-muted)' }}>
                                AI-powered food detection coming soon. This feature will let you automatically identify food items and nutritional info.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default CreateFoodItem;

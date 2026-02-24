import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateFoodItem = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('manual');

    // Form state (no API call — UI only)
    const [itemName, setItemName] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [fiber, setFiber] = useState('');
    const [fat, setFat] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: API integration will be added by the user
        console.log('Food item submitted:', { itemName, calories, protein, fiber, fat });
        alert('Food item created (UI only — no API connected yet)');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
            {/* Header */}
            <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-white/10 shadow-lg shadow-purple-900/20">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
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
                        onClick={() => navigate('/dashboard')}
                        className="group px-5 py-2.5 bg-white/5 border border-white/15 text-purple-200 text-sm font-semibold rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-white/25 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        Back to Dashboard
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-2xl mx-auto px-6 py-12">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Create Food Item</h2>
                    <p className="text-purple-300/70 text-base">Add a new food item to your nutrition tracker.</p>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/10 mb-8">
                    <button
                        onClick={() => setActiveTab('manual')}
                        className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${activeTab === 'manual'
                                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                                : 'text-purple-300/70 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        ✏️ Manual Entry
                    </button>
                    <button
                        onClick={() => setActiveTab('ai')}
                        className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-300 cursor-pointer ${activeTab === 'ai'
                                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                                : 'text-purple-300/70 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        🤖 AI Entry
                    </button>
                </div>

                {/* Tab Content */}
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                    {activeTab === 'manual' ? (
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            {/* Item Name */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="itemName" className="text-xs font-semibold text-purple-200 uppercase tracking-widest">
                                    Item Name
                                </label>
                                <input
                                    type="text"
                                    id="itemName"
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
                                    placeholder="e.g. Grilled Chicken Breast"
                                    className="px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white text-sm placeholder-purple-300/40 transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white/8"
                                    required
                                />
                            </div>

                            {/* Nutritional Values Grid */}
                            <div className="grid grid-cols-2 gap-5">
                                {/* Calories */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="calories" className="text-xs font-semibold text-purple-200 uppercase tracking-widest flex items-center gap-1.5">
                                        <span>🔥</span> Calories
                                    </label>
                                    <input
                                        type="number"
                                        id="calories"
                                        value={calories}
                                        onChange={(e) => setCalories(e.target.value)}
                                        placeholder="kcal"
                                        min="0"
                                        className="px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white text-sm placeholder-purple-300/40 transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white/8"
                                        required
                                    />
                                </div>

                                {/* Protein */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="protein" className="text-xs font-semibold text-purple-200 uppercase tracking-widest flex items-center gap-1.5">
                                        <span>💪</span> Protein
                                    </label>
                                    <input
                                        type="number"
                                        id="protein"
                                        value={protein}
                                        onChange={(e) => setProtein(e.target.value)}
                                        placeholder="grams"
                                        min="0"
                                        className="px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white text-sm placeholder-purple-300/40 transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white/8"
                                        required
                                    />
                                </div>

                                {/* Fiber */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="fiber" className="text-xs font-semibold text-purple-200 uppercase tracking-widest flex items-center gap-1.5">
                                        <span>🌿</span> Fiber
                                    </label>
                                    <input
                                        type="number"
                                        id="fiber"
                                        value={fiber}
                                        onChange={(e) => setFiber(e.target.value)}
                                        placeholder="grams"
                                        min="0"
                                        className="px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white text-sm placeholder-purple-300/40 transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white/8"
                                        required
                                    />
                                </div>

                                {/* Fat */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="fat" className="text-xs font-semibold text-purple-200 uppercase tracking-widest flex items-center gap-1.5">
                                        <span>🥑</span> Fat
                                    </label>
                                    <input
                                        type="number"
                                        id="fat"
                                        value={fat}
                                        onChange={(e) => setFat(e.target.value)}
                                        placeholder="grams"
                                        min="0"
                                        className="px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white text-sm placeholder-purple-300/40 transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white/8"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold uppercase tracking-wide rounded-xl cursor-pointer transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 mt-2"
                            >
                                Add Food Item
                            </button>
                        </form>
                    ) : (
                        /* AI Entry — placeholder */
                        <div className="flex flex-col items-center justify-center py-20 px-6">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-5">
                                <span className="text-4xl">🤖</span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">AI Entry</h3>
                            <p className="text-purple-300/60 text-sm text-center max-w-sm">
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

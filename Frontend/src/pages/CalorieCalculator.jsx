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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response=await fetch("http://localhost:3000/user/calorie-deficit",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(formData)
        })
        const data= await response.json();
        alert("your calorie deficit is "+data.dailyCalories)
    };

    const activityLevels = [
        { value: 'sedentary', label: 'Sedentary', description: 'Little or no exercise' },
        { value: 'light', label: 'Light', description: 'Exercise 1-3 days/week' },
        { value: 'moderate', label: 'Moderate', description: 'Exercise 3-5 days/week' },
        { value: 'active', label: 'Active', description: 'Exercise 6-7 days/week' },
        { value: 'very active', label: 'Very Active', description: 'Hard exercise daily' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
            {/* Header */}
            <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-white/10 shadow-lg shadow-purple-900/20">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-300 transition-all duration-300 hover:bg-white/10 hover:border-white/20 cursor-pointer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent tracking-tight">
                            Daily Calorie Calculator
                        </h1>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-2xl mx-auto px-6 py-12">
                {/* Hero Section */}
                <div className="text-center mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/20 flex items-center justify-center mx-auto mb-5">
                        <span className="text-3xl">🔥</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
                        Calculate Your Calorie Deficit
                    </h2>
                    <p className="text-purple-300/70 text-base max-w-md mx-auto">
                        Enter your details below to find out how many calories you need to reach your target weight.
                    </p>
                </div>

                {/* Form Card */}
                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/10 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        <h3 className="text-lg font-semibold text-white">Your Details</h3>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Weight Fields Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {/* Current Weight */}
                            <div className="space-y-2">
                                <label htmlFor="currentWeight" className="block text-sm font-medium text-purple-200/90">
                                    Current Weight <span className="text-purple-400/60">(kg)</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        id="currentWeight"
                                        name="currentWeight"
                                        value={formData.currentWeight}
                                        onChange={handleChange}
                                        placeholder="75"
                                        required
                                        min="1"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-300/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400/40 text-sm font-medium">kg</div>
                                </div>
                            </div>

                            {/* Target Weight */}
                            <div className="space-y-2">
                                <label htmlFor="targetWeight" className="block text-sm font-medium text-purple-200/90">
                                    Target Weight <span className="text-purple-400/60">(kg)</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        id="targetWeight"
                                        name="targetWeight"
                                        value={formData.targetWeight}
                                        onChange={handleChange}
                                        placeholder="65"
                                        required
                                        min="1"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-300/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400/40 text-sm font-medium">kg</div>
                                </div>
                            </div>
                        </div>

                        {/* Height and Age Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {/* Height */}
                            <div className="space-y-2">
                                <label htmlFor="height" className="block text-sm font-medium text-purple-200/90">
                                    Height <span className="text-purple-400/60">(cm)</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        id="height"
                                        name="height"
                                        value={formData.height}
                                        onChange={handleChange}
                                        placeholder="175"
                                        required
                                        min="1"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-300/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400/40 text-sm font-medium">cm</div>
                                </div>
                            </div>

                            {/* Age */}
                            <div className="space-y-2">
                                <label htmlFor="age" className="block text-sm font-medium text-purple-200/90">
                                    Age <span className="text-purple-400/60">(years)</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        id="age"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        placeholder="25"
                                        required
                                        min="1"
                                        max="120"
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-purple-300/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all duration-300 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400/40 text-sm font-medium">yrs</div>
                                </div>
                            </div>
                        </div>

                        {/* Gender Selection */}
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-purple-200/90">Gender</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setFormData((prev) => ({ ...prev, gender: 'male' }))}
                                    className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${formData.gender === 'male'
                                            ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300 shadow-lg shadow-indigo-500/10'
                                            : 'bg-white/5 border-white/10 text-purple-300/60 hover:bg-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <span className="text-lg">👨</span>
                                    Male
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData((prev) => ({ ...prev, gender: 'female' }))}
                                    className={`px-4 py-3 rounded-xl border text-sm font-semibold transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${formData.gender === 'female'
                                            ? 'bg-pink-500/20 border-pink-500/40 text-pink-300 shadow-lg shadow-pink-500/10'
                                            : 'bg-white/5 border-white/10 text-purple-300/60 hover:bg-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <span className="text-lg">👩</span>
                                    Female
                                </button>
                            </div>
                        </div>

                        {/* Activity Level */}
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-purple-200/90">Physical Activity Level</label>
                            <div className="space-y-2">
                                {activityLevels.map((level) => (
                                    <button
                                        key={level.value}
                                        type="button"
                                        onClick={() => setFormData((prev) => ({ ...prev, physicalActivityLevel: level.value }))}
                                        className={`w-full px-4 py-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer group ${formData.physicalActivityLevel === level.value
                                                ? 'bg-indigo-500/15 border-indigo-500/30 shadow-lg shadow-indigo-500/5'
                                                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className={`text-sm font-semibold ${formData.physicalActivityLevel === level.value ? 'text-indigo-300' : 'text-purple-200/80'
                                                    }`}>
                                                    {level.label}
                                                </p>
                                                <p className={`text-xs mt-0.5 ${formData.physicalActivityLevel === level.value ? 'text-indigo-400/70' : 'text-purple-400/50'
                                                    }`}>
                                                    {level.description}
                                                </p>
                                            </div>
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${formData.physicalActivityLevel === level.value
                                                    ? 'border-indigo-400 bg-indigo-500'
                                                    : 'border-white/20'
                                                }`}>
                                                {formData.physicalActivityLevel === level.value && (
                                                    <div className="w-2 h-2 rounded-full bg-white" />
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-bold rounded-xl cursor-pointer transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                            Calculate Calorie Deficit
                        </button>
                    </form>
                </div>

                {/* Info Card */}
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20 flex items-center justify-center shrink-0">
                            <span className="text-lg">💡</span>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-white mb-1">How it works</h4>
                            <p className="text-sm text-purple-300/60 leading-relaxed">
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

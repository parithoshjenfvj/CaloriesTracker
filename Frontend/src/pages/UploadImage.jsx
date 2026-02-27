import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadImage = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleFile = useCallback((file) => {
        if (!file) return;

        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
            setError('Please upload a valid image (JPEG, PNG, or WebP)');
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setError('Image must be smaller than 10MB');
            return;
        }

        setError('');
        setSelectedFile(file);
        setResult(null);

        const reader = new FileReader();
        reader.onloadend = () => setPreviewUrl(reader.result);
        reader.readAsDataURL(file);
    }, []);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
    }, [handleFile]);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        handleFile(file);
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setResult(null);
        setError('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        setIsUploading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append("image", selectedFile);

            const response = await fetch("http://localhost:3000/user/get-image-nutrition", {
                method: "POST",
                credentials: "include",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setResult(data.foodItem);
            } else {
                setError(data.message || "Failed to analyze image");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / 1048576).toFixed(1) + ' MB';
    };

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
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                                e.currentTarget.style.transform = 'translateX(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'var(--border-medium)';
                                e.currentTarget.style.transform = 'translateX(0)';
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <div>
                            <h1 className="text-xl font-bold text-gradient-amber tracking-tight">Upload Image</h1>
                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>AI-powered nutrition analysis</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-2xl mx-auto px-6 py-12">
                {/* Title Section */}
                <div className="text-center mb-10 animate-fade-in-up">
                    <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                        style={{
                            background: 'linear-gradient(135deg, var(--accent-teal), #0d9488)',
                            boxShadow: '0 8px 32px rgba(20, 184, 166, 0.25)',
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                        Snap & Track
                    </h2>
                    <p className="text-base max-w-md mx-auto" style={{ color: 'var(--text-muted)' }}>
                        Upload a photo of your food and let AI instantly analyze its nutritional content.
                    </p>
                </div>

                {/* Drop Zone */}
                <div
                    className="animate-fade-in-up delay-2"
                    style={{ animationDelay: '0.15s' }}
                >
                    <div
                        className="relative rounded-2xl overflow-hidden transition-all duration-400"
                        style={{
                            background: 'var(--bg-card)',
                            border: isDragging
                                ? '2px dashed var(--accent-teal)'
                                : '2px dashed var(--border-medium)',
                            boxShadow: isDragging
                                ? '0 0 40px rgba(20, 184, 166, 0.15), var(--shadow-card)'
                                : 'var(--shadow-card)',
                        }}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        {/* Drag overlay glow */}
                        {isDragging && (
                            <div
                                className="absolute inset-0 z-10 pointer-events-none"
                                style={{
                                    background: 'radial-gradient(circle at center, rgba(20,184,166,0.08) 0%, transparent 70%)',
                                }}
                            />
                        )}

                        {!previewUrl ? (
                            /* Upload area - no image selected */
                            <div className="relative z-20 flex flex-col items-center justify-center py-16 px-6 text-center">
                                <div
                                    className="w-20 h-20 rounded-full flex items-center justify-center mb-5 transition-all duration-300"
                                    style={{
                                        background: isDragging ? 'var(--accent-teal-dim)' : 'rgba(255,255,255,0.04)',
                                        border: `1px solid ${isDragging ? 'rgba(20,184,166,0.2)' : 'var(--border-subtle)'}`,
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 transition-all duration-300" style={{ color: isDragging ? 'var(--accent-teal)' : 'var(--text-muted)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                        <polyline points="17 8 12 3 7 8" />
                                        <line x1="12" y1="3" x2="12" y2="15" />
                                    </svg>
                                </div>

                                <p className="text-lg font-semibold mb-2" style={{ color: isDragging ? 'var(--accent-teal-light)' : 'var(--text-primary)' }}>
                                    {isDragging ? 'Drop your image here' : 'Drag & drop your food image'}
                                </p>
                                <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                                    or click below to browse files
                                </p>

                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="px-6 py-3 text-sm font-semibold rounded-xl cursor-pointer transition-all duration-300 flex items-center gap-2 btn-press"
                                    style={{
                                        background: 'linear-gradient(135deg, var(--accent-teal), #0d9488)',
                                        color: '#fff',
                                        boxShadow: '0 4px 16px rgba(20, 184, 166, 0.25)',
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(20, 184, 166, 0.4)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(20, 184, 166, 0.25)'; }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                        <circle cx="8.5" cy="8.5" r="1.5" />
                                        <polyline points="21 15 16 10 5 21" />
                                    </svg>
                                    Choose Image
                                </button>

                                <p className="text-xs mt-5" style={{ color: 'var(--text-muted)', opacity: 0.7 }}>
                                    Supports JPEG, PNG, WebP • Max 10MB
                                </p>
                            </div>
                        ) : (
                            /* Preview area - image selected */
                            <div className="relative z-20 p-5">
                                {/* Image Preview */}
                                <div className="relative rounded-xl overflow-hidden mb-4" style={{ background: 'var(--bg-primary)' }}>
                                    <img
                                        src={previewUrl}
                                        alt="Food preview"
                                        className="w-full object-contain rounded-xl animate-scale-in"
                                        style={{ maxHeight: '360px' }}
                                    />

                                    {/* Remove button */}
                                    <button
                                        onClick={handleRemoveFile}
                                        className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200"
                                        style={{
                                            background: 'rgba(0,0,0,0.6)',
                                            backdropFilter: 'blur(8px)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(244,63,94,0.7)'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.6)'; }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="18" y1="6" x2="6" y2="18" />
                                            <line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </button>
                                </div>

                                {/* File Info */}
                                <div
                                    className="flex items-center gap-3 p-3 rounded-xl mb-4"
                                    style={{
                                        background: 'var(--bg-elevated)',
                                        border: '1px solid var(--border-subtle)',
                                    }}
                                >
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style={{ background: 'var(--accent-teal-dim)' }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" style={{ color: 'var(--accent-teal)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                            <circle cx="8.5" cy="8.5" r="1.5" />
                                            <polyline points="21 15 16 10 5 21" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                                            {selectedFile.name}
                                        </p>
                                        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                                            {formatFileSize(selectedFile.size)} • {selectedFile.type.split('/')[1].toUpperCase()}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="text-xs font-medium px-3 py-1.5 rounded-lg cursor-pointer transition-all duration-200"
                                        style={{
                                            background: 'rgba(255,255,255,0.05)',
                                            color: 'var(--text-secondary)',
                                            border: '1px solid var(--border-subtle)',
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                                    >
                                        Change
                                    </button>
                                </div>

                                {/* Analyze Button */}
                                <button
                                    onClick={handleUpload}
                                    disabled={isUploading}
                                    className="w-full py-3.5 text-sm font-bold rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 btn-press"
                                    style={{
                                        background: isUploading
                                            ? 'var(--bg-elevated)'
                                            : 'linear-gradient(135deg, var(--accent-amber), #e67e22)',
                                        color: isUploading ? 'var(--text-muted)' : '#fff',
                                        boxShadow: isUploading ? 'none' : '0 4px 20px rgba(245, 158, 11, 0.3)',
                                        border: isUploading ? '1px solid var(--border-medium)' : 'none',
                                    }}
                                    onMouseEnter={(e) => { if (!isUploading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(245,158,11,0.4)'; } }}
                                    onMouseLeave={(e) => { if (!isUploading) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(245,158,11,0.3)'; } }}
                                >
                                    {isUploading ? (
                                        <>
                                            <div
                                                className="w-4 h-4 rounded-full border-2 border-t-transparent"
                                                style={{
                                                    borderColor: 'var(--text-muted)',
                                                    borderTopColor: 'transparent',
                                                    animation: 'spin 0.8s linear infinite',
                                                }}
                                            />
                                            Analyzing with AI...
                                        </>
                                    ) : (
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                                            </svg>
                                            Analyze Nutrition
                                        </>
                                    )}
                                </button>
                            </div>
                        )}

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handleFileSelect}
                            className="hidden"
                        />
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div
                        className="mt-5 p-4 rounded-xl flex items-center gap-3 animate-slide-down"
                        style={{
                            background: 'var(--accent-coral-dim)',
                            border: '1px solid rgba(244,63,94,0.2)',
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--accent-coral)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="15" y1="9" x2="9" y2="15" />
                            <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                        <p className="text-sm font-medium" style={{ color: 'var(--accent-coral)' }}>{error}</p>
                    </div>
                )}

                {/* Result Card */}
                {result && (
                    <div
                        className="mt-6 rounded-2xl overflow-hidden animate-fade-in-up"
                        style={{
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-subtle)',
                            boxShadow: 'var(--shadow-card)',
                        }}
                    >
                        {/* Result Header */}
                        <div
                            className="px-5 py-4 flex items-center gap-3"
                            style={{ borderBottom: '1px solid var(--border-subtle)' }}
                        >
                            <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                style={{
                                    background: 'linear-gradient(135deg, var(--accent-amber), #e67e22)',
                                    boxShadow: '0 4px 12px rgba(245,158,11,0.2)',
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                                    {result.itemName}
                                </h3>
                                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>AI Nutrition Analysis</p>
                            </div>
                        </div>

                        {/* Nutrition Grid */}
                        <div className="grid grid-cols-2 gap-3 p-5">
                            {[
                                { label: 'Calories', value: result.calories, unit: 'kcal', icon: '🔥', accent: 'var(--accent-amber)', dim: 'var(--accent-amber-dim)' },
                                { label: 'Protein', value: result.protein, unit: 'g', icon: '💪', accent: 'var(--accent-teal)', dim: 'var(--accent-teal-dim)' },
                                { label: 'Fat', value: result.fat, unit: 'g', icon: '🥑', accent: 'var(--accent-coral)', dim: 'var(--accent-coral-dim)' },
                                { label: 'Fiber', value: result.fiber, unit: 'g', icon: '🌿', accent: 'var(--accent-blue)', dim: 'var(--accent-blue-dim)' },
                            ].map((nutrient, i) => (
                                <div
                                    key={nutrient.label}
                                    className="p-4 rounded-xl transition-all duration-300 animate-fade-in-up"
                                    style={{
                                        background: nutrient.dim,
                                        border: `1px solid ${nutrient.dim}`,
                                        animationDelay: `${0.1 + i * 0.08}s`,
                                    }}
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-sm">{nutrient.icon}</span>
                                        <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{nutrient.label}</span>
                                    </div>
                                    <p className="text-2xl font-bold" style={{ color: nutrient.accent }}>
                                        {nutrient.value}
                                        <span className="text-xs font-medium ml-1" style={{ color: 'var(--text-muted)' }}>{nutrient.unit}</span>
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Back to Dashboard */}
                        <div className="px-5 pb-5">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="w-full py-3 text-sm font-semibold rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-center gap-2"
                                style={{
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px solid var(--border-medium)',
                                    color: 'var(--text-secondary)',
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-medium)'; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                                Back to Dashboard
                            </button>
                        </div>
                    </div>
                )}

                {/* Tips Section */}
                <div
                    className="mt-8 rounded-2xl p-5 animate-fade-in-up"
                    style={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-subtle)',
                        animationDelay: '0.3s',
                    }}
                >
                    <h4 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" style={{ color: 'var(--accent-amber)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="16" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                        Tips for better results
                    </h4>
                    <div className="space-y-3">
                        {[
                            { icon: '📸', text: 'Take clear, well-lit photos of your food' },
                            { icon: '🍽️', text: 'Include the full plate or bowl in the frame' },
                            { icon: '📏', text: 'Place common objects nearby for size reference' },
                            { icon: '🎯', text: 'Avoid blurry or dark images for best accuracy' },
                        ].map((tip, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 p-2.5 rounded-lg transition-all duration-200"
                                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-card-hover)'}
                                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                            >
                                <span className="text-base flex-shrink-0">{tip.icon}</span>
                                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{tip.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default UploadImage;

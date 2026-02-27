import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [foodItems, setFoodItems] = useState([]);
  const [totals, setTotals] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    fiber: 0
  });
  const [addedItems, setAddedItems] = useState({});
  const [recentItems, setRecentItems] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchRecentItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/recents", {
          method: "GET",
          headers: { "content-type": "application/json" },
          credentials: "include"
        });
        const data = await response.json();
        setRecentItems(data.foodItems);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecentItems();
  }, []);

  const handleAddRecentItem = async (item) => {
    const response = await fetch("http://localhost:3000/user/add-recent/" + item._id, {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "include"
    });
    const data = await response.json();
    if (response.ok) {
      const newItem = data.recentItem;
      setFoodItems(prev => [...prev, newItem]);
      setTotals(prev => ({
        calories: prev.calories + newItem.calories,
        protein: prev.protein + newItem.protein,
        fat: prev.fat + newItem.fat,
        fiber: prev.fiber + newItem.fiber
      }));
    }
    setAddedItems(prev => ({ ...prev, [item._id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item._id]: false }));
    }, 2000);
  };

  const handleLogout = async () => {
    const response = await fetch("http://localhost:3000/api/auth/user/logout", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();
    if (response.ok) {
      navigate("/login");
    }
  };

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/dashboard', {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include"
        });
        const data = await response.json();
        setFoodItems(data.foodItems);
        setTotals(data.totals);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };
    fetchFoodItems();
  }, []);

  const stats = [
    { label: 'Total Items', value: foodItems.length, icon: '📦', accent: 'var(--accent-blue)', accentDim: 'var(--accent-blue-dim)' },
    { label: 'Calories', value: totals.calories, icon: '🔥', accent: 'var(--accent-amber)', accentDim: 'var(--accent-amber-dim)' },
    { label: 'Protein', value: `${totals.protein}g`, icon: '💪', accent: 'var(--accent-teal)', accentDim: 'var(--accent-teal-dim)' },
    { label: 'Fat', value: `${totals.fat}g`, icon: '🥑', accent: 'var(--accent-coral)', accentDim: 'var(--accent-coral-dim)' },
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
          {/* Brand */}
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
            <h1 className="text-xl font-bold text-gradient-amber tracking-tight">
              Calorie Deficit
            </h1>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/create-food-item')}
              className="group px-5 py-2.5 text-sm font-semibold rounded-xl cursor-pointer transition-all duration-300 flex items-center gap-2 btn-press"
              style={{
                background: 'linear-gradient(135deg, var(--accent-amber), #e67e22)',
                color: '#fff',
                boxShadow: '0 4px 16px rgba(245, 158, 11, 0.2)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(245, 158, 11, 0.35)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(245, 158, 11, 0.2)'; }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create Food Item
            </button>

            <button
              onClick={() => navigate('/upload-image')}
              className="group px-5 py-2.5 text-sm font-semibold rounded-xl cursor-pointer transition-all duration-300 flex items-center gap-2"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-medium)',
                color: 'var(--text-secondary)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-medium)'; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              Upload Image
            </button>

            {/* Profile */}
            <div
              className="relative"
              onMouseEnter={() => setShowProfileMenu(true)}
              onMouseLeave={() => setShowProfileMenu(false)}
            >
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-teal), #0d9488)',
                  border: '2px solid rgba(255,255,255,0.15)',
                  boxShadow: '0 4px 12px rgba(20, 184, 166, 0.2)',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 top-full pt-2 w-56 z-50 animate-slide-down">
                  <div
                    className="rounded-xl overflow-hidden"
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-medium)',
                      boxShadow: '0 12px 48px rgba(0,0,0,0.5)',
                    }}
                  >
                    <div className="p-1.5">
                      <button
                        onClick={() => navigate('/calorie-calculator')}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 cursor-pointer group"
                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-amber-dim)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-amber-dim)', border: '1px solid rgba(245,158,11,0.15)' }}>
                          <span className="text-sm">🔥</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Daily Calories</p>
                          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Calculate your deficit</p>
                        </div>
                      </button>

                      <button
                        onClick={() => navigate('/monthly-summary')}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 cursor-pointer group"
                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-teal-dim)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-teal-dim)', border: '1px solid rgba(20,184,166,0.15)' }}>
                          <span className="text-sm">📊</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Monthly Summary</p>
                          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>View your monthly stats</p>
                        </div>
                      </button>

                      <div className="mx-3 my-1" style={{ borderTop: '1px solid var(--border-subtle)' }} />

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 cursor-pointer group"
                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-coral-dim)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-coral-dim)', border: '1px solid rgba(244,63,94,0.15)' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" style={{ color: 'var(--accent-coral)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: 'var(--accent-coral)' }}>Logout</p>
                          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Sign out of your account</p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl font-bold mb-3 tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Your Food Dashboard
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Track your nutrition, manage food items, and stay on top of your calorie goals.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="relative overflow-hidden rounded-2xl p-6 transition-all duration-400 hover-lift animate-fade-in-up cursor-default"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-card)',
                animationDelay: `${0.1 + i * 0.08}s`,
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = stat.accent}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-subtle)'}
            >
              {/* Accent glow in corner */}
              <div
                className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-30"
                style={{ background: stat.accent, transform: 'translate(30%, -30%)' }}
              />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                    style={{ background: stat.accentDim }}
                  >
                    {stat.icon}
                  </div>
                </div>
                <p className="text-3xl font-bold mb-1 animate-fade-in-up" style={{ color: 'var(--text-primary)', animationDelay: `${0.3 + i * 0.1}s` }}>
                  {stat.value}
                </p>
                <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Today's List Button */}
        <div className="flex justify-center mb-10 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
          <button
            onClick={() => navigate('/todays-list')}
            className="group flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold cursor-pointer transition-all duration-300 btn-press"
            style={{
              background: 'linear-gradient(135deg, var(--accent-teal), #0d9488)',
              color: '#fff',
              boxShadow: '0 4px 20px rgba(20, 184, 166, 0.25)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(20, 184, 166, 0.4)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(20, 184, 166, 0.25)'; }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Today's List
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Recent Food Items */}
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
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Recent Food Items
            </h3>
            <span
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{ background: 'var(--accent-amber-dim)', color: 'var(--accent-amber)', border: '1px solid rgba(245,158,11,0.15)' }}
            >
              Yesterday
            </span>
          </div>

          {recentItems.length > 0 ? (
            <div>
              {recentItems.map((item, i) => (
                <div
                  key={item._id}
                  className="group px-6 py-4 flex items-center justify-between gap-4 transition-all duration-300 animate-fade-in-up"
                  style={{
                    borderBottom: '1px solid var(--border-subtle)',
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
                    onClick={() => handleAddRecentItem(item)}
                    className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-300 btn-press"
                    disabled={addedItems[item._id]}
                    style={addedItems[item._id]
                      ? { background: 'var(--accent-teal-dim)', border: '1px solid rgba(20,184,166,0.25)', color: 'var(--accent-teal)' }
                      : { background: 'linear-gradient(135deg, var(--accent-amber), #e67e22)', color: '#fff', boxShadow: '0 4px 16px rgba(245,158,11,0.2)' }
                    }
                  >
                    {addedItems[item._id] ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Added
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Add
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
                  <path d="M12 2c.5 5-3 7.5-3 12a6 6 0 0 0 12 0c0-4.5-3.5-7-3-12" />
                </svg>
              </div>
              <p className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>No recent items</p>
              <p className="text-sm mb-6 text-center max-w-sm" style={{ color: 'var(--text-muted)' }}>
                No food items from yesterday. Start tracking to see your recent items here.
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
                Create Your First Item
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

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
  useEffect(() => {
    const fetchRecentItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/user/recents", {
          method: "GET",
          headers: {
            "content-type": "application/json"
          },
          credentials: "include"
        })
        const data = await response.json();
        setRecentItems(data.foodItems);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRecentItems();
  }, [])

  const handleAddRecentItem = async (item) => {
    const response = await fetch("http://localhost:3000/user/add-recent/" + item._id, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      credentials: "include"
    })
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
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await response.json();
    if (response.ok) {
      navigate("/login");
    }
  }


  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/dashboard', {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
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


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/70 border-b border-white/10 shadow-lg shadow-purple-900/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Brand */}
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

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/create-food-item')}
              className="group relative px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold rounded-xl cursor-pointer transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Create Food Item
            </button>

            <button
              className="group px-5 py-2.5 bg-white/5 border border-white/15 text-purple-200 text-sm font-semibold rounded-xl cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-white/25 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              Upload Image
            </button>

            {/* Profile Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShowProfileMenu(true)}
              onMouseLeave={() => setShowProfileMenu(false)}
            >
              <button className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105 border-2 border-white/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 top-full pt-2 w-56 z-50">
                  <div className="rounded-xl border border-white/10 bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-purple-900/30 overflow-hidden">
                    <div className="p-1.5">
                      <button
                        onClick={() => navigate('/calorie-calculator')}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 hover:bg-white/10 cursor-pointer group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/20 flex items-center justify-center">
                          <span className="text-sm">🔥</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-purple-100 group-hover:text-white">Daily Calories</p>
                          <p className="text-xs text-purple-400/60">Calculate your deficit</p>
                        </div>
                      </button>

                      <button
                        onClick={() => navigate('/monthly-summary')}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 hover:bg-white/10 cursor-pointer group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-indigo-500/20 flex items-center justify-center">
                          <span className="text-sm">📊</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-purple-100 group-hover:text-white">Monthly Summary</p>
                          <p className="text-xs text-purple-400/60">View your monthly stats</p>
                        </div>
                      </button>

                      <div className="mx-3 my-1 border-t border-white/5"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 hover:bg-red-500/10 cursor-pointer group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500/20 to-rose-500/20 border border-red-500/20 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-red-300 group-hover:text-red-200">Logout</p>
                          <p className="text-xs text-red-400/50">Sign out of your account</p>
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
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-3 tracking-tight">
            Your Food Dashboard
          </h2>
          <p className="text-purple-300/80 text-lg max-w-xl mx-auto">
            Track your nutrition, manage food items, and stay on top of your calorie goals.
          </p>
        </div>

        {/* Stats Cards Placeholder */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {[
            { label: 'Total Items', value: foodItems.length, icon: '📦', color: 'from-indigo-500/20 to-indigo-600/10', border: 'border-indigo-500/20' },
            { label: 'Total Calories', value: totals.calories, icon: '🔥', color: 'from-orange-500/20 to-orange-600/10', border: 'border-orange-500/20' },
            { label: 'Total Protein', value: totals.protein, icon: '💪', color: 'from-emerald-500/20 to-emerald-600/10', border: 'border-emerald-500/20' },
            { label: 'Total Fat', value: totals.fat, icon: '🥑', color: 'from-purple-500/20 to-purple-600/10', border: 'border-purple-500/20' },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.color} border ${stat.border} p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-purple-300/70 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Food Items */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Recent Food Items
            </h3>
            <span className="text-xs font-medium text-purple-400/60 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/15">
              Yesterday
            </span>
          </div>

          {recentItems.length > 0 ? (
            <div className="divide-y divide-white/5">
              {recentItems.map((item) => (
                <div
                  key={item._id}
                  className="group px-6 py-4 flex items-center justify-between gap-4 transition-all duration-300 hover:bg-white/[0.03]"
                >
                  {/* Item Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-white truncate mb-2 group-hover:text-purple-100 transition-colors">
                      {item.itemName}
                    </h4>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-orange-300/80 bg-orange-500/10 px-2.5 py-1 rounded-lg border border-orange-500/10">
                        🔥 {item.calories} cal
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-300/80 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/10">
                        💪 {item.protein}g
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-purple-300/80 bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/10">
                        🥑 {item.fat}g
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-green-300/80 bg-green-500/10 px-2.5 py-1 rounded-lg border border-green-500/10">
                        🌿 {item.fiber}g
                      </span>
                    </div>
                  </div>

                  {/* Add Button */}
                  <button
                    onClick={() => handleAddRecentItem(item)}
                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-300 ${addedItems[item._id]
                      ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 shadow-lg shadow-emerald-500/10'
                      : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0'
                      }`}
                    disabled={addedItems[item._id]}
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
            <div className="flex flex-col items-center justify-center py-20 px-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-9 h-9 text-purple-400/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <p className="text-white/80 text-lg font-medium mb-2">No recent items</p>
              <p className="text-purple-300/50 text-sm mb-6 text-center max-w-sm">
                No food items from yesterday. Start tracking to see your recent items here.
              </p>
              <button
                onClick={() => navigate('/create-food-item')}
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold rounded-xl cursor-pointer transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5"
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

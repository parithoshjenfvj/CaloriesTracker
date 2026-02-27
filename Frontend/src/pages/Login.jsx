import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://caloriestracker-u1ca.onrender.com/api/auth/user/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data.user);
        navigate("/dashboard");
      } else {
        console.log("unable to login");
        alert("please enter the right credentials")
      }
    } catch (error) {
      console.log("something happened", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-dot-pattern" style={{ background: 'var(--bg-primary)' }}>
      {/* Ambient glow orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full blur-[140px]"
          style={{
            width: 400, height: 400,
            top: '-10%', left: '-5%',
            background: 'var(--accent-amber-dim)',
            animation: 'float 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full blur-[120px]"
          style={{
            width: 350, height: 350,
            bottom: '-10%', right: '-5%',
            background: 'var(--accent-teal-dim)',
            animation: 'float 10s ease-in-out infinite 2s',
          }}
        />
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        {/* Brand */}
        <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in-up delay-1">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, var(--accent-amber), #e67e22)',
              boxShadow: '0 8px 24px rgba(245, 158, 11, 0.25)',
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2c.5 5-3 7.5-3 12a6 6 0 0 0 12 0c0-4.5-3.5-7-3-12" />
              <path d="M12 14c.3 2.5-1 3.5-1 5a2.5 2.5 0 0 0 5 0c0-1.5-1.3-2.5-1-5" />
            </svg>
          </div>
          <span className="text-xl font-bold text-gradient-amber tracking-tight">
            Calorie Deficit
          </span>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-10 animate-fade-in-up delay-2"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 tracking-tight" style={{ color: 'var(--text-primary)' }}>
              Welcome Back
            </h1>
            <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
              Sign in to continue your journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 mb-5">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-xs font-semibold uppercase tracking-widest transition-colors duration-300"
                style={{ color: focusedField === 'email' ? 'var(--accent-teal)' : 'var(--text-secondary)' }}
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="px-4 py-3.5 rounded-xl text-sm transition-all duration-300 focus-glow"
                style={{
                  background: 'var(--bg-elevated)',
                  border: `1px solid ${focusedField === 'email' ? 'var(--accent-teal)' : 'var(--border-medium)'}`,
                  color: 'var(--text-primary)',
                  outline: 'none',
                }}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-xs font-semibold uppercase tracking-widest transition-colors duration-300"
                style={{ color: focusedField === 'password' ? 'var(--accent-teal)' : 'var(--text-secondary)' }}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="px-4 py-3.5 rounded-xl text-sm transition-all duration-300 focus-glow"
                style={{
                  background: 'var(--bg-elevated)',
                  border: `1px solid ${focusedField === 'password' ? 'var(--accent-teal)' : 'var(--border-medium)'}`,
                  color: 'var(--text-primary)',
                  outline: 'none',
                }}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl text-sm font-bold uppercase tracking-wide cursor-pointer transition-all duration-300 mt-3 btn-press flex items-center justify-center gap-2 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, var(--accent-amber), #e67e22)',
                color: '#fff',
                boxShadow: '0 6px 20px rgba(245, 158, 11, 0.3)',
                opacity: isLoading ? 0.8 : 1,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(245, 158, 11, 0.45)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.3)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" style={{ animation: 'spin 0.6s linear infinite' }} />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="text-center pt-5" style={{ borderTop: '1px solid var(--border-subtle)' }}>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Don't have an account?{" "}
              <a
                href="/register"
                className="font-semibold transition-colors cursor-pointer"
                style={{ color: 'var(--accent-teal)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-teal-light)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--accent-teal)'}
              >
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

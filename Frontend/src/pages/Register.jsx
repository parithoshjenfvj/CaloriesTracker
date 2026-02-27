import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/user/register",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
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
        console.log("something went wrong");
        alert("please enter the right credentials")
      }
    } catch (error) {
      console.log("error occured", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    { id: 'name', label: 'Full Name', type: 'text', value: name, setter: setName, placeholder: 'Enter your full name' },
    { id: 'email', label: 'Email Address', type: 'email', value: email, setter: setEmail, placeholder: 'Enter your email' },
    { id: 'password', label: 'Password', type: 'password', value: password, setter: setPassword, placeholder: 'Create a password' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-dot-pattern" style={{ background: 'var(--bg-primary)' }}>
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full blur-[140px]"
          style={{
            width: 360, height: 360,
            top: '-8%', right: '-5%',
            background: 'var(--accent-teal-dim)',
            animation: 'float 9s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full blur-[120px]"
          style={{
            width: 380, height: 380,
            bottom: '-10%', left: '-8%',
            background: 'var(--accent-amber-dim)',
            animation: 'float 11s ease-in-out infinite 3s',
          }}
        />
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        {/* Brand */}
        <div className="flex items-center justify-center gap-3 mb-8 animate-fade-in-up delay-1">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, var(--accent-teal), #0d9488)',
              boxShadow: '0 8px 24px rgba(20, 184, 166, 0.25)',
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2c.5 5-3 7.5-3 12a6 6 0 0 0 12 0c0-4.5-3.5-7-3-12" />
              <path d="M12 14c.3 2.5-1 3.5-1 5a2.5 2.5 0 0 0 5 0c0-1.5-1.3-2.5-1-5" />
            </svg>
          </div>
          <span className="text-xl font-bold text-gradient-teal tracking-tight">
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
              Create Account
            </h1>
            <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
              Start your transformation today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 mb-5">
            {fields.map((field, i) => (
              <div key={field.id} className="flex flex-col gap-2 animate-fade-in-up" style={{ animationDelay: `${0.15 + i * 0.08}s` }}>
                <label
                  htmlFor={field.id}
                  className="text-xs font-semibold uppercase tracking-widest transition-colors duration-300"
                  style={{ color: focusedField === field.id ? 'var(--accent-teal)' : 'var(--text-secondary)' }}
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.id}
                  className="px-4 py-3.5 rounded-xl text-sm transition-all duration-300 focus-glow"
                  style={{
                    background: 'var(--bg-elevated)',
                    border: `1px solid ${focusedField === field.id ? 'var(--accent-teal)' : 'var(--border-medium)'}`,
                    color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value)}
                  onFocus={() => setFocusedField(field.id)}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>
            ))}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl text-sm font-bold uppercase tracking-wide cursor-pointer transition-all duration-300 mt-3 btn-press flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, var(--accent-teal), #0d9488)',
                color: '#fff',
                boxShadow: '0 6px 20px rgba(20, 184, 166, 0.3)',
                opacity: isLoading ? 0.8 : 1,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(20, 184, 166, 0.45)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(20, 184, 166, 0.3)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" style={{ animation: 'spin 0.6s linear infinite' }} />
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="text-center pt-5" style={{ borderTop: '1px solid var(--border-subtle)' }}>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Already have an account?{" "}
              <a
                href="/login"
                className="font-semibold transition-colors cursor-pointer"
                style={{ color: 'var(--accent-amber)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-amber-light)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--accent-amber)'}
              >
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

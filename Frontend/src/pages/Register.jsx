import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
      {/* Decorative orbs */}
      <div className="fixed top-[-120px] right-[-80px] w-[350px] h-[350px] bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-[-100px] left-[-100px] w-[350px] h-[350px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent tracking-tight">
            Calorie Deficit
          </span>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-purple-900/20 p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
              Create Account
            </h1>
            <p className="text-sm text-purple-300/70 font-medium">
              Join us today to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 mb-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-xs font-semibold text-purple-200 uppercase tracking-widest"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white text-sm placeholder-purple-300/40 transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white/8"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-xs font-semibold text-purple-200 uppercase tracking-widest"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white text-sm placeholder-purple-300/40 transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white/8"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-xs font-semibold text-purple-200 uppercase tracking-widest"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white text-sm placeholder-purple-300/40 transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white/8"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-sm font-semibold uppercase tracking-wide cursor-pointer transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 mt-2"
            >
              Sign Up
            </button>
          </form>

          <div className="text-center border-t border-white/10 pt-5">
            <p className="text-sm text-purple-300/70">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-indigo-400 font-semibold transition-colors cursor-pointer hover:text-purple-300 hover:underline"
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

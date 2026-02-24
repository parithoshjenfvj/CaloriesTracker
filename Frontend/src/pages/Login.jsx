import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import spaceImage from "../assets/space.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/user/login",
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
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${spaceImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-2xl p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm text-gray-600 font-medium">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 mb-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-xs font-semibold text-gray-800 uppercase tracking-widest"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="px-4 py-3 border-2 border-gray-200 rounded-lg text-sm transition-all bg-gray-50 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 placeholder-gray-400"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-xs font-semibold text-gray-800 uppercase tracking-widest"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="px-4 py-3 border-2 border-gray-200 rounded-lg text-sm transition-all bg-gray-50 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 placeholder-gray-400"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-700 text-white rounded-lg text-sm font-semibold uppercase tracking-wide cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 mt-2"
            >
              Sign In
            </button>
          </form>

          <div className="text-center border-t border-gray-200 pt-5">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-indigo-500 font-semibold transition-colors cursor-pointer hover:text-purple-700 hover:underline"
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

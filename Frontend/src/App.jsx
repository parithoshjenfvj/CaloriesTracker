import { Routes, Route } from "react-router-dom"
import './App.css'
import Login from "./pages/Login"
import React from "react";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateFoodItem from "./pages/CreateFoodItem";
import CalorieCalculator from "./pages/CalorieCalculator";
import Home from "./pages/Home";
function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create-food-item" element={<CreateFoodItem />} />
      <Route path="/calorie-calculator" element={<CalorieCalculator />} />
    </Routes>
  )
}

export default App

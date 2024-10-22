import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/auth/login", { email, password });
      // Store token in localStorage
      localStorage.setItem("token", response.data.token);
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      // Redirect to home page
      navigate("/");
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("Email not registered. Please register.");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };
  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
      {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-150 ease-in-out">
          Login
        </button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-4">
        Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
      </p>
    </div>
  );
  
};

export default LoginForm;
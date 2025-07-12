import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'https://odoo-hackathon-2025-team-qwerty-masters.onrender.com/api/v1/auth/login',
        { email: formData.email, password: formData.password },
        { withCredentials: true }
      );

      console.log('Login successful:', res.data);
    } catch (err) {
      console.error('Login request failed:', err.response?.data || err.message);
      alert('Login failed: ' + (err.response?.data?.message || err.message));
      return;
    }

    try {
      await axios.post(
        'https://odoo-hackathon-2025-team-qwerty-masters.onrender.com/api/v1/auth/generate-otp',
        { email: formData.email },
        { withCredentials: true }
      );
    } catch (err) {
      console.error('OTP request failed:', err.response?.data || err.message);
      alert('OTP request failed: ' + (err.response?.data?.message || err.message));
      return;
    }

    // 🧭 Navigate to OTP Verification Page with email state
    navigate('/verify-otp', { state: { email: formData.email } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black px-2">
      <div className="bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-full max-w-sm border border-white/20 
        transform transition-all duration-500 hover:scale-105 hover:shadow-purple-600/40 hover:shadow-xl">

        <h2 className="text-2xl font-bold text-center text-white mb-4 animate-pulse">Log In</h2>
        <form onSubmit={handleSubmit} className="space-y-3">

          <div>
            <label htmlFor="email" className="block text-xs text-gray-200 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-white/10 border border-gray-300/20 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400 text-white text-sm"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs text-gray-200 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-white/10 border border-gray-300/20 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400 text-white text-sm"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-xs text-gray-200">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="h-4 w-4 text-purple-500 focus:ring-purple-500 border-gray-300/20 rounded mr-2"
              />
              Remember Me
            </label>
            <a href="#" className="text-xs text-purple-300 hover:text-purple-400 underline transition-colors duration-300">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-md hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg"
          >
            Log In
          </button>
        </form>

        <p className="mt-3 text-center text-xs text-gray-300">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-purple-300 hover:text-purple-400 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;

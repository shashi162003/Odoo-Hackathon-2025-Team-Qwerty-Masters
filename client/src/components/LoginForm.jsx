import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login, generateOTP } from '../api';

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

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let token;
    try {
      const res = await login({ email: formData.email, password: formData.password });
      console.log('Login successful:', res.data);
      token = res.data.token;
    } catch (err) {
      console.error('Login request failed:', err.response?.data || err.message);
      alert('Login failed: ' + (err.response?.data?.message || err.message));
      setLoading(false);
      return;
    }
    try {
      await generateOTP({ email: formData.email }, token);
    } catch (err) {
      console.error('OTP request failed:', err.response?.data || err.message);
      alert('OTP request failed: ' + (err.response?.data?.message || err.message));
      setLoading(false);
      return;
    }
    setLoading(false);
    navigate('/verify-otp', { state: { email: formData.email, token } });
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
            className="w-full py-2 px-4 bg-purple-700 text-white rounded-lg font-semibold hover:bg-purple-800 transition duration-300 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              'Log In'
            )}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-200">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-300 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;

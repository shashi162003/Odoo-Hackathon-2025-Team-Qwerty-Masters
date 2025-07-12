import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api';

const SignUpForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: 'male',
    role: 'user',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signup(formData);
      console.log('Signup successful:', res.data);
      alert('Signup successful! Please log in.');
      navigate('/login');
    } catch (err) {
      console.error('Signup error:', err.response?.data?.message || err.message);
      alert(err.response?.data?.message || 'Signup failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black px-2">
      <div className="bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-full max-w-sm border border-white/20 
        transform transition-all duration-500 hover:scale-105 hover:shadow-purple-600/40 hover:shadow-xl">

        <h2 className="text-2xl font-bold text-center text-white mb-4 animate-pulse">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="firstName" className="block text-xs text-gray-200 mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-xs text-gray-200 mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs text-gray-200 mb-1">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs text-gray-200 mb-1">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-xs text-gray-200 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-xs text-gray-200 mb-1">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="role" className="block text-xs text-gray-200 mb-1">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-white/80 text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-700 text-white rounded-lg font-semibold hover:bg-purple-800 transition duration-300"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Signing up...
              </span>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-200">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-300 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUpForm;

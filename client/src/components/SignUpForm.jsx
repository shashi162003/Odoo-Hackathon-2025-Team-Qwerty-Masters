import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'https://odoo-hackathon-2025-team-qwerty-masters.onrender.com/api/v1/auth/signup',
        formData,
        { withCredentials: true }
      );
      console.log('Signup successful:', res.data);
      alert('Signup successful! Please log in.');
      navigate('/login');
    } catch (err) {
      console.error('Signup error:', err.response?.data?.message || err.message);
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black px-2">
      <div className="bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-full max-w-sm border border-white/20 
        transform transition-all duration-500 hover:scale-105 hover:shadow-purple-600/40 hover:shadow-xl">

        <h2 className="text-2xl font-bold text-center text-white mb-4 animate-pulse">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {[
            { label: 'First Name', name: 'firstName', type: 'text', placeholder: 'First name' },
            { label: 'Last Name', name: 'lastName', type: 'text', placeholder: 'Last name' },
            { label: 'Email', name: 'email', type: 'email', placeholder: 'Email' },
            { label: 'Password', name: 'password', type: 'password', placeholder: 'Password' },
            { label: 'Confirm Password', name: 'confirmPassword', type: 'password', placeholder: 'Confirm password' }
          ].map(field => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-xs text-gray-200 mb-1">{field.label}</label>
              <input
                {...field}
                id={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white/10 border border-gray-300/20 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400 text-white text-sm"
              />
            </div>
          ))}

          <div>
            <label htmlFor="gender" className="block text-xs text-gray-200 mb-1">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-purple-700/30 border border-gray-300/20 rounded-md text-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
              required
              className="w-full px-3 py-2 bg-purple-700/30 border border-gray-300/20 rounded-md text-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-md hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-3 text-center text-xs text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-300 hover:text-purple-400 underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;

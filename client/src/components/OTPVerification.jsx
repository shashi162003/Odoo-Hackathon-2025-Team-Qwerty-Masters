import { useState } from 'react';
import axios from 'axios';

const VerifyOTP = ({ onVerified }) => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    try {
      const response = await axios.post('https://odoo-hackathon-2025-team-qwerty-masters.onrender.com/api/v1/auth/verify-otp', { otp }, {
        withCredentials: true, // ✅ Send cookie token
      });
      setMessage(response.data.message);
      onVerified(); // ✅ Callback after successful verification
    } catch (error) {
      setMessage(error.response?.data?.message || 'Verification failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black px-2">
      <div className="bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-full max-w-sm border border-white/20 
        transform transition-all duration-500 hover:scale-105 hover:shadow-purple-600/40 hover:shadow-xl">

        <h2 className="text-xl font-semibold text-center text-white mb-4 animate-pulse">
          Verify OTP
        </h2>

        <p className="text-sm text-gray-200 mb-3 text-center">
          Please enter the OTP sent to your registered email
        </p>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full px-3 py-2 bg-white/10 border border-gray-300/20 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-400 text-white text-sm mb-3"
        />

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-2 rounded-md hover:from-green-700 hover:to-teal-700 transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg disabled:opacity-60"
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>

        {message && (
          <p className="mt-3 text-center text-sm text-white">{message}</p>
        )}
      </div>
    </div>
  );
};

export default VerifyOTP;

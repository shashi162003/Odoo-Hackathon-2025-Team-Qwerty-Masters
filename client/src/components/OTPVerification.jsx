import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyOTP } from '../api';

const VerifyOTP = ({ onVerified }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = location.state?.token || '';
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    try {
      console.log('Token:', token);
      const response = await verifyOTP({ otp }, token);
      setMessage(response.data.message);
      if (typeof onVerified === 'function') {
        onVerified();
      } else {
        navigate('/home');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Verification failed');
      console.error('OTP Verify Error:', error.response?.data || error.message);
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
          className="w-full py-2 px-4 bg-purple-700 text-white rounded-lg font-semibold hover:bg-purple-800 transition duration-300 flex items-center justify-center"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              Verifying...
            </span>
          ) : (
            'Verify OTP'
          )}
        </button>
        {message && (
          <div className="mt-4 text-center text-sm text-white">{message}</div>
        )}
      </div>
    </div>
  );
};

export default VerifyOTP;

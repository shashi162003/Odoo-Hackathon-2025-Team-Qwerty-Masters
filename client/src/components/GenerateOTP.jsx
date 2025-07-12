import { useState } from 'react';
import { generateOTP } from '../api';

const GenerateOTP = ({ email }) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateOTP = async () => {
    setLoading(true);
    try {
      const response = await generateOTP({ email });
      setMessage(`OTP sent successfully to ${email}`);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to generate OTP');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black px-2">
      <div className="bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-full max-w-sm border border-white/20 
        transform transition-all duration-500 hover:scale-105 hover:shadow-purple-600/40 hover:shadow-xl">

        <h2 className="text-xl font-semibold text-center text-white mb-4 animate-pulse">OTP Verification</h2>

        <p className="text-sm text-gray-200 mb-3 text-center">
          Send OTP to your email <span className="font-medium text-purple-300">{email}</span>
        </p>

        <button
          onClick={handleGenerateOTP}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-md hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              Sending OTP...
            </span>
          ) : (
            'Send OTP'
          )}
        </button>

        {message && (
          <div className="mt-4 text-center text-sm text-white">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateOTP;

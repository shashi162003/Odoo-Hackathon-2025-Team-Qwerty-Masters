import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`https://odoo-hackathon-2025-team-qwerty-masters.onrender.com/api/v1/profile/getProfile/${id}`);
        setFormData(res.data.user);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setMessage('Failed to load user profile');
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

   if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  if (!formData) {
    return <div className="text-white text-center mt-10">User data not found</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`https://odoo-hackathon-2025-team-qwerty-masters.onrender.com/api/v1/profile/updateProfile/${id}`, formData);
      setMessage('Profile updated successfully');
      setFormData(res.data.user);
    } catch (err) {
      console.error(err);
      setMessage('Failed to update profile');
    }
  };

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
      <div className="bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-full max-w-4xl border border-white/20 transition-all hover:scale-105">
        <h2 className="text-3xl font-bold text-white text-center mb-6">User Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex justify-center">
            <img
              src={formData.avatar}
              alt="Profile"
              className="w-48 h-48 rounded-full object-cover border-4 border-white/20"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">First Name</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/10 border border-gray-300/20 rounded-xl text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">Last Name</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/10 border border-gray-300/20 rounded-xl text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/10 border border-gray-300/20 rounded-xl text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">Gender</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsGenderOpen(!isGenderOpen)}
                  className="w-full px-4 py-2 bg-white/10 border border-gray-300/20 rounded-xl text-white text-left"
                >
                  {formData.gender}
                </button>
                {isGenderOpen && (
                  <div className="absolute w-full mt-1 bg-gray-800 border border-gray-600 rounded-xl z-10">
                    {['Male', 'Female', 'Other'].map(gender => (
                      <div
                        key={gender}
                        onClick={() => {
                          setFormData({ ...formData, gender });
                          setIsGenderOpen(false);
                        }}
                        className="px-4 py-2 text-white cursor-pointer hover:bg-purple-500/30"
                      >
                        {gender}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl hover:from-purple-700 hover:to-indigo-700 font-semibold shadow-lg"
            >
              Save Changes
            </button>

            {message && <p className="text-sm text-center text-white mt-2">{message}</p>}
            <p className="text-center text-sm text-gray-300 mt-4">
              <Link to="/login" className="text-purple-300 hover:text-purple-400 underline">
                Back to Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

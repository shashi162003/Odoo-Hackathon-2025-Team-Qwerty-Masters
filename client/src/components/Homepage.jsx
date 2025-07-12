import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import QuestionCard from './QuestionCard';
import { getQuestions as apiGetQuestions, deleteQuestion } from '../api';
import { useNavigate } from 'react-router-dom';
import Avatar from './Navbar'; // Reuse Avatar component for user avatar
import { ClipLoader } from 'react-spinners';
import { Toaster, toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const Homepage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Function to get cookie value
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  // Function to decode JWT token (simple decode without verification)
  const decodeJWT = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  };

  // Check authentication by reading cookie
  useEffect(() => {
    const checkAuth = () => {
      const token = getCookie('token');

      if (token) {
        const decoded = decodeJWT(token);

        if (decoded && decoded.exp > Date.now() / 1000) {
          // Token exists and hasn't expired
          setIsAuthenticated(true);
          setCurrentUser({
            id: decoded.id,
            email: decoded.email
          });
        } else {
          // Token expired or invalid
          setIsAuthenticated(false);
          setCurrentUser(null);
        }
      } else {
        // No token found
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    };

    checkAuth();
  }, []);

  // Fetch questions
  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      setLoading(true);
      const response = await apiGetQuestions();
      const data = response.data;
      if (data.success) {
        setQuestions(data.questions || []);
      } else {
        toast.error('Failed to load questions');
      }
    } catch (error) {
      console.error('GET Error:', error.message);
      toast.error('Failed to load questions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (!window.confirm('Are you sure you want to delete this question? This action cannot be undone.')) {
      return;
    }
    try {
      // Get token from cookie
      const token = getCookie('token');
      toast.loading('Deleting question...', { id: 'deleteQ' });
      const response = await deleteQuestion(questionId, token);
      const data = response.data;
      if (data.success) {
        setQuestions(prev => prev.filter(q => q._id !== questionId));
        toast.success('Question deleted successfully', { id: 'deleteQ' });
      } else {
        toast.error('Failed to delete question', { id: 'deleteQ' });
      }
    } catch (error) {
      toast.dismiss('deleteQ');
      if (error.response && error.response.status === 401) {
        toast.error('You are not authorized to delete this question');
        setIsAuthenticated(false);
        setCurrentUser(null);
      } else {
        toast.error('Failed to delete question');
      }
    }
  };

  // Function to check if current user owns a question
  const isQuestionOwner = (question) => {
    if (!isAuthenticated || !currentUser || !question.user) {
      return false;
    }

    // Compare user IDs - handle both string and ObjectId formats
    const questionUserId = question.user._id || question.user.id || question.user;
    const currentUserId = currentUser.id;

    return questionUserId.toString() === currentUserId.toString();
  };

  // Auth buttons logic
  const userData = localStorage.getItem('user');
  let avatarUrl = null;
  let firstName = '';
  if (userData) {
    try {
      const user = JSON.parse(userData);
      avatarUrl = user.avatar || null;
      firstName = user.firstName || '';
    } catch { }
  }
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090909] text-white flex flex-col items-center justify-center">
        <Toaster position="top-right" />
        <ClipLoader color="#22d3ee" size={60} speedMultiplier={1.2} />
        <span className="ml-3 text-gray-400 mt-4 animate-pulse">Loading questions...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090909] text-white">
      <Toaster position="top-right" />
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-8 py-4 bg-[#0f0f0f] border-b border-cyan-900 shadow-md sticky top-0 z-50">
        {/* Logo Left */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-cyan-400 tracking-wide select-none">StackIt</span>
          {/* Optionally add a logo image here */}
        </div>
        {/* Centered Links */}
        <div className="flex-1 flex justify-center gap-8">
          <button
            className="text-cyan-400 hover:text-cyan-200 font-semibold text-lg transition-colors duration-200"
            onClick={() => navigate('/home')}
          >
            Home
          </button>
          <span className="text-yellow-400 flex items-center gap-1 font-medium text-lg">
            <span role="img" aria-label="bell">🔔</span> Notifications
          </span>
        </div>
        {/* Auth/Avatar Right */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Avatar src={avatarUrl} fallback={firstName ? firstName[0].toUpperCase() : 'U'} />
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded shadow transition-transform duration-200 active:scale-95"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded shadow transition-transform duration-200 active:scale-95"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded shadow transition-transform duration-200 active:scale-95"
                onClick={() => navigate('/signup')}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

      <main className="pt-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <motion.h1
              className="text-3xl font-bold text-cyan-400"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Latest Questions ({questions.length})
            </motion.h1>
            {isAuthenticated && (
              <motion.button
                onClick={() => window.location.href = '/ask'}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
              >
                + Ask Question
              </motion.button>
            )}
          </div>

          {questions.length === 0 ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-400 text-lg mb-4">No questions found</p>
              <p className="text-gray-500 mb-6">Be the first to ask a question!</p>
              {isAuthenticated ? (
                <button
                  onClick={() => window.location.href = '/ask'}
                  className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-transform duration-200 active:scale-95"
                >
                  Ask the First Question
                </button>
              ) : (
                <button
                  onClick={() => window.location.href = '/login'}
                  className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-transform duration-200 active:scale-95"
                >
                  Login to Ask Questions
                </button>
              )}
            </motion.div>
          ) : (
            <AnimatePresence>
              <motion.div
                className="space-y-4"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
                }}
              >
                {questions.map((question) => (
                  <motion.div
                    key={question._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.4 }}
                  >
                    <QuestionCard
                      question={question}
                      currentUser={currentUser}
                      isAuthenticated={isAuthenticated}
                      onDelete={handleDeleteQuestion}
                      isOwner={isQuestionOwner(question)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </main>
    </div>
  );
};

export default Homepage;
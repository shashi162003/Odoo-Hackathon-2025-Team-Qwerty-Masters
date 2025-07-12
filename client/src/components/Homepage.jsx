import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import QuestionCard from './QuestionCard';

const Homepage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
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
      const response = await fetch('http://localhost:4000/api/v1/questions/getQuestions');
      
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setQuestions(data.questions || []);
      } else {
        setError('Failed to load questions');
      }
    } catch (error) {
      console.error('GET Error:', error.message);
      setError('Failed to load questions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (!window.confirm('Are you sure you want to delete this question? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/v1/questions/deleteQuestions/${questionId}`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Remove the deleted question from state
          setQuestions(prev => prev.filter(q => q._id !== questionId));
          alert('Question deleted successfully');
        } else {
          alert('Failed to delete question');
        }
      } else if (response.status === 401) {
        alert('You are not authorized to delete this question');
        // Token might be expired, update auth state
        setIsAuthenticated(false);
        setCurrentUser(null);
      } else {
        alert('Failed to delete question');
      }
    } catch (error) {
      console.error('Delete Error:', error);
      alert('An error occurred while deleting the question');
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090909] text-white">
  
        <main className="pt-8 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
            <span className="ml-3 text-gray-400">Loading questions...</span>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#090909] text-white">
        <main className="pt-8 px-4">
          <div className="text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={getQuestions}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg"
            >
              Try Again
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090909] text-white">
      
      <main className="pt-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-cyan-400">
              Latest Questions ({questions.length})
            </h1>
            {isAuthenticated && (
              <button
                onClick={() => window.location.href = '/ask'}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-colors"
              >
                + Ask Question
              </button>
            )}
          </div>

          {questions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg mb-4">No questions found</p>
              <p className="text-gray-500 mb-6">Be the first to ask a question!</p>
              {isAuthenticated ? (
                <button
                  onClick={() => window.location.href = '/ask'}
                  className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg"
                >
                  Ask the First Question
                </button>
              ) : (
                <button
                  onClick={() => window.location.href = '/login'}
                  className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg"
                >
                  Login to Ask Questions
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {questions.map((question) => (
                <QuestionCard
                  key={question._id}
                  question={question}
                  currentUser={currentUser}
                  isAuthenticated={isAuthenticated}
                  onDelete={handleDeleteQuestion}
                  isOwner={isQuestionOwner(question)}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Homepage;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingAnswer, setEditingAnswer] = useState(null);
  const [editText, setEditText] = useState('');

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

  // Fetch question details
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`http://localhost:4000/getQuestions/${id}`);
        if (response.ok) {
          const data = await response.json();
          setQuestion(data.question);
        }
      } catch (error) {
        console.error('Failed to fetch question:', error);
      }
    };
    
    if (id) {
      fetchQuestion();
    }
  }, [id]);

  // Fetch answers for the question
  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await fetch(`http://localhost:4000/getAnswers/${id}`);
        if (response.ok) {
          const data = await response.json();
          setAnswers(data.answers || []);
        }
      } catch (error) {
        console.error('Failed to fetch answers:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAnswers();
    }
  }, [id]);

  const handleAddAnswer = async () => {
    if (!newAnswer.trim()) return;
    
    try {
      const response = await fetch('http://localhost:4000/addAnswer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          answer: newAnswer,
          questionId: id
        })
      });

      if (response.ok) {
        const data = await response.json();
        // Refresh answers after adding
        const answersResponse = await fetch(`http://localhost:4000/getAnswers/${id}`);
        if (answersResponse.ok) {
          const answersData = await answersResponse.json();
          setAnswers(answersData.answers || []);
        }
        setNewAnswer('');
      } else if (response.status === 401) {
        alert('Please login to add an answer');
        setIsAuthenticated(false);
        setCurrentUser(null);
      } else {
        console.error('Failed to add answer');
      }
    } catch (error) {
      console.error('Error adding answer:', error);
    }
  };

  const handleUpdateAnswer = async (answerId) => {
    if (!editText.trim()) return;

    try {
      const response = await fetch(`http://localhost:4000/updateAnswer/${answerId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          answer: editText
        })
      });

      if (response.ok) {
        // Refresh answers after updating
        const answersResponse = await fetch(`http://localhost:4000/getAnswers/${id}`);
        if (answersResponse.ok) {
          const answersData = await answersResponse.json();
          setAnswers(answersData.answers || []);
        }
        setEditingAnswer(null);
        setEditText('');
      } else if (response.status === 401) {
        alert('You are not authorized to update this answer');
        setIsAuthenticated(false);
        setCurrentUser(null);
      } else {
        console.error('Failed to update answer');
      }
    } catch (error) {
      console.error('Error updating answer:', error);
    }
  };

  const handleDeleteAnswer = async (answerId) => {
    if (!window.confirm('Are you sure you want to delete this answer?')) return;

    try {
      const response = await fetch(`http://localhost:4000/deleteAnswer/${answerId}`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        // Refresh answers after deleting
        const answersResponse = await fetch(`http://localhost:4000/getAnswers/${id}`);
        if (answersResponse.ok) {
          const answersData = await answersResponse.json();
          setAnswers(answersData.answers || []);
        }
      } else if (response.status === 401) {
        alert('You are not authorized to delete this answer');
        setIsAuthenticated(false);
        setCurrentUser(null);
      } else {
        console.error('Failed to delete answer');
      }
    } catch (error) {
      console.error('Error deleting answer:', error);
    }
  };

  const handleUpvoteQuestion = async () => {
    if (!isAuthenticated) return;
    
    try {
      const response = await fetch(`http://localhost:4000/upvoteQuestion/${id}`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        // Refresh question data
        const questionResponse = await fetch(`http://localhost:4000/getQuestions/${id}`);
        if (questionResponse.ok) {
          const data = await questionResponse.json();
          setQuestion(data.question);
        }
      } else if (response.status === 401) {
        alert('Please login to upvote');
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    } catch (error) {
      console.error('Error upvoting question:', error);
    }
  };

  const startEdit = (answer) => {
    setEditingAnswer(answer._id);
    setEditText(answer.answer);
  };

  const cancelEdit = () => {
    setEditingAnswer(null);
    setEditText('');
  };

  // Check if current user owns an answer
  const isAnswerOwner = (answer) => {
    if (!isAuthenticated || !currentUser || !answer.user) {
      return false;
    }
    
    const answerUserId = answer.user._id || answer.user.id || answer.user;
    const currentUserId = currentUser.id;
    
    return answerUserId.toString() === currentUserId.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090909] text-white flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090909] text-white px-4 py-6">
      {question ? (
        <div className="max-w-4xl mx-auto bg-[#0f0f0f] rounded-2xl border border-gray-700 p-6 shadow-md">
          <h1 className="text-2xl font-bold text-cyan-400 mb-2">{question.title}</h1>
          <p className="text-sm text-gray-300 mb-4">{question.description}</p>

          {/* Tags */}
          {question.tags && question.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {question.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 bg-cyan-600 text-xs rounded-full">
                  {typeof tag === 'string' ? tag : tag.name}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
            <span>By: {question.user?.name || (question.user?.firstName + ' ' + question.user?.lastName) || 'Anonymous'}</span>
            <span>📅 {new Date(question.createdAt).toLocaleDateString()}</span>
            {isAuthenticated && (
              <button
                onClick={handleUpvoteQuestion}
                className="ml-2 text-cyan-500 hover:text-cyan-300 transition"
              >
                {question.upvotes?.length || 0} Upvotes 🔼
              </button>
            )}
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-cyan-300 mb-3">
              Answers ({answers.length})
            </h2>
            
            {answers.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No answers yet. Be the first to answer!</p>
            ) : (
              answers.map((answer) => (
                <div key={answer._id} className="mb-6 p-4 rounded-xl border border-gray-700 bg-[#1a1a1a]">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-md font-semibold text-cyan-200">
                          {answer.user?.name || (answer.user?.firstName + ' ' + answer.user?.lastName) || 'Anonymous'}
                        </h3>
                        <span className="text-xs text-gray-400">
                          {new Date(answer.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      
                      {editingAnswer === answer._id ? (
                        <div className="space-y-2">
                          <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="w-full p-2 rounded-lg bg-[#1f1f1f] border border-gray-700 text-white"
                            rows="3"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUpdateAnswer(answer._id)}
                              className="px-3 py-1 bg-green-600 hover:bg-green-500 rounded-lg text-sm"
                            >
                              Save
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="px-3 py-1 bg-gray-600 hover:bg-gray-500 rounded-lg text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-300 whitespace-pre-wrap">{answer.answer}</p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <img
                        src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${answer.user?.name || answer.user?.firstName + ' ' + answer.user?.lastName || 'anonymous'}`}
                        alt="avatar"
                        className="w-10 h-10 rounded-full border border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-xs text-gray-400">
                      {answer.upvotes?.length || 0} upvotes
                    </span>
                    
                    {/* Show edit/delete buttons only if user owns the answer */}
                    {isAnswerOwner(answer) && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(answer)}
                          className="text-xs text-blue-400 hover:text-blue-300"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDeleteAnswer(answer._id)}
                          className="text-xs text-red-400 hover:text-red-300"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add Answer Section */}
          {isAuthenticated ? (
            <div className="mt-8">
              <h3 className="text-md font-semibold text-cyan-300 mb-2">Your Answer</h3>
              <textarea
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full p-3 rounded-lg bg-[#1f1f1f] border border-gray-700 text-white"
                rows="4"
              />
              <button
                onClick={handleAddAnswer}
                disabled={!newAnswer.trim()}
                className="mt-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-xl text-sm"
              >
                Submit Answer
              </button>
            </div>
          ) : (
            <div className="mt-8 text-center">
              <p className="text-gray-400 mb-2">Please log in to add an answer</p>
              <button
                onClick={() => window.location.href = '/login'}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-xl text-sm"
              >
                Login
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-400">Question not found</p>
        </div>
      )}
    </div>
  );
};

export default Detail;
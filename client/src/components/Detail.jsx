import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionById, getAnswers, addAnswer, updateAnswer, deleteAnswer, upvoteQuestion } from '../api';

const Detail = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  // Removed unused newAnswer state
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingAnswer, setEditingAnswer] = useState(null);
  const [editText, setEditText] = useState('');
  const [message, setMessage] = useState('');
  const [answerText, setAnswerText] = useState('');


  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };


  // Authentication check disabled for adding answers


  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await getQuestionById(id);
        const data = response.data;
        setQuestion(data.question);
      } catch {
        setQuestion(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchQuestion();
    }
  }, [id]);


  // Helper to fetch answers and update state
  const fetchAnswers = async () => {
    try {
      const response = await getAnswers(question._id);
      setAnswers(response.data.answers || []);
    } catch {
      // error intentionally ignored
    }
  };

  useEffect(() => {
    if (question) {
      fetchAnswers();
    }
  }, [question]);

  const handleAddAnswer = async () => {
    if (!answerText.trim()) return;
    setLoading(true);
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      const response = await addAnswer({ answer: answerText, questionId: question._id }, token);
      if (response.data && response.data.success) {
        setMessage('Answer added!');
        setAnswerText('');
        fetchAnswers();
      } else {
        setMessage(response.data?.message || 'Failed to add answer');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to add answer');
      console.error('Add Answer Error:', error.response?.data || error.message, error);
      // Optimistically fetch answers if error is 500 (answer may have been added)
      if (error.response && error.response.status === 500) {
        setTimeout(() => {
          fetchAnswers();
        }, 500);
        setMessage('Answer may have been added. Please refresh if not visible.');
      }
    }
    setLoading(false);
  };

  const handleUpdateAnswer = async (answerId) => {
    if (!editText.trim()) return;

    try {
      const token = getCookie('token');
      const response = await updateAnswer(answerId, { answer: editText }, token);
      if (response.data.success) {

        const answersResponse = await getAnswers(id);
        setAnswers(answersResponse.data.answers || []);
        setEditingAnswer(null);
        setEditText('');
      } else {
        alert('Failed to update answer');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('You are not authorized to update this answer');
        setIsAuthenticated(false);
        setCurrentUser(null);
      } else {
        console.error('Error updating answer:', error);
      }
    }
  };

  const handleDeleteAnswer = async (answerId) => {
    if (!window.confirm('Are you sure you want to delete this answer?')) return;

    try {
      const token = getCookie('token');
      const response = await deleteAnswer(answerId, token);
      if (response.data.success) {

        const answersResponse = await getAnswers(id);
        setAnswers(answersResponse.data.answers || []);
      } else {
        alert('Failed to delete answer');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('You are not authorized to delete this answer');
        setIsAuthenticated(false);
        setCurrentUser(null);
      } else {
        console.error('Error deleting answer:', error);
      }
    }
  };

  const handleUpvoteQuestion = async () => {
    if (!isAuthenticated) return;

    try {
      const token = getCookie('token');
      await upvoteQuestion(id, token);
      const questionResponse = await getQuestionById(id);
      setQuestion(questionResponse.data.question);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Please login to upvote');
        setIsAuthenticated(false);
        setCurrentUser(null);
      } else {
        console.error('Error upvoting question:', error);
      }
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
          {question.image && (
            <div className="mb-4">
              <img
                src={question.image}
                alt="Question attachment"
                className="max-w-full h-48 object-cover rounded-lg border border-gray-600"
              />
            </div>
          )}
          <div
            className="text-sm text-gray-300 mb-4"
            dangerouslySetInnerHTML={{ __html: question.description }}
          />


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
                          {answer.user?.firstName && answer.user?.lastName
                            ? `${answer.user.firstName} ${answer.user.lastName}`
                            : 'Anonymous'}
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


          {isAuthenticated ? (
            <div className="mt-8">
              <h3 className="text-md font-semibold text-cyan-300 mb-2">Your Answer</h3>
              <textarea
                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                rows={4}
                value={answerText}
                onChange={e => setAnswerText(e.target.value)}
                placeholder="Type your answer here..."
              />
              <button
                className="mt-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded"
                onClick={handleAddAnswer}
                disabled={loading || !answerText.trim()}
              >
                {loading ? 'Submitting...' : 'Add Answer'}
              </button>
              {message && <div className="mt-2 text-sm text-green-400">{message}</div>}
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
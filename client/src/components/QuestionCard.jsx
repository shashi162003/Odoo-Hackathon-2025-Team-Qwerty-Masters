import React from 'react';
import { useNavigate } from 'react-router-dom';
import { upvoteQuestion } from '../api';

const QuestionCard = ({ question, currentUser, isAuthenticated, onDelete, isOwner }) => {
  const navigate = useNavigate();

  const handleQuestionClick = () => {
    navigate(`/questions/${question._id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(question._id);
  };

  const handleUpvoteClick = async (e) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      alert('Please login to upvote');
      return;
    }

    try {
      // Get token from cookie
      const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
      };
      const token = getCookie('token');
      await upvoteQuestion(question._id, token);
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Please login to upvote');
      } else {
        console.error('Upvote error:', error);
      }
    }
  };

  return (
    <div
      className="bg-[#0f0f0f] rounded-2xl border border-gray-700 p-6 shadow-md hover:border-cyan-500 transition-all cursor-pointer group"
      onClick={handleQuestionClick}
    >

      <div className="flex justify-between items-start mb-3">
        <h2 className="text-xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors flex-1 mr-4">
          {question.title}
        </h2>


        {isAuthenticated && isOwner && (
          <button
            onClick={handleDeleteClick}
            className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity p-1"
            title="Delete question"
          >
            🗑️
          </button>
        )}
      </div>


      <p className="text-gray-300 mb-4 line-clamp-3">
        {question.description}
      </p>


      {question.tags && question.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {question.tags.map((tag) => (
            <span
              key={tag._id}
              className="px-2 py-1 bg-cyan-600 bg-opacity-20 text-cyan-300 text-xs rounded-full border border-cyan-600"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}


      {question.image && (
        <div className="mb-4">
          <img
            src={question.image}
            alt="Question attachment"
            className="max-w-full h-48 object-cover rounded-lg border border-gray-600"
          />
        </div>
      )}


      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center gap-4">

          <div className="flex items-center gap-2">
            <img
              src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${question.user?.name || question.user?.firstName + ' ' + question.user?.lastName || 'anonymous'}`}
              alt="avatar"
              className="w-6 h-6 rounded-full border border-cyan-500"
            />
            <span>{question.user?.name || (question.user?.firstName + ' ' + question.user?.lastName) || 'Anonymous'}</span>
          </div>


          <span>📅 {new Date(question.createdAt).toLocaleDateString()}</span>

          <span>💬 {question.answers?.length || 0} answers</span>
        </div>


        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <button
              onClick={handleUpvoteClick}
              className="text-cyan-500 hover:text-cyan-300 transition-colors flex items-center gap-1"
              title="Upvote this question"
            >
              <span>🔼</span>
              <span>{question.upvotes?.length || 0}</span>
            </button>
          ) : (
            <span className="text-gray-500 flex items-center gap-1">
              <span>🔼</span>
              <span>{question.upvotes?.length || 0}</span>
            </span>
          )}
        </div>
      </div>


      {question.answers && question.answers.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-xs text-gray-500 mb-1">Latest answer:</p>
          <p className="text-sm text-gray-400 line-clamp-2">
            Click to view all answers →
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
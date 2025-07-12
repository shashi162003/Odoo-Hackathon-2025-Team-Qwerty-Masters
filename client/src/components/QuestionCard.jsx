// QuestionCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const QuestionCard = ({ post }) => {
  return (
 
    <div className="rounded-2xl shadow-md border border-gray-700 p-4 bg-[#0f0f0f] text-white w-full max-w-3xl mx-auto my-4 hover:border-cyan-500 transition-all">
           <Link to={`/details/${post.id}`}>
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-cyan-400">{post.title}</h2>
          <p className="text-sm text-gray-300">{post.body}</p>
          <div className="flex gap-3 text-xs text-gray-400">
            <span>👁 {post.views} views</span>
            <span>⬆ {post.upvotes} upvotes</span>
            <span>🕒 {new Date(post.createdAt).toLocaleString()}</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={post.image}
            alt="avatar"
            className="w-10 h-10 rounded-full border border-cyan-500"
          />
          <p className="text-xs text-gray-300 mt-1">{post.name}</p>
        </div>
      </div>
          </Link>
    </div>

  );
};

export default QuestionCard;

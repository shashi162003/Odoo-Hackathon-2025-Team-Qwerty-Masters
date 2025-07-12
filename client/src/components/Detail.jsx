import React, { useEffect, useState } from 'react';
import { questions } from './data/questions';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [upvotes, setUpvotes] = useState(0);
  const [newAnswer, setNewAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [commentBoxes, setCommentBoxes] = useState({});
  const [newComments, setNewComments] = useState({});

  useEffect(() => {
    const found = questions.find((q) => q.id === parseInt(id));
    setPost(found);
    setAnswers(found?.answers || []);
    setUpvotes(found?.upvotes || 0);
  }, [id]);

  const toggleComments = (answerId) => {
    setCommentBoxes((prev) => ({
      ...prev,
      [answerId]: !prev[answerId],
    }));
  };

  const handleAddAnswer = () => {
    if (newAnswer.trim() !== '') {
      setAnswers((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          name: 'You',
          image: 'https://api.dicebear.com/7.x/thumbs/svg?seed=you',
          body: newAnswer,
          comments: [],
        },
      ]);
      setNewAnswer('');
    }
  };

  const handleAddComment = (answerId) => {
    if (newComments[answerId]?.trim()) {
      setAnswers((prev) =>
        prev.map((ans) =>
          ans.id === answerId
            ? {
                ...ans,
                comments: [
                  ...ans.comments,
                  {
                    id: ans.comments.length + 1,
                    name: 'You',
                    image: 'https://api.dicebear.com/7.x/thumbs/svg?seed=you',
                    content: newComments[answerId],
                  },
                ],
              }
            : ans
        )
      );
      setNewComments((prev) => ({ ...prev, [answerId]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white px-4 py-6">
      {post ? (
        <div className="max-w-4xl mx-auto bg-[#0f0f0f] rounded-2xl border border-gray-700 p-6 shadow-md">
          <h1 className="text-2xl font-bold text-cyan-400 mb-2">{post.title}</h1>
          <p className="text-sm text-gray-300 mb-4">{post.body}</p>

          <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
            <span>👁 {post.views} views</span>
            <button
              onClick={() => setUpvotes((u) => u + 1)}
              className="ml-2 text-cyan-500 hover:text-cyan-300 transition"
            >
              {upvotes} Upvotes 🔼
            </button>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-cyan-300 mb-3">Answers</h2>
            {answers.map((answer) => (
              <div key={answer.id} className="mb-6 p-4 rounded-xl border border-gray-700 bg-[#1a1a1a]">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-md font-semibold text-cyan-200">{answer.name}</h3>
                    <p className="text-sm text-gray-300">{answer.body}</p>
                  </div>
                  <img
                    src={answer.image}
                    alt="avatar"
                    className="w-10 h-10 rounded-full border border-cyan-500"
                  />
                </div>

                <button
                  onClick={() => toggleComments(answer.id)}
                  className="text-sm text-cyan-500 hover:underline mb-2"
                >
                  {commentBoxes[answer.id] ? 'Hide' : 'View'} Comments 💬
                </button>

                {commentBoxes[answer.id] && (
                  <>
                    <div className="bg-[#111] rounded-lg p-3 max-h-40 overflow-y-auto text-sm text-gray-300 mb-2">
                      {answer.comments?.map((comment) => (
                        <div key={comment.id} className="mb-2 border-b border-gray-700 pb-1">
                          <p className="text-cyan-400 font-medium">{comment.name}</p>
                          <p>{comment.content}</p>
                        </div>
                      ))}
                    </div>
                    <textarea
                      value={newComments[answer.id] || ''}
                      onChange={(e) =>
                        setNewComments((prev) => ({ ...prev, [answer.id]: e.target.value }))
                      }
                      placeholder="Add a comment..."
                      className="w-full p-2 rounded-lg bg-[#1f1f1f] border border-gray-700 text-white mb-2"
                    />
                    <button
                      onClick={() => handleAddComment(answer.id)}
                      className="px-4 py-1 bg-cyan-600 hover:bg-cyan-500 rounded-xl text-sm"
                    >
                      Submit Comment
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-md font-semibold text-cyan-300 mb-2">Your Answer</h3>
            <textarea
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full p-2 rounded-lg bg-[#1f1f1f] border border-gray-700 text-white"
            />
            <button
              onClick={handleAddAnswer}
              className="mt-2 px-4 py-1 bg-cyan-600 hover:bg-cyan-500 rounded-xl text-sm"
            >
              Submit Answer
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-400">Loading...</p>
      )}
    </div>
  );
};

export default Detail;

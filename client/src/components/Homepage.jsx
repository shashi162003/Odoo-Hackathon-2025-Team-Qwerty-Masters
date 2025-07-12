// Homepage.jsx
import React, { useState } from 'react';
import Navbar from './Navbar';
import { questions } from './data/questions';
import QuestionCard from './QuestionCard';

const Homepage = () => {
  const [posts] = useState(questions);

  return (
    <div className="min-h-screen bg-[#090909] text-white">

      <main className="pt-8 px-4">
        <h1 className="text-3xl font-bold text-center text-cyan-400 mb-6">Top Questions</h1>
        <div className="flex flex-col items-center gap-4">
          {posts.map((post) => (
            <QuestionCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Homepage;

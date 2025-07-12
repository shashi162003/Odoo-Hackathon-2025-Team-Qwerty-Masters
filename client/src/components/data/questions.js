// users.js
export const users = [
  { _id: 'u1', name: 'Bob', image: 'https://api.dicebear.com/7.x/thumbs/svg?seed=bob' },
  { _id: 'u2', name: 'Charlie', image: 'https://api.dicebear.com/7.x/thumbs/svg?seed=charlie' },
  { _id: 'u3', name: 'Kevin', image: 'https://api.dicebear.com/7.x/thumbs/svg?seed=kevin' },
  { _id: 'u4', name: 'Hannah', image: 'https://api.dicebear.com/7.x/thumbs/svg?seed=hannah' },
  { _id: 'u5', name: 'Fiona', image: 'https://api.dicebear.com/7.x/thumbs/svg?seed=fiona' },
  { _id: 'u6', name: 'Ian', image: 'https://api.dicebear.com/7.x/thumbs/svg?seed=ian' },
  { _id: 'u7', name: 'Julia', image: 'https://api.dicebear.com/7.x/thumbs/svg?seed=julia' },
  { _id: 'u8', name: 'Alice', image: 'https://api.dicebear.com/7.x/thumbs/svg?seed=alice' },
  { _id: 'u9', name: 'George', image: 'https://api.dicebear.com/7.x/thumbs/svg?seed=george' },
  { _id: 'u10', name: 'Ethan', image: 'https://api.dicebear.com/7.x/thumbs/svg?seed=ethan' },
  { _id: 'u11', name: 'Luna', image: 'https://api.dicebear.com/7.x/thumbs/svg?seed=luna' },
];

// tags.js
export const tags = [
  { _id: 't1', name: 'react' },
  { _id: 't2', name: 'javascript' },
  { _id: 't3', name: 'events' },
  { _id: 't4', name: 'useeffect' },
  { _id: 't5', name: 'performance' },
];

// answers.js
export const answers = [
  {
    _id: 'a1', user: 'u2', question: 'q2', answer: "This is a helpful answer about: why is my react useEffect running twice?",
    upvotes: ['u1', 'u3'],
  },
  {
    _id: 'a2', user: 'u4', question: 'q3', answer: "This is a helpful answer about: preventing default form submission.",
    upvotes: ['u5', 'u6'],
  },
  {
    _id: 'a3', user: 'u8', question: 'q4', answer: "map returns a new array, forEach does not.",
    upvotes: ['u3', 'u9'],
  },
  {
    _id: 'a4', user: 'u5', question: 'q5', answer: "Use lodash's `throttle` function or a custom timer.",
    upvotes: ['u7', 'u4'],
  },
  {
    _id: 'a5', user: 'u6', question: 'q6', answer: "Arrow functions do not have their own `this`, they use lexical `this`.",
    upvotes: ['u9', 'u10'],
  },
  {
    _id: 'a6', user: 'u5', question: 'q7', answer: "Use a cleanup function: `return () => clearTimeout(id)`.",
    upvotes: ['u4', 'u7'],
  },
  {
    _id: 'a7', user: 'u5', question: 'q8', answer: "localStorage persists data until manually cleared. sessionStorage clears on tab close.",
    upvotes: ['u2', 'u3'],
  },
  {
    _id: 'a8', user: 'u7', question: 'q9', answer: "Use `useEffect` + async function. Axios is fine too.",
    upvotes: ['u10', 'u5'],
  },
  {
    _id: 'a9', user: 'u10', question: 'q10', answer: "Closure is when a function remembers its lexical scope even when called outside.",
    upvotes: ['u7', 'u9'],
  },
];

// questions.js
export const questions = [
  {
    _id: 'q2', user: 'u1', title: "Why is my React useEffect running twice?", description: "I'm seeing useEffect logs twice in development. Is this a bug?",
    tags: ['t1', 't4'], image: 'https://api.dicebear.com/7.x/thumbs/svg?seed=bob', answers: ['a1'], upvotes: ['u3', 'u6'],
    createdAt: "2025-07-05T18:35:59.312Z",
  },
  {
    _id: 'q3', user: 'u3', title: "How to prevent default form submission in JavaScript?", description: "I use onSubmit in React but page reloads. How can I stop it?",
    tags: ['t1', 't2'], image: 'https://api.dicebear.com/7.x/thumbs/svg?seed=kevin', answers: ['a2'], upvotes: ['u1', 'u5'],
    createdAt: "2025-07-06T10:08:59.313Z",
  },
  {
    _id: 'q4', user: 'u7', title: "What's the difference between map and forEach?", description: "They both loop but which one returns a new array?",
    tags: ['t2'], image: 'https://api.dicebear.com/7.x/thumbs/svg?seed=julia', answers: ['a3'], upvotes: ['u3', 'u10'],
    createdAt: "2025-07-06T09:21:59.313Z",
  },
  {
    _id: 'q5', user: 'u3', title: "How can I throttle scroll events?", description: "I want to throttle scroll for performance reasons. What's the best way?",
    tags: ['t2', 't5'], image: 'https://api.dicebear.com/7.x/thumbs/svg?seed=kevin', answers: ['a4'], upvotes: ['u2', 'u4'],
    createdAt: "2025-07-07T22:37:59.313Z",
  },
  {
    _id: 'q6', user: 'u5', title: "Why does 'this' behave differently in arrow functions?", description: "I'm confused about how `this` works in regular vs arrow functions.",
    tags: ['t2'], image: 'https://api.dicebear.com/7.x/thumbs/svg?seed=daisy', answers: ['a5'], upvotes: ['u4', 'u6'],
    createdAt: "2025-07-08T11:47:59.313Z",
  },
];

export const questions = [
  {
    id: 2,
    title: "Why is my React useEffect running twice?",
    body: "I'm seeing useEffect logs twice in development. Is this a bug?",
    name: "Bob",
    image: "https://api.dicebear.com/7.x/thumbs/svg?seed=bob",
    views: 166,
    upvotes: 14,
    createdAt: "2025-07-05T18:35:59.312Z",
    answers: [
      {
        id: 1,
        name: "Charlie",
        image: "https://api.dicebear.com/7.x/thumbs/svg?seed=charlie",
        body: "This is a helpful answer about: why is my react useEffect running twice?",
        comments: [
          {
            id: 1,
            name: "Bob",
            image: "https://api.dicebear.com/7.x/thumbs/svg?seed=bob",
            content: "I agree with this answer, Charlie explained it well."
          },
          {
            id: 2,
            name: "Kevin",
            image: "https://api.dicebear.com/7.x/thumbs/svg?seed=kevin",
            content: "Can you give a code example to clarify?"
          }
        ]
      }
    ],
    comments: [
      {
        id: 1,
        name: "Bob",
        image: "https://api.dicebear.com/7.x/thumbs/svg?seed=bob",
        content: "Interesting question. I had the same doubt."
      }
    ]
  },
  {
    id: 3,
    title: "How to prevent default form submission in JavaScript?",
    body: "I use onSubmit in React but page reloads. How can I stop it?",
    name: "Kevin",
    image: "https://api.dicebear.com/7.x/thumbs/svg?seed=kevin",
    views: 80,
    upvotes: 10,
    createdAt: "2025-07-06T10:08:59.313Z",
    answers: [
      {
        id: 1,
        name: "Hannah",
        image: "https://api.dicebear.com/7.x/thumbs/svg?seed=hannah",
        body: "This is a helpful answer about: preventing default form submission.",
        comments: [
          {
            id: 1,
            name: "Fiona",
            image: "https://api.dicebear.com/7.x/thumbs/svg?seed=fiona",
            content: "I agree with this answer, Hannah explained it well."
          },
          {
            id: 2,
            name: "Ian",
            image: "https://api.dicebear.com/7.x/thumbs/svg?seed=ian",
            content: "Can you give a code example to clarify?"
          }
        ]
      }
    ],
    comments: [
      {
        id: 1,
        name: "Fiona",
        image: "https://api.dicebear.com/7.x/thumbs/svg?seed=fiona",
        content: "Interesting question. I had the same doubt."
      }
    ]
  },
  {
    id: 4,
    title: "What's the difference between map and forEach?",
    body: "They both loop but which one returns a new array?",
    name: "Julia",
    image: "https://api.dicebear.com/7.x/thumbs/svg?seed=julia",
    views: 184,
    upvotes: 19,
    createdAt: "2025-07-06T09:21:59.313Z",
    answers: [
      {
        id: 1,
        name: "Alice",
        image: "https://api.dicebear.com/7.x/thumbs/svg?seed=alice",
        body: "map returns a new array, forEach does not.",
        comments: [
          {
            id: 1,
            name: "Kevin",
            image: "https://api.dicebear.com/7.x/thumbs/svg?seed=kevin",
            content: "I agree with this answer, Alice explained it well."
          },
          {
            id: 2,
            name: "George",
            image: "https://api.dicebear.com/7.x/thumbs/svg?seed=george",
            content: "Can you give a code example to clarify?"
          }
        ]
      }
    ],
    comments: [
      {
        id: 1,
        name: "Kevin",
        image: "https://api.dicebear.com/7.x/thumbs/svg?seed=kevin",
        content: "Interesting question. I had the same doubt."
      }
    ]
  },
  {
    id: 5,
    title: "How can I throttle scroll events?",
    body: "I want to throttle scroll for performance reasons. What's the best way?",
    name: "Kevin",
    image: "https://api.dicebear.com/7.x/thumbs/svg?seed=kevin",
    views: 105,
    upvotes: 20,
    createdAt: "2025-07-07T22:37:59.313Z",
    answers: [
      {
        id: 1,
        name: "Daisy",
        image: "https://api.dicebear.com/7.x/thumbs/svg?seed=daisy",
        body: "Use lodash's `throttle` function or a custom timer.",
        comments: [
          {
            id: 1,
            name: "Julia",
            image: "https://api.dicebear.com/7.x/thumbs/svg?seed=julia",
            content: "I agree with this answer, Daisy explained it well."
          },
          {
            id: 2,
            name: "Hannah",
            image: "https://api.dicebear.com/7.x/thumbs/svg?seed=hannah",
            content: "Can you give a code example to clarify?"
          }
        ]
      }
    ],
    comments: [
      {
        id: 1,
        name: "Julia",
        image: "https://api.dicebear.com/7.x/thumbs/svg?seed=julia",
        content: "Interesting question. I had the same doubt."
      }
    ]
  },
  {
    id: 6,
    title: "Why does 'this' behave differently in arrow functions?",
    body: "I'm confused about how `this` works in regular vs arrow functions.",
    name: "Daisy",
    image: "https://api.dicebear.com/7.x/thumbs/svg?seed=daisy",
    views: 217,
    upvotes: 16,
    createdAt: "2025-07-08T11:47:59.313Z",
    answers: [
      {
        id: 1,
        name: "Ian",
        image: "https://api.dicebear.com/7.x/thumbs/svg?seed=ian",
        body: "Arrow functions do not have their own `this`, they use lexical `this`.",
        comments: [
          {
            id: 1,
            name: "George",
            image: "https://api.dicebear.com/7.x/thumbs/svg?seed=george",
            content: "I agree with this answer, Ian explained it well."
          },
          {
            id: 2,
            name: "Ethan",
            image: "https://api.dicebear.com/7.x/thumbs/svg?seed=ethan",
            content: "Can you give a code example to clarify?"
          }
        ]
      }
    ],
    comments: [
      {
        id: 1,
        name: "George",
        image: "https://api.dicebear.com/7.x/thumbs/svg?seed=george",
        content: "Interesting question. I had the same doubt."
      }
    ]
  },
  {
    id: 7,
    title: "How to clear timeout in useEffect?",
    body: "I’m using setTimeout in useEffect, but how to clean it up properly?",
    name: "Bob",
    image: "https://api.dicebear.com/7.x/thumbs/svg?seed=bob",
    views: 234,
    upvotes: 26,
    createdAt: "2025-07-06T14:26:59.313Z",
    answers: [
      {
        id: 1,
        name: "Fiona",
        image: "https://api.dicebear.com/7.x/thumbs/svg?seed=fiona",
        body: "Use a cleanup function: `return () => clearTimeout(id)`.",
        comments: [
          {
            id: 1,
            name: "Hannah",
            image: "https://api.dicebear.com/7.x/thumbs/svg?seed=hannah",
            content: "I agree with this answer, Fiona explained it well."
          },
          {
            id: 2,
            name: "Julia",
            image: "https://api.dicebear.com/7.x/thumbs/svg?seed=julia",
            content: "Can you give a code example to clarify?"
          }
        ]
      }
    ],
    comments: [
      {
        id: 1,
        name: "Hannah",
        image: "https://api.dicebear.com/7.x/thumbs/svg?seed=hannah",
        content: "Interesting question. I had the same doubt."
      }
    ]
  },
  {
    id: 8,
    title: "Difference between localStorage and sessionStorage?",
    body: "Which one should I use to persist user data across tabs?",
    name: "Ian",
    image: "https://api.dicebear.com/7.x/thumbs/svg?seed=ian",
    views: 108,
    upvotes: 25,
    createdAt: "2025-07-08T22:29:59.313Z",
    answers: [
      {
        id: 1,
        name: "Daisy",
        image: "https://api.dicebear.com/7.x/thumbs/svg?seed=daisy",
        body: "localStorage persists data until manually cleared. sessionStorage clears on tab close.",
        comments: [
          {
            id: 1,
            name: "Charlie",
            image: "https://api.dicebear.com/7.x/thumbs/svg?seed=charlie",
            content: "I agree with this answer, Daisy explained it well."
          },
          {
            id: 2,
            name: "Kevin",
            image: "https://api.dicebear.com/7.x/thumbs/svg?seed=kevin",
            content: "Can you give a code example to clarify?"
          }
        ]
      }
    ],
    comments: [
      {
        id: 1,
        name: "Charlie",
        image: "https://api.dicebear.com/7.x/thumbs/svg?seed=charlie",
        content: "Interesting question. I had the same doubt."
      }
    ]
  },
  {
    id: 9,
    title: "How to make API calls in React the right way?",
    body: "Should I use fetch, axios, or useEffect with async?",
    name: "Hannah",
    image: "https://api.dicebear.com/7.x/thumbs/svg?seed=hannah",
    views: 64,
    upvotes: 16,
    createdAt: "2025-07-11T15:39:59.313Z",
    answers: [
      {
        id: 1,
        name: "Julia",
        image: "https://api.dicebear.com/7.x/thumbs/svg?seed=julia",
        body: "Use `useEffect` + async function. Axios is fine too.",
        comments: [
          {
            id: 1,
            name: "Ethan",
            image: "https://api.dicebear.com/7.x/thumbs/svg?seed=ethan",
            content: "I agree with this answer, Julia explained it well."
          },
          {
            id: 2,
            name: "Fiona",
            image: "https://api.dicebear.com/7.x/thumbs/svg?seed=fiona",
            content: "Can you give a code example to clarify?"
          }
        ]
      }
    ],
    comments: [
      {
        id: 1,
        name: "Ethan",
        image: "https://api.dicebear.com/7.x/thumbs/svg?seed=ethan",
        content: "Interesting question. I had the same doubt."
      }
    ]
  },
  {
    id: 10,
    title: "What is closure in JavaScript?",
    body: "Still don’t understand how closures work. Can someone simplify it?",
    name: "Luna",
    image: "https://api.dicebear.com/7.x/thumbs/svg?seed=luna",
    views: 164,
    upvotes: 13,
    createdAt: "2025-07-08T01:05:59.313Z",
    answers: [
      {
        id: 1,
        name: "Ethan",
        image: "https://api.dicebear.com/7.x/thumbs/svg?seed=ethan",
        body: "Closure is when a function remembers its lexical scope even when called outside.",
        comments: [
          {
            id: 1,
            name: "Julia",
            image: "https://api.dicebear.com/7.x/thumbs/svg?seed=julia",
            content: "I agree with this answer, Ethan explained it well."
          },
          {
            id: 2,
            name: "George",
            image: "https://api.dicebear.com/7.x/thumbs/svg?seed=george",
            content: "Can you give a code example to clarify?"
          }
        ]
      }
    ],
    comments: [
      {
        id: 1,
        name: "Julia",
        image: "https://api.dicebear.com/7.x/thumbs/svg?seed=julia",
        content: "Interesting question. I had the same doubt."
      }
    ]
  }
];

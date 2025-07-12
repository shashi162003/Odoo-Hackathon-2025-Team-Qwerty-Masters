const express = require('express');
const { createQuestion, getQuestions, getQuestionsbyId, deleteQuestion, upvoteQuestion, downvoteQuestion } = require('../controllers/questions');
const authMiddleware = require('../middlewares/authMiddleware');
const questionRouter = express.Router();

questionRouter.post('/createQuestion', authMiddleware, createQuestion);
questionRouter.get('/getQuestions', getQuestions);
questionRouter.get('/getQuestions/:id', getQuestionsbyId);
questionRouter.post('/deleteQuestions/:id', authMiddleware, deleteQuestion);
questionRouter.post('/upvoteQuestions/:id', authMiddleware, upvoteQuestion);
questionRouter.post('/downvoteQuestions/:id', authMiddleware, downvoteQuestion);

module.exports = questionRouter;
const express = require('express');
const { createQuestion, getQuestions, getQuestionsbyId, deleteQuestion } = require('../controllers/questions');
const authMiddleware = require('../middlewares/authMiddleware');
const questionRouter = express.Router();

questionRouter.post('/createQuestion', authMiddleware, createQuestion);
questionRouter.get('/getQuestions', getQuestions);
questionRouter.get('/getQuestions/:id', getQuestionsbyId);
questionRouter.post('/deleteQuestions/:id', authMiddleware, deleteQuestion);

module.exports = questionRouter;
const answerRouter = require('express').Router();
const { addAnswer, getAnswersByQuestion, updateAnswer, deleteAnswer, upvoteAnswer, downvoteAnswer } = require('../controllers/answer');
const authMiddleware = require('../middlewares/authMiddleware');

answerRouter.post('/addAnswer', authMiddleware, addAnswer);
answerRouter.post('/updateAnswer/:answerId', authMiddleware, updateAnswer);
answerRouter.get('/getAnswers/:questionId', getAnswersByQuestion);
answerRouter.post('/deleteAnswer/:answerId', authMiddleware, deleteAnswer);
answerRouter.post('/upvoteAnswer/:answerId', authMiddleware, upvoteAnswer);
answerRouter.post('/downvoteAnswer/:answerId', authMiddleware, downvoteAnswer);

module.exports = answerRouter;
const { getProfile, updateProfile } = require('../controllers/profile');
const authMiddleware = require('../middlewares/authMiddleware');

const profileRouter = require('express').Router();

profileRouter.get('/getProfile/:id', getProfile);
profileRouter.post('/updateProfile/:id', authMiddleware, updateProfile);

module.exports = profileRouter;
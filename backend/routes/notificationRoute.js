const express = require('express');
const notificationRouter = express.Router();
const Notification = require('../models/Notification');
const authMiddleware = require('../middlewares/authMiddleware');
const { markAsRead } = require('../controllers/notificationController');

notificationRouter.get('/getNotifications', authMiddleware, async (req, res) => {
    const userId = req.user.id;
    try {
        const notifications = await Notification.find({ recipient: userId })
            .populate('question', 'title')
            .populate('answer', 'answer')
            .populate('user', 'name');
        res.json({ success: true, notifications });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

notificationRouter.post('/markAsRead/:notificationId', authMiddleware, markAsRead);

module.exports = notificationRouter;

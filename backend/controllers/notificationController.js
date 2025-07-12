const Notification = require('../models/Notification');

const markAsRead = async (req, res) => {
    const notificationId = req.body;
    try {
        await Notification.findByIdAndUpdate(notificationId, { read: true });
        res.json({ success: true, message: 'Notification marked as read' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports = {
    markAsRead
};
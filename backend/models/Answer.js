const mongoose = require('mongoose');


const answerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    answer: {
        type: String,
        required: true,
        trim: true,
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
    },
    upvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    moderationStatus: {
        type: String,
        enum: ['pending', 'approved', 'flagged'],
        default: 'pending',
    }
}, {
    timestamps: true,
});
module.exports = mongoose.model('Answer', answerSchema);
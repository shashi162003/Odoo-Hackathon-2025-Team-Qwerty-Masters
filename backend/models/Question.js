const mongoose = require('mongoose');


const questionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
        required: true,
    }],
    image: {
        type: String,
    },
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer',
    }],
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

module.exports = mongoose.model('Question', questionSchema);
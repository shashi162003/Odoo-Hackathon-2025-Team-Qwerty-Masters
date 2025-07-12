const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
    },
    name: {
        type: String,
        required: true,
        trim: true,
    }
})

module.exports = mongoose.model('Tag', tagSchema);
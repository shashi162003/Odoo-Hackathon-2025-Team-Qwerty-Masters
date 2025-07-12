const Question = require('../models/Question');
const Answer = require('../models/Answer');
const User = require('../models/User');
const Notification = require('../models/Notification');

exports.addAnswer = async (req, res) => {
    const id = req.user.id;
    const { answer, questionId } = req.body;
    try {
        if(!id){
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }
        if(!answer || !questionId) {
            return res.status(400).json({
                success: false,
                message: 'Answer and question ID are required'
            });
        }
        const newAnswer = new Answer({
            answer,
            question: questionId,
            user: id
        });
        await newAnswer.save();
        await Question.findByIdAndUpdate(questionId, {
            $push: { answers: newAnswer._id }
        });
        await User.findByIdAndUpdate(id, {
            $push: { answers: newAnswer._id }
        });
        const Notification = require('../models/Notification');
        const question = await Question.findById(questionId);
        if (question && question.user.toString() !== id) {
            await Notification.create({
                recipient: question.user,
                question: questionId,
                answer: newAnswer._id,
                user: id
            });
        }
        return res.status(201).json({
            success: true,
            message: 'Answer added successfully',
            answer: newAnswer
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

exports.getAnswersByQuestion = async (req, res) => {
    const questionId = req.params.questionId;
    try {
        const answers = await Answer.find({ question: questionId })
            .populate('user', 'name')
            .sort({ createdAt: -1 });
        if (!answers || answers.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No answers found for this question'
            });
        }
        return res.status(200).json({
            success: true,
            answers
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

exports.updateAnswer = async (req, res) => {
    const { answerId } = req.params;
    const { answer } = req.body;
    try {
        const updatedAnswer = await Answer.findByIdAndUpdate(answerId, { answer }, { new: true });
        if (!updatedAnswer) {
            return res.status(404).json({
                success: false,
                message: 'Answer not found'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Answer updated successfully',
            answer: updatedAnswer
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

exports.deleteAnswer = async (req, res) => {
    const { answerId } = req.params;
    try {
        const deletedAnswer = await Answer.findByIdAndDelete(answerId);
        if (!deletedAnswer) {
            return res.status(404).json({
                success: false,
                message: 'Answer not found'
            });
        }
        await Question.findByIdAndUpdate(deletedAnswer.question, {
            $pull: { answers: answerId }
        });
        await User.findByIdAndUpdate(deletedAnswer.user, {
            $pull: { answers: answerId }
        });
        return res.status(200).json({
            success: true,
            message: 'Answer deleted successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

exports.upvoteAnswer = async (req, res) => {
    const {answerId} = req.body;
    const userId = req.user.id;
    try {
        const answer = await Answer.findById(answerId);
        if (!answer) {
            return res.status(404).json({
                success: false,
                message: 'Answer not found'
            });
        }
        answer.upvotes.push(userId);
        await answer.save();
        return res.status(200).json({
            success: true,
            message: 'Answer upvoted successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

exports.downvoteAnswer = async (req, res) => {
    const {answerId} = req.body;
    const userId = req.user.id;
    try {
        const answer = await Answer.findById(answerId);
        if (!answer) {
            return res.status(404).json({
                success: false,
                message: 'Answer not found'
            });
        }
        answer.upvotes.pull(userId);
        await answer.save();
        return res.status(200).json({
            success: true,
            message: 'Answer downvoted successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}
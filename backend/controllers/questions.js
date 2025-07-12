const Question = require('../models/Question');
const User = require('../models/User');
const Tag = require('../models/Tag');
const cloudinary = require("cloudinary").v2;

exports.createQuestion = async (req, res) => {
    const { title, description, tags } = req.body;
    try {
        if (!title || !description || !tags) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        let imageUrl = req.body.imageUrl || '';
        const tagIds = [];
        let tagsArray = tags;
        for (const tagName of tags.map(tag => tag.trim().toLowerCase())) {
            let tagDoc = await Tag.findOne({ name: tagName });
            if (!tagDoc) {
                tagDoc = await Tag.create({ name: tagName });
            }
            tagIds.push(tagDoc._id);
        }
        const question = new Question({
            title,
            description,
            tags: tagIds,
            image: imageUrl,
        });
        await question.save();
        if (req.user && req.user.id) {
            await User.findByIdAndUpdate(
                req.user.id,
                {
                    $push: {
                        questions: question._id,
                        tags: { $each: tagIds }
                    }
                }
            );
        }
        return res.status(201).json({
            success: true,
            message: 'Question created successfully'
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

exports.getQuestions = async (req, res) => {
    try {
        const questions = await Question.find()
            .populate('user', 'name')
            .populate('tags', 'name')
            .sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            questions
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

exports.getQuestionsbyId = async (req, res) => {
    const { id } = req.params;
    try {
        const question = await Question.findById(id)
            .populate('user', 'name')
            .populate('tags', 'name');
        if (!question) {
            return res.status(404).json({
                success: false,
                message: 'Question not found'
            });
        }
        return res.status(200).json({
            success: true,
            question
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

exports.deleteQuestion = async (req, res) => {
    const { id } = req.params;
    try {
        const question = await Question.findById(id);
        if (!question) {
            return res.status(404).json({
                success: false,
                message: 'Question not found'
            });
        }
        await Question.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: 'Question deleted successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

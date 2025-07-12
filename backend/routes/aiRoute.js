const express = require('express');
const router = express.Router();
const { moderateContent, generateAnswer, summarizeQuestion, suggestTags } = require('../services/aiFeatures');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/moderate', authMiddleware, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    const { content, type, id } = req.body;
    try {
        const result = await moderateContent(content);
        let flagged = false;
        if (result.flagged) {
            flagged = true;
            if (type === 'question') {
                const Question = require('../models/Question');
                await Question.findByIdAndUpdate(id, { moderationStatus: 'flagged' });
            } else if (type === 'answer') {
                const Answer = require('../models/Answer');
                await Answer.findByIdAndUpdate(id, { moderationStatus: 'flagged' });
            }
        }
        res.json({ success: true, result, flagged });
    } catch (err) {
        res.status(500).json({ success: false, message: 'AI moderation failed', error: err.message });
    }
});

router.post('/generate-answer', authMiddleware, async (req, res) => {
    const { question } = req.body;
    try {
        const answer = await generateAnswer(question);
        res.json({ success: true, answer });
    } catch (err) {
        res.status(500).json({ success: false, message: 'AI answer generation failed', error: err.message });
    }
});

router.post('/summarize', authMiddleware, async (req, res) => {
    const { question } = req.body;
    try {
        const summary = await summarizeQuestion(question);
        res.json({ success: true, summary });
    } catch (err) {
        res.status(500).json({ success: false, message: 'AI summarization failed', error: err.message });
    }
});

router.post('/suggest-tags', authMiddleware, async (req, res) => {
    const { question } = req.body;
    try {
        const tags = await suggestTags(question);
        res.json({ success: true, tags });
    } catch (err) {
        res.status(500).json({ success: false, message: 'AI tag suggestion failed', error: err.message });
    }
});

module.exports = router;

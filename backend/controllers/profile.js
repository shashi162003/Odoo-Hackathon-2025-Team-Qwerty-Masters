const User = require('../models/User');
const Question = require('../models/Question');
const Answer = require('../models/Answer');

exports.getProfile = async (req, res) => {
    const id = req.params.id;
    try{
        const user = await User.findById(id).populate('questions', 'title').populate('answers', 'answer');
        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        return res.status(200).json({
            success: true,
            user
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

exports.updateProfile = async (req, res) => {
    const {id} = req.params;
    const {firstName, lastName, gender, email} = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, {
            firstName,
            lastName,
            gender,
            email
        }, { new: true });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}
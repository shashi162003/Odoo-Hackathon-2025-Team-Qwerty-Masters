const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const {firstName, lastName, role, gender, email, password, confirmPassword} = req.body;

    try{
        if(!firstName || !lastName || !role || !gender || !email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all the fields'
            });
        }
        if(password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Passwords do not match'
            });
        }
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }
        const genSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, genSalt);
        const avatar = `https://api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName}`;
        const newUser = new User({
            firstName,
            lastName,
            role,
            gender,
            email,
            password: hashedPassword,
            avatar           
        })
        await newUser.save();
        const token = jwt.sign({id: newUser._id, newUser}, process.env.JWT_SECRET, {expiresIn: '1d'});
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        })
        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            newUser
        })
    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

exports.login = async (req, res) => {
    const {email, password} = req.body;

    try{
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all the fields'
            });
        }
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User does not exist'
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        const token = jwt.sign({id: user._id, user}, process.env.JWT_SECRET, {expiresIn: '1d'});
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        return res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user
        });
    }
    catch(error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}
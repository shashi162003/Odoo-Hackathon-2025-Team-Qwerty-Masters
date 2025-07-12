const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
    otp: [{
        type: String,
        required: true,
    }]
})

const OTP = mongoose.model('OTP', OtpSchema);
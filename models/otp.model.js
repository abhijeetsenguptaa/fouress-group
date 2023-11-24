const mongoose = require('mongoose');


const otpSchema = new mongoose.Schema({
    phoneNumber: String,
    otp: String
}, {
    versionKey: false
})

const OtpModel = mongoose.model('otp', otpSchema);

module.exports = OtpModel;
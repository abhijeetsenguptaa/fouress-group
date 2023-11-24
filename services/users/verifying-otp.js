const bcrypt = require('bcrypt');
const OtpModel = require("../../models/otp.model");
const UserModel = require("../../models/user.model");
const generateToken = require("../../utils/generateToken");


async function verifyingOTPService(phoneNumber, otp) {
    try {
        // Find the user by phone number
        const user = await UserModel.findOne({ phoneNumber });
        
        if (!user) {
            return {
                status: false,
                message: 'User not found.'
            };
        }

        const id = user._id;

        // Find the OTP record by phone number
        const otpSearch = await OtpModel.findOne({ phoneNumber });

        if (!otpSearch) {
            return {
                status: false,
                message: 'OTP record not found.'
            };
        }

        // Compare the provided OTP with the stored hashed OTP
        const isOtpValid = await bcrypt.compare(otp, otpSearch.otp);

        if (isOtpValid) {
            // If OTP is valid, generate a token and return success
            const token = generateToken(id);
            return {
                status: true,
                message: 'OTP Verified Successfully.',
                token: token
            };
        } else {
            // If OTP is invalid, return failure
            return {
                status: false,
                message: 'Invalid OTP.'
            };
        }
    } catch (error) {
        return {
            status: false,
            error: error.message,
        };
    }
}


module.exports = verifyingOTPService;
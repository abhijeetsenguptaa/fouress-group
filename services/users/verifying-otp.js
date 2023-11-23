const UserModel = require("../../models/user.model");
const generateToken = require("../../utils/generateToken");

async function verifyingOTP(phoneNumber, otp, authOTP) {
    try {
        const user = await UserModel.findOne({ phoneNumber });
        const id = user._id;
        if (otp === authOTP) {
            const token = generateToken(id);
            return {
                status: true,
                message: 'OTP Verified Successfully.',
                token: token
            }
        }

        return {
            status: false,
            message: 'Invalid OTP.'
        }
    } catch (error) {
        return {
            status: false,
            error: error.message,
        };
    }
}

module.exports = verifyingOTP;
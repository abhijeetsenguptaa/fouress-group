const UserModel = require("../../models/user.model");
const generateOTP = require("../../utils/generate-otp");
const isValidPhoneNumber = require("../../utils/validate-number");

async function phoneNumberLogin(phoneNumber) {
    try {
        // Validate phone number (must be exactly 10 digits)
        if (!isValidPhoneNumber(phoneNumber)) {
            throw new Error('Invalid phone number. Please enter a 10-digit number.');
        }

        const isUser = await UserModel.findOne({ phoneNumber });

        const otp = generateOTP();

        if (isUser) {
            return {
                status: true,
                otp: otp,
            };
        }

        const user = new UserModel({ phoneNumber: phoneNumber });
        await user.save();

        return {
            status: true,
            otp: otp,
        };
    } catch (error) {
        return {
            status: false,
            error: error.message,
        };
    }
}


module.exports = phoneNumberLogin;
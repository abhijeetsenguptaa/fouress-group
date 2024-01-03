const OtpModel = require("../../models/otp.model");
const UserModel = require("../../models/user.model");
const bcrypt = require("bcrypt");
const generateOTP = require("../../utils/generate-otp");
const isValidPhoneNumber = require("../../utils/validate-number");

async function phoneNumberLoginService(phoneNumber) {
    try {
        // Validate phone number (must be exactly 10 digits)
        if (!isValidPhoneNumber(phoneNumber)) {
            throw new Error('Invalid phone number. Please enter a 10-digit number.');
        }

        const isUser = await UserModel.findOne({ phoneNumber });

        const otp = "000000";
        const hashOTP = await bcrypt.hash(otp, 6);

        const otpNumberAvailable = await OtpModel.findOne({ phoneNumber });
        if (otpNumberAvailable) {
            otpNumberAvailable.otp = hashOTP;
            await otpNumberAvailable.save();
        }else{
            const otpSave = new OtpModel({ phoneNumber, otp: hashOTP });
            await otpSave.save();
        }

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


module.exports = phoneNumberLoginService;
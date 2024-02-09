const OtpModel = require("../../models/otp.model");
const UserModel = require("../../models/user.model");

async function PostUsers(id, name, email, pincode, emailOtp, userToken) {
    try {
        // Find the user by id
        const user = await UserModel.findById(id);

        // If user is not found, return an error
        if (!user) {
            return {
                status: false,
                message: "User not found"
            };
        }

        const phoneNumber = user.phoneNumber;

        // Find the OTP for the user's phone number
        const emailOTPSetter = await OtpModel.findOne({ phoneNumber: phoneNumber });

        // If no OTP is found, or OTP doesn't match, return an error
        if (!emailOTPSetter || emailOTPSetter.emailOTP !== emailOtp) {
            return {
                status: false,
                message: "Invalid email OTP"
            };
        }

        // Update the user with the provided name, email, and pincode
        user.name = name;
        user.email = email;
        user.isVerified = true;
        user.pincode = pincode;
        user.userToken = userToken;
        // Save the updated user
        await user.save();

        // Delete the OTP from the OTP table
        await OtpModel.deleteOne({ phoneNumber: phoneNumber });

        // Return success
        return {
            status: true,
            message: "User updated successfully"
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = PostUsers;

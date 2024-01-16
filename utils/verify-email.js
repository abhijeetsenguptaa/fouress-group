const UserModel = require("../models/user.model");

async function VerifyingEmailUtils(id, emailID) {
    try {
        const user = await UserModel.findById(id);

        if (!user) {
            return {
                status: false,
                message: "User not found!"
            };
        }

        let email = user.email;

        if (!email) {
            // If user's email is not available, use the provided emailID
            email = emailID;

            if (!email || !isValidEmail(email)) {
                return {
                    status: false,
                    message: "Invalid email address!"
                };
            }

            // Update the user's email in the database
            await UserModel.findByIdAndUpdate(id, { email });
        } else if (!isValidEmail(email)) {
            return {
                status: false,
                message: "Invalid user email address!"
            };
        }

        // Continue with the rest of your logic if the email is valid

        return {
            status: true,
            message: "Email verification successful!"
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

function isValidEmail(email) {
    // Regular expression for basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

module.exports = VerifyingEmailUtils;

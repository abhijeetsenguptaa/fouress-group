const getUsers = require("../services/users/get-users");
const phoneNumberLoginService = require("../services/users/phone-number-register-login");
const PostUsers = require("../services/users/post-users");
const verifyingOTPService = require("../services/users/verifying-otp");

async function fetchingUsers(req, res) {
    try {
        const users = await getUsers();

        if (users.status) {
            return res.status(200).json({
                status: users.status,
                count: users.count,
                message: users.message,
                data: users.data
            })
        }

        return res.status(404).json({
            status: users.status,
            message: users.message
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

async function loggingInWithPhone(req, res) {
    try {
        const { phoneNumber } = req.body;

        const phone = await phoneNumberLoginService(phoneNumber);

        if (phone.status) {
            return res.status(200).json({
                status: phone.status,
                otp: phone.otp,
                message: 'OTP sent successfully.',
            });
        } else {
            return res.status(400).json({
                status: phone.status,
                error: phone.error || 'Error sending OTP.',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            error: 'Internal server error.',
        });
    }
}

async function otpVerification(req, res) {
    try {
        const { phoneNumber, otp } = req.body;

        const verification = await verifyingOTPService(phoneNumber, otp);

        if (verification.status) {
            return res.status(200).json({
                status: verification.status,
                message: verification.message,
                token: verification.token
            })
        } else {
            return res.status(404).json({
                status: verification.status,
                message: verification.message
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            error: 'Internal server error.',
        });
    }
}

async function fillNameAndEmail(req, res) {
    try {
        const id = req.userID;
        const { name, email, pincode } = req.body;

        const fillNameAndEmail = await PostUsers(id,name,email,pincode);

        return res.status(fillNameAndEmail.status? 200: 404).json({
            status: fillNameAndEmail.status,
            message: fillNameAndEmail.message
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            error: 'Internal server error.',
        });
    }
}

module.exports = { fetchingUsers, loggingInWithPhone, otpVerification, fillNameAndEmail }
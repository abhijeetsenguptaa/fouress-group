const getUsers = require("../services/users/get-users");
const phoneNumberLogin = require("../services/users/phone-number-register-login");
const verifyingOTP = require("../services/users/verifying-otp");

async function fetchingUsers(req, res) {
    try {
        const users = await getUsers();
        console.log(users);
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

        const phone = await phoneNumberLogin(phoneNumber);

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
        const authOTP = req.headers.otp;

        const verification = await verifyingOTP(phoneNumber, otp, authOTP);

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

module.exports = { fetchingUsers, loggingInWithPhone, otpVerification }
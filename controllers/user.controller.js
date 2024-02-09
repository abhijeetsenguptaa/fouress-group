const EditUserDetailService = require("../services/users/EditUserDetailService");
const getUsers = require("../services/users/get-users");
const phoneNumberLoginService = require("../services/users/phone-number-register-login");
const PostUsers = require("../services/users/post-users");
const SpecificUserService = require("../services/users/specificUserService");
const verifyingOTPService = require("../services/users/verifying-otp");
const SharingEmailOTPUtils = require("../utils/SharingEmailOTPUtils");

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
        const { phoneNumber, role } = req.body;

        const phone = await phoneNumberLoginService(phoneNumber, role);

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
        const { name, email, emailOTP, userToken } = req.body;
        let pincode = null;
        const fillNameAndEmail = await PostUsers(id, name, email, pincode, emailOTP, userToken);

        return res.status(fillNameAndEmail.status ? 200 : 404).json({
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

async function specificUserController(req, res) {
    try {
        const id = req.userID;
        const user = await SpecificUserService(id);

        return res.status(user.status ? 200 : 404).json({
            status: user.status,
            message: user.message,
            data: user.status ? user.data : null
        })
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

async function editUserDetailsController(req, res) {
    try {
        const id = req.userID;

        const { name, companyName, ceoName, websiteName, email, phoneNumber, password, pincode, city, state, address, alternateNumber, alternateEmail, GSTIN, cin, tan, pan, dgftCode } = req.body;

        const editedData = await EditUserDetailService(id, name, companyName, ceoName, websiteName, email, phoneNumber, password, pincode, city, state, address, alternateNumber, alternateEmail, GSTIN, cin, tan, pan, dgftCode
        );

        return res.status(editedData.status ? 200 : 404).json({
            status: editedData.status,
            message: editedData.message,
            data: editedData.status ? editedData.data : null
        })
    } catch (error) {

    }
}


async function sendingOTPEmail(req, res) {
    try {
        const { name, email } = req.body;
        const userID = req.userID;

        const requiredData = await SharingEmailOTPUtils(userID, name, email);

        return res.status(requiredData.status ? 200 : 404).json({
            status: requiredData.status,
            message: requiredData.message,
            otp: requiredData.otp
        })
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = { fetchingUsers, loggingInWithPhone, otpVerification, fillNameAndEmail, specificUserController, editUserDetailsController, sendingOTPEmail };
require('dotenv').config();
const OtpModel = require("../../models/otp.model");
const UserModel = require("../../models/user.model");
const bcrypt = require("bcrypt");
const generateOTP = require("../../utils/generate-otp");
const isValidPhoneNumber = require("../../utils/validate-number");

const twilio = require('twilio');
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

async function phoneNumberLoginService(phoneNumber, role) {
    try {
        // Validate phone number (must be exactly 10 digits)
        if (!isValidPhoneNumber(phoneNumber)) {
            throw new Error('Invalid phone number. Please enter a 10-digit number.');
        }

        // Check if the user with the given phone number already exists
        const isUser = await UserModel.findOne({ phoneNumber });

        // Generate OTP
        const otp = generateOTP();

        const fetch = require('node-fetch');

        const url = 'https://api.brevo.com/v3/transactionalSMS/sms';
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                'api-key': process.env.brevo_api_key
            },
            body: JSON.stringify({
                type: 'transactional',
                unicodeEnabled: false,
                sender: 'FOUR',
                recipient: '7079680008',
                content: `Your otp is login is ${otp}.`
            })
        };

        fetch(url, options)
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(err => console.error('error:' + err));
        // const fetch = require('node-fetch');

        // const url = `https://wati_api_endpoint/api/v1/sendTemplateMessage?whatsappNumber=${phoneNumber}`;
        // const options = {
        //     method: 'POST',
        //     headers: { 'content-type': 'text/json' },
        //     body: JSON.stringify({
        //         broadcast_name: 'fouress_group',
        //         parameters: [{ name: 'otp', value: otp }],
        //         template_name: 'otp_sender'
        //     })
        // };

        // fetch(url, options)
        //     .then(res => res.json())
        //     .then(json => console.log(json))
        //     .catch(err => console.error('error:' + err));
        // Send OTP via Twilio
        await twilioClient.messages.create({
            from: '+13237035099',
            to: '+91'+ phoneNumber,
            body: `Your OTP is: ${otp}`
        });

        // Hash OTP before saving to the database
        const hashOTP = await bcrypt.hash(otp, 10);

        // Save OTP in the database
        const otpRecord = await OtpModel.findOne({ phoneNumber });
        if (otpRecord) {
            otpRecord.otp = hashOTP;
            await otpRecord.save();
        } else {
            const newOtpRecord = new OtpModel({ phoneNumber, otp: hashOTP });
            await newOtpRecord.save();
        }

        // If the user exists, return success and the OTP
        if (isUser) {
            return {
                status: true,
                otp: otp,
            };
        }

        // If the user doesn't exist, create a new user
        const newUser = new UserModel({ phoneNumber: phoneNumber, role });
        await newUser.save();

        return {
            status: true,
            otp: otp,
        };
    } catch (error) {
        // If an error occurs, return failure and the error message
        return {
            status: false,
            error: error.message,
        };
    }
}

module.exports = phoneNumberLoginService;

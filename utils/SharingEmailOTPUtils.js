const generateOTP = require('./generate-otp');
const UserModel = require('../models/user.model');
const OtpModel = require('../models/otp.model');
const fetch = require('node-fetch');
require('dotenv').config();

async function SharingEmailOTPUtils(userID, username, email) {
  try {
    const user = await UserModel.findById(userID);
    const phoneSearch = await OtpModel.findOne({ phoneNumber: user.phoneNumber });

    if (!phoneSearch) {
      // Handle the case where no record is found based on the phone number
      return {
        status: false,
        message: 'Phone number not found for the user.'
      };
    }

    const otp = generateOTP();
    phoneSearch.emailOTP = otp;
    await phoneSearch.save();

    const url = 'https://api.brevo.com/v3/smtp/email';
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': process.env.brevo_api_key
      },
      body: JSON.stringify({
        sender: { name: 'Fouress Group', email: 'no-reply@fouressgroup.com' },
        bcc: [{ email, name: username }],
        htmlContent: `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="style.css" />
            <title>Browser</title>
            <style>
              body {
                display: flex;
                height: 100vh;
                margin: 0;
              }
              .container {
                background-color: rgb(233, 243, 247);
                font-family: Monospace;
              }
              .header {
                background-color: rgb(214, 238, 238);
                padding: 1%;
                font-weight: bold;
                font-size: 40px;
              }
              .content {
                padding: 2%;
              }
              .confirmation-code {
                border-radius: 10px;
                border: 1px solid black;
                text-align: center;
                display: inline-block;
                padding: 10px;
                letter-spacing: 10px;
              }
            </style>
          </head>
        
          <body>
            <div class="container">
              <div class="header">Fouress Group</div>
              <div class="content">
                <h1>Verify account</h1>
                <p>Hi ${username},</p>
                <p>
                  Please enter this confirmation code in the window where you started
                  signin:
                </p>
                <h1 class="confirmation-code">${otp}</h1>
        
                <p>
                  If you didn't request an OTP from Fouress Group, please ignore this
                  message
                </p>
        
                <p>Thanks</p>
                <p>Fouress Group</p>
        
                <p>Fouress Group helps to get the best products for you</p>
        
                <p>
                  Contact us at
                  <a href="http://support@fouressgroup.com">Fouress Group</a> for any
                  issues/suggestions
                </p>
              </div>
            </div>
          </body>
        </html>
        `,
        subject: 'OTP Request'
      })
    };

    const response = await fetch(url, options);
    const jsonResponse = await response.json();

    console.log(jsonResponse);

    return {
      status: true,
      message: 'Your OTP has been shared to the Email.',
      otp: otp
    };
  } catch (error) {
    console.error(error.message);
    return {
      status: false,
      message: error.message
    };
  }
}

module.exports = SharingEmailOTPUtils;

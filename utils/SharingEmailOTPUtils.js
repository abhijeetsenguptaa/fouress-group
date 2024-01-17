const mailchimp = require('@mailchimp/mailchimp_marketing');
require('dotenv').config();

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: 'us1', // Replace with your Mailchimp server prefix
});

const sendOTPEmail = async (email, otp) => {
  const message = {
    to: [{ email }],
    from_email: 'abhijeet@webtechmedia.net', // Replace with your email address
    subject: 'Your OTP for Verification',
    html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
  };

  try {
    const response = await mailchimp.messages.send({
      message,
      tracking: { opens: true, clicks: false },
    });

    console.log('OTP email sent successfully:', response);
  } catch (error) {
    console.error('Error sending OTP email:', error.message);
  }
};

// Example usage
const userEmail = 'ravi@webtechmedia.net';
const otpCode = '123456'; // Replace with your OTP generation logic
sendOTPEmail(userEmail, otpCode);

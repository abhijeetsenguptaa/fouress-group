const express = require('express');
const { fetchingUsers, loggingInWithPhone, otpVerification } = require('../controllers/user.controller');

const userRouter = express.Router();


userRouter.get('/', fetchingUsers);
userRouter.post('/phone-login', loggingInWithPhone);
userRouter.post('/verify-otp', otpVerification);

module.exports = userRouter;
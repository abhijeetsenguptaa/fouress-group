const express = require('express');
const { fetchingUsers, loggingInWithPhone, otpVerification, fillNameAndEmail, specificUserController, editUserDetailsController } = require('../controllers/user.controller');
const { authentication } = require('../middleware/authentication.middleware');

const userRouter = express.Router();


userRouter.get('/', fetchingUsers);
userRouter.post('/phone-login', loggingInWithPhone);
userRouter.post('/verify-otp', otpVerification);
userRouter.post('/name-email', authentication, fillNameAndEmail);
userRouter.get('/my-profile', authentication, specificUserController);
userRouter.post('/edit-profile', authentication, editUserDetailsController);

module.exports = userRouter;
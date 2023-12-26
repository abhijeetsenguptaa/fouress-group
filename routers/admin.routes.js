const express = require('express');
const { registeringAdminController, loggingAdminController } = require('../controllers/admin.controller');
const adminRoute = express.Router();

adminRoute.post('/register', registeringAdminController);
adminRoute.post('/login', loggingAdminController);

module.exports = adminRoute;
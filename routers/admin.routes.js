const express = require('express');
const { registeringAdminController, loggingAdminController, GetAllUsersController } = require('../controllers/admin.controller');
const adminRoute = express.Router();

adminRoute.post('/register', registeringAdminController);
adminRoute.post('/login', loggingAdminController);
adminRoute.get('/users', GetAllUsersController);

module.exports = adminRoute;
const express = require('express');
const { PostNotificationController, FetchNotificationController } = require('../controllers/notification.controller');

const notificationRouter = express.Router();

notificationRouter.post('/admin/post', PostNotificationController);
notificationRouter.get('/admin/get', FetchNotificationController);


module.exports = notificationRouter;
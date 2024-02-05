const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        default: null
    },
    message: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {
    versionKey: false
})

const NotificationModel = mongoose.model('notifications', notificationSchema);

module.exports = NotificationModel;
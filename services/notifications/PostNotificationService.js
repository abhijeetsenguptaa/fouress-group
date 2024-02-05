const NotificationModel = require("../../models/notification.model");

async function PostNotificationService(title, message) {
    try {
        // Create a new instance of the NotificationModel
        const newNotification = new NotificationModel({
            title: title,
            message: message
        });

        // Save the new notification to the database
        const savedNotification = await newNotification.save();

        console.log('Notification saved successfully:', savedNotification);

        return {
            status: true,
            message: 'Notification posted successfully',
            data: savedNotification,
        };
    } catch (error) {
        console.error('Error posting notification:', error.message);
        return {
            status: false,
            message: 'Failed to post notification',
            data: error.message,
        };
    }
}

module.exports = PostNotificationService;

const NotificationModel = require("../../models/notification.model");

async function FetchNotificationService() {
    try {
        // Fetch all notifications from the database
        const allNotifications = await NotificationModel.find();

        console.log('Notifications fetched successfully:', allNotifications);

        return {
            status: true,
            message: 'Notifications fetched successfully',
            data: allNotifications,
        };
    } catch (error) {
        console.error('Error fetching notifications:', error.message);
        return {
            status: false,
            message: 'Failed to fetch notifications',
            error: error.message,
        };
    }
}

module.exports = FetchNotificationService;

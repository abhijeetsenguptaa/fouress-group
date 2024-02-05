const FetchNotificationService = require("../services/notifications/FetchNotificationService");
const PostNotificationService = require("../services/notifications/PostNotificationService");

async function PostNotificationController(req, res) {
    try {
        const { title, message } = req.body;
        const notification = await PostNotificationService(title, message);

        return res.status(notification.status ? 200 : 404).json({
            status: notification.status,
            message: notification.message,
            data: notification.data
        })
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}

async function FetchNotificationController(req, res) {
    try {
        const notification = await FetchNotificationService();

        return res.status(notification.status ? 200 : 404).json({
            status: notification.status,
            message: notification.message,
            data: notification.data
        })
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}

module.exports = { PostNotificationController, FetchNotificationController }
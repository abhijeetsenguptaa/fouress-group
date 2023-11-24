require('dotenv').config();
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');

async function authentication(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                status: 401,
                message: "Please provide a valid Bearer token."
            });
        }

        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
            if (err) {
                return res.status(401).json({
                    status: 401,
                    message: "Invalid Token"
                });
            }

            req.userID = decode.userID;

            const user = await UserModel.findOne({ _id: req.userID });

            if (!user) {
                return res.status(404).json({
                    status: 404,
                    message: "User not found"
                });
            }

            req.user = user;
            next();
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error"
        });
    }
}

module.exports = { authentication };

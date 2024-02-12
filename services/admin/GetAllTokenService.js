const UserModel = require("../../models/user.model");

async function GetAllTokenService() {
    try {
        const users = await UserModel.find();

        return {
            status: true,
            message: 'Users List',
            data: users
        }
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = GetAllTokenService;
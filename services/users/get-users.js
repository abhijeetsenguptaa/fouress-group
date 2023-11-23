const UserModel = require("../../models/user.model");

async function getUsers() {
    try {
        const users = await UserModel.find();
        return ({
            status: true,
            message: 'List of users',
            data: users
        })
    } catch (error) {
        return ({
            status: false,
            message: error.message,
        })
    }
}

module.exports = getUsers;
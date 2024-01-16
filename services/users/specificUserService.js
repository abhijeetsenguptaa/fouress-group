const UserModel = require("../../models/user.model");

async function SpecificUserService(id) {
    try {
        const user = await UserModel.findById(id);

        if (!user) {
            return {
                status: false,
                message: "User not found!"
            }
        }

        return {
            status: true,
            message: 'Data of the specific user.',
            data: user
        }
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = SpecificUserService;
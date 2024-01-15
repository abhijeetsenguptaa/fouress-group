const UserModel = require("../../models/user.model");

async function PostUsers(id, name, email) {
    try {
        // Find the user by id
        const user = await UserModel.findById(id);

        // If user is not found, return an error
        if (!user) {
            return {
                status: false,
                message: "User not found"
            };
        }

        // Update the user with the provided name and email
        user.name = name;
        user.email = email;

        // Save the updated user
        await user.save();

        // Return success
        return {
            status: true,
            message: "User updated successfully"
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = PostUsers;

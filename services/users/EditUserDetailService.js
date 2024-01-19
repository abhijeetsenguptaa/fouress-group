const UserModel = require("../../models/user.model");

async function EditUserDetailService(id) {
    try {
        const userDetails = await UserModel.findById(id);

        if (!userDetails) {
            return {
                status: false,
                message: "User not found",
            }
        }

        userDetails.name = name || userDetails.name;
        userDetails.email = userDetails.email || email
        userDetails.pincode = userDetails.pincode || pincode
        userDetails.address = userDetails.address
        userDetails.GSTIN = userDetails.GSTIN
        userDetails.cin = userDetails.cin
        userDetails.tan = userDetails.tan
        userDetails.pan = userDetails.pan
        userDetails.dgftCode = userDetails.dgftCode

    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}



module.exports = EditUserDetailService;
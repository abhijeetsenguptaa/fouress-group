const UserModel = require("../../models/user.model");

async function EditUserDetailService(
    id,
    name,
    companyName,
    ceoName,
    websiteName,
    email,
    phoneNumber,
    password,
    pincode,
    city,
    state,
    address,
    alternateNumber,
    alternateEmail,
    GSTIN,
    cin,
    tan,
    pan,
    dgftCode
) {
    try {
        const userDetails = await UserModel.findById(id);

        if (!userDetails) {
            return {
                status: false,
                message: "User not found",
            };
        }

        // Update the fields if new values are provided, otherwise keep the existing values
        userDetails.name = name || userDetails.name;
        userDetails.companyName = companyName || userDetails.companyName;
        userDetails.ceoName = ceoName || userDetails.ceoName;
        userDetails.websiteName = websiteName || userDetails.websiteName;
        userDetails.email = email || userDetails.email;
        userDetails.phoneNumber = phoneNumber || userDetails.phoneNumber;
        userDetails.password = password || userDetails.password;
        userDetails.pincode = pincode || userDetails.pincode;
        userDetails.city = city || userDetails.city;
        userDetails.state = state || userDetails.state;
        userDetails.address = address || userDetails.address;
        userDetails.alternateNumber = alternateNumber || userDetails.alternateNumber;
        userDetails.alternateEmail = alternateEmail || userDetails.alternateEmail;
        userDetails.GSTIN = GSTIN || userDetails.GSTIN;
        userDetails.cin = cin || userDetails.cin;
        userDetails.tan = tan || userDetails.tan;
        userDetails.pan = pan || userDetails.pan;
        userDetails.dgftCode = dgftCode || userDetails.dgftCode;

        // Save the changes
        await userDetails.save();

        return {
            status: true,
            message: "User details updated successfully",
            data: userDetails,
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message,
        };
    }
}

module.exports = EditUserDetailService;

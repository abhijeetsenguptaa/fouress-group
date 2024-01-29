const EnquiryModel = require("../../models/enquiry.model");

async function PostEnquiryService(userID, productID, message, quantity) {
    try {
        const enquiryData = new EnquiryModel({ userID, productID, message, quantity });

        // Save the enquiry data to the MongoDB database
        await enquiryData.save();

        return {
            status: true,
            message: 'Your enquiry has been posted successfully.',
            data: enquiryData
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}


module.exports = PostEnquiryService;

const { response } = require("express");
const PostEnquiryService = require("../services/enquiries/PostEnquiryService");

async function PostEnquiryController(req, res) {
    try {
        const userID = req.userID;
        const productID = req.params.id;

        const { message, quantity } = req.body;

        const postedData = await PostEnquiryService(userID, productID, message, quantity);

        return res.status(postedData.status ? 200 : 404).json({
            status: postedData.status,
            message: postedData.message,
            data: postedData.data
        })
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}


module.exports = { PostEnquiryController };
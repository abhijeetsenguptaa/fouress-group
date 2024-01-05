const BannerModel = require("../../models/banner.model");

async function AddBannerService(header, title, image, description, link, isActive, startDate, endDate) {
    try {
        const bannerCreation = new BannerModel({ header, title, image, description, link, isActive, startDate, endDate });
        await bannerCreation.save();

        return {
            status: true,
            message: "Banner created successfully."
        }
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}


module.exports = AddBannerService;
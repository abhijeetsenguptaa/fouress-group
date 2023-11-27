const BannerModel = require("../../models/banner.model");


async function FetchBannerService(id, isActive) {
    try {
        let fetchBannerList;

        if (id) {
            fetchBannerList = await BannerModel.findById(id);
        } else if (isActive) {
            fetchBannerList = await BannerModel.find({ isActive: isActive });
        } else {
            fetchBannerList = await BannerModel.find();
        }

        return {
            status: true,
            count: fetchBannerList.length,
            data: fetchBannerList
        }
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}


module.exports = FetchBannerService;
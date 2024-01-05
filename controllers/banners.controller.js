const multer = require('multer');
const AddBannerService = require('../services/banners/AddBannerService');
const FetchBannerService = require('../services/banners/FetchBannerService');

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/banner-images');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        },
    }),
});


async function addBannerController(req, res) {
    try {
        const { header, title, description, link, isActive, startDate, endDate } = req.body;

        if (!req.file || !req.file.filename) {
            return res.status(400).json({
                status: false,
                message: "Image file not provided or invalid."
            });
        }

        const image = "uploads/banner-images/" + req.file.filename;

        const bannerInsert = await AddBannerService(header, title, image, description, link, isActive, startDate, endDate);

        return res.status(bannerInsert.status ? 201 : 500).json({
            status: bannerInsert.status,
            message: bannerInsert.message
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}



async function fetchBannerController(req, res) {
    try {
        const { id, isActive } = req.body;

        const bannerData = await FetchBannerService(id, isActive);

        return res.status(bannerData.status ? 200 : 404).json({
            status: bannerData.status,
            count: bannerData.status ? bannerData.count : null,
            data: bannerData.status ? bannerData.data : null
        })
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}


module.exports = { upload, addBannerController, fetchBannerController };
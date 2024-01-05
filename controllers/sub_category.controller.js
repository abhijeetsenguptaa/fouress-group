const FetchSubCategoryService = require("../services/sub-categories/FetchSubCategoryService");
const multer = require("multer");


async function fetchSubCategoryController(req, res) {
    try {
        const { id, category } = req.query;

        const subCategoryData = await FetchSubCategoryService(id, category);

        return res.status(subCategoryData.status ? 200 : 404).json({
            status: subCategoryData.status,
            message: subCategoryData.status ? subCategoryData.message : "No Data Found!",
            count: subCategoryData.status ? subCategoryData.count : 0,
            data: subCategoryData.status ? subCategoryData.data : null
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/sub-category-images');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        },
    }),
});

async function postSubCategoryController(req, res) {
    try {
        let images = [];

        // Check if files are uploaded
        if (req.files) {
            images = req.files.map(file => file.path);
        }

        const {
            category_id,
            name,
            price,
            short_description,
            long_description
        } = req.body;

        // Create a new sub-category instance
        const newSubCategory = new Sub_Category_Model({
            category_id,
            logo: images.length > 0 ? images[0] : null, 
            name,
            price,
            images,
            short_description,
            long_description
        });

        // Save the sub-category to the database
        const savedSubCategory = await newSubCategory.save();

        return res.status(201).json({
            status: true,
            message: "Sub-category created successfully",
            data: savedSubCategory
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}



module.exports = { upload, postSubCategoryController, fetchSubCategoryController }
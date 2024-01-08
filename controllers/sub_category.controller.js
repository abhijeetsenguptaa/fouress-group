const Sub_Category_Model = require("../models/sub_category.model");
const DeleteSubCategoryService = require("../services/sub-categories/DeleteSubCategoryService");
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
            description
        } = req.body;

        // Create a new sub-category instance
        const newSubCategory = new Sub_Category_Model({
            category_id,
            logo: images.length > 0 ? images[0] : null, 
            name,
            price,
            images,
            description
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

async function updateSubCategoryController(req,res){
    try {
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}


const fs = require('fs').promises; // Import the file system module

async function DeleteSubCategoryController(req, res) {
    try {
        const id = req.params.id;

        // Fetch subcategory data including the images field
        const subCategoryData = await Sub_Category_Model.findById(id);

        if (!subCategoryData) {
            return res.status(404).json({
                status: false,
                message: "Subcategory not found"
            });
        }

        // Extract image paths from the subcategory data
        const imagePaths = subCategoryData.images || [];

        // Delete images from the file system
        await Promise.all(imagePaths.map(async (imagePath) => {
            try {
                console.log(imagePath);
                await fs.unlink(imagePath); // Delete the image file
                console.log(`Image deleted: ${imagePath}`);
            } catch (error) {
                console.error(`Error deleting image: ${imagePath}`, error);
            }
        }));

        // Delete the subcategory data
        const dataRequired = await DeleteSubCategoryService(id);

        return res.status(dataRequired.status ? 200 : 404).json({
            status: dataRequired.status,
            message: dataRequired.message
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}


module.exports = { upload, postSubCategoryController, fetchSubCategoryController, updateSubCategoryController,DeleteSubCategoryController };
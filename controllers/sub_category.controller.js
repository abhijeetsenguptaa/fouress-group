const Sub_Category_Model = require("../models/sub_category.model");
const AddToWishlistService = require("../services/sub-categories/AddToWishlistService");
const DeleteSubCategoryService = require("../services/sub-categories/DeleteSubCategoryService");
const FetchSubCategoryService = require("../services/sub-categories/FetchSubCategoryService");
const multer = require("multer");


async function fetchSubCategoryController(req, res) {
    try {
        const { id, category, wishlist } = req.query;

        const subCategoryData = await FetchSubCategoryService(id, category, wishlist);

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
            description,
            wishlists
        } = req.body;

        // Create a new sub-category instance
        const newSubCategory = new Sub_Category_Model({
            category_id,
            logo: images.length > 0 ? images[0] : null,
            name,
            price,
            images,
            description,
            wishlists
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

async function updateSubCategoryController(req, res) {
    try {
        const id = req.params.id;

        // Fetch the existing sub-category data
        const fetchItem = await Sub_Category_Model.findById(id);

        if (!fetchItem) {
            return res.status(404).json({
                status: false,
                message: "Sub-category not found"
            });
        }

        // Handle uploaded images
        let newImages = [];
        if (req.files) {
            newImages = req.files.map(file => file.path);
        }

        // Remove old images that are not present in the newImages array
        const imagesToDelete = fetchItem.images.filter(oldImage => !newImages.includes(oldImage));

        // Delete old images from the directory
        imagesToDelete.forEach(async (imagePath) => {
            try {
                await fs.promises.unlink(imagePath);
            } catch (error) {
                console.error(`Error deleting image: ${imagePath}`, error);
            }
        });

        // Update sub-category data
        const {
            category_id,
            name,
            price,
            description
        } = req.body;

        fetchItem.category_id = category_id;
        fetchItem.logo = newImages.length > 0 ? newImages[0] : null;
        fetchItem.name = name;
        fetchItem.price = price;
        fetchItem.images = newImages;
        fetchItem.description = description;

        // Save the updated sub-category to the database
        const updatedSubCategory = await fetchItem.save();

        return res.status(200).json({
            status: true,
            message: "Sub-category updated successfully",
            data: updatedSubCategory
        });
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

async function addToWishlistController(req,res){
    try {
        const id = req.params.id;

        const dataFromWishlist = await AddToWishlistService(id);

        return res.status(dataFromWishlist.status ? 200 : 404).json({
            status : dataFromWishlist.status,
            message : dataFromWishlist.message
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}


module.exports = { upload, postSubCategoryController, fetchSubCategoryController, updateSubCategoryController, DeleteSubCategoryController, addToWishlistController };
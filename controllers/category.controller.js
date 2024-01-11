const multer = require("multer");
const AddCategoryService = require("../services/categories/AddCategoryService");
const FetchCategoryService = require("../services/categories/FetchCategoryService");
const DeleteCategoryService = require("../services/categories/DeleteCategoryService");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/category-images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

async function addCategoryController(req, res) {
    try {
        const { title, slug, icon, status } = req.body;
        let image;
        if (req.file) {
            image = "uploads/category-images/" + req.file.filename;
        }

        const categoryInsert = await AddCategoryService(title, slug, icon, status, image);

        return res.status(categoryInsert.status ? 200 : 404).json({
            status: categoryInsert.status,
            message: categoryInsert.message,
            data: categoryInsert.status ? categoryInsert.data : null
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}

async function fetchCategoryController(req, res) {
    try {
        const { id, status } = req.query;

        const result = await FetchCategoryService(id, status);

        return res.status(result.status ? 200 : 404).json({
            status: result.status,
            message: result.message,
            count: result.count,
            data: result.data
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}

async function deleteCategoryController(req, res) {
    try {
        const id = req.params.id;

        const requiredCategoryItem = await DeleteCategoryService(id);

        return res.status(requiredCategoryItem.status ? 200 : 404).json({
            status: requiredCategoryItem.status,
            message: requiredCategoryItem.message,
            data: requiredCategoryItem.status ? requiredCategoryItem.data : null
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        });
    }
}

module.exports = { upload, addCategoryController, fetchCategoryController, deleteCategoryController };
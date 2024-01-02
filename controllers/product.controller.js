const multer = require('multer');
const ProductModel = require('../models/product.model');
const FetchProductService = require('../services/products/FetchProductService');

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/product-images');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        },
    }),
});

async function postProductController(req, res) {
    try {
        let image;
        if (req.file) {
            image = 'uploads/product-images/' + req.file.filename;
        }

        const { name, category_id, sub_category_id } = req.body;

        // Validate the input data (you may want to add more validation)
        if (!name || !category_id || !sub_category_id) {
            return res.status(400).json({
                status: false,
                message: "Missing required fields",
            });
        }

        const newProduct = new ProductModel({ name, image, category_id, sub_category_id });
        await newProduct.save();

        // Send a success response
        return res.status(201).json({
            status: true,
            message: "Product created successfully",
            data: newProduct,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
}


async function fetchProductController(req, res) {
    try {
        const { id, category, sub_category } = req.query;
        const data = await FetchProductService(id, category, sub_category);

        return res.status(data.status ? 200 : 404).json({
            status: data.status,
            count: data.count,
            data: data.status ? data.data : null
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Internal Server Error",
        });
    }
}
module.exports = { upload, postProductController, fetchProductController };

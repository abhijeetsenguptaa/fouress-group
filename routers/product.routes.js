const express = require('express');
const { fetchProductController, upload, postProductController } = require('../controllers/product.controller');

const productRoute = express.Router();

productRoute.get('/', fetchProductController);
productRoute.post('/', upload.single('image'), postProductController);

module.exports = productRoute;
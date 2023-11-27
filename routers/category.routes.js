const express = require('express');
const { upload, addCategoryController, fetchCategoryController } = require('../controllers/category.controller');

const categoryRouter = express.Router();

categoryRouter.post('/', upload.single('image'), addCategoryController);
categoryRouter.get('/', fetchCategoryController);
module.exports = categoryRouter;
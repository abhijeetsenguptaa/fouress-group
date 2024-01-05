const express = require('express');
const { fetchSubCategoryController, upload, postSubCategoryController } = require('../controllers/sub_category.controller');

const subCategoryRouter = express.Router();

subCategoryRouter.get('/', fetchSubCategoryController);
subCategoryRouter.post('/', upload.array('images', 5), postSubCategoryController);


module.exports = subCategoryRouter;
const express = require('express');
const { fetchSubCategoryController, upload, postSubCategoryController, DeleteSubCategoryController } = require('../controllers/sub_category.controller');

const subCategoryRouter = express.Router();

subCategoryRouter.get('/', fetchSubCategoryController);
subCategoryRouter.post('/', upload.array('images', 5), postSubCategoryController);
subCategoryRouter.delete('/:id', DeleteSubCategoryController);

module.exports = subCategoryRouter;
const express = require('express');
const { fetchSubCategoryController } = require('../controllers/sub_category.controller');

const subCategoryRouter = express.Router();

subCategoryRouter.get('/', fetchSubCategoryController);

module.exports = subCategoryRouter;
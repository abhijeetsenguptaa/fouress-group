const express = require('express');
const { fetchSubCategoryController, upload, postSubCategoryController, DeleteSubCategoryController, addToWishlistController, relatedItemsController } = require('../controllers/sub_category.controller');

const subCategoryRouter = express.Router();

subCategoryRouter.get('/', fetchSubCategoryController);
subCategoryRouter.post('/', upload.array('images', 5), postSubCategoryController);
subCategoryRouter.post('/wishlists/:id', addToWishlistController);
subCategoryRouter.delete('/:id', DeleteSubCategoryController);
subCategoryRouter.get('/related/:id', relatedItemsController);

module.exports = subCategoryRouter;
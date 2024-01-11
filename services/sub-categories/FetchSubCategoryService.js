const Sub_Category_Model = require("../../models/sub_category.model");

async function FetchSubCategoryService(id, category, wishlist) {
    try {
        let subCategoryData;

        const query = {};

        if (id) {
            query._id = id;
        }

        if (category) {
            query.category_id = category;
        }

        if (wishlist !== undefined) {
            query.wishlists = wishlist;
        }

        subCategoryData = await Sub_Category_Model.find(query).populate('category_id');

        const count = subCategoryData.length;

        return {
            status: true,
            message: 'Sub Category List',
            count: count,
            data: subCategoryData
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = FetchSubCategoryService;

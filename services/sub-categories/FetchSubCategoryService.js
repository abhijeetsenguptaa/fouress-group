const Sub_Category_Model = require("../../models/sub_category.model");

async function FetchSubCategoryService(id, category) {
    try {
        let subCategoryData;

        if (id) {
            subCategoryData = await Sub_Category_Model.findById(id);
        } else if (category) {
            subCategoryData = await Sub_Category_Model.find({ category_id: category });
        } else {
            subCategoryData = await Sub_Category_Model.find();
        }

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

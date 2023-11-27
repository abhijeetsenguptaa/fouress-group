const CategoryModel = require("../../models/category.model");

async function FetchCategoryService(id, status) {
    try {
        let fetchCategory;

        if (id) {
            fetchCategory = await CategoryModel.findById(id);
        } else if (status) {
            fetchCategory = await CategoryModel.find({ status });
        } else {
            fetchCategory = await CategoryModel.find();
        }

        return {
            status: true,
            message: 'Category List was successfully fetched.',
            count: fetchCategory.length,
            data: fetchCategory
        };
    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: error.message,
            count: null,
            data: null
        };
    }
}


module.exports = FetchCategoryService;

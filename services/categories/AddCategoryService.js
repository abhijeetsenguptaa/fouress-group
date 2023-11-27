const CategoryModel = require("../../models/category.model");


async function AddCategoryService(title, slug, icon, status, image) {
    try {
        const categoryCreation = new CategoryModel({ title, slug, icon, status, image });
        await categoryCreation.save();

        return {
            status: true,
            message: `${title} category has been added successfully`,
            data: categoryCreation
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = AddCategoryService;

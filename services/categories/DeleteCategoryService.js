const CategoryModel = require("../../models/category.model");
const fs = require('fs').promises;

async function DeleteCategoryService(id) {
    try {
        const categoryItem = await CategoryModel.findById(id);

        if (!categoryItem) {
            return {
                status: false,
                message: "Category not found!"
            };
        }

        // Delete the associated image file
        if (categoryItem.image) {
            try {
                await fs.unlink(categoryItem.image);
            } catch (error) {
                console.error(`Error deleting image: ${categoryItem.image}`, error);
            }
        }

        await CategoryModel.findByIdAndDelete(id);

        return {
            status: true,
            message: "Category deleted successfully",
            data: await CategoryModel.find()
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = DeleteCategoryService;
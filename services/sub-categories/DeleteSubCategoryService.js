const Sub_Category_Model = require("../../models/sub_category.model");

async function DeleteSubCategoryService(id) {
    try {
        // Find the document by ID
        const subCategory = await Sub_Category_Model.findById(id);

        // Check if the document exists
        if (!subCategory) {
            return {
                status: false,
                message: "Sub-category not found"
            };
        }

        // Delete the document from the database
        await Sub_Category_Model.findByIdAndDelete(id);

        return {
            status: true,
            message: "Sub-category deleted successfully"
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = DeleteSubCategoryService;

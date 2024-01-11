const Sub_Category_Model = require("../../models/sub_category.model");

async function AddToWishlistService(id) {
    try {
        const data = await Sub_Category_Model.findById(id);

        if (!data) {
            return {
                status: false,
                message: "Item not found!"
            };
        }

        // Toggle the wishlists state
        data.wishlists = !data.wishlists;

        // Save the changes to the database
        await data.save();

        return {
            status: true,
            message: "Wishlist state updated successfully"
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: false,
            message: error.message
        };
    }
}

module.exports = AddToWishlistService;

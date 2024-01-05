const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    },
    logo: {
        type: String,
        default: null
    },
    name: {
        type: String,
        default: null
    },
    price: {
        type: String,
        default: null
    },
    images: {
        type: [String], 
        default: []
    },
    short_description: {
        type: String,
        default: null
    },
    long_description: {
        type: String,
        default: null
    }
}, {
    versionKey: false
});

const Sub_Category_Model = mongoose.model('sub-categories', subCategorySchema);

module.exports = Sub_Category_Model;

const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        default: null
    },
    slug: {
        type: String,
        default: null
    },
    icon: {
        type: String,
        default: null
    },
    status: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        default: null
    }
}, {
    versionKey: false
})

const CategoryModel = mongoose.model('categories', categorySchema);

module.exports = CategoryModel;
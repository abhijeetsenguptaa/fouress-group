const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    header: {
        type: String,
        default: null
    },
    title: {
        type: String,
        required: true 
    },
    image: {
        type: String,
        // required: true 
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    },
    description: {
        type: String,
        default: null
    },
    link: {
        type: String,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true 
    },
    startDate: {
        type: Date,
        default: null
    },
    endDate: {
        type: Date,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: null
    }
}, {
    versionKey: false
});

const BannerModel = mongoose.model('banners', bannerSchema);

module.exports = BannerModel;

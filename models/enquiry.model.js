const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        productID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'sub-categories',
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending'
        },
        message: {
            type: String,
            default: null
        },
        quantity: {
            type: String,
            default: null
        },
        enquireDate: {
            type: Date,
            default: Date.now
        },
        updatedDate: {
            type: Date,
            default: Date.now
        }
    },
    {
        versionKey: false
    }
);

const EnquiryModel = mongoose.model('enquiries', enquirySchema);

module.exports = EnquiryModel;

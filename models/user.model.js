const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userToken: {
        type: String,
        default: null
    },
    name: {
        type: String,
        default: null
    },
    companyName: {
        type: String,
        default: null
    },
    ceoName: {
        type: String,
        default: null
    },
    websiteName: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    phoneNumber: {
        type: String,
        default: null
    },
    password: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer'
    },
    pincode: {
        type: String,
        default: null
    },
    city: {
        type: String,
        default: null
    },
    state: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    alternateNumber: {
        type: String,
        default: null
    },
    alternateEmail: {
        type: String,
        default: null
    },
    alternateEmailVerified: {
        type: Boolean,
        default: false
    },
    alternateNumberVerified: {
        type: Boolean,
        default: false
    },
    GSTIN: {
        type: String,
        default: null
    },
    cin: {
        type: String,
        default: null
    },
    tan: {
        type: String,
        default: null
    },
    pan: {
        type: String,
        default: null
    },
    dgftCode: {
        type: String,
        default: null
    },

}, {
    versionKey: false
});

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;

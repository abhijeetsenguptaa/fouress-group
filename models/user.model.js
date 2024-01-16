const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    isVerified:{
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
    pincode: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
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
    }
}, {
    versionKey: false
});

const UserModel = mongoose.model('users', userSchema);

module.exports = UserModel;

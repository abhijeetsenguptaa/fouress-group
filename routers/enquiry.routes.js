const express = require('express');
const { authentication } = require('../middleware/authentication.middleware');
const { PostEnquiryController } = require('../controllers/enquiry.controller');
const enquireRoute = express.Router();

enquireRoute.post('/:id', authentication, PostEnquiryController);

module.exports = enquireRoute;
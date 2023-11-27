const express = require('express');
const { addBannerController, fetchBannerController, upload } = require('../controllers/banners.controller');

const bannerRouter = express.Router();

bannerRouter.post('/', upload.single('image'), addBannerController);
bannerRouter.get('/', fetchBannerController);


module.exports = bannerRouter;
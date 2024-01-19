const express = require('express');
const { PostCityController, FetchCityController, EditCityController, StatusCityController, DeleteCityController } = require('../controllers/city.controller');

const cityRoute = express.Router();

cityRoute.post('/', PostCityController);
cityRoute.get('/', FetchCityController);
cityRoute.patch('/edit/:id', EditCityController);
cityRoute.post('/status/:id', StatusCityController);
cityRoute.delete('/delete/:id', DeleteCityController);

module.exports = cityRoute;
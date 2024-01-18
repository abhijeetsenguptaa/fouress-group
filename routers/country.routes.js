const express = require('express');
const { FetchCountryController, PostCountryController, EditCountryController, StatusCountryController, DeleteCountryController } = require('../controllers/country.controller');

const countryRoute = express.Router();

countryRoute.get('/', FetchCountryController);
countryRoute.post('/', PostCountryController);
countryRoute.patch('/edit/:id', EditCountryController);
countryRoute.post('/status/:id', StatusCountryController);
countryRoute.delete('/delete/:id', DeleteCountryController);

module.exports = countryRoute;
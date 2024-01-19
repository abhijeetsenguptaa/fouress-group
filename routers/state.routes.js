const express = require('express');
const { FetchStateController, PostStateController, EditStateController, StatusStateController, DeleteStateController } = require('../controllers/state.controller');

const stateRoute = express.Router();

stateRoute.get('/', FetchStateController);
stateRoute.post('/', PostStateController);
stateRoute.patch('/edit/:id', EditStateController);
stateRoute.post('/status/:id', StatusStateController);
stateRoute.delete('/delete/:id', DeleteStateController);

module.exports = stateRoute;
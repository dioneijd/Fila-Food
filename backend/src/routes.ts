import express from 'express';

import RestaurantsController from './controllers/RestaurantsController'
import ItemsController from './controllers/ItemsController'

const routes = express.Router();
const restaurantsController = new RestaurantsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

routes.get('/restaurants', restaurantsController.index);
routes.get('/restaurants/:id', restaurantsController.show);
routes.post('/restaurants', restaurantsController.create);

export default routes;
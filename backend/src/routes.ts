import express from 'express'

import CustomerController from './controllers/CustomerController'

const routes = express.Router()

const customerController = new CustomerController()

routes.get('/customers', customerController.index)
routes.get('/customers/:id', customerController.show)
routes.post('/customers', customerController.store)
routes.put('/customers/:id', customerController.update)

export default routes
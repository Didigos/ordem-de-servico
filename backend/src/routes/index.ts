import { Router } from 'express'
import { customersRoutes } from '../modules/customers/customer.routes';
import { serviceOrdersRoutes } from '../modules/serviceOrders/serviceOrder.routes';

const routes = Router()

routes.get('/teste', (req, res) => res.json({ status: 'ok' }))
routes.use('/customers', customersRoutes)
routes.use('/orders', serviceOrdersRoutes)

export { routes }

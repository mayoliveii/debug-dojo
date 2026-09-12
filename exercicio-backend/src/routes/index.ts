import { Router } from 'express'
import { orderController } from '../controllers/orderController'
import { productController } from '../controllers/productController'

export const router = Router()

router.get('/health', (_req, res) => res.json({ status: 'ok' }))

router.get('/products', productController.list)

router.post('/orders', orderController.create)
router.get('/orders', orderController.list)
router.get('/orders/:id', orderController.get)
router.post('/orders/:id/cancel', orderController.cancel)

import { Router } from 'express';
import OrderController from '../controllers/OrderController';

const router = Router();

router.post('/orders', OrderController.createOrder);
router.get('/orders', OrderController.getOrders);
router.get('/orders/:id', OrderController.getOrderById);
router.put('/orders/:id', OrderController.updateOrder);
router.delete('/orders/:id', OrderController.deleteOrder);

export default router;
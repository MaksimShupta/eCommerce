import { Router } from 'express';
import {
    getAllOrders,
    createOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
} from '../controllers/orderController.js';
import validateSchema from '../middleware/validateSchema.js';
import orderSchema from '../validation/orderSchema.js'; // Ensure this schema exists

const orderRouter = Router();

orderRouter.get('/', getAllOrders);
orderRouter.get('/:id', getOrderById);
orderRouter.post('/', validateSchema(orderSchema), createOrder);
orderRouter.put('/:id', validateSchema(orderSchema), updateOrder);
orderRouter.delete('/:id', deleteOrder);

export default orderRouter;

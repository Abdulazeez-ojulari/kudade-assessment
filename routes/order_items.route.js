import express from 'express';
import { deleteItem, getOrderItems } from '../controllers/order-items.controller.js';
import auth from '../middlewares/auth.js';
const orderItemsRouter = express.Router();

orderItemsRouter.get('/', auth, getOrderItems);

orderItemsRouter.delete('/:id', auth, deleteItem);

export default orderItemsRouter;
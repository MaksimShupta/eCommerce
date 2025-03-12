import models from '../models/index.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
const { Order } = models;

export const getAllOrders = asyncHandler(async (req, res) => {
    const allOrders = await Order.findAll();
    res.status(200).json({ success: true, data: allOrders });
});
export const createOrder = asyncHandler(async (req, res) => {
    const { userId, products, total } = req.body;
    console.log('Order data:', userId, products, total);
    const newOrder = await Order.create({ userId, products, total });
    res.status(201).json({ success: true, data: newOrder });
});

export const getOrderById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const searchedOrder = await Order.findByPk(id);
    if (!searchedOrder) {
        throw new ErrorResponse('Order not found', 404);
    } else {
        console.log('Order data:', searchedOrder);
        res.status(200).json({ success: true, data: searchedOrder });
    }
});
export const updateOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log('Order id:', id);
    const { userId, products, total } = req.body;
    const updatedOrder = await Order.findByPk(id);
    if (!updatedOrder) {
        throw new ErrorResponse('Order not found!', 404);
    } else {
        await updatedOrder.update({ userId, products, total });
        res.status(200).json({ success: true, data: updatedOrder });
    }
});

export const deleteOrder = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log('Order id:', id);
    const findOrder = await Order.findByPk(id);
    if (!findOrder) {
        throw new ErrorResponse('Order not found!', 404);
    }
    await findOrder.destroy();
    console.log('The Order was successfully deleted!');
    res.status(200).json({ success: true, data: findOrder });
});

import { sequelize, connectDB } from '../db/index.js';
import models from '../models/index.js';
const { Order } = models;

export const getAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.findAll();
        res.status(200).json({ success: true, data: allOrders });
    } catch (error) {
        console.error('error by fetching all orders:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const createOrder = async (req, res) => {
    try {
        const { userId, products, total } = req.body;
        console.log('Order data:', userId, products, total);
        const newOrder = await Order.create({ userId, products, total });
        res.status(201).json({ success: true, data: newOrder });
    } catch (error) {
        console.error('error by creating an Order:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const searchedOrder = await Order.findByPk(id);
        if (!searchedOrder) {
            return res
                .status(404)
                .json({ success: false, error: 'Order not found' });
        } else {
            console.log('Order data:', searchedOrder);
            res.status(200).json({ success: true, data: searchedOrder });
        }
    } catch (error) {
        console.error('error by getting an Order:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Order id:', id);
        const { userId, products, total } = req.body;
        const updatedOrder = await Order.findByPk(id);
        if (!updatedOrder) {
            return res
                .status(404)
                .json({ success: false, error: 'Order not found' });
        } else {
            await updatedOrder.update({ userId, products, total });
            res.status(200).json({ success: true, data: updatedOrder });
        }
    } catch (error) {
        console.error('error by updating an Order:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Order id:', id);
        const findOrder = await Order.findByPk(id);

        if (!findOrder) {
            return res
                .status(404)
                .json({ success: false, error: 'Order not found' });
        }
        await findOrder.destroy();
        console.log('The Order was successfully deleted!');
        res.status(200).json({ success: true, data: findOrder });
    } catch (error) {
        console.error('error by deleting an Order:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

import { Request, Response } from 'express';
import OrderService from '../services/OrderService';

class OrderController {
    async createOrder(req: Request, res: Response): Promise<void> {
        try {
            const order = await OrderService.createOrder(req.body);
            res.status(201).json(order);
        } catch (error) {
            if(error instanceof Error)
                res.status(400).json({ message: error.message });
        }
    }

    async getOrders(req: Request, res: Response): Promise<void> {
        try {
            const { orders, total } = await OrderService.getOrders(req.query);
            res.status(200).json({ orders, total });
        } catch (error) {
            if(error instanceof Error)
                res.status(500).json({ message: error.message });
        }
    }

    async getOrderById(req: Request, res: Response): Promise<void> {
        try {
            const order = await OrderService.getOrderById(req.params.id);
            if (order) {
                res.status(200).json(order);
            } else {
                res.status(404).json({ message: 'Order not found' });
            }
        } catch (error) {
            if(error instanceof Error)
                res.status(500).json({ message: error.message });
        }
    }

    async updateOrder(req: Request, res: Response): Promise<void> {
        try {
            const order = await OrderService.updateOrder(req.params.id, req.body);
            if (order) {
                res.status(200).json(order);
            } else {
                res.status(404).json({ message: 'Order not found' });
            }
        } catch (error) {
            if(error instanceof Error)
                res.status(400).json({ message: error.message });
        }
    }

    async deleteOrder(req: Request, res: Response): Promise<void> {
        try {
            const order = await OrderService.deleteOrder(req.params.id);
            if (order) {
                res.status(200).json({ message: 'Order deleted' });
            } else {
                res.status(404).json({ message: 'Order not found' });
            }
        } catch (error) {
            if(error instanceof Error)
                res.status(500).json({ message: error.message });
        }
    }
}

export default new OrderController();

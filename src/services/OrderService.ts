import Order from '../models/Order';
import { IOrder } from '../interfaces/IOrder';

class OrderService {
    async createOrder(orderData: IOrder): Promise<IOrder> {
        const order = new Order(orderData);
        return await order.save();
    }

    async getOrders(queryParams: any): Promise<{ orders: IOrder[], total: number }> {
        const { username, deliveryStatus, page, limit } = queryParams;

        const pipeline: any[] = [
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            {
                $unwind: '$userDetails'
            }
        ];

        if (username) {
            pipeline.push({
                $match: {
                    'userDetails.username': new RegExp(username, 'i')
                }
            });
        }

        if (deliveryStatus) {
            pipeline.push({
                $match: {
                    deliveryStatus
                }
            });
        }

        const pageNumber = page ? parseInt(page, 10) : 1;
        const pageSize = limit ? parseInt(limit, 10) : 10;

        pipeline.push(
            {
                $facet: {
                    metadata: [{ $count: 'total' }],
                    data: [{ $skip: (pageNumber - 1) * pageSize }, { $limit: pageSize }]
                }
            }
        );

        const result = await Order.aggregate(pipeline).exec();
        const orders = result[0].data;
        const total = result[0].metadata.length ? result[0].metadata[0].total : 0;

        return { orders, total };
    }


    async getOrderById(id: string): Promise<IOrder | null> {
        return await Order.findById(id);
    }

    async updateOrder(id: string, orderData: Partial<IOrder>): Promise<IOrder | null> {
        return await Order.findByIdAndUpdate(id, orderData, { new: true });
    }

    async deleteOrder(id: string): Promise<IOrder | null> {
        return await Order.findByIdAndDelete(id);
    }
}

export default new OrderService();

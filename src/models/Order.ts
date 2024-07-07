import { Schema, model } from 'mongoose';
import { IOrder, DeliveryStatus, OrderedItem } from '../interfaces/IOrder';

const OrderedItemSchema = new Schema<OrderedItem>({
    item: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

const OrderSchema = new Schema<IOrder>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderedItems: [
        {
            type: OrderedItemSchema,
            required: true
        }
    ],
    totalPaid: {
        type: Number,
        required: true
    },
    deliveryFee: {
        type: Number,
        required: true
    },
    deliveryStatus: {
        type: String,
        enum: Object.values(DeliveryStatus),
        required: true
    }
});

const Order = model<IOrder>('Order', OrderSchema);

export default Order;

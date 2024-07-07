import { ObjectId } from "mongodb"
import { IUser } from "./IUser"
import { Document } from 'mongoose';

export enum DeliveryStatus{
    Received = "received",
    Processing = "processing",
    OnTransit = "on-transit",
    Delivered = "delivered",
}

export interface OrderedItem{
    item: string,
    price: number,
    amount: number,
}

export interface IOrder extends Document{
    user: string | IUser,
    orderedItems: OrderedItem,
    totalPaid: number,
    deliveryFee: number,
    deliveryStatus: DeliveryStatus,
}

export const dbname = "orders"
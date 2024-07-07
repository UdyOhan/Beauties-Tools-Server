import { ObjectId } from "mongodb"
import { Schema, model, Document } from 'mongoose';
import { IBrand } from "./IBrand";
import { ICategory } from "./ICategory";

export enum ProductStatus{
    Absent = "absent",
    Archive = "archived",
    Available = "available",
}

export interface IProduct extends Document{
    slug: string,
    name: string,
    price: number,
    overview: string,
    details: string,
    brand: string | IBrand,
    categories: string[] | ICategory[],
    images: string[],
    status: ProductStatus,
}

export const dbname = "products"
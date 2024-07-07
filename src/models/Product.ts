import { Schema, model } from 'mongoose';
import { IProduct, ProductStatus } from '../interfaces/IProduct';

const ProductSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    
    slug: { 
        type: String, 
        unique: true 
    },

    price: {
        type: Number,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    categories: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        }
    ],
    images: [
        {
            type: String,
            required: true
        }
    ],
    status: {
        type: String,
        enum: Object.values(ProductStatus),
        required: true
    }
});

const Product = model<IProduct>('Product', ProductSchema);

export default Product;

import { Schema, model } from 'mongoose';
import { IBrand, dbname } from '../interfaces/IBrand';

const BrandSchema = new Schema<IBrand>({
    name: {
        type: String,
        required: true,
        unique: true
    },

    slug:{
        type: String,
        required: true,
        unique: true
    },

    logo: {
        type: String,
        required: true
    }
});

const Brand = model<IBrand>(dbname, BrandSchema);

export default Brand;

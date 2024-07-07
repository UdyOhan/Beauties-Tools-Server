import { Schema, model } from 'mongoose';
import { ICategory } from '../interfaces/ICategory';
import slugify from 'slugify';

const CategorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
        unique: true
    },

    slug: { 
        type: String, 
        unique: true 
    }, 
});

CategorySchema.pre('save', function(next) {
    const category = this as ICategory;

    if (!category.isModified('name')) {
        return next();
    }

    category.slug = slugify(category.name, { lower: true, strict: true });
    next();
});

const Category = model<ICategory>('Category', CategorySchema);

export default Category;

import Category from '../models/Category';
import { ICategory } from '../interfaces/ICategory';
import slugify from 'slugify';

class CategoryService {
    async createCategory(categoryData: ICategory): Promise<ICategory> {
        const category = new Category(categoryData);
        return await category.save();
    }

    async getCategories(): Promise<ICategory[]> {
        return await Category.find();
    }

    async getCategoryBySlug(slug: string): Promise<ICategory | null> {
        return await Category.findOne({ slug });
    }

    async getCategoryById(id: string): Promise<ICategory | null> {
        return await Category.findById(id);
    }

    async updateCategory(id: string, categoryData: Partial<ICategory>): Promise<ICategory | null> {
        if(categoryData.name){
            categoryData.slug = slugify(categoryData.name, {lower:true, strict: true});
        }
        return await Category.findByIdAndUpdate(id, categoryData, { new: true });
    }

    async deleteCategory(id: string): Promise<ICategory | null> {
        return await Category.findByIdAndDelete(id);
    }
}

export default new CategoryService();

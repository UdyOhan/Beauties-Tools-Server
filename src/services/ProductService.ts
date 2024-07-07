import Product from '../models/Product';
import { IProduct } from '../interfaces/IProduct';
import slugify from 'slugify';
import Brand from '../models/Brand';
import Category from '../models/Category';

class ProductService {
    async createProduct(productData: IProduct): Promise<IProduct> {
        const product = new Product(productData);
        return await product.save();
    }

    async getProducts(queryParams: any): Promise<{products: IProduct[], total: Number}> {
        const { name, brands, categories, minPrice, maxPrice, status, sortBy, order, page, limit } = queryParams;

        let query = Product.find();

        if (name) {
            query = query.where('name').regex(new RegExp(name, 'i'));
        }

        if (brands) {
            
            const brandSlugs = Array.isArray(brands) ? brands : [brands];
            const brandArray = await Brand.find({ slug: { $in: brandSlugs } }).distinct('_id');
            query = query.where('brand').in(brandArray);
        }

        if (categories) {
            const categorySlugs = Array.isArray(categories) ? categories : [categories];
            const categoryArray = await Category.find({slug: {$in: categorySlugs}}).distinct('_id');
            query = query.where('categories').in(categoryArray);
        }

        if (minPrice) {
            query = query.where('price').gte(Number(minPrice));
        }

        if (maxPrice) {
            query = query.where('price').lte(Number(maxPrice));
        }

        if (status) {
            query = query.where('status').equals(status);
        }

        if (sortBy && order) {
            query = query.sort({ [sortBy]: order });
        } else {
            query = query.sort({ createdAt: 'desc' });
        }

        const pageNumber = page ? parseInt(page, 10) : 1;
        const pageSize = limit ? parseInt(limit, 10) : 10;

        const [total, products] = await Promise.all([
            query.clone().countDocuments(),
            query.skip((pageNumber - 1) * pageSize).limit(pageSize).exec(),
        ]);
       
        return {products, total};
    }

    async getProductBySlug(slug: string): Promise<IProduct | null> {
        return await Product.findOne({ slug });
    }

    async getProductById(id: string): Promise<IProduct | null> {
        return await Product.findById(id);
    }

    async updateProduct(id: string, productData: Partial<IProduct>): Promise<IProduct | null> {
        if (productData.name) {
            productData.slug = slugify(productData.name, { lower: true, strict: true });
        }
        return await Product.findByIdAndUpdate(id, productData, { new: true });
    }

    async deleteProduct(id: string): Promise<IProduct | null> {
        return await Product.findByIdAndDelete(id);
    }
}

export default new ProductService();

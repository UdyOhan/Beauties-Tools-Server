import Brand from '../models/Brand';
import slugify from 'slugify';
import { IBrand } from '../interfaces/IBrand';

class BrandService {
    async createBrand(brandData: IBrand): Promise<IBrand> {
        const brand = new Brand(brandData);
        return await brand.save();
    }

    async getBrands(): Promise<IBrand[]> {
        return await Brand.find();
    }

    async getBrandBySlug(slug: string): Promise<IBrand | null> {
        return await Brand.findOne({slug});
    }

    async getBrandById(id: string): Promise<IBrand | null> {
        return await Brand.findById(id);
    }

    async updateBrand(id: string, brandData: Partial<IBrand>): Promise<IBrand | null> {
        if (brandData.name) {
            brandData.slug = slugify(brandData.name, { lower: true, strict: true });
        }
        return await Brand.findByIdAndUpdate(id, brandData, { new: true });
    }

    async deleteBrand(id: string): Promise<IBrand | null> {
        return await Brand.findByIdAndDelete(id);
    }
}

export default new BrandService();

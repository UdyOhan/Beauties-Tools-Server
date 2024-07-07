import { Request, Response } from 'express';
import BrandService from '../services/BrandService';

class BrandController {
    async createBrand(req: Request, res: Response): Promise<void> {
        try {
            const brand = await BrandService.createBrand(req.body);
            res.status(201).json(brand);
        } catch (error) {
            if(error instanceof Error)
                res.status(400).json({ message: error.message });
        }
    }

    async getBrands(req: Request, res: Response): Promise<void> {
        try {
            const brands = await BrandService.getBrands();
            res.status(200).json(brands);
        } catch (error) {
            if(error instanceof Error)
                res.status(500).json({ message: error.message });
        }
    }

    async getBrandBySlug(req: Request, res: Response): Promise<void> {
        try {
            const brand = await BrandService.getBrandById(req.params.slug);
            if (brand) {
                res.status(200).json(brand);
            } else {
                res.status(404).json({ message: 'Brand not found' });
            }
        } catch (error) {
            if(error instanceof Error)
                res.status(500).json({ message: error.message });
        }
    }

    async getBrandById(req: Request, res: Response): Promise<void> {
        try {
            const brand = await BrandService.getBrandById(req.params.id);
            if (brand) {
                res.status(200).json(brand);
            } else {
                res.status(404).json({ message: 'Brand not found' });
            }
        } catch (error) {
            if(error instanceof Error)
                res.status(500).json({ message: error.message });
        }
    }

    async updateBrand(req: Request, res: Response): Promise<void> {
        try {
            const brand = await BrandService.updateBrand(req.params.id, req.body);
            if (brand) {
                res.status(200).json(brand);
            } else {
                res.status(404).json({ message: 'Brand not found' });
            }
        } catch (error) {
            if(error instanceof Error)
                res.status(400).json({ message: error.message });
        }
    }

    async deleteBrand(req: Request, res: Response): Promise<void> {
        try {
            const brand = await BrandService.deleteBrand(req.params.id);
            if (brand) {
                res.status(200).json({ message: 'Brand deleted' });
            } else {
                res.status(404).json({ message: 'Brand not found' });
            }
        } catch (error) {
            if(error instanceof Error)
                res.status(500).json({ message: error.message });
        }
    }
}

export default new BrandController();

import { Request, Response } from 'express';
import CategoryService from '../services/CategoryService';

class CategoryController {
    async createCategory(req: Request, res: Response): Promise<void> {
        try {
            const brand = await CategoryService.createCategory(req.body);
            res.status(201).json(brand);
        } catch (error) {
            if(error instanceof Error)
                res.status(400).json({ message: error.message });
        }
    }

    async getCategories(req: Request, res: Response): Promise<void> {
        try {
            const brands = await CategoryService.getCategories();
            res.status(200).json(brands);
        } catch (error) {
            if(error instanceof Error)
                res.status(500).json({ message: error.message });
        }
    }

    async getCategoryById(req: Request, res: Response): Promise<void> {
        try {
            const brand = await CategoryService.getCategoryById(req.params.id);
            if (brand) {
                res.status(200).json(brand);
            } else {
                res.status(404).json({ message: 'Category not found' });
            }
        } catch (error) {
            if(error instanceof Error)
                res.status(500).json({ message: error.message });
        }
    }

    async updateCategory(req: Request, res: Response): Promise<void> {
        try {
            const category = await CategoryService.updateCategory(req.params.id, req.body);
            if (category) {
                res.status(200).json(category);
            } else {
                res.status(404).json({ message: 'Category not found' });
            }
        } catch (error) {
            if(error instanceof Error)
                res.status(400).json({ message: error.message });
        }
    }

    async deleteCategory(req: Request, res: Response): Promise<void> {
        try {
            const category = await CategoryService.deleteCategory(req.params.id);
            if (category) {
                res.status(200).json({ message: 'Category deleted' });
            } else {
                res.status(404).json({ message: 'Category not found' });
            }
        } catch (error) {
            if(error instanceof Error)
                res.status(500).json({ message: error.message });
        }
    }
}

export default new CategoryController();

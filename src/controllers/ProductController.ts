import { Request, Response } from 'express';
import ProductService from '../services/ProductService';

class ProductController {
    async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const product = await ProductService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            if(error instanceof Error)
                res.status(400).json({ message: error.message });
        }
    }

    async getProducts(req: Request, res: Response): Promise<void> {
        try {
            const products = await ProductService.getProducts(req.query);
            res.status(200).json(products);
        } catch (error) {
            if(error instanceof Error)
                res.status(500).json({ message: error.message });
        }
    }

    async getProductBySlug(req: Request, res: Response): Promise<void> {
        try {
            const product = await ProductService.getProductBySlug(req.params.slug);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            if(error instanceof Error)
                res.status(500).json({ message: error.message });
        }
    }

    async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            const product = await ProductService.updateProduct(req.params.id, req.body);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            if(error instanceof Error)
                res.status(500).json({ message: error.message });
        }
    }

    async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const product = await ProductService.deleteProduct(req.params.id);
            if (product) {
                res.status(200).json({ message: 'Product deleted' });
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            if(error instanceof Error)
                res.status(500).json({ message: error.message });
        }
    }
}

export default new ProductController();

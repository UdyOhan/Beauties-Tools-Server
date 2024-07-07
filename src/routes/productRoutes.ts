import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const router = Router();

router.post('/products', ProductController.createProduct);
router.get('/products', ProductController.getProducts);
router.get('/products/:slug', ProductController.getProductBySlug);
router.put('/products/:id', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);

export default router;
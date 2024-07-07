import { Router } from 'express';
import BrandController from '../controllers/BrandController';

const router = Router();

router.post('/brands', BrandController.createBrand);
router.get('/brands', BrandController.getBrands);
router.get('/brands/:slug', BrandController.getBrandBySlug);
router.put('/brands/:id', BrandController.updateBrand);
router.delete('/brands/:id', BrandController.deleteBrand);

export default router;

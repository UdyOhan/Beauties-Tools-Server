import { Router } from 'express';
import AdminController from '../controllers/AdminController';

const router = Router();

router.post('/admins', AdminController.createAdmin);
router.get('/admins', AdminController.getAdmins);
router.get('/admins/:id', AdminController.getAdminById);
router.put('/admins/:id', AdminController.updateAdmin);
router.delete('/admins/:id', AdminController.deleteAdmin);

export default router;

import { Request, Response } from 'express';
import AdminService from '../services/AdminService';

class AdminController {
    async createAdmin(req: Request, res: Response): Promise<void> {
        try {
            const admin = await AdminService.createAdmin(req.body);
            res.status(201).json(admin);
        } catch (error) {
            if(error instanceof Error)
                res.status(400).json({ message: error.message });
        }
    }

    async getAdmins(req: Request, res: Response): Promise<void> {
        try {
            const admins = await AdminService.getAdmins();
            res.status(200).json(admins);
        } catch (error) {
            if(error instanceof Error)
                res.status(500).json({ message: error.message });
        }
    }

    async getAdminById(req: Request, res: Response): Promise<void> {
        try {
            const admin = await AdminService.getAdminById(req.params.id);
            if (admin) {
                res.status(200).json(admin);
            } else {
                res.status(404).json({ message: 'Admin not found' });
            }
        } catch (error) {
            if(error instanceof Error)
                res.status(500).json({ message: error.message });
        }
    }

    async updateAdmin(req: Request, res: Response): Promise<void> {
        try {
            const admin = await AdminService.updateAdmin(req.params.id, req.body);
            if (admin) {
                res.status(200).json(admin);
            } else {
                res.status(404).json({ message: 'Admin not found' });
            }
        } catch (error) {
            if(error instanceof Error)
                res.status(400).json({ message: error.message });
        }
    }

    async deleteAdmin(req: Request, res: Response): Promise<void> {
        try {
            const admin = await AdminService.deleteAdmin(req.params.id);
            if (admin) {
                res.status(200).json({ message: 'Admin deleted' });
            } else {
                res.status(404).json({ message: 'Admin not found' });
            }
        } catch (error) {
            if(error instanceof Error)
                res.status(500).json({ message: error.message });
        }
    }
}

export default new AdminController();

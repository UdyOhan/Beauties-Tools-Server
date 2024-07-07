import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await UserService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            if(error instanceof Error)
                res.status(400).json({ message: error.message });
        }
    }

    async getUsers(req: Request, res: Response): Promise<void> {
        try {
            const { users, total } = await UserService.getUsers(req.query);
            res.status(200).json({ users, total });
        } catch (error) {
            if(error instanceof Error)
                res.status(500).json({ message: error.message });
        }
    }

    async getUserBySlug(req: Request, res: Response): Promise<void> {
        try {
            const user = await UserService.getUserBySlug(req.params.slug);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            if(error instanceof Error)
                res.status(500).json({ message: error.message });
        }
    }

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const user = await UserService.getUserById(req.params.id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            if(error instanceof Error)
                res.status(500).json({ message: error.message });
        }
    }

    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await UserService.updateUser(req.params.id, req.body);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            if(error instanceof Error)
                res.status(400).json({ message: error.message });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const user = await UserService.deleteUser(req.params.id);
            if (user) {
                res.status(200).json({ message: 'User deleted' });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            if(error instanceof Error)
                res.status(500).json({ message: error.message });
        }
    }
}

export default new UserController();

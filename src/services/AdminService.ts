import Admin from '../models/Admin';
import { IAdmin } from '../interfaces/IAdmin';

class AdminService {
    async createAdmin(adminData: IAdmin): Promise<IAdmin> {
        const admin = new Admin(adminData);
        return await admin.save();
    }

    async getAdmins(): Promise<IAdmin[]> {
        return await Admin.find().populate('user');
    }

    async getAdminById(id: string): Promise<IAdmin | null> {
        return await Admin.findById(id).populate('user');
    }

    async updateAdmin(id: string, adminData: Partial<IAdmin>): Promise<IAdmin | null> {
        return await Admin.findByIdAndUpdate(id, adminData, { new: true });
    }

    async deleteAdmin(id: string): Promise<IAdmin | null> {
        return await Admin.findByIdAndDelete(id);
    }
}

export default new AdminService();

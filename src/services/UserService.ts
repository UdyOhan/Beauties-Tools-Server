import User from '../models/User';
import { IUser } from '../interfaces/IUser';
import slugify from 'slugify';

class UserService {
    async createUser(userData: IUser): Promise<IUser> {
        const user = new User({
            ...userData,
            slug: slugify(userData.username, { lower: true, strict: true })
        });
        return await user.save();
    }

    async getUsers(queryParams: any): Promise<{ users: IUser[], total: number }> {
        const { firstname, lastname, username, email, address, page, limit } = queryParams;

        let query = User.find();

        if (firstname) {
            query = query.where('firstname').regex(new RegExp(firstname, 'i'));
        }

        if (lastname) {
            query = query.where('lastname').regex(new RegExp(lastname, 'i'));
        }

        if (username) {
            query = query.where('username').regex(new RegExp(username, 'i'));
        }

        if (email) {
            query = query.where('email').regex(new RegExp(email, 'i'));
        }

        if (address) {
            query = query.where('address').regex(new RegExp(address, 'i'));
        }

        const pageNumber = page ? parseInt(page, 10) : 1;
        const pageSize = limit ? parseInt(limit, 10) : 10;

        const total = await query.clone().countDocuments(); // Count total documents that match the query
        const users = await query.skip((pageNumber - 1) * pageSize).limit(pageSize).exec();

        return { users, total };
    }

    async getUserBySlug(slug: string): Promise<IUser | null> {
        return await User.findOne({ slug });
    }

    async getUserById(id: string): Promise<IUser | null> {
        return await User.findById(id);
    }

    async updateUser(id: string, userData: Partial<IUser>): Promise<IUser | null> {
        if (userData.username) {
            userData.slug = slugify(userData.username, { lower: true, strict: true });
        }
        return await User.findByIdAndUpdate(id, userData, { new: true });
    }

    async deleteUser(id: string): Promise<IUser | null> {
        return await User.findByIdAndDelete(id);
    }
}

export default new UserService();

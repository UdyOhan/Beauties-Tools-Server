import { Schema, model } from 'mongoose';
import { IAdmin } from '../interfaces/IAdmin';

const AdminSchema = new Schema<IAdmin>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Admin = model<IAdmin>('Admin', AdminSchema);

export default Admin;
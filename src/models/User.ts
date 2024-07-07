import { Schema, model, Document } from 'mongoose';
import { IUser } from '../interfaces/IUser';

const UserSchema = new Schema<IUser>({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    slug:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = model<IUser>('User', UserSchema);

export default User;
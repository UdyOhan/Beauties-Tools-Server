import { IUser } from "./IUser";
import { Document } from 'mongoose';

export interface IAdmin extends Document{
    user: string | IUser,
    slug: string,
}

export const dbname = "admin";
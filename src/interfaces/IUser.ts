import { ObjectId } from "mongodb";
import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document{
    slug: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    address: string;
    password: string;
}

export const dbname = "users";
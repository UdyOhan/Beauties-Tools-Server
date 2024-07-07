
import { Document } from 'mongoose';

export interface IBrand extends Document{
    name: string,
    slug: string,
    logo: string,
}

export const dbname = "brands";
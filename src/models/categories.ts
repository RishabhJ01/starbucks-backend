import mongoose, {Schema, Document} from 'mongoose';

export interface ICategories extends Document{
    _id: Schema.Types.ObjectId,
    name: string,
    coffees: object
};


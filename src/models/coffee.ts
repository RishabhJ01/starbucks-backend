import mongoose, {Schema, Document} from "mongoose";
import {IOption} from "./options"

export interface IRecipe extends Document{
    option: Schema.Types.ObjectId,
    value: Schema.Types.ObjectId,
}
export interface ICoffee extends Document{
    _id: Schema.Types.ObjectId,
    name: String,
    recipe: Array<IRecipe>,
    optionList: Array<Object>
}

const CoffeeSchema = new Schema<ICoffee>({
    _id: {
        type: Schema.Types.ObjectId,
    },
    name: {
        type: String,
        require: true,
    },
    recipe: [],
    optionList: [
        {
            category: {
                type: String,
            },
            options: {

            }
        }
    ]
}, {timestamps: true});

export const Coffee = mongoose.model<ICoffee>('Coffee', CoffeeSchema);
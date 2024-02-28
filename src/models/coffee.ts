import mongoose, {Schema, Document} from "mongoose";

export interface IRecipe extends Document{
    option: Schema.Types.ObjectId,
    value: Schema.Types.ObjectId,
}
export interface ICoffee extends Document{
    _id: Schema.Types.ObjectId,
    name: String,
    recipe: Array<IRecipe>,
    category: String,
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
    category: {
        type: String,
        require: true
    },
    recipe: [],
    optionList: []
}, {timestamps: true});

export const Coffee = mongoose.model<ICoffee>('Coffee', CoffeeSchema);
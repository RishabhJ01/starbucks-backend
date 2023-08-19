import mongoose, {Schema, Document} from "mongoose";

export interface ICoffee extends Document{
    _id: Schema.Types.ObjectId,
    name: String,
    options: object
}

const CoffeeSchema = new Schema<ICoffee>({
    _id: {
        type: Schema.Types.ObjectId,
    },
    name: {
        type: String,
        require: true,
    },
    options: [
        {
            optionName: {
                type: String
            },
            values: {
                type: String
            }
        }
    ]
}, {timestamps: true});

export const Coffee = mongoose.model<ICoffee>('Coffee', CoffeeSchema);
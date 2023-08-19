import mongoose, {Schema, Document} from "mongoose";

export interface IOptions extends Document{
    name: string,
    values: object
}

const OptionSchema = new Schema<IOptions>({
    name: {
        type: String,
        required: true,
    },
    values: []
}, {timestamps: true})
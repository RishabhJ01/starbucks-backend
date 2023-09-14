import mongoose, {Schema, Document, Types, Model} from "mongoose";

export interface IOption extends Document{
    _id: Schema.Types.ObjectId,
    name: string,
    values: Types.DocumentArray<IValue>
}

export interface IValue extends Document{
    _id: Schema.Types.ObjectId,
    name: String
}

const OptionSchema = new Schema<IOption, Model<IOption>>({
    _id: {
        type: Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    values: [{
        name: {
            type: String,
            required: true
        }
    }]
}, {timestamps: true});

export const Option = mongoose.model<IOption>('Option', OptionSchema)
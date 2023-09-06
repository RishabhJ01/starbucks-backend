import mongoose, {Schema, Document} from "mongoose";

export interface IOption extends Document{
    _id: Schema.Types.ObjectId,
    name: string,
    values: object
}

const OptionSchema = new Schema<IOption>({
    _id: {
        type: Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    values: []
}, {timestamps: true});

export const Option = mongoose.model<IOption>('Option', OptionSchema)
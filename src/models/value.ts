import mongoose, {Schema, Document} from "mongoose";

export interface IValue extends Document{
    _id: Schema.Types.ObjectId,
    name: string
}

const ValueSchema = new Schema<IValue>({
    _id: {
        type: Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true,
        unique: true,
    }
}, {timestamps: true});

export const Value = mongoose.model<IValue>('Value', ValueSchema)
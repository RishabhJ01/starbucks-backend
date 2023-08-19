import mongoose, {Schema, Document} from "mongoose";
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    _id: Schema.Types.ObjectId,
    email: string,
    password: string,
    phone: string,
    first_name: string,
    last_name: string,
    address: string,
    city: string,
    state: string,
    country: string,
    postalCode: string
}

const UserSchema = new Schema<IUser>({
    _id: {
        type: Schema.Types.ObjectId,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    postalCode:{
        type: String,
        required: true,
    }
}, {timestamps: true});

UserSchema.pre<IUser>('save', async function (next){
    if (!this.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
})

export const User = mongoose.model<IUser>('Users', UserSchema);


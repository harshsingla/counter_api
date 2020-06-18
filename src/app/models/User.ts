import mongoose from 'mongoose'

export type UserDocument = mongoose.Document & {
    name: string;
    email: string;
    counter: number;
}

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true },
    counter: { type: Number, default: 0 }
}, { timestamps: true });

export const User = mongoose.model<UserDocument>("users", userSchema);
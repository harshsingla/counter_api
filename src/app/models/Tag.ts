import mongoose from 'mongoose'

export type TagDocument = mongoose.Document & {
    name: string;
    orgId: string;
    userId: string;
}

const tagSchema = new mongoose.Schema({
    name: { type: String, required: true },
    orgId: { type: String, ref: 'organizations', required: true },
    userId: { type: String, ref: 'users', required: true },
}, { timestamps: true });

export const Tag = mongoose.model<TagDocument>("tags", tagSchema);
import mongoose from 'mongoose'

export type ProjectDocument = mongoose.Document & {
    name: string;
    orgId: string;
    userId: string;
}

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    orgId: { type: String, ref: 'organizations', required: true },
    userId: { type: String, ref: 'users', required: true },
}, { timestamps: true });

export const Project = mongoose.model<ProjectDocument>("projects", projectSchema);
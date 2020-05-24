import mongoose from 'mongoose'

export type TaskDocument = mongoose.Document & {
    name: string;
    description: string;
    projectId: string;
    orgId: string;
    parentTask: string;
    childTask: string[];
    tags: string[];
    assignees: string[];
    assignedDate: Date;
    progress: string;
}

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    projectId: { type: String, ref: 'projects', required: true },
    orgId: { type: String, ref: 'organizations', required: true },
    parentTask: { type: String, default: null },
    childTask: [{ type: String }],
    tags: [{ type: String }],
    assignees: [{ type: String }],
    assignedDate: { type: Date, default: Date.now },
    progress: { type: String }
}, { timestamps: true });

export const Task = mongoose.model<TaskDocument>("tasks", taskSchema);
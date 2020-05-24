import mongoose from 'mongoose'

export type OrganizationDocument = mongoose.Document & {
    name: string;
    userId: string;
    description: string;
    websiteURL: string;
}

const organizationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: String, ref: 'users', required: true },
    description: { type: String },
    websiteURL: { type: String }
}, { timestamps: true });

export const Organization = mongoose.model<OrganizationDocument>("organizations", organizationSchema);
import mongoose from 'mongoose'
interface CRUD {
    create: boolean,
    read: boolean,
    update: boolean,
    delete: boolean,
}
export type PermissionDocument = mongoose.Document & {
    orgId: string;
    userId: string;
    projectId: string;
    crud: CRUD;
}

const permissionSchema = new mongoose.Schema({
    orgId: { type: String, ref: 'organizations', required: true },
    userId: { type: String, ref: 'users', required: true },
    projectId: { type: String, ref: 'users', required: true },
    crud: {
        create: { type: Boolean, default: true },
        read: { type: Boolean, default: true },
        update: { type: Boolean, default: true },
        delete: { type: Boolean, default: true },
    }
});

export const Permission = mongoose.model<PermissionDocument>("permissions", permissionSchema);
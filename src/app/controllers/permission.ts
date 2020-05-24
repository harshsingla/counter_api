import { Permission, PermissionDocument } from "../models/permission";
import { errorObj, successObj, BodyData } from "../../config/settings";
import _ from "lodash";


let permissionCtrl = {
    add: (data: BodyData) => {
        return new Promise(async (resolve) => {
            const entity: PermissionDocument = new Permission();
            _.each(data, (value: any, key: keyof PermissionDocument) => {
                (entity[key] as PermissionDocument) = value;
            });
            entity.save(async (err: Error, doc: PermissionDocument) => {
                if (err || !doc) {
                    return resolve({ ...errorObj, message: "Error saving permission details" });
                }
                return resolve({ ...successObj, message: "Permission added successfully", data: doc });
            });

        });
    },
    update: (id: string, data: PermissionDocument) => {
        return new Promise(async (resolve) => {
            Permission.updateOne({ _id: id }, async (err: Error, doc: PermissionDocument) => {
                if (err || !doc) {
                    return resolve({ ...errorObj, message: "Permission not found" });
                }
                _.each(data, (value: any, key: keyof PermissionDocument) => {
                    (doc[key] as PermissionDocument) = value;
                });
                doc.save(async (error: Error, updatedDoc: PermissionDocument) => {
                    if (err || !updatedDoc) {
                        return resolve({ ...errorObj, message: "Permission not found" });
                    }
                    return resolve({ ...successObj, message: "Permission updated successfully", data: doc });
                });
            })
        });
    },
    getById: (data: BodyData) => {
        return new Promise(async (resolve) => {
            Permission.findOne({ ...data }, async (err: Error, doc: PermissionDocument) => {
                if (err || !doc) {
                    return resolve({ ...errorObj, message: "Permission not found" });
                }
                return resolve({ ...successObj, message: "Permission fetched successfully", data: doc });
            })
        });
    },
    list: (data: BodyData) => {
        return new Promise(async (resolve) => {
            Permission.find({ ...data }, async (err: Error, docs: PermissionDocument[]) => {
                if (err) {
                    return resolve({ ...errorObj, message: "Error in fetching permissions" });
                }
                return resolve({ ...successObj, message: "Permissions fetched successfully", data: docs });
            })
        });
    }
}
export default permissionCtrl;
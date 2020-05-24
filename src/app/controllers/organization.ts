import { Organization, OrganizationDocument } from "../models/Organization";
import { errorObj, successObj, BodyData } from "../../config/settings";
import _ from "lodash";


let organizationCtrl = {
    add: (data: BodyData) => {
        return new Promise(async (resolve) => {
            const entity: OrganizationDocument = new Organization();
            _.each(data, (value: any, key: keyof OrganizationDocument) => {
                (entity[key] as OrganizationDocument) = value;
            });
            entity.save(async (err: Error, doc: OrganizationDocument) => {
                if (err || !doc) {
                    return resolve({ ...errorObj, message: "Error saving organization details" });
                }
                return resolve({ ...successObj, message: "Organization added successfully", data: doc });
            });

        });
    },
    update: (id: string, data: OrganizationDocument) => {
        return new Promise(async (resolve) => {
            Organization.updateOne({ _id: id }, async (err: Error, doc: OrganizationDocument) => {
                if (err || !doc) {
                    return resolve({ ...errorObj, message: "Organization not found" });
                }
                _.each(data, (value: any, key: keyof OrganizationDocument) => {
                    (doc[key] as OrganizationDocument) = value;
                });
                doc.save(async (error: Error, updatedDoc: OrganizationDocument) => {
                    if (err || !updatedDoc) {
                        return resolve({ ...errorObj, message: "Organization not found" });
                    }
                    return resolve({ ...successObj, message: "Organization updated successfully", data: doc });
                });
            })
        });
    },
    getById: (data: BodyData) => {
        return new Promise(async (resolve) => {
            Organization.findOne({ ...data }, async (err: Error, doc: OrganizationDocument) => {
                if (err || !doc) {
                    return resolve({ ...errorObj, message: "Organization not found" });
                }
                return resolve({ ...successObj, message: "Organization fetched successfully", data: doc });
            })
        });
    },
    list: (data: BodyData) => {
        return new Promise(async (resolve) => {
            Organization.find({ ...data }, async (err: Error, docs: OrganizationDocument[]) => {
                if (err) {
                    return resolve({ ...errorObj, message: "Error in fetching organizations" });
                }
                return resolve({ ...successObj, message: "Organizations fetched successfully", data: docs });
            })
        });
    }
}
export default organizationCtrl;
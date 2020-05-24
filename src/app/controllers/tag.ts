import { Tag, TagDocument } from "../models/Tag";
import { errorObj, successObj, BodyData } from "../../config/settings";
import _ from "lodash";


let tagCtrl = {
    add: (data: BodyData) => {
        return new Promise(async (resolve) => {
            const entity: TagDocument = new Tag();
            _.each(data, (value: any, key: keyof TagDocument) => {
                (entity[key] as TagDocument) = value;
            });
            entity.save(async (err: Error, doc: TagDocument) => {
                if (err || !doc) {
                    return resolve({ ...errorObj, message: "Error saving tag details" });
                }
                return resolve({ ...successObj, message: "Tag added successfully", data: doc });
            });

        });
    },
    update: (id: string, data: TagDocument) => {
        return new Promise(async (resolve) => {
            Tag.updateOne({ _id: id }, async (err: Error, doc: TagDocument) => {
                if (err || !doc) {
                    return resolve({ ...errorObj, message: "Tag not found" });
                }
                _.each(data, (value: any, key: keyof TagDocument) => {
                    (doc[key] as TagDocument) = value;
                });
                doc.save(async (error: Error, updatedDoc: TagDocument) => {
                    if (err || !updatedDoc) {
                        return resolve({ ...errorObj, message: "Tag not found" });
                    }
                    return resolve({ ...successObj, message: "Tag updated successfully", data: doc });
                });
            })
        });
    },
    getById: (data: BodyData) => {
        return new Promise(async (resolve) => {
            Tag.findOne({ ...data }, async (err: Error, doc: TagDocument) => {
                if (err || !doc) {
                    return resolve({ ...errorObj, message: "Tag not found" });
                }
                return resolve({ ...successObj, message: "Tag fetched successfully", data: doc });
            })
        });
    },
    list: (data: BodyData) => {
        return new Promise(async (resolve) => {
            Tag.find({ ...data }, async (err: Error, docs: TagDocument[]) => {
                if (err) {
                    return resolve({ ...errorObj, message: "Error in fetching tags" });
                }
                return resolve({ ...successObj, message: "Tags fetched successfully", data: docs });
            })
        });
    }
}
export default tagCtrl;
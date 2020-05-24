import { Project, ProjectDocument } from "../models/Project";
import { errorObj, successObj, BodyData } from "../../config/settings";
import _ from "lodash";


let projectCtrl = {
    add: (data: BodyData) => {
        return new Promise(async (resolve) => {
            const entity: ProjectDocument = new Project();
            _.each(data, (value: any, key: keyof ProjectDocument) => {
                (entity[key] as ProjectDocument) = value;
            });
            entity.save(async (err: Error, doc: ProjectDocument) => {
                if (err || !doc) {
                    return resolve({ ...errorObj, message: "Error saving project details" });
                }
                return resolve({ ...successObj, message: "Project added successfully", data: doc });
            });

        });
    },
    update: (id: string, data: ProjectDocument) => {
        return new Promise(async (resolve) => {
            Project.updateOne({ _id: id }, async (err: Error, doc: ProjectDocument) => {
                if (err || !doc) {
                    return resolve({ ...errorObj, message: "Project not found" });
                }
                _.each(data, (value: any, key: keyof ProjectDocument) => {
                    (doc[key] as ProjectDocument) = value;
                });
                doc.save(async (error: Error, updatedDoc: ProjectDocument) => {
                    if (err || !updatedDoc) {
                        return resolve({ ...errorObj, message: "Project not found" });
                    }
                    return resolve({ ...successObj, message: "Project updated successfully", data: doc });
                });
            })
        });
    },
    getById: (data: BodyData) => {
        return new Promise(async (resolve) => {
            Project.findOne({ ...data }, async (err: Error, doc: ProjectDocument) => {
                if (err || !doc) {
                    return resolve({ ...errorObj, message: "Project not found" });
                }
                return resolve({ ...successObj, message: "Project fetched successfully", data: doc });
            })
        });
    },
    list: (data: BodyData) => {
        return new Promise(async (resolve) => {
            Project.find({ ...data }, async (err: Error, docs: ProjectDocument[]) => {
                if (err) {
                    return resolve({ ...errorObj, message: "Error in fetching projects" });
                }
                return resolve({ ...successObj, message: "Projects fetched successfully", data: docs });
            })
        });
    }
}
export default projectCtrl;
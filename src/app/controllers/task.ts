import { Task, TaskDocument } from "../models/Task";
import { errorObj, successObj, BodyData } from "../../config/settings";
import _ from "lodash";


let taskCtrl = {
    add: (data: BodyData) => {
        return new Promise(async (resolve) => {
            const entity: TaskDocument = new Task();
            _.each(data, (value: any, key: keyof TaskDocument) => {
                (entity[key] as TaskDocument) = value;
            });
            entity.save(async (err: Error, doc: TaskDocument) => {
                if (err || !doc) {
                    return resolve({ ...errorObj, message: "Error saving task details" });
                }
                return resolve({ ...successObj, message: "Task added successfully", data: doc });
            });

        });
    },
    update: (id: string, data: TaskDocument) => {
        return new Promise(async (resolve) => {
            Task.updateOne({ _id: id }, async (err: Error, doc: TaskDocument) => {
                if (err || !doc) {
                    return resolve({ ...errorObj, message: "Task not found" });
                }
                _.each(data, (value: any, key: keyof TaskDocument) => {
                    (doc[key] as TaskDocument) = value;
                });
                doc.save(async (error: Error, updatedDoc: TaskDocument) => {
                    if (err || !updatedDoc) {
                        return resolve({ ...errorObj, message: "Task not found" });
                    }
                    return resolve({ ...successObj, message: "Task updated successfully", data: doc });
                });
            })
        });
    },
    getById: (data: BodyData) => {
        return new Promise(async (resolve) => {
            Task.findOne({ ...data }, async (err: Error, doc: TaskDocument) => {
                if (err || !doc) {
                    return resolve({ ...errorObj, message: "Task not found" });
                }
                return resolve({ ...successObj, message: "Task fetched successfully", data: doc });
            })
        });
    },
    list: (data: BodyData) => {
        return new Promise(async (resolve) => {
            Task.find({ ...data }, async (err: Error, docs: TaskDocument[]) => {
                if (err) {
                    return resolve({ ...errorObj, message: "Error in fetching tasks" });
                }
                return resolve({ ...successObj, message: "Tasks fetched successfully", data: docs });
            })
        });
    }
}
export default taskCtrl;
import jwt from "jsonwebtoken";
import { User, UserDocument } from "../models/User";
import { errorObj, successObj, secret, BodyData } from "../../config/settings";
import _ from "lodash";


let userCtrl = {
    add: (data: BodyData) => {
        return new Promise(async (resolve) => {
            const entity: UserDocument = new User();
            _.each(data, (value: any, key: keyof UserDocument) => {
                (entity[key] as UserDocument) = value;
            });
            entity.save(async (err: Error, doc: UserDocument) => {
                if (err || !doc) {
                    return resolve({ ...errorObj, message: "Error Saving User Details" });
                }
                return resolve({ ...successObj, message: "User added successfully", data: doc });
            });

        });
    },
    update: (id: string, data: UserDocument) => {
        return new Promise(async (resolve) => {
            User.updateOne({ _id: id }, async (err: Error, doc: UserDocument) => {
                if (err || !doc) {
                    return resolve({ ...errorObj, message: "user not found" });
                }
                _.each(data, (value: any, key: keyof UserDocument) => {
                    (doc[key] as UserDocument) = value;
                });
                doc.save(async (error: Error, updatedDoc: UserDocument) => {
                    if (err || !updatedDoc) {
                        return resolve({ ...errorObj, message: "user not found" });
                    }
                    return resolve({ ...successObj, message: "User updated successfully", data: doc });
                });
            })
        });
    },
    getById: (data: BodyData) => {
        return new Promise(async (resolve) => {
            User.findOne({ ...data }, async (err: Error, doc: UserDocument) => {
                if (err || !doc) {
                    return resolve({ ...errorObj, message: "user not found" });
                }
                return resolve({ ...successObj, message: "user fetched successfully", data: doc });
            })
        });
    },
    list: (data: BodyData) => {
        return new Promise(async (resolve) => {
            User.find({ ...data }, async (err: Error, docs: UserDocument[]) => {
                if (err) {
                    return resolve({ ...errorObj, message: "Error in fetching users" });
                }
                return resolve({ ...successObj, message: "Users fetched successfully", data: docs });
            })
        });
    },
    loginWithPassword: (data: BodyData) => (new Promise((resolve) => {
        const { email, password } = data;
        const error = "wrong email or password";
        let query = User.findOne({ email })
        query.exec(function (err, user) {
            if (!user) return resolve({ ...errorObj, message: error });

            user.comparePassword(password).then(({ err, isMatch }) => {

                if (!isMatch) {
                    return resolve({ ...errorObj, message: "Invalid password" });
                }

                const JWTToken = jwt.sign({
                    _id: user._id,
                    email: user.email,
                    userType: user.userType
                },
                    secret,
                    {
                        expiresIn: "365d",
                    });

                return resolve({
                    ...successObj,
                    token: JWTToken,
                    user: {
                        _id: user._id,
                        email: user.email,
                        userType: user.userType
                    },
                });

            });

        });
    }))
}
export default userCtrl;
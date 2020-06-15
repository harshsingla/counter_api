import mongoose from 'mongoose'
import bcrypt from "bcrypt-nodejs"

enum Gender {
    Male, Female
}
enum Usertype {
    'Admin', 'Member', 'Limited', 'Guest'
}
type comparePasswordFunction = (candidatePassword: string) => Promise<any>;
const comparePassword: comparePasswordFunction = function (candidatePassword) {

    return new Promise((resolve => {
        bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
            resolve({
                err, isMatch
            });
        });
    }));

};
export type UserDocument = mongoose.Document & {
    fullName: string;
    email: string;
    userType: Usertype;
    password: string;
    comparePassword: comparePasswordFunction;
    companyName: string;
    orgId: string;
}

const userSchema = new mongoose.Schema({
    fullName: String,
    email: { type: String, required: true, unique: true },
    userType: { type: String, default: 'Admin', enum: ['Admin', 'Member', 'Limited', 'Guest'] },
    password: { type: String, required: true },
    companyName: { type: String },
    orgId: { type: String, ref: 'organizations' },
}, { timestamps: true });

userSchema.pre("save", function save(next) {
    const user = this as UserDocument;
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            return next();
        });
    });
});
userSchema.post("save", function save(doc: UserDocument, next) {
    doc.password = '*****'
    return next()
});
userSchema.post("update", function save(doc: UserDocument, next) {
    doc.password = '*****'
    return next()
});
userSchema.methods.comparePassword = comparePassword;
export const User = mongoose.model<UserDocument>("users", userSchema);
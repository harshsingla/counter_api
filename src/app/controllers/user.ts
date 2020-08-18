import { User, UserDocument } from "../models/User";
import { errorObj, successObj, secret, BodyData, ApiResp } from "../../config/settings";
import _ from "lodash";
import { CronJob } from 'cron';

let userCtrl = {
    add: (data: BodyData) => {
        return new Promise(async (resolve) => {
            const { name, email, counter }: any = data
            const userObj = { name, email }
            const updateObj: any = { name, email }
            if (counter !== undefined)
                updateObj.counter = counter
            User.findOneAndUpdate(userObj, { ...updateObj }, { upsert: true, new: true }, async (err: any, doc: UserDocument) => {
                if (err || !doc) {
                    return resolve({ ...errorObj, message: "Error Saving User Details" });
                }
                return resolve({ ...successObj, message: "User added successfully", data: doc });
            });

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
    AutoIncrementCounter: () => {
        return new Promise(async (resolve) => {
            User.updateMany({}, { $inc: { counter: 1 } }).exec((err, res)=>{
                resolve()
            })
        });
    },
}
export default userCtrl;

var job = new CronJob('0 14 * * *', function () {
    console.log('Cron job started')
    userCtrl.AutoIncrementCounter();
}, null, true, 'America/Los_Angeles');
job.start();
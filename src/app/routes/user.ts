import userCtrl from "../controllers/user";
import { Request, Response } from "express";

export default (app: any) => {
    app
        .route("/user")
        .get(async (req: Request, res: Response) => {
            const { query } = req;
            let resp = await userCtrl.list({ ...query });
            res.json(resp);
        });
    app
        .route("/user/:id")
        .post(async (req: Request, res: Response) => {
            let { body } = req;
            if (body.password)
                delete body.password
            let resp = await userCtrl.add({ ...body });
            res.json(resp);
        })
        .get(async (req: Request, res: Response) => {
            const { query } = req;
            let resp = await userCtrl.list({ ...query });
            res.json(resp);
        });

}
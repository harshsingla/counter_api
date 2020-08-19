import userCtrl from "../controllers/user";
import { Request, Response } from "express";

export default (app: any) => {
    app
        .route("/user")
        .post(async (req: Request, res: Response) => {
            let { body } = req;
            let resp = await userCtrl.add({ ...body });
            res.json(resp);
        })
        .get(async (req: Request, res: Response) => {
            const { query }: any = req;
            let resp = await userCtrl.list({ ...query });
            res.json(resp);
        });
    app
        .route("/")
        .get(async (req: Request, res: Response) => {

            res.send('Hello');
        });

}
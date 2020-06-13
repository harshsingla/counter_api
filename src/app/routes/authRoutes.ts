import userCtrl from "../controllers/user";
import { Request, Response } from "express";

export default (app: any) => {
    app
        .route("/signup")
        .post(async (req: Request, res: Response) => {
            const { body } = req;
            let resp = await userCtrl.add({ ...body });
            res.json(resp);
        })
    app
        .route("/loginWithPassword")
        .post(async (req: Request, res: Response) => {
            const { email, password } = req.body;
            let resp = await userCtrl.loginWithPassword({ email, password });
            res.json(resp);
        });
}
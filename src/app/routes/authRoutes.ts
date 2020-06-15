import userCtrl from "../controllers/user";
import { Request, Response } from "express";
import passport from "../../utils/passport";

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
    app
        .get('/signinWithGoogle', passport.authenticate('google', { scope: ['profile', 'email'] }));

    app
        .get('/google/callback',
            passport.authenticate('google'),
            function (req: any, res: any) {
                // Successful authentication, redirect home.
                res.json({ message: 'failed' });
            });
}
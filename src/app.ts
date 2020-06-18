import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import path from 'path';
import { MONGODB_URI, SESSION_SECRET } from "./utils/secrets";
import cors from "cors";
import userRoutes from "./app/routes/user";
import mongoose from "mongoose";
import morgan from "morgan";

const app = express();

const rejectFolders = [
    "css",
    "bower_components",
    "js",
    "img",
    "fonts",
    "images"
];

// removing static resources from the logger
app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms", {
        skip: req => rejectFolders.indexOf(req.url.split("/")[1]) !== -1
    })
);
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('MongoDB Connected')
}).catch(err => {
    console.warn("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    preflightContinue: true
}));
app.set("port", process.env.PORT);
app.set("ws_port", process.env.WS_PORT);

app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: SESSION_SECRET
    })
);
app.use(
    express.static(path.join(__dirname, "../public"), { maxAge: 31557600000 })
);
mongoose.set('debug', true)

userRoutes(app)

export default app;

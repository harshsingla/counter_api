import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import path from 'path';
import { MONGODB_URI, SESSION_SECRET } from "./utils/secrets";
import cors from "cors";
import userRoutes from "./app/routes/user";
import authRoutes from "./app/routes/authRoutes";
import checkToken from './utils/checkToken'
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import mongoose from "mongoose";
import logger from "./utils/logger";
// Controllers (route handlers)
// import {config} from './config/settings'
// console.log = (...args: any[]) => logger.info.call(logger, ...args);
console.info = (...args: any[]) => logger.info.call(logger, ...args);
console.warn = (...args: any[]) => logger.warn.call(logger, ...args);
console.error = (...args: any[]) => logger.error.call(logger, ...args);
console.debug = (...args: any[]) => logger.debug.call(logger, ...args);

const app = express();
const swaggerDocument = YAML.load("./swagger.yaml");

/* const rejectFolders = [
    "css",
    "bower_components",
    "js",
    "img",
    "fonts",
    "images"
]; */

// removing static resources from the logger
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('MongoDB Connected')
}).catch(err => {
    console.warn("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
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

// mongoose.set('debug', true)

app.get('/', checkToken);
userRoutes(app)
authRoutes(app)
// app.use("/main-docs", express.static(path.join(__dirname, "../", "docs")));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;

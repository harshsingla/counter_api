import { createLogger, format, LoggerOptions, transports } from "winston";
const options: LoggerOptions = {
    level: 'silly',
    format: format.combine(
        format.colorize(),
        format.prettyPrint(),
        format.json()
    ),
    transports: [
        new transports.Console({
            level: process.env.NODE_ENV === "production" ? "error" : "debug"
        }),
        new transports.File({ filename: "debug.log", level: "debug" })
    ]
};

const logger = createLogger(options);

if (process.env.NODE_ENV !== "production") {
    logger.debug("Logging initialized at debug level");
}


export default logger;
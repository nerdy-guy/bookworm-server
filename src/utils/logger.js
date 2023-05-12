import winston from "winston";

let alignColorsAndTime = winston.format.combine(
  winston.format.colorize({
    all: true,
  }),
  winston.format.timestamp({
    format: "YY-MM-DD hh:mm:ss A",
  }),
  winston.format.printf(
    (info) => `[${info.timestamp}]  ${info.level} : ${info.message}`
  )
);

const logger = winston.createLogger({
  level: "debug",
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        alignColorsAndTime
      ),
    }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

export default logger;

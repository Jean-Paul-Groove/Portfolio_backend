const { createLogger, format, transports } = require("winston");

export const logger = createLogger({
  level: "info",
  format: format.combine(
    format.colorize({ all: true }),
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.json(),
    format.align()
  ),
  transports: [
    new transports.File({ filename: "logs.log" }),
    new transports.console(),
  ],
});

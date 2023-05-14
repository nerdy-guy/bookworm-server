import { isHttpError } from "http-errors";
import logger from "../utils/logger.js";

// handle all errors

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  logger.error(error.message);
  let errorMessage = "An error occurred";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
};

export default errorHandler;

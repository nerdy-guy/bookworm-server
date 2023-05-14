import createHttpError from "http-errors";

// handle not found routes
const notFoundHandler = (req, res, next) => {
  next(createHttpError(404, "This page doesn't exist"));
};

export default notFoundHandler;

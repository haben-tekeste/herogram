import CustomError from "../errors/CustomError.js";
import { RequestValidationError } from "../errors/RequestValidationError.js";

export const errorHandler = (
  err ,
  req,
  res,
  next
) => {
  if (err instanceof RequestValidationError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  return res.status(400).send("Something went wrong");
};
import { RequestValidationError } from "../errors/RequestValidationError.js";
import { validationResult } from "express-validator";

export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array())
       throw new RequestValidationError(errors.array());
    }
    next();
}
import  CustomError  from "./CustomError.js";

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor( errors) {
    this.errors = errors
    super();

    // because we are extending to built-in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors() {
    return this.errors.map((error) => {
      return {
        message: error.msg,
        field: error.param,
      };
    });
  }
}
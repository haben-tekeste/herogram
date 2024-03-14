export default  class CustomError extends Error {
     statusCode;
  
    constructor(errors) {
      super();
  
      //
      Object.setPrototypeOf(this, CustomError.prototype);
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
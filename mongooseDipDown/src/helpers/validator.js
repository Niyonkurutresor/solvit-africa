// import appError froutil/apperror.js";
import out from "./response.js";

export default (schema, userData, res, next) => {
  const { error} = schema.validate(userData);
    if(error) return next(error)
   next();
};

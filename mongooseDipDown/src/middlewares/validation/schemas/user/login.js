import Joi from "joi";
import appError from "../../../../util/apperror.js";

const loginSchema = Joi.object({
                    email: Joi.string().lowercase().email().required()
                        .error(new appError(403,'Fail','Please provide valid email')),
                    password: Joi.string().required()
                        .error(new appError(403,'Fail','Please provide password'))
                });

export default loginSchema;
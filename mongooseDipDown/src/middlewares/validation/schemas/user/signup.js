import Joi from "joi";
import appError from "../../../../util/apperror.js";

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

const signiup = Joi.object({
                email: Joi.string().trim().email().lowercase().required()
                    .error(new appError(403,'Fail','Provide valid email please')),
                role: Joi.string(),
                password: Joi.string().regex(passwordRegex).required()
                    .error(new appError(403,'Fail','Password must contain atleast one capital Letter,symbol,number and not less than 8 character')),
                confirmPassword: Joi.string().required().valid(Joi.ref('password'))
                    .error(new appError(403,'Fail','Please confirm password correct.'))
            });

export default signiup;
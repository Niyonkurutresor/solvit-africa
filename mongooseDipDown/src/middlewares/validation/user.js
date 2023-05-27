import validator from "../../helpers/validator.js";
import userSignupSchema from "./schemas/user/signup.js";
import userLoginSchema from "./schemas/user/login.js"


const userSignupvalidator = (req,res,next)=>{
    validator(userSignupSchema, req.query,res,next)
}

const userLoginValidator = (req,res,next)=>{
    validator(userLoginSchema,req.query,res,next)
}

export {userSignupvalidator,userLoginValidator}
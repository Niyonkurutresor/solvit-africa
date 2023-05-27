import createToureSchema from './schemas/toure/createTore.js';
import updateToure from './schemas/toure/updateToure.js';
import validator from '../../helpers/validator.js';

const createToureValidation =(req,res,next)=>{
    validator(createToureSchema,req.query,res,next)
}

const updateToureVAlidation = (req,res,next)=>{
    validator(updateToure,req.query,res,next)
}

export {createToureValidation,updateToureVAlidation}
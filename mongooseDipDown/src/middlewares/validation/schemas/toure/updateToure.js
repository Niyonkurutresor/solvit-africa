import Joi from 'joi';
import appError from '../../../../util/apperror.js';
import { Schema } from 'mongoose';

const schema =  Joi.object({
    name: Joi.string().min(5).max(100).trim()
        .error(new appError(403,'Fail','Please insert your name')),
    location: Joi.string().trim()
        .error(new appError(403,'Fail','insert location name')),
    price: Joi.number()
        .error(new appError(403,'Fail','Please file the price for toure')),
    ratings: Joi.number()
        .error(new appError(403,'Fail','Please set rating')),
    createdAt:Joi.date()
        .error(new appError(403,'Fail','There is no creation date')),
    image: Joi.string()
        .error(new appError(403,'Fail','Please insert profile image')),
    startDate: Joi.date()
        .error(new appError(403,'Fail','Please file start Date fo toure')),
    duration: Joi.number()
        .error(new appError(403,'Fail','Please fill duration of toure')),
    groupsize:Joi.number()
        .error(new appError(403,'Fail','Please fill gourpsize to access the toure')),
    summary:Joi.string().trim()
        .error(new appError(403,'Fail','Samary of toure is required')),
    description: Joi.number()
        .error(new appError(403,'Fail','Description of toure is required')),
    imageCover: Joi.string()
        .error(new appError(403,'Fail','Toure images are required.')),
}).options({allowUnknown:false})

export default schema
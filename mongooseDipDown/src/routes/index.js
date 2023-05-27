import express from 'express';
import toure from './toure.js';
import user from './users.js';
import guider from './guider.js';
import reveiws from './review.js'
import { errorController } from '../controller/errorControlller.js';
import appError from '../util/apperror.js';

const routs = express();

routs.use('/toure',toure);
routs.use('/user',user);
routs.use('/guider',guider);
routs.use('/review',reveiws);

routs.all('*',(req,res,next)=>{ 
   const err = new appError(404,'ERROR',`Coulden't ${req.method} data on ${req.originalUrl} incorect method or rout`)
    next(err)
})
routs.use(errorController)

export default routs
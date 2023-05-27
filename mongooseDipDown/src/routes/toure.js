import express from 'express';
import toureController from '../controller/toure.js';
import reviewRouter from '../routes/review.js'
import {createToureValidation,updateToureVAlidation} from '../middlewares/validation/toure.js';
import { isLoggedIn } from '../middlewares/authorization.js';
import { only } from '../middlewares/authontication.js';

const routs = express()

routs.use('/:toureId/review',reviewRouter)

routs.get('/all',isLoggedIn,only('admin'),toureController.getAllToure)
routs.get('/singleToure/:id',isLoggedIn,only('user','guide','admin'),toureController.getSingleToure)
routs.get('/specific',isLoggedIn,only('user','guide','admin'),toureController.specificToure)
routs.get('/statistic',toureController.aggregating)
routs.get('/unwind',toureController.unwind)
routs.post('/createToure',createToureValidation,isLoggedIn,only('admin'),toureController.createToure)
routs.delete('/delete/:id',isLoggedIn,only('admin'),toureController.deleteToure)
routs.patch('/update/:id',updateToureVAlidation,isLoggedIn,only('admin'),toureController.updateToure)
     
export default routs
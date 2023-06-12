import express from 'express'
import userController from '../controller/userController.js'
import { userSignupvalidator,userLoginValidator } from "../middlewares/validation/user.js";
import { isLoggedIn } from '../middlewares/authorization.js';
import { only } from '../middlewares/authontication.js';
import signUserid from '../helpers/signUserId.js';


const rout = express();

rout.post('/signup',userSignupvalidator,userController.signup);
rout.post('/login',userLoginValidator,userController.login);

rout.post('/forgotPassword',userController.forgotPassword);
rout.patch('/resetPassword/:randomToken',userController.resetPassword);

rout.use(isLoggedIn); // the rest of the rout you must log in in older to perform actions

rout.patch('/updatePassword',userController.updatePassword);
rout.patch('/updateUserInformation',userController.updateUserInformation);

rout.get('/me',userController.getSingleUser);
rout.get('/:id',only('admin'),signUserid,userController.getSingleUser);
rout.get('/',only('admin'),userController.getAllUsers);
rout.delete('/',only('admin'),userController.deletSingleUser);
rout.delete('/deletAccountInRealWorld',userController.deletAccountInRealWorld);

export default rout;
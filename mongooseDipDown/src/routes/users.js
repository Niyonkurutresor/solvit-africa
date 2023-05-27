import express from 'express'
import userController from '../controller/userController.js'
import { userSignupvalidator,userLoginValidator } from "../middlewares/validation/user.js";
import { isLoggedIn } from '../middlewares/authorization.js';
import { only } from '../middlewares/authontication.js';


const rout = express();

rout.post('/signup',userSignupvalidator,userController.signup);
rout.post('/login',userLoginValidator,userController.login);

rout.post('/forgotPassword',userController.forgotPassword);
rout.patch('/resetPassword/:randomToken',userController.resetPassword);
rout.patch('/updatePassword',isLoggedIn,userController.updatePassword)
rout.patch('/updateUserInformation',isLoggedIn,userController.updateUserInformation)

rout.get('/',isLoggedIn,only('admin'),userController.getAllUsers);
rout.get('/:id',isLoggedIn,userController.getSingleUser);
rout.delete('/',isLoggedIn,userController.deletSingleUser)
rout.delete('/deletAccountInRealWorld',isLoggedIn,userController.deletAccountInRealWorld)

export default rout;
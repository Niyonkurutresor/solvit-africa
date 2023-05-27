import userServices from '../database/services/userServices.js';
import appError from '../util/apperror.js';
import out from "../helpers/response.js";
import { generate,check } from '../helpers/bcrypt.js';
import { sign } from '../helpers/jwt.js';
import mailer from '../helpers/nodemailler.js';
import { randomPassword } from '../helpers/crypto.js';

class userController{

    static async signup(req,res,next){
        try {
            const userEmail = req.query.email;
            const userPassword = req.query.password;
            if(!userEmail || !userPassword) return next(new appError(401,'Fail','Email and password are requried'));
            const password = await generate(req.query.password)
            const email = await userEmail.toLowerCase()
            const user = await userServices.signup({email,password})
            // mailer(user.email,'createAccount')
            const id = user._id
            const token = await sign({email,id})
            return out(res,200,`user with ${user.email} is created successfuly! Token${token}Token`)
        } catch (error) {
            next(new appError(500,'ERROR',error));
        }
    }

    static async login(req,res,next){
        try {
            let {email,password} = req.query;
            email = email.toLowerCase()
            if(!email || !password) return next(new appError(401,'Fail','Insert email and password'));
            const isUser = await userServices.findOne(email);
            if(!isUser || !await check(password,isUser.password)) return next(new appError(401,'Fail','Invalid user name or password'));
            const id = isUser._id;
            const token = await sign({email,id})
            return out(res,200,`User with email ${email} login successfuly! Token${token}Token`)
        } catch (error) {
            next(new appError(500,'ERROR',error))
        }
    }

    static async getAllUsers(req,res,next){
        try {
            const users = await userServices.getAllUsers();
            return out(res,200,users);
        } catch (error) {
            next(new appError(500,'ERROR', error))
        }
    }

    static async getSingleUser(req,res,next){
        try {
            const id = req.AuthoreizedUser.id
            const user = await userServices.getSingleUser(id)
            if(!user) return next(new appError(401,'Fail','User dose not existe'))
            return out(res,200,user)
        } catch (error) {
            next(new appError(500,'ERROR',error))
        }
    }

    static async deletSingleUser(req,res,next){
        try {
             const id = req.AuthoreizedUser.id;
             const user = userServices.deletSingleUser(id)
            return out(res,200,'User deleted Successfuly!')
        } catch (error) {
            next(new appError(500,'ERROR',error))
        }
    }

    static async deletAccountInRealWorld(req,res,next){
        try {
            const id = req.AuthoreizedUser.id;
            await userServices.deletAccountInRealWorld(id)
            out(res,200,'Your account is deleted successfuly.')
        } catch (error) {
            next(new appError(500,'ERROR',error))
        }
    }

    static async forgotPassword(req,res,next){
        try {
            // checking if the user existe
            const email = req.query.email;
            if(!email) return next(appError(401,'Fail','Please provide your email'));
            // if email is not in one of our user. he/she must get an error
            const user = await userServices.getUserByEmail(email);
            if(!user) return next(new appError(404,'Fail','User not found. try correct emial'));
            // 
            const password = await randomPassword()
            const encryptedPassword = await generate(password)
            const createdAt = Date.now()
            const expiredIn = Date.now() + 5*60*100 // 5 min
            // actualy we beater use save method becouse some time we need to run hooks in dbModule
            // User.save({validateBeforeSave:false}) from preventing validation of comfirming password and othere fields
            const updateData = await userServices.resetPassword(email,createdAt,encryptedPassword,expiredIn)
            // this will look like http://localhost:5000/api/user/reserPassword/f719c0760e
            const resetURL = `${req.protocol}://${req.get('host')}/api/user/resetPassword/${password}`
            // now we have to send an email contain restURL that user will place on to continue.and will be valid for 5min.
            out(res,200,`Visit your email to reset password. Thank you. ${resetURL}` )
        } catch (error) {
            next(new appError(500,'ERROR',error))
        }
    }
  


    static async resetPassword(req,res,next){
        try {
            const ShortTermPassword = req.params.randomToken;
            const {email,password} = req.body;
            const user = await userServices.getUserByEmail(email);
            if(!user) return next(new appError(404,'Fail','User not found.'));
            const validtToken = await check(ShortTermPassword,user.passwordResetToken);
            if(!validtToken) return next(new appError(201,'Fail','your reset token is invalid, pleas try again'))
            if(user.passwordResetExpired & ((user.passwordResetExpired).getTime()) < Date.now()) return next(new appError(401,'Fail','Oops! Your reset token is expired, please try again'))
            const id = user._id;
            console.log( (user.passwordResetExpired).getTime(),Date.now())
            const hashedPassword= await generate(password)
            await  userServices.updatePassword(id,hashedPassword,Date.now())
            const token = await sign({email,id})
            out(res,200,`Password updeted successfuly.Token${token}Token`)
        } catch (error) {
            next(new appError(500,'ERROR',error))
        }
    }


    static async updatePassword(req,res,next){
        try {
            const {password,newPassword,confirmNewPassword} = req.body;
            if(!password || !newPassword || !confirmNewPassword) return next(new appError(403,'fail','You must fill all fields and correctly'))
            //find user from database
            const user = await userServices.getSingleUser(req.AuthoreizedUser.id)
            if(!user) return next(new appError(404,'Fail','Oops! User not found!'));
            // check if user provide colect current password to update his/her passwod
            const correctPassword = await check(password,user.password);
            if(!correctPassword) return next(new appError(403,'Fail','You insert incorct password, please try again.')) 
            //update password and generate new user token
            const hashedPassword = await generate(newPassword)
            const passwordChangedAt = Date.now()
            await userServices.updatePassword(user._id,hashedPassword,passwordChangedAt)
            const id = user._id;
            const email = user.email
            const token = await sign({email,id})
            out(res,200,`User with ${email} manage to update password Token${token}Token`)
        } catch (error) {
            next(new appError(500,'ERROR',error))
        }
    }


    static async updateUserInformation(req,res,next){
        try {
            console.log(req.body)
        //always this is how it's done. there is place to update password and other place to update password
            // 1 create an error once user try to update password
            if(req.body.password || req.body.confirmPassword ) return next(new appError(400,'Fail','You are not allowed to update you password on this route. please try http://localhost:5000/api/user/updatePassword'))
            // 2 update the user password
            const id = req.AuthoreizedUser.id
            const {email} = req.body
            await userServices.updateUserInformation(id,{email})
            out(res,200,'Your information are update successfuly!')
        } catch (error) {
                next(new appError(500,'ERROR',error))
            }
    }

}

export default userController;
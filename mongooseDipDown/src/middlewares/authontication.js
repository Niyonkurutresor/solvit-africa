import appError from "../util/apperror.js";
import userServices from "../database/services/userServices.js";

function only(...user){
    return async(req,res,next)=>{
        // first we are not allowed to pass parameter in midlleware. then we have to implement it in function.
        //...user create an array from input we spacified as parameters in that function
        // this funcition must be excuted after user is loged in ei we have req.AuthoreizedUser from outhorization.js
        // and from there we can get user info. then if user is not matching with required user, then error will pop up.
        const id = req.AuthoreizedUser.id
        const userLore = await userServices.getSingleUser(id)
        if(!user.includes(userLore.role)) return next(new appError(403,'Fail','You are not allowed to perform this acction'))
        
        next()
    }}

export { only }
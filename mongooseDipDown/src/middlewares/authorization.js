import { verify } from "../helpers/jwt.js";
import appError from "../util/apperror.js";
import userServices from "../database/services/userServices.js";

const isLoggedIn = async(req,res,next)=>{
    //check if there is no token
    let token;
    const headerAutho = req.headers.authorization
    if(headerAutho && headerAutho.startsWith('Bearer')){
        token = headerAutho.split(' ')[1];
    }
    if(!token) return next(new appError(401,'Fail','You are not logged in, Please login first.'))
    // check if token is invalid or expired
    let decoded;
    try {
       decoded = await verify(token)
    } catch (error) {
       return next( new appError(401,'Fail',error))
    }
    // if user is deleted from database
    const isUserExiste = await userServices.getSingleUser(decoded.id);
    if(!isUserExiste) return next(new appError(401,'Fail','User no longer existe'));
    // if user update password after token has been issued.
    const tokenIssuedAt = (decoded.iat);
    if(isUserExiste.passwordChangedAt && tokenIssuedAt < parseInt((isUserExiste.passwordChangedAt.getTime())/1000)) return next(new appError(403,'Fail',`User has change the password please log in again.}`))
    req.AuthoreizedUser = decoded;
    next()
};

export {isLoggedIn}
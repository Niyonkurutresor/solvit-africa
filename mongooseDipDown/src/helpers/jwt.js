import jwt from "jsonwebtoken";
import config from "./config.js";
import { promisify } from "util";

const secret = config.SECRET ;

 const sign = async(payload) =>  await promisify( jwt.sign)(payload,secret,{expiresIn: config.TOKENEXPIRATION});
const verify = async(payload) => await promisify( jwt.verify)(payload, secret);
   
export {sign,verify}
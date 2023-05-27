import jwt from "jsonwebtoken";
import { promisify } from "util";

const secret = 'Secret should be like lkfhdigjka DKhDKkdaE2OTGIjfdghakFIEOWkdjokf k2323RW89483RW09eu4029wui329';

 const sign = async(payload) =>  await promisify( jwt.sign)(payload,secret,{expiresIn: '2d'});
const verify = async(payload) => await promisify( jwt.verify)(payload, secret);
   
export {sign,verify}
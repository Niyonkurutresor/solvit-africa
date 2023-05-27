import express from "express";
import bodyParser from "body-parser";
import routs from './routes/index.js';
import morgan from 'morgan';
import helmet from 'helmet';
import { limiter } from "./helpers/requestLimiter.js";
import dbConnection from './database/dbconnect.js';
import { defaultData } from "../defaultTouredata.js";
import toureServices from "./database/services/toureservices.js";
import mongoSinitize from 'express-mongo-sanitize'
import xss from 'xss-clean'


const app = express();
dbConnection()

// default data 
const createtoure = async()=>{ 
    await toureServices.deleteAllToure()
    await toureServices.createToure(defaultData)
}
createtoure()
app.use('/api',limiter)
// security http headers
app.use(helmet())

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json({limit:'10mb'}));

//sanitize data from no sql injection
// if lookes into req.body,req.params and req.query and fielter out all $ and . as it's the way mongoose works
app.use(mongoSinitize())

// xss. user insert malisious HTML code 
app.use(xss())

app.use('/api',routs);

export default app
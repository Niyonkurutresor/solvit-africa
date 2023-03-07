const express = require('express');
const bodyparser = require('body-parser');
const controlerr  = require('../controller/controller')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const verfiyToken = require('../middelwere/verfication')
// const expressjwt = require('express-jwt')

const routs = express()
routs.use(bodyparser.urlencoded({extended:true}))
routs.use(cookieParser())
// rout.use(expressjwt({secret:'secret'}).unless({path:['/']}))


routs.route('/').get(verfiyToken,controlerr.gethome)

routs.route('/secret').get(verfiyToken,controlerr.getsecret)

routs.route('/login').get(controlerr.getlogin)
                     .post(controlerr.postlogin)

routs.route('/logout').get(controlerr.getlogout)
                      

routs.route('/register').get(controlerr.getregister)
                        .post(controlerr.postregister)

module.exports = routs
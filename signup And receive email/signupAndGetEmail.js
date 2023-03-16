const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser')
const bcrypt = require('bcrypt');
const mongoose =require('mongoose');
const joi = require('joi');
const { string } = require('joi');
const Joi = require('joi');
const joipassword = require('joi-password-complexity')
const dotenv = require('dotenv').config();


const app = express()
app.use(bodyParser.urlencoded({extended:false}))

//connecting to database
const databaseconnection = async ()=>{
    try {
        mongoose.set('strictQuery',false)
        await mongoose.connect('mongodb://127.0.0.1:27017/sinupAndGetEmail')
        console.log('database is connected')
    } catch (error) {
        console.log('something went wrong. database is not connected',error)
    }
}
databaseconnection()

//defining schena and model of users

const userSchema = new mongoose.Schema({
    name: String,
    email:{
      type:String,unique:true
    },
    birthDate:Date,
    password:String,
    confirmPassword:String,
    phoneNumber:Number

});

const User =  mongoose.model('User',userSchema);


//creating user

app.post('/createUser', async (req,res)=>{
    try {
        
        const {name,email,birthDate,password,confirmPassword,phoneNumber} = req.body
        

        //validation of user in put should be done before data inserted into database.
        const complexityOperation = {
          min: 8,
          max: 30,
          lowerCase: 1,
          upperCase: 1,
          numeric: 1,
          symbol: 1,
          requirementCount: 4,
        }
        const joiSchema  = joi.object({
              name: Joi.string().max(100).required(),
              email:joi.string().lowercase().email().required(),
              birthDate:joi.date().iso().max('now').min('1980-01-01').required(),
              password:joipassword(complexityOperation),
              confirmPassword:joi.ref('password'),
              phoneNumber:joi.string().alphanum(),

        })
        const {error} = joiSchema.validate(req.body)
        if(error) return res.status(400).json({message:'You got an error please handle that',error:error.details[0].message.split('\"')});
        //end of user validation
  

        //hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)


        //storing data into database
        const user = await User.create({name:name,email:email,birthDate:birthDate,password:hashedPassword,confirmPassword:confirmPassword,phoneNumber:phoneNumber})
        emailCreatation(email,name)

        //jenerate token after creation of user
        const userId = user._id
        const token = jwt.sign({userId},'secret',{expiresIn:60*60*24})
        res.cookie('token',token,{maxAge:1000*60*60*24,httpOnly:true})

        res.status(201).json({message:'user is created succssefully!',user:user})
        
    } 
    catch (error) {
        console.log('you got an error',error)
    }
})


// creating email to the user
// https://developers.google.com/oauthplayground
const emailCreatation = async (userEmail,name)=>{
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      accessType: 'offline',
    }
  });

  let mailOptions = {
    from: 'niyonkurutresor17@gmail.com',
    to: userEmail,
    subject: 'signup',
    text: `hello ${name} You have successfuly manage to create account. enjoy our services, in case of any challeng or un enconvinient you should reache me on +250780322379`
  };

transporter.sendMail(mailOptions, (err, data)=>{
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
      }
    });
}



//server 
app.listen(5000,()=>{
    console.log('app is running on port 5000. tyr localhoste/5000')
})


const express = require('express')
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

const app = express()

// https://developers.google.com/oauthplayground
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  });

  let mailOptions = {
    from: 'niyonkurutresor17@gmail.com',
    to: 'dpqb12haikuo@gmail.com',
    subject: ' My first Nodemailer Project',
    text: 'thsi is the second try of sending message'
  };

transporter.sendMail(mailOptions, (err, data)=>{
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent successfully");
      }
    });
  

  //run server 
  const prot = process.env.PORT || 3000
  app.listen(prot,()=>{
    console.log(`app is runing on prot ${prot}`)
  })
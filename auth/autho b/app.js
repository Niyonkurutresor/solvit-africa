const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const { join } = require('path');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
let saltRound = 10

const app = express()
app.set('view engine','ejs')
app.use(express.static(join(__dirname,'publicfolder')))
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())


//database connection
mongoose.set('strictQuery',false)
mongoose.connect('mongodb://127.0.0.1:27017/solvit_outh_jwt');

// database schema.
const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    age:Number,
    location:String,
    googleId:String,
})



// database model
const User = mongoose.model('User',userSchema);



//home page
app.get('/',(req,res)=>{
    res.render('home')
})


//login
app.get('/login',(req,res)=>{
    res.render('login')
})

//registration page
app.get('/register',(req,res)=>{ 
    res.render('registration')
})

//post on registration page
app.post('/register', async(req,res)=>{
    const username = req.body.username;
    const age = 23;
    const password = req.body.password;

    //implementing bcrypt
   
    let hash = await bcrypt.hash(password, saltRound);
    //newuser
    const user = new User({
        username: username,
        age: age,
        password: hash
    })
    
      user.save()
        .then((result)=>{
            console.log('user is registered successfuly')
            let k = result
            //user manage to register then we are going to create token for him/her
            //and our payload is our username and password. our token will experise in 5min
            const token  = jwt.sign({username,password},'tresor secret',{expiresIn: 60*5})
            
            //sending cookie to the browser
            res.cookie('token1',token,{httpOnly:true})
            res.redirect('/secret')
        }) 
        .catch((err)=>{
            console.log('Error accured ',err.message)
        })
    })
    


//secret page
app.get('/secret',(req,res)=>{
    let token = req.cookies.token1

    jwt.verify(token,'tresor secret',(err,result)=>{
        if(err){
            res.redirect('/login')
        }
        else{
            res.render('secret')
        }
    })
        
})

//submit page
app.get('/submit',(req,res)=>{
        res.render('submit')
})


//log out
app.get('/logout',(req,res)=>{
    res.cookie('token1','',{maxAge:1})
            res.redirect('/')
})


//login post
app.post('/login',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    

    
    User.findOne({username:username}).then((result)=>{
       const auth = bcrypt.compare(password, result.password)
       if(auth){
        //create token once user sigin
         const token = jwt.sign({username,password},'tresor secret',{expiresIn:60})
        res.cookie('token1',token,{httpOnly:true})
        res.redirect('/secret')
        }
        else{
            res.redirect('/login')
        }
        
    }).catch((err)=>{
        console.log(err)
    })

})


// port sever will run on
const PORT = process.env.port || 5000
app.listen(PORT,()=>{
    console.log(`app is runing on port ${PORT}`)
})

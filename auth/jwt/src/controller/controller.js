const jwtModel = require('../module/loginModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRound = 10;


//error handling
const handleerror = (err)=>{
    //all kind of error have message but err.code its about handle unique property in database model
    console.log(err.message,err.code)
    //initial error
    const error = { username:'',password:''}

    if(err.code === 11000){
        error.username = 'user is alredy exist. try other one'
        return error
    }

    //validation process
    if(err.message.includes('Jwt validation failed')){
         Object.values(err.errors).forEach(({properties}) => {
             error[properties.path] = properties.message
        });
    }
    return error
}




//home rout
const gethome = (req,res)=>{
    console.log(req.username)
    res.send('welllcome on the home page. you can perform post by typing username and password')
}


//secret
const getsecret = async(req,res)=>{ 
        res.send('you manage to get secret rout') 
}







//login
const getlogin = (req,res)=>{
    res.send('wellcome on login page')
}

const postlogin = async(req,res)=>{

    const username = req.body.username
    const password = req.body.password
    
    //geting user from database
    const user= await jwtModel.findOne({username:username})
    if (user){
       let acceptedUser =  bcrypt.compare(password,user.password)
       if(acceptedUser){
        let newPassword = user.password
        console.log('user password is maching you can go ahead');
            const token = jwt.sign({username,newPassword},'secret',{expiresIn:60*60*24*3})
            res.cookie('token',token,{httpOnly:true})
            res.redirect('/secret')
       }
       else{
            res.redirect('/login')
       }
        
    }
    else{
        res.send('user is not exist please try to insert corect user')
    }
}










//logout

const getlogout = (req,res)=>{
    res.cookie('token','',{maxAge:1})
    res.redirect('/login')
}








//register
const getregister = async (req,res)=>{

    res.send('wellcome on the register page')
    
}

const postregister = async(req,res)=>{
    //username and password shuld be writen as same as it's in datagase schema
    // 201 status means data are created successfully!
    try {
        const username = req.body.username;
        const password = req.body.password;

        const newPassword = await bcrypt.hash(password,saltRound)

        const newUser = new jwtModel({
            username:username,
            password:newPassword
        })
        await newUser.save()

        //create token
        const token = jwt.sign({username,newPassword},'secret',{expiresIn:60*60*24*3})
            
        res.cookie('token',token,{httpOnly:true})
        res.redirect('/secret')

    } 
    catch (error) {
       const err =  handleerror(error)
        res.status(400).send(err)
    }
    
}



module.exports = {
    gethome,
    getsecret,
    getlogin,
    postlogin,
    getlogout,
    getregister,
    postregister
}
const  mongoose  = require("mongoose");
//creation of schema
const jwtSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'pleas enter the user name'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'please insert password'],
        minlength:[6,'your password is to short please try maxmise character']
    },
})


//mongoose hook: these are the function that excuted after certain event mongoose hapen
//schema.pre/schema.post , then action that will accure is save then fire that function before save
//the funcition will have document that is going to be saved and then next function as it's middlewere
//you have to run next() at the to kep excution of other code
// this function must come before model , ohterwise it wont work

jwtSchema.post('save',async (doc,next)=>{
    console.log('new user is added and saved',doc)
    next()
})

//action to happen before data are beingsent into database
//we dont have doc becouse data aint saved into database
// this is refeling to the object is being passed in controller body info form front end
jwtSchema.pre('save',(next)=>{
    console.log('user is about to be going to save')
    next()
})



//creation of model
const jwtModel = mongoose.model("Jwt",jwtSchema)


module.exports = jwtModel
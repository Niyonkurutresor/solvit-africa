const mongoose = require('mongoose');


async function dbconnection(){
    try {
       await mongoose.connect("mongodb://127.0.0.1:27017/crealblog").then((result)=>{
        console.log('database is connected successfully!!')
       })
        
    } catch (error) {
        console.log(error)
    }
}


module.exports = dbconnection
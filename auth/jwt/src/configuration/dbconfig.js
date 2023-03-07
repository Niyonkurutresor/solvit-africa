const mongoose = require('mongoose');

async function dbconnection(){
    try {
        mongoose.set('strictQuery',false)
    await mongoose.connect('mongodb://127.0.0.1:27017/solvit_outh_jwt').then((result)=>{
        console.log('database is connected successfully!!')
    })
    } catch (error) {
        console.log(err)
    }
}

module.exports = dbconnection
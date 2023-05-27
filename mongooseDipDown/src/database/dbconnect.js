import mongoose from 'mongoose'
//connecting to database
const databaseconnection = async ()=>{
    try {
        mongoose.set('strictQuery',false)
        await mongoose.connect('mongodb://0.0.0.0:27017/mongooseDepdown')
        console.log('database is connected .....')
    } catch (error) {
        console.log('something went wrong. database is not connected',error)
    }
}

export default databaseconnection
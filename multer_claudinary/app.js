const express = require('express');
const multer = require('multer');
const dotenv = require('dotenv')
const bodyPerser = require('body-parser');


const app = express()
app.use(bodyPerser.urlencoded({extended:true}))
dotenv.config()

//port our server is runing on
const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`you server is runing on prot ${port}`)
})




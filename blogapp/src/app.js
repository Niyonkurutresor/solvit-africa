const express = require('express');
const { join } = require('path');
const rout = require('./routs/blogRouts')
const dotenv = require('dotenv').config()

const app = express()
app.use(rout)




// runing port of server
let port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
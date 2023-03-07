const express = require('express')
const routs = require('./routs/routs');
const dbconnection = require('./configuration/dbconfig');
const config = require('./helper/env')


const app = express()
app.use(routs)


//database connection
dbconnection()

//port to run server
const port = config.PORT || 3000
app.listen(port,()=>{
    console.log(`express app started on port ${port}`)
})

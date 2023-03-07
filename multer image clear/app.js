const express = require('express');
const multer = require('multer');

const app = express()

const store = multer.diskStorage({
    //specify file to store your image
    destination:(req,res,cb)=>{
        cb(null,'/public/uploaded')
    },
    //we have to search for the name of the file
    filename:(req,res,cb)=>{
        //res.orginalname is te name of the file
        cb(null,res.originalname)
    }
})

let upload = multer({
    storage:store,
    //limit file size is 1Gb
    limits:{fileSize: 1024*1024*1024},
    fileFilter:(req,res,cb)=>{
            let fileType = /doc|xls|pdf/
            
            if(fileType){
                cb(null,true)
            }
            cb('ERR: wrong file type, file type supported are '+fileType)
        }
       
}).single('image')



app.post('/',upload,(req,res)=>{
    res.send('file is uploaded')
})


app.listen(4000,()=>{
    console.log('your app is runing on port 4000');
})
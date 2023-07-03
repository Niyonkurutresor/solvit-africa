import express  from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cloudinary from 'cloudinary';
import path from 'path';
import fs from 'fs';
import { error } from 'console';

//db connection 
mongoose.connect("mongodb://0.0.0.0:27017/MulterCraudinary");
console.log("your database is connected");

// create post module
const postSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    content:{
        type: String,
    },
    createdAt:{
        type:Date,
        default: Date.now(),
    },
    publicId: {
        type: String,
    }
})

// picture modul
const Post = mongoose.model("Post",postSchema);

// craudinaly configuration
cloudinary.v2.config({
    cloud_name:"kist",
    api_key:168412473156841,
    api_secret:'5qJHJLGBavBnTmMTG7fy19GYWq8'
})

//configure multer
let name
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploades')
    },
    filename:(req,file,cb)=>{
        let temp_name =file.originalname.split('.');
        let fpart = temp_name[0]
        let extension = temp_name[1]
         name = fpart+Date.now()+'.'+extension
        
        cb(null,name)
        return name
    }
})

let upload = multer({
	storage: storage,
	limits: { fileSize: 1024*1024 },
	fileFilter: function (req, file, cb){
	
		let filetypes = /jpeg|jpg|png|MOV|WMV|AVI|mp4/;
		var extname = filetypes.test(path.extname(
					file.originalname).toLowerCase());
		
		if (extname) {
			return cb(null, true);
		}
	
		cb("Error: File upload only supports the "
				+ "following filetypes - " + filetypes);
	}}).single('content')

// handleing routs
const app = express()
app.use(bodyParser.urlencoded({extended:true}))
dotenv.config()


app.post("/post",upload,async (req,res,next) => {
    const { title } = req.body;
    // to access uploaded file we use req.file
    if (req.file) {
        // If a file was uploaded by multer successfully, upload it to Cloudinary
        try {
            
            if(req.file.mimetype.includes("video")){
                const result = await cloudinary.v2.uploader.upload(req.file.path, { resource_type: 'video' });
                const post = await Post.create({ title, content: result.secure_url });
                res.status(201).json({ message: 'Post is created', path: result.secure_url });
                //Delete local file on the pc
                fs.unlinkSync(req.file.path);
            }
            else if(req.file.mimetype.includes("image")){
                const result = await cloudinary.v2.uploader.upload(req.file.path, { resource_type: 'image' });
                const post = await Post.create({ title, content: result.secure_url ,publicId: result.public_id});
                res.status(201).json({ message: 'Post is created', path: result.secure_url });
                fs.unlinkSync(req.file.path);
            }
            
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to upload video and create post' });
          }
    }
})


app.delete("/delete/:id",async(req,res,next) =>{
    const publicId = req.params.id;
    const result = await Post.find({publicId:publicId});
    if(!result) return res.status(5000).json({message:'Fail'})
    await cloudinary.v2.uploader.destroy(publicId);
    await Post.deleteOne({publicId: publicId});

    res.status(200).json({message:'Deleted successfuly'})
})


app.use((err,req,res,next) =>{ 
    res.status(500).json({message: 'Fail', error:err});
})

//port our server is runing on
const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`you server is runing on prot ${port}`)
})

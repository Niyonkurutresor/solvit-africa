const multer = require('multer');
const path = require('path')
const express = require('express');
const { join } = require('path');
const ejs = require('ejs')

const app = express()
app.use(express.static(join(__dirname,'public')))
app.set('view engine','ejs')




//specify the storage engine
//we need to specify where aour image shold be located when we upload them(./uploaded)
//for avoid have multiple file with the single name we have to atouch time stamp on file name

//name is variable to store name for name of file
let name
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploaded')
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






//on this up load valiable you can call 
//single for single file to be uploaded
//array like 3 file to be uploaded at once form the form input=file and name= image

let upload = multer({
	storage: storage,
	limits: { fileSize: 1024*1024 },
	fileFilter: function (req, file, cb){
	
		let filetypes = /jpeg|jpg|png|mp4|doc|pdf/;
		
		var extname = filetypes.test(path.extname(
					file.originalname).toLowerCase());
		
		if (extname) {
            console.log(path)
			return cb(null, true);
		}
	
		cb("Error: File upload only supports the "
				+ "following filetypes - " + filetypes);
	}}).array('image',3)





// to store array of names of uploaded file
let names = []

app.get('/',(req,res)=>{
    res.render('compose')
})

app.post('/upload',upload,(req,res)=>{
    res.redirect('/output')
    names.push(name)
})

app.get('/output',(req,res)=>{
    console.log(names)
    res.render('output',{
        name:names
    })
})

const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`you server is runing on prot ${port}`)
})






























































////////////////////// second ///////////////////////////////////////

// const upload = multer({
//     storage:storage,
//     limits:{fileSize:1024*1024},
//     fileFilter:fileFilter
// })



///////////////////////////// code from cloudinary///////////////////////////



// const cloudinary = require('cloudinary').v2;


// // Configuration 
// cloudinary.config({
//   cloud_name: "kist",
//   api_key: "168412473156841",
//   api_secret: "5qJHJLGBavBnTmMTG7fy19GYWq8"
// });


// // Upload

// const res = cloudinary.uploader.upload('https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg', {public_id: "olympic_flag"})

// res.then((data) => {
//   console.log(data);
//   console.log(data.secure_url);
// }).catch((err) => {
//   console.log(err);
// });


// // Generate 
// const url = cloudinary.url("olympic_flag", {
//   width: 100,
//   height: 150,
//   Crop: 'fill'
// });



// // The output url
// console.log(url);
// // https://res.cloudinary.com/<cloud_name>/image/upload/h_150,w_100/olympic_flag




///////////////////////////////////// Geks for Geeks//////////////////////////////////



// const express = require("express")
// const path = require("path")
// const multer = require("multer")
// const ejs = require("ejs")
// const app = express()
	
// // View Engine Setup
// app.set("views",path.join(__dirname,"views"))
// app.set("view engine","ejs")
	
// // var upload = multer({ dest: "Upload_folder_name" })
// // If you do not want to use diskStorage then uncomment it
	
// var storage = multer.diskStorage({
// 	destination: function (req, file, cb) {

// 		// Uploads is the Upload_folder_name
// 		cb(null, "uploads")
// 	},
// 	filename: function (req, file, cb) {
// 	cb(null, file.fieldname + "-" + Date.now()+".jpg")
// 	}
// })
	
// // Define the maximum size for uploading
// // picture i.e. 1 MB. it is optional
// const maxSize = 1 * 1000 * 1000;
	
// var upload = multer({
// 	storage: storage,
// 	limits: { fileSize: maxSize },
// 	fileFilter: function (req, file, cb){
	
// 		// Set the filetypes, it is optional
// 		var filetypes = /jpeg|jpg|png/;
// 		var mimetype = filetypes.test(file.mimetype);

// 		var extname = filetypes.test(path.extname(
// 					file.originalname).toLowerCase());
		
// 		if (mimetype && extname) {
// 			return cb(null, true);
// 		}
	
// 		cb("Error: File upload only supports the "
// 				+ "following filetypes - " + filetypes);
// 	}

// // mypic is the name of file attribute
// }).single("me");	

// app.get("/",function(req,res){
// 	res.render("Signup");
// })
	
// app.post("/uploadProfilePicture",function (req, res, next) {
		
// 	// Error MiddleWare for multer file upload, so if any
// 	// error occurs, the image would not be uploaded!
// 	upload(req,res,function(err) {

// 		if(err) {

// 			// ERROR occurred (here it can be occurred due
// 			// to uploading image of size greater than
// 			// 1MB or uploading different file type)
// 			res.send(err)
// 		}
// 		else {

// 			// SUCCESS, image successfully uploaded
// 			res.send("Success, Image uploaded!")
// 		}
// 	})
// })
	
// const port = 8080
// app.listen(port,(error)=>{
// 	if(error) throw error
// 		console.log(`port is listening at protr${port}`)
// })

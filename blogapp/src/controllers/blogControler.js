const dbconnection = require('../configuration/dbConfiguration')
const blogModul = require('../models/blogmodel')
const { error } = require('console');



// connect to the database
dbconnection()

//geting all data from database
 function getalldata(req,res){
      blogModul.find().then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log(err)
    })
}

//delete all data 
function deletealldata(req,res){
    blogModul.deleteMany().then((result)=>{
        res.send('all blogs are deleted successfully!!')
    }).catch((err)=>{
        res.send('something went wrong try again')
    })
}

// get specific blog
function getSpecificBlog(req,res){

    const id = req.params.id
    blogModul.findOne({_id:id}).then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log(err)
    })
}

//post new data 
function postNewBlog(req,res){
    
    const title = req.body.title;
    const content = req.body.content

    const newUser = blogModul({
        title:title,
        content:content
    })
    newUser.save().then((result)=>{
        res.send('blog is saved');
    }).catch((err)=>{
        console.log(err)
    })
}

//updateSpecificBlog
function updateSpecificBlog(req,res){

    const id = req.params.id;
    const title = req.body.title;
    const content = req.body.content;
    blogModul.updateOne({_id:id},{title:title,content:content}).then((result)=>{
        res.send(result)
    }).catch((err)=>{
        console.log(err)
    })
}


// delet specific blog
function deleteSpecifcBlog(req,res){

    const id = req.params.id;
    blogModul.deleteOne({_id:id}).then(()=>{
        res.send('blog is deleted')
    }).catch((err)=>{
        console.log(err)
    })
}





module.exports = {
    getalldata,
    deletealldata,
    getSpecificBlog,
    postNewBlog,
    updateSpecificBlog,
    deleteSpecifcBlog,
}
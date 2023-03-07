const express = require('express');
const routs = require('../controllers/blogControler')
const bodyParser = require('body-parser')



const rout = express()
rout.use(bodyParser.urlencoded({extended:true}))
// rout.use(express.static(join(__dirname,'public')))

rout.route('/') .get(routs.getalldata)
                .delete(routs.deletealldata)

rout.route('/blog').post(routs.postNewBlog)

rout.route('/blog/:id') .get(routs.getSpecificBlog)
                        .patch(routs.updateSpecificBlog)
                        .delete(routs.deleteSpecifcBlog)                    



module.exports = rout
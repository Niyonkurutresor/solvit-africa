const express = require('express');
const bodyParser = require('body-parser');
const { json } = require('body-parser');
const mongoose = require('mongoose');
const {defaultData} = require('./defaultTouredata')
const { update} = require('./updatedata')
// const morgan = require('m');

const app = express()
app.use(json())
app.use(bodyParser.urlencoded({extended:false}));

//connecting to database
const databaseconnection = async ()=>{
    try {
        mongoose.set('strictQuery',false)
        await mongoose.connect('mongodb://127.0.0.1:27017/mongooseDepdown')
        console.log('database is connected .....')
    } catch (error) {
        console.log('something went wrong. database is not connected',error)
    }
}
databaseconnection()
// advanced mongoose 
const schema = new mongoose.Schema({
    name:String,
    location:String,
    price:Number,
    ratings:Number,
    createdAt:Date,
    image:[{
        type:String,
        default:'./public/image/1.jpg'
        }],
    startDate:[Date],
    duration:Number,
    groupsize:Number,
    summary:String,
    description:String,
    imageCover:String,
},
{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});



// virtual property 
schema.virtual('name_and_location').get(function(){ return this.name+' '+ this.location})
//document middleware 
schema.pre('save',function(next){
    this.name = 'rusanurubenga'
    next()
})
//aggregatiion middleware
schema.pre('aggregate',function(next){
    console.log(this.pipeline())
    this.pipeline().unshift({$match:{ ratings:{$gte:6}}})
    next()
})
//query middleware
schema.pre('find',function(next){
    this.find({ratings:{$gte:6}})
    next()
})

//module
const Toure = mongoose.model('Toure',schema);

//create tours stoed in database
 const createtoure = async()=>{ 
    await Toure.deleteMany()
    await Toure.create(defaultData);
}
createtoure()




//updating one document 
app.put('/api/update/:id',async(req,res)=>{
    try {
        const id = req.params.id
        const updates = await Toure.findByIdAndUpdate(id,update)
        if(!updates) return res.status(400).json({message:'tour does not exist'})
        res.status(200).json({message:'tour updated suceesfle',updates:updates})
    } catch (error) {
        res.status(500).json({message:'server error', error:error})
    }
})

app.post ('/api/delete/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const deleteToure = await Toure.findByIdAndDelete(id)
        if(!deleteToure) return res.status(400).json({message:'Toure does not existe'})
        res.status(200).json({message:'null'})
    }catch(error){

    }
})

// selection and more on mongoose.
app.get('/api/parameter',async(req,res)=>{

    const query = req.query;
    // destricutring the object wa get from query
    const newobject = {...query}
    const excrude = ['page', 'sort', 'limit', 'fields', 'query'];
    // excrude some query element from query
    excrude.forEach(ele=>{
        delete newobject[ele];
    })

    //implimenting fratures like{$gte:{50}}. in params [gte]=20 will be {gte:{20}}
    //based on this fact, we are only mising $ we need use regular expression to change that
    const sting = JSON.stringify(newobject);
    const replaced = sting.replace(/\b(gte|gt|lte|lt)\b/g, matche =>`$${matche}`);
    const object = await JSON.parse(replaced);
    // find data from database base on query in the serarch bar
    const sortby = req.query.sort;
    const field = req.query.fields;
    const page = req.query.page;
    const limitPerDoc = parseInt(req.query.limit)|| 2
    const fields = field.split(',').join(' ');
    let skp = (parseInt(page)-1)*limitPerDoc
    const database =await Toure.find(object).sort(sortby).select(fields).skip(skp).limit(limitPerDoc)
    const number = await Toure.countDocuments(object)
    res.status(200).json({message:'query result', number:number, query:database})
});



/* ariasing is like to create middleware and you pass it before certain rout
 ex: you have the rout to get all toure. then you need 5best cheap toure
 llimitperdoc = 5
 sortpb = -rating,proce
 and then you can call toure
 */

//test virtuals
app.post('/api/create',async(req,res)=>{
    try {
        const toure = await Toure.create({name:'nyagahinika',duration:30,pirce:200})
        if (!toure) return res.status(400).json({message:'Something went wrong'})
        return res.status(200).json({mesage:'Toure is created',data:toure})
    } catch (error) {
        res.status(500).json({message:'SERVER ERROR'})
    }
})


//agregation function in mongoose db
app.get('/api/aggregation',async(req,res)=>{
    try {
        const result = await Toure.aggregate([
            {$unwind:'$startDate'},
            // { $match:{ratings:{$gte:6}}},
            // {$group:{
            //     _id:'$ratings',
            //     avgrating:{$avg:'$ratings'},
            //     avgprice:{$avg:'$price'}
            // }},
            {$sort:{ratings:-1}},
            {$project:{
                name:1,
                location:1,
                startDate:1,
                price:1,
                ratings:1,
                _id:0
            }},
            
        ])
        const number_of_doc = await Toure.countDocuments(result)
        res.status(200).json({message:'found successfuly!',doc:number_of_doc, data:result})
    } catch (error) {
        res.status(500).json({message:'INTERNAL SERVER ERROR',error:error})
    }
})


// error routs handling. this is the case where user request un exist rout
routs.all('*',(req,res,next)=>{
    // res.status(500).json({status:'fail',mesage:`Coulden't find ${req.originalUrl}  rout`})
    const err = new Error(`Coulden't find ${req.originalUrl} rout.`)
    err.statusCode = 500;
    err.status = 'fail';
    next(err)
})
routs.use()



//server 
app.listen(6000,()=>{
    console.log(`The server is runing on port 6000 ......`)
})

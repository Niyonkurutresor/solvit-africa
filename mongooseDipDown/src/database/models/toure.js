import mongoose from 'mongoose';
import User from './user.js';

// advanced mongoose 
const schema = new mongoose.Schema({
    name:String,
    location:String,
    guide:String,
    startLocation:{
        //GeoJSON
        type:{
            type:String,
            default:'Point', // it can also be polygon,lines or other geometries
            enum:['Point']
        },
        cordinates:[Number], // cordinates is array of number. start with latitude, then longitude
                            // both type and coldinates are enought to work with geo data.but you can add more as you want
        address:String,
        description:String

    },
    destinationLocation:[{
        type:{
            type:String,
            default:'Point',
            enum:['Point']
        },
        cordinates:[Number],
        description:String,
        day:Number,
    }],
    price:Number,
    ratings:{
        type:Number,
        default:4.5
    },
    createdAt:Date,
    image:[{
        type:String,
        default:'./public/image/1.jpg'
        }],
    startDate:[{
        type:Date,
        default:Date.now()
    }],
    duration:{
        type:Number,
        default:7
    },
    groupsize:{
        type:Number,
        default:10
    },
    summary:{
        type:String,
        default:'No specified content '
    },
    description:{
        type:String,
        default:'No specified content',
        select:false
    },
    imageCover:{
        type:String,
        default:'./public/image/001.jpg'
    },
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
});

// virtual property 
schema.virtual('name_and_location').get(function(){ return this.name+' '+ this.location})
// //document middelware
// schema.pre('save',function(next) {
//     this.name = 'mugabe';
//     this.location = 'Rubavu';
//     next()
// })

// // aggregation middleware
// schema.pre('aggregate',function(next){
//     console.log(this.pipeline())
//     this.pipeline().unshift({$match:{ ratings:{$gte:6}}})
//     next()
// })
// //query middleware
// schema.pre('find',function(next){
//     this.find({ratings:{$gte:6}})
//     next()
// })

// schema.pre('save',async function(next){
//     const guidepromises = this.guide.map( async id=>await User.findById(id))
//     this.guide = await Promise.all(guide)
//     next()
// })

//module
export const Toure = mongoose.model('Toure',schema);


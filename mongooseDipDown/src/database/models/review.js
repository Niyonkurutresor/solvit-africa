import mongoose, { mongo } from "mongoose";

// parent referencing
const reviewSchema = new mongoose.Schema({
    content:String,
    rating:Number,
    createAt:{
        type:Date,
        default:Date.now()
    },
    toureRef: {
        type:mongoose.Schema.ObjectId,
        ref:'Toure',
    },
    reviewOwner:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
    }
})


const Review = mongoose.model('Review',reviewSchema)
export { Review }
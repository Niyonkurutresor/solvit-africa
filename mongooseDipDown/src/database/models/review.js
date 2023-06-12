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

// we call static method on reviewSchma to deffine new function
reviewSchema.statics.calculeteAverage = async function(toureId){
    const statistic = await this.aggregate([
        {$match:{toureRef:toureId}},
        {$group:
            {
                _id:'$toureRef',
                number_Of_Doc:{$sum:1},
                ratingAvg : {$avg:'$rating'}
            }
        }
    ])
    console.log(statistic)
}

// to access this above function . after saving the review into database
reviewSchema.post('save',function(){
    // Review.calculeteAverage(this.toureRef), we shold be doing it in this way but we call Review before it get declared
    // ie it will give us an error
    this.constructor.calculeteAverage(this.toureRef);
})


// preventing multiple reviews from single user
// create index for both toureRef and review owner he/she is not allowed to post review multiple times
reviewSchema.index({reviewOwner:1, toureRef:1},{unique:true})

const Review = mongoose.model('Review',reviewSchema)
export { Review }
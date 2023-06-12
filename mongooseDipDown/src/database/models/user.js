import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
    },
    role:{
        type:String,
        enum: ['user','admin','guide'],
        default:'user'
    },
    active:{
        type:Boolean,
        default:true,
        select:false,
    },
    password: {
        type:String,
        select: false,
    },
    confirmPassword:{
        type: String,
        select:false,
    },
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpired:Date,

},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
}
)

// once you set field as unique. it create index for it. and then it will use that index to query 
// related data. this is what we try to do whene we are indexing to imporove the performence of database.


//virtual populating
userSchema.virtual('names').get(function(){
    return 'rukara'
})


// userSchema.pre('/^find/', async function(next){
//     this.passwordResetToken = null;
//     next()
// })

const User = mongoose.model('User',userSchema);

export default User;
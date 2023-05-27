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

})

userSchema.pre('/^update/',function(next){
   const passwordChanged = this.isModified(this.password)
    if(passwordChanged) {
        this.passwordResetExpired = undefined
    }
    next()
})

const User = mongoose.model('User',userSchema);

export default User;
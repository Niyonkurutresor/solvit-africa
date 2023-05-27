import User from '../models/user.js'
class userServices {

    static async signup(data){
        try {
            return await User.create(data)
        } catch (error) {
            throw error
        }
    }

    static async findOne(data){
        try {
            return await User.findOne({email:data}).select('+password')
        } catch (error) {
            throw error
        }
    }

    static async getAllUsers(){
        try {
            return await User.find()
        } catch (error) {
            throw error
        }
    }

    static async getSingleUser(id){
        try {
            return User.findById(id).select('+password')
        } catch (error) {
            throw error
        }
    }

    static async deletSingleUser (id){
        try {
            return User.findByIdAndDelete(id)
        } catch (error) {
            throw error
        }
    }

    static async getUserByEmail(email){
        try {
            return User.findOne({email:email})
        } catch (error) {
            throw error
        }
    }

    static async resetPassword(email,passwordChangedAt,passwordResetToken,passwordResetExpired){
        try {
            return User.updateOne({email},{passwordChangedAt,passwordResetToken,passwordResetExpired})
            //we should use save in older to access presave hook
        } catch (error) {
            throw error
        }
    }

    static async findbyEmailAndCheckResetTokenExpiration(email){
        try {
            User.find({email,passwordResetExpired:{$gt:Date.now()}})
        } catch (error) {
            throw error
        }
    }
    static async updatePassword(id,password,passwordChangedAt){
        try {
            return await User.findByIdAndUpdate(id,{password,passwordChangedAt})
        } catch (error) {
            throw error
        }
    }

    static async updateUserInformation(id,userinfo){
        try {
            return await User.findByIdAndUpdate(id,userinfo)
        } catch (error) {
            throw error
        }
    }

    static async deletAccountInRealWorld(id){
        try {
            return await User.findByIdAndUpdate(id,{active:false})
        } catch (error) {
            throw error
        }
    }
};

export default userServices;
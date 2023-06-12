import { Review } from "../models/review.js";

class reviewServices{

    static async getAllReviews(toureId){
        try {
            return await Review.find({toureRef:toureId}).populate({path:'reviewOwner',select:'email role'})
        } catch (error) {
            throw error
        }
    }

    static async createReview(data){
        try {
            return await Review.create(data)
        } catch (error) {
           throw error 
        }
    }

    static async updateReview(id,data){
        try {
            return await Review.findByIdAndUpdate(id,data)
        } catch (error) {
          throw error  
        }
    }

    static async deleteReview(id){
        try {
            return await Review.findByIdAndDelete(id)
        } catch (error) {
            throw error
        }
    }

    static async getSingleReview(id){
        try {
            return await Review.findById(id)
        } catch (error) {
            throw error
        }
    }
}

export { reviewServices }
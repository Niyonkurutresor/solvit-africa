import { reviewServices } from "../database/services/reviewServices.js";
import userServices from "../database/services/userServices.js";
import appError from "../util/apperror.js";
import out from "../helpers/response.js";

class reviewController{

    static async getAllReviews(req,res,next){
        try {
            const toureId = req.params.toureId
            const allReviews = await reviewServices.getAllReviews(toureId)
            if( !allReviews ) return next(new appError(404,'Fail','Reviews are not found successfully'));
            out(res,200,allReviews)
        } catch (error) {
            next(new appError(500,'ERROR',error))
        }
    }


    static async createReview(req,res,next){
        try {
            let { content, rating } = req.body;
            if(!content || !rating) return next(new appError(400,'Fail','All field must be fulfild correctry.'));
            const reviewOwner = req.AuthoreizedUser.id
            const toureRef = req.params.toureId
            const review = await reviewServices.createReview({content,rating,toureRef,reviewOwner});
            if(!review) return next(new appError(401,'Fail','Fail to create review.'));
            out(res,200,review)
        } catch (error) {
            next(new appError(500,'ERROR',error))
        }
    }

    static async updateReview(req,res,next){
        try {
            const id = req.params.id
            const userId = req.AuthoreizedUser.id;
            const review = await reviewServices.getSingleReview(id);
            if(!review) return next(new appError(404,'Fail','There is no review with such Id'))
            if( userId !== (review.reviewOwner).toString()) return next(new appError(403,'Fail','You are not allowed to perform this action'))
            await reviewServices.updateReview(id,req.body);
            out(res,200,`review updated successfully`)
        } catch (error) {
            next(new appError(500,'ERROR',error))
        }
    }

    static async deleteReview(req,res,next){
        try {
            const id = req.params.id
            const userId = req.AuthoreizedUser.id;
            const review = await reviewServices.getSingleReview(id);
            if(!review) return next(new appError(404,'Fail','There is no review with such Id'))
            const loggedinUser = await userServices.getSingleUser(userId);
            if(loggedinUser.role !== 'admin' & userId !== (review.reviewOwner).toString()) return next(new appError(403,'Fail','You are not allowed to Delete other\'s review'))
            await reviewServices.deleteReview(id);
            out(res,200,`review deleted successfully`)
        } catch (error) {
            next(new appError(500,'ERROR',error))
        }
    }
}

export { reviewController }
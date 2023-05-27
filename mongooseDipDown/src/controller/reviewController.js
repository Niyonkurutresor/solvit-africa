import { reviewServices } from "../database/services/reviewServices.js";
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
}

export { reviewController }
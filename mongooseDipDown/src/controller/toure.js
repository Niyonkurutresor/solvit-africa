import toureServices from '../database/services/toureservices.js';
import out from '../helpers/response.js';
import appError from '../util/apperror.js';
import { queryFiltering } from '../helpers/queryFilitering.js';

class toureController{

    static async getAllToure(req,res,next){
        try {
            const toure = await toureServices.findAlltoure();
            if(!toure) return next(new appError(404,'Fail','Toures not found! try again'))
            out(res,200,toure)
        } catch (error) {
            next(new appError(500,'ERROR',error.message))
        }
    }

    static async getSingleToure(req,res,next){
        try {
            const id = req.params.id;
            const toure = await toureServices.findSingleToure(id)
            if(!toure) return next(new appError(404,'Fail','Toure not found'))
            out(res,200,toure)
        } catch (error) {
            next(new appError(500,'ERROR',error.message))
        }
    }

    static async specificToure(req,res,next){
        try {
            const object = queryFiltering(req.query);
            const toure = await toureServices.findSpecific(object.copy,object.sortby,object.fields,object.skip,object.limit);
            if (!toure) return out(res,404,'There is no corespond Toure');//this is not error becouse app is working but there is no match
            out(res,200,toure);
        } catch (error) {
            next(new appError(500,'ERROR',error.message))
        }
    }

    static async aggregating(req,res,next){
        try {
            const statistic = await toureServices.aggregating()
            if (!statistic) return next(new appError(404,'Fail','There is no coresponding Toure'))
            out(res,200,statistic)
        } catch (error) {
            next(new appError(500,'ERROR',error.message))
        }
    }

    static async unwind(req,res,next){
        try {
            const unwind = await toureServices.unwind()
            if(!unwind) return next(new appError(400,'fail','Failed to retriev data'))
            out(res,200,unwind)
        } catch (error) {
            next(new appError(500,'ERROR',error.message))
        }
    }

    static async createToure(req,res,next){
        try {
            const data = req.query;
            const toure = await toureServices.createToure(data)
            if(!toure) return out(res,400,'Toure not created')
            out(res,200,toure)
        } catch (error) {
            next(new appError(500,'ERROR',error.message))
        }
    }

    static async deleteToure(req,res,next){
        try {
            
            const id = req.params.id;
            const t = await toureServices.findSingleToure(id);
            if(!t) return out(res,400,'There is no toure with such ID');
            await toureServices.deleteById(id);
            out(res,200,'Toure deleted successfuly');
        } catch (error) {
            next(new appError(500,'ERROR',error.message))
        }
    }


    static async updateToure(req,res,next){
        try {
            const id = req.params.id;
            const data = req.query;
            const toure = await toureServices.updateToure(id,data)
            if(!toure) return next(new appError(400,'Fail','There is no stoure with such id'))
            out(res,200,toure)
        } catch (error) {
            next(new appError(500,'ERROR',error.message))
        }
    }
}

export default toureController


//  const catchAsync = (fn)=>{
//     return (req,res,next)=>{
//         fn(req,res,next).catch(error=> next(error))
//     }
// }

// export const newb = catchAsync(async(req,res,next)=>{
//     const data = req.query;
//             const toure = await toureServices.createToure(data)
//             if(!toure) return out(res,400,'Toure not created')
//             out(res,200,toure)
// });
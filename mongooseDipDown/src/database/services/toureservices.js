import { Toure } from '../models/toure.js';

 class toureServices {
    static  createToure = async(toure)=>{
        try {
           return await Toure.create(toure)
        } catch (error) {
            throw error
        }
    }

    static deleteById = async(id)=>{
        try {
            await Toure.findByIdAndDelete(id)
        } catch (error) {
            throw error
        }
    }

    static deleteAllToure = async()=>{
        try {
            return await Toure.deleteMany()
        } catch (error) {
            throw error;
        }
    }

    static updateToure = async(id,data)=>{
        try {
           return await Toure.findByIdAndUpdate(id,data,{new:true,runValidators:true})
        } catch (error) {
            throw error;
        }
    }

    static findSpecific =async(toure,sort,fields,skip,limit)=>{
        try {
          return await Toure.find(toure).sort(sort).select(fields).skip(skip).limit(limit)
        } catch (error) {
            throw error;
        }
    }

    static findAlltoure = async()=>{
        try {
            return await Toure.find()
        } catch (error) {
            throw error
        }
    }

    static findSingleToure = async(id)=>{
        try {
            return await Toure.findById(id)
        } catch (error) {
            throw error
        }
    }

    static aggregating = async()=>{
        try {
            return await Toure.aggregate([
                {$match:{ratings:{$gte:5}}},
                //we should set this match property in hook up in ToureModul but it will overide all 
                // aggreagation field set. ie will overlide every aggragate function with match property
                {$group:
                    {
                        _id:null,
                        number_Of_Doc:{$sum:1},
                        average_price:{$avg:'$price'},
                        average_rating:{$avg:'$ratings'},
                        average_Duration:{$avg:'$duration'}
                    }
                },
            ])
        } catch (error) {
            throw error
        }
    }

    static unwind = async()=>{
        try {
            return await Toure.aggregate([
                    {$unwind:'$startDate'},
                    {$match:{ratings:{$gte: 3}}},
                    {$sort:{price:-1}},
                    {$project:{
                        name: 1,
                        startDate:1,
                        location:1,
                        price:1,
                        ratings:1,
                        duration:1,
                    }}
                   ])
        } catch (error) {
            throw error
        }
    }
}


export default toureServices;



/* we should set aggregate funciton up in toure schema to add something into pipe line buth
the problem is this: any time you run every aggragation function that plugni you created in module will be 
applied. so we should handel that in other way.for avoiding that conflict
 */
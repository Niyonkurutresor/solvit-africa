import { query } from "express"

export const queryFiltering = (query)=>{
    const copy = { ...query }
    const sortby = query.sort;
    const field = query.fields;
    const page = parseInt(query.page);
    const limit = parseInt(query.limit);
    
    //field to display
    let fields
    if(field){
        fields = field.split(',').join(' ')
    }
    else{
        fields = ''
    }

    //excruding some fields fomr query
    const excrude = ['page', 'sort', 'limit', 'fields'];
    excrude.forEach((el)=>{
        delete copy[el]
    })

    //document to skip on singile page( on second page you will skp limi for third= skip limit *2)
    const skip = (page -1)*limit

    return {copy,sortby,fields,skip,limit};
}
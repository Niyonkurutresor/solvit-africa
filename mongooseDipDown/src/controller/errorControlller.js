// export const errorController = (err,req,res,next)=>{
//      res.status(err.statusCode).json({status:err.status,message:err.message})
//  }


// export const errorController = (err,req,res,next)=>{
//     if(process.env.NODE_ENV == 'development'){
//      res.status(err.statusCode).json({status:err.status,message:err.message})
//     }else if(process.env.NODE_ENV == 'production'){
//         res.status(err.statusCode).json({message:err.message})
//     }
//  }

let NODE_ENV = 'development'
// this should be proccess.env.NODE_ENV  we have to unitiate this once we run npm start
const sendErrDev = (err,res)=>{
    if(err.message.code === 11000) return res.status(403).json({status:err.status,message:`${err.message.keyValue.email} is alredy in used, please try onther email`});
    if(err.message.name === 'TokenExpiredError' ) return res.status(401).json({status:'Fail',message:'Token is expired, please log in again'})
    if(err.message.name === 'JsonWebTokenError') return res.status(401).json({status:'Fail',message:'invalid token, please try to log in again'})
    res.status(err.statusCode).json({status:err.status,message:err.message});
}

const sendErrProd = (err,res)=>{
    if(err.message.code === 11000) return res.status(403).json({status:err.status,message:`${err.message.keyValue.email} is alredy in used, please try onther email`});
    if(err.message.name === 'TokenExpiredError' ) return res.status(401).json({status:'Fail',message:'Token is expired, please log in again'})
    if(err.message.name === 'JsonWebTokenError')return res.status(401).json({status:'Fail',message:'invalid token'})
    if(err.isOperation) return res.status(err.statusCode).json({message:err.message});

    res.status(500).json({message:'Something went wrong {this is programing or other unknown error}'});
}

export const errorController = (err,req,res,next)=>{
    if(NODE_ENV == 'development'){
        sendErrDev(err,res)
    }else if(NODE_ENV == 'production'){
        sendErrProd(err,res)
    }
}
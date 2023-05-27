class appError extends Error{
    constructor(statusCode,status,message){
        super(message)
        this.message = message;
        this.statusCode = statusCode;
        this.status = status;
        this.isOperational = true;
        // this.status = `${statusCode}`.startsWith('4')? 'fail' : 'error'
        // in case to throw this error in stacktrace we have to do this
        Error.captureStackTrace(this,this.constructor)
    }
}

export default appError



/*
app.all('*',(req,res,next)=>{
    res.status(500).json({message:'Couldent find this rout': status: 'rail'})
    //or
    const error  = new Error('Couldent find this rout')
        error.status = 'fail';
        error.statusCode = 500;
    next(error)
})
app.use((err,req,res,next)=>{
    const status = err.status
    const message = err.message
    const statusCode = err.Statuscode
})

class appError extends Error {
    super(message)
    constructor(statuscode,status,message){
        this.messge = message;
        this.statusCode = statuscode;
        this.status = stasus;
    }
}

*/
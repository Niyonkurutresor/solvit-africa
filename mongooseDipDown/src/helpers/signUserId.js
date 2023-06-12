const signUserid = (req,res,next)=>{
    req.AuthoreizedUser.id = req.params.id; 
    next()
}

export default signUserid
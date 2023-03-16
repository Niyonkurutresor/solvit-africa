
// let a = 2
// let b = 4
// const hello = ()=>{
//     try {
//         Promise.all([
//             (async()=>{setTimeout(()=>{console.log('hello')},2000)})(),
//             (async()=>{setTimeout(()=>{console.log('wold')},100)})()
//     ])
        
//     }
//     catch{
//         console.log('promise is not resolved')
//     }
// }
// hello()

const express = require('express')
const app = express();

// middleware colled hello
const hello  = (req,res,next)=>{
    console.log('this is middleware to excute at all kind of reques!')
    next()
}
const specific = (req,res,next)=>{
    console.log('for the specific routs')
    next()
}
const specificVerb = (req,res,next)=>{
    console.log('thi is for secret verv')
    next()
}
app.use(hello);
app.use('/secret',specific)
// app.get('/secret',specificVerb)

app.get('/',(req,res)=>{
    console.log('this is the home rout')
})
app.get('/secret/one',(req,res)=>{
    console.log('hello to the secret one rout')
})


app.listen(2000,()=>{
    console.log('app is runing on server 2000')
})
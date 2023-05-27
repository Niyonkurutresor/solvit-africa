import http from 'http';
import app  from './app.js';
const server = http.createServer(app);


process.on('uncaughtException',(err)=>{
    console.log(`${err.name} ${err.message} at ${err.stack.split('at')[1]}`)
    process.exit(1)
})

const port = process.env.PORT || 5000;

server.listen(port,()=>{
    console.log(`server is listening on port ${port}...`)
})
import http from 'http';
import app  from './app.js';
import config from './helpers/config.js'
const server = http.createServer(app);


process.on('uncaughtException',(err)=>{
    console.log(`${err.name} ${err.message} at ${err.stack}`)
    process.exit(1)
})
const port = config.PORT || 5000;

server.listen(port,()=>{
    console.log(`server is listening on port ${port}...`)
})
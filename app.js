var express = require('express')
var app = express()
var port = process.argv.port || 80

app.get('/', (req,res)=>{
    res.send('Hello world')
})

app.listen(port,()=>{
    console.log(`Hello world is listening ${port} port!`);
})
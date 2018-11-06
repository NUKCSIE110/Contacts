var express = require('express')
var app = express()

app.get('/', (req,res)=>{
    res.send('Hello world')
})

app.listen(8080,()=>{
    console.log('Hello world is listening 8080 port!');
})
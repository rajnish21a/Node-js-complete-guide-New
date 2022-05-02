const express = require("express");

const app = express();

app.use((req,res,next)=>{
    console.log("i am in first");
    next();
});

app.use('/users',(req,res,next)=>{
    console.log("i am in second");
    res.send("<h1>Welcome to Middleware</h1>");
});

app.use('/',(req,res,next)=>{
    console.log("i am in second");
    res.send("<h1>Welcome to Home</h1>");
});

app.listen(3000);


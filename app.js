// const http = require('http');
// const express = require('express');
// const app = express();
// app.set('view engine','ejs');
// app.set('views','views');

// const server = http.createServer((req, res)=>{
//     //console.log(req.url, req.method ,req.headers);
//     const url = req.url;
//     if(url === "/"){
//         res.write(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body><form action="/create-user" method="post"><input type="text" name="username"><input type="submit"></form></body></html>`);
//         return res.end();
//     }
//     if(url === "/users"){
//         res.setHeader('content-type','text/html');
//         res.write(`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body><ul><li>User1</li><li>User2</li></ul></body></html>`);
//         return res.end();
//     }
//     if(url === "/create-user"){
//         const chunk1 = [];
//         req.on('data',(chunk)=>{
//             chunk1.push(chunk);
//         })
//         req.on('end',()=>{
//             console.log(chunk1);
//             const parseBody = Buffer.concat(chunk1).toString();
//             console.log(parseBody);
//             console.log(parseBody.split('=')[1]);
//         })
//     }
// })



// server.listen('3000')

const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');
const adminRoutes = require("./routes/admin");
const shopRoute = require("./routes/shop");
const errorController = require("./controllers/error");
const app = express();

app.set('view engine','ejs');
app.set('views','views');
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(adminRoutes);
app.use(shopRoute);
app.use(errorController.get404);

app.listen(3000);


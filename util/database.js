// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('node-complete','root', 'root',{ dialect:'mysql', host:'localhost'});

// module.exports = sequelize;

//const { get } = require('lodash');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;

exports.mongoConnect = (cb)=>{
MongoClient.connect('mongodb+srv://rajnish21a:as111534@cluster0.izk1x.mongodb.net/?retryWrites=true&w=majority').then(client=>{
    console.log(client);
    _db = client.db();
    cb(client);
}).catch(err=>{
    console.log(err);
})
};


exports.getDB = ()=>{
    if(_db){
        return _db;
    }else{
        console.log('Noactive connection found');
    }
    
};

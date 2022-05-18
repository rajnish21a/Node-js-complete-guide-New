// const res = require('express/lib/response');
// // const fs = require('fs');
// // const path = require('path');
// const db = require('../util/database');
// const Cart = require('./cart');

// // const p = path.join(
// //   path.dirname(require.main.filename),
// //   'data',
// //   'products.json'
// // );

// // const getProductsFromFile = cb => {
// //   fs.readFile(p, (err, fileContent) => {
// //     if (err) {
// //       cb([]);
// //     } else {
// //       cb(JSON.parse(fileContent));
// //     }
// //   });
// // };

// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?,?,?,?)'[this.title, this.price, this.imageUrl, this.description]);
//     // getProductsFromFile(products => {
//     //   if(this.id){
//     //     const existingProductIndex = products.findIndex(product=> product.id == this.id);
//     //     const updatedProduct = [...products];
//     //     updatedProduct[existingProductIndex] = this;
//     //     fs.writeFile(p, JSON.stringify(updatedProduct), err => {
//     //       console.log(err);
//     //     });
//     //   }else{
//     //     this.id = Math.random().toString();
//     //     products.push(this);
//     //     fs.writeFile(p, JSON.stringify(products), err => {
//     //       console.log(err);
//     //     });
//     //   }
//     // });
//   }

//   static deleteById(id){
//     getProductsFromFile(products=>{
//       const product = updatedProducts.find(product=>product.id ===id);
//       const updatedProducts = products.filter(product=> product.id != id);
//       fs.writeFile(p, JSON.stringify(updatedProducts), err =>{
//         if(!err){
//           Cart.deleteProduct(id, product.price);
//         }
//       })
//     })
//   }

//   static fetchAll(cb) {
//     // getProductsFromFile(cb);
//     return db.execute('SELECT * FROM products');
//   }

//   static findByPk(id,cb){
//     // this.getProductsFromFile((id, Products)=>{
//     //   const product = Products.find(product=>{ product.id === id})
//     //   return product;
//     // })
//     return db.execute('SELCT * FROM products WHERE products.id=?',[id]);
//   }
// };

const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const Product = sequelize.define('product',{
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description:{
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  }
});

module.exports = Product;
const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(require.main.filename),'data','cart.json');



module.export = class Cart {
    static addProduct = (id, productPrice)=>{
        //Fetch the previous cart
        fs.readFile(p, (err,fileContent)=>{
            const cart = {
                products: [],
                totalPrice: 0
            };
            if (!err){
                cart = JSON.parse(fileContent);
            }
            // Ananlyse the cart => find existing products
            const existingProductIndex = cart.products.findIndex(product=>product.id ==id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
             // Add new product/ increase quantity
            if(existingProductIndex){
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }else{
                updatedProduct = {id: id, qty:1};
                cart.products = [...cart.products, updatedProduct];
            }
           cart.totalPrice = cart.totalPrice + +product.totalPrice;
           fs.writeFile(p,JSON.stringify(cart),(err)=>{
               console.log(err);
           })
        })
    };

    static deleteProduct = (id, productPrice) => {
        fs.readFile(p, (err,fileContent) => {
            if(err){
                return;
            }
            fileContent = JSON.parse(fileContent)
            const updatedCart = [...fileContent];
            const product = updatedCart.products.find(product=> product.id === id);
            if(!product){
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(product => product.id != id);
            updatedCart.totalPrice = updatedCart.totalPrice - (product.productPrice * productQty);
            fs.writeFile(p, JSON.stringify(updatedCart), err=>{
                console.log(err);
            })
        })
    };

    static getCarts = (cb)=>{
        fs.readFile(p, (err, fileContent)=>{
            const Cart = JSON.parse(fileContent);
            if(err){
                cb(null);
            }else{
                cb(Cart);
            }
        })
    }
}
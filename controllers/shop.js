const Product = require('../models/product');
const Cart = require('../models/cart');
const { UPSERT } = require('sequelize/types/query-types');

exports.getProducts = (req, res, next) => {
  req.user.getProducts().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch(err=>{
    console.log(err);
  });
};

exports.getIndex = (req, res, next) => {
  Product.findAll().then(
    products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    }
  ).catch(err=>{
    console.log(err);
  });
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
  .then(cart=>{
    return cart.getProducts().then(products=>{
      res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products
      });
    }).catch(err=>{
      console.log(err);
    });
    //console.log(cart);
  })
  .catch(err=>{
    console.log(err);
  })
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  const fetchedCart = undefined;
  let newQuantity = 1;
  req.user.getCart()
  .then(cart=>{
    fetchedCart = cart;
    return cart.getProducts({where: {id: productId}});
  })
  .then(products=>{
    const product= undefined;
    if(products.length > 0){
      product= products[0];
    }
    
    if(product){
      const oldQuantity = product.cartItem.newQuantity;
      newQuantity = oldQuantity+ 1;
      return product;
    }
    Product.findById(productId)  
  })
  .then(product=>{
    return fetchedCart.addProduct(product,{include:{
      quatity: newQuantity
    }});
  })
  .catch(err=>{
    console.log(err);
  })
  .then(()=>res.redirect('/cart'))
  .catch(err=>{
    console.log(err);
  })
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders({include:{include:['products']}})
  .then(orders=>{
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
    });
  })
};

// exports.getCheckout = (req, res, next) => {
//   res.render('shop/checkout', {
//     path: '/checkout',
//     pageTitle: 'Checkout'
//   });
// };

exports.getProduct = (req, res, next) => {
  const prodId = req.param.productId;
  Product.findById(prodId).then((product)=>{
    res.render('shop/product-details',{
      product: product,
      pageTitle: product.title,
      path:"/products"
    })
   // res.redirect('/');
  }).catch(err=>{
    console.log(err);
    res.redirect('/');
  }
  );
};

exports.postCartDeleteProduct =(req, res, next)=> {
  const prodId = req.body.productId;
  req.user.getCart()
  .then(cart=>{
    return cart.getProducts({where:{ id: prodId}})
  })
  .then(products=>{
    const product= products[0];
    return product.cartItem.destroy()
  })
  .then(()=>{
    res.redirect('/cart');
  })
  .catch(err=>{
    console.log(err);
  })
  Product.findById(prodId).then(product=>{
    Cart.deleteProduct(prodId, product.price);
  }).catch(err=>{console.log(err)});
}

exports.postCreateOrder = (req, res, next)=>{
  let fetchedCart;
  req.user.getCart()
  .then(cart=>{
    fetchedCart = cart;
    return cart.getProducts();
  })
  .then(products=>{
    return req.user.createOrder()
    .then(order=>{
      return order.addProducts(products=>{
        products.map(product=>{
          product.orderItem = {quantity: product.cartItem.quantity};
          return product;
        })
      })
    });
  })
  .then(result=>{
    return fetchedCart.setProducts(null);
  })
  .then(result=>{
    res.redirect('/orders');
  })
  .catch(err=>{
    console.log(err);
  })
};
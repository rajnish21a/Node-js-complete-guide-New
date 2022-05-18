const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll().then(products => {
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
  Cart.getCart(cart=>{
    Product.findAll().then(products=> {
        const cartProducts = [];
        for(product of products){
          const cartProductData = cart.products.find(
            prod => prod.id == product.id
          );
          if(cartProductData){
            cartProductData.push({productData: product, qty: cartProductData.qty})
          }
        }
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: cartProducts
        });
      }
    ).catch(err=>{
      console.log(err);
    });
  });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  console.log(productId);
  Product.findById(productId).then((product)=>{
    Cart.addProduct(productId, product.price);
  }).catch(err=>{
    console.log(err);
  });
  res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

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
  Product.findById(prodId).then(product=>{
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  }).catch(err=>{console.log(err)});
}
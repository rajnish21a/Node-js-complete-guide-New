const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart=>{
    Product.fetchAll(products => {
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
    });
  });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  console.log(productId);
  Product.searchById(productId, (product)=>{
    Cart.addProduct(productId, product.price);
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
  Product.searchById(prodId,(product)=>{
    res.render('shop/product-details',{
      product: product,
      pageTitle: product.title,
      path:"/products"
    })
    res.redirect('/');
  });
};

exports.postCartDeleteProduct =(req, res, next)=> {
  const prodId = req.body.productId;
  Product.searchById(prodId, product=>{
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  })
}
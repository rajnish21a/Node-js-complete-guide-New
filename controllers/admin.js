const res = require('express/lib/response');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title:title,
    description:description,
    imageUrl:imageUrl,
    price:price
  }).then(result=>{
    console.log(results);
    res.redirect("/admin/products");
  }).catch(err=>{
    console.log(err);
  });
};

exports.getEditProduct = (req, res, next) => {
  const isEditMode = req.query.edit;
  if(isEditMode){
    return res.redirect('/');
  }
  const prodId = req.param.productId;
  Product.findAll(prodId).then(product=>{
    if(!product[0]){
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-produc(t',
      editing: isEditMode,
      product:product[0]
    });
  }).catch(err=>{
    console.log(err);
  })
};

exports.postEditProduct = (req, res, next)=>{
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.descriptions;
  Product.findByID(prodId).then(product=>{
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.imageUrl = updatedImageUrl;
    product.descriptions = updatedDesc;
    return product.save();
  }).then(result=>{
    console.log("Product updated Successfully");
    res.redirect('/admin/products');
  })
  .catch(err=>{
    console.log(err);
  })
  const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDesc, updatedPrice);
  updatedProduct.save().then(()=>{
    res.redirect("/admin/products");
  }).catch(err=>{
    console.log(err);
  });
}

exports.getProducts = (req, res, next) => {
  Product.findAll().then(products=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(err=>{
    console.log(err);
  });
};

exports.postDeleteProduct = (req, res, next)=>{
  const prodId = req.body.productId;
  Product.findById({id: prodId}).then(product=>product.destroy()).then(result=>{
    res.redirect('/admin/products');
  }).catch(err=>{
    console.log(err);
  })
  res.redirect('/admin/products');
}

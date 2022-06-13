const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
//const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
//const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5baa2528563f16379fc8a610')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
//app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://rajnish21a:as111534@cluster0.izk1x.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
  User.findOne()
  .then(user=>{
    if(!user){
      const user= new User({
        name:'Rajnish',
        email: 'test@test.com',
        cart:{
          items:[]
        }
      });
      user.save();
    }
  })
  .catch(err=>{
    console.log(err);
  })
  app.listen('3000');
})
.catch(err=>{
  console.log(err)
});


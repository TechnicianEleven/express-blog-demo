var express = require('express');
var router = express.Router();
var User=require('user')

/* GET home page. */
router.get('/', function(req, res, next) {
  // req.flash('info', 'Welcome');
  res.render('login');//直接调用默认在app里面设置好的模板引擎 ,index.jade
});
router.post('/', function(req, res) {
  passsword=req.body['password'];
  // username=req.body['username'];
  // console.log(passsword,username)
  User.get(req.body['username'],function(err,user){
    if(!user){
      err='user not exsit!'
      return res.redirect('login');
    }
    if(user.password !=passsword){
      return res.redirect('login');
    }
    req.session.user=user;
    console.log('login success!')
    return res.redirect('/')
  })
});

module.exports = router;

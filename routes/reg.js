var express = require('express');
var User=require('user.js')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.flash('info','Welcome')
  res.render('reg');//直接调用默认在app里面设置好的模板引擎 ,index.jade
});
router.post('/',function(req,res){
  if(req.body['password-repeat'] != req.body['password']){
    return res.redirect('/reg');
  }
  var newUser=new User({
    name:req.body['username'],
    password:req.body['password']
  })
  User.get(newUser.name,function(err,user){
    console.log(user)
    if(user)
      err="Username already exists!";
    if(err){
      console.log(err )
      return res.redirect('/reg');
    }
    newUser.save(function(err){
      if(err){
        return res.redirect('/reg');
      }
      req.session.user=newUser
      return res.redirect('/')
    })
  })
})

module.exports = router;
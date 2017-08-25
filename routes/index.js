var express = require('express');
var router = express.Router();
var Post=require('post');
router.get('/', function(req, res) {
    // req.flash('info', 'Welcome');
    res.render('index');//直接调用默认在app里面设置好的模板引擎 ,index.jade
  });
router.post('/',function(req,res){
    var currentUser=req.session.user;
    var post= new Post(currentUser,req.body.content)

    post.save(function(err){
      if(err){
        return res.redirect('/');
      }
      console.log('发表成功')
      return  res.redirect('/u/'+currentUser.name);
    })
  })
  

module.exports = router;
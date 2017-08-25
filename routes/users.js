var express = require('express');
var router = express.Router();
var Post=require('post');
/* GET users listing. */
router.get('/:username', function(req, res) {//参数不能写在app里面，而要写在router里面比如说这个/:username
  // res.send('respond with a resource');//直接返回了一个响应没有调用模板引擎
  // console.log(req[params])
  username=req.params.username
  // res.render('users',{user:req.params.username,age:26,work:'developer'})
  Post.get(username,function(err,posts){
    if(err){
      console.log('error',error);
      return res.redirect('/');
    }
    // console.log(posts)
    
    return res.render('users',{
        posts:posts
    })
  })
});
module.exports = router;

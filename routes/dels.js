var express = require('express');
var router = express.Router();
var Post=require('post');
/* GET users listing. */
router.post('/',function(req,res){
  var usernmae=req.session.user;
  console.log(username)
  // res.json(['success', "服务器收到一个Ajax  请求，信息为：POST"]);

  Post.del(username,function(err){
    if(err){
      res.json("error!");
    }
    else{
      res.json(['success', "删除成功！"]);
    }
  })
})

router.get('/', function(req, res) {
  console.log(req.body)
  //参数不能写在app里面，而要写在router里面比如说这个/:username
// res.send('respond with a resource');//直接返回了一个响应没有调用模板引擎
// console.log(req[params])
  res.json(['success', "服务器收到一个Ajax  请求，信息为：get"]);
})
module.exports = router;

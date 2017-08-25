var express = require('express');
var router = express.Router();
var User=require('user')
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.session.user)
    req.session.user=null
    
    return res.redirect('/');//直接调用默认在app里面设置好的模板引擎 ,index.jade
});
module.exports = router;
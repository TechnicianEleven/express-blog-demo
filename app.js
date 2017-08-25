var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var settings=require('./settings');
var index = require('./routes/index');
var users = require('./routes/users');
var post = require('./routes/post');
var login = require('./routes/login');
var logout=require('./routes/logout')
var reg = require('./routes/reg');
var dels=require('./routes/dels')
var app = express();
var session=require('express-session');
var MongoStore=require('connect-mongo')(session);
var flash=require('express-flash')
var dynamicHelpers=require('express-dynamic-helpers-patch')(app)


// view engine setup
app.set('views', path.join(__dirname, 'views'));//设置模板调用的路径
app.set('view engine', 'jade');//设置默认的模板引擎

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));//设置默认的dev
app.use(bodyParser.json());//添加json的解析
app.use(bodyParser.urlencoded({ extended: false }));//设置url的路由编码解析
app.use(cookieParser()); //设置cookie的解析\
app.use(session({
  resave:false,
  saveUninitialized:false,
  store:new MongoStore({
    url: 'mongodb://localhost:27017/BLOG',
    db:settings.db
  }),
  secret:settings.cookieSecret
})) //这里出现了一个非常大的问题，就是使用session一定要在cookie之后
app.use(flash())
// app.get('/', function (req, res) {
//   req.flash('info', 'Welcome');
//   res.render('index', {
//     title: 'Home'
//   })
// });d
app.dynamicHelpers({
  user:function(req,res){
    return req.session.user;
  },
  error:function(req,res){
    var err=req.flash('error')
    if (err.length)
      return err;
    else
      return null
  },
  success:function(req,res){
    var succ=req.flash('success');
    if(succ.length)
      return succ;
    else
      return null;
  }
    
})
app.use(express.static(path.join(__dirname, 'public'))); 
//如果要使用这个目录，那么久必须要static这个目录，不然根本无法通过路径来访问
app.use(express.static(path.join(__dirname, 'routes')));

app.use('/',index) ;   //设置对应路径下的解析函数,会去调用routes下的index来解析'/' 
app.use('/u', users);//同上
// app.use('/post', post);
app.use('/reg', reg);
app.use('/login', login);
app.use('/logout', logout);
app.use('/dels',dels);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

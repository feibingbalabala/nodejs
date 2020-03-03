var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');

var indexRouter = require('./routes/index'); // 加载路由模块
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views')); // 使用什么view模版
// app.set('view engine', 'jade'); // view模版使用什么引擎

// 使用html
app.set('views', path.join(__dirname, 'views/html'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html'); 

app.use(logger('dev')); // 使用第三方插件
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // 静态资源路径

app.use('/', indexRouter); // 通过不同地址，访问不同的模块
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) { // 全局404拦截，next是不是什么都拿不到，拿不到404
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) { // 全局错误拦截
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

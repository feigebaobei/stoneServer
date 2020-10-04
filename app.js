var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var redis = require('redis')
var config = require('./lib/config')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var randomCodeRouter = require('./routes/randomCode');
var testRouter = require('./routes/test');

// 连接数据库
let red_config = config.redis,
    RED_HOST = red_config.host,
    RED_PWD = red_config.pass,
    RED_PORT = red_config.port,
    RED_OPTS = {auth_pass: RED_PWD},
    client = redis.createClient(RED_PORT, RED_HOST, RED_OPTS)
client.on('ready', (res) => {
  console.log('ready')
})
client.on('end', (res) => {
  console.log('end')
})
client.on('error', (error) => {
  console.log('error', error)
})
client.on('connect', (res) => {
  console.log('connect')
})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/randomCode', randomCodeRouter);
app.use('/test', testRouter);
// app.use('/public', express.static('public'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

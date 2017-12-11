// implement express stuff like .use and .set

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// import routes
var app = express()

// view engine setup here:
app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'ejs')

// favicon setup
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

// set up static public folder use for devDependencies
// app.use(express.static(__dirname + '/public'));

// tell express what templates to use for what routes
// app.use('/', index);
// app.use('/about', about);

// serve static index for now
// TODO: set up dynamically generate index.html
app.get('/', (req, res) => {
  res.render('index', {
    user: "Finbar Maginn"
  })
  // static index.html
  // res.sendFile(path.join(__dirname + '/index.html'))
})

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
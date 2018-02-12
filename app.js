var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler')
var app = express();
var mongoose = require('lib/mongoose');
var session = require('express-session');
var config = require('config');
var log = require('lib/log')(module)

var MongoStore = require('connect-mongo')(session)
// view engine setup
app.engine('ejs', require('ejs-mate'));
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');
var HttpError = require('error/httpError').HttpError;
var AuthError = require('error/authError').AuthError;

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('middleware/sendHttpError'))

app.use(session({
    secret: config.get('session:secret'),
    resave: true,
    saveUninitialized: true,
    cookie: config.get('session: coockie'),
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));


require('routes')(app)


//error handler
app.use(function(err, req, res, next) {
    if (typeof err == 'number') { // next(404);
        err = new HttpError(err);
    }
    if (err instanceof AuthError) { // next(404);
        err = new HttpError(403);
    }
    if (err instanceof HttpError) {
       res.sendHttpError(err)
    } else {
        if (app.get('env') == 'development') {
            errorHandler(err, req, res, next);
        } else {
            log.error(err);
            err = new HttpError(500);
            res.sendHttpError(err)
        }
    }
});

// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;

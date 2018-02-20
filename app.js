var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler')
var passport = require('passport');


var app = express();
var mongoose = require('./lib/mongoose');
var config = require('./config/config');
var log = require('./lib/log')(module)

var MongoStore = require('connect-mongo')(session)
var userRoute = require('./routes/user');
var walletRoute = require('./routes/wallet');
var HttpError = require('./error/httpError').HttpError;
var AuthError = require('./error/authError').AuthError;

// view engine setup
app.engine('ejs', require('ejs-mate'));
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(passport.initialize());
app.use(require('./middleware/sendHttpError'))
app.use('/user', userRoute);
app.use('/wallet', walletRoute);
// app.use(session({
//     secret: 'arhanechka',
//     resave: true,
//     saveUninitialized: true,
//       // maxAge: config.get('session: maxAge'),
//     store: new MongoStore({mongooseConnection: mongoose.connection})
// }));

app.use(require('./middleware/loadUser'));
require('./routes')(app);



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

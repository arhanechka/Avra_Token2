var log = require('lib/log')(module)
var User = require('models/user');
var HttpError = require('error/httpError').HttpError;
var AuthError = require('error/authError').AuthError;
exports.get  = function(req, res) {
    res.render('login', { title: 'Avra'});
};

exports.post = function(req, res, next) {
    var email = req.body.logemail;
    var password = req.body.logpassword;
    log.info(email);
    log.info(password);
    User.authorize(null, email, password, function(err, user) {
        if (err) {
            console.log('in error auth');
            if (err instanceof AuthError) {
                return next(new HttpError(403, err.message));
            } else {
                return next(err);
            }
        }
        log.debug('mistake was not found');
        console.log(req.session)
        req.session.user = user;
        log.debug(req.session.user)
        res.render('cabinet', { title: 'Avra', user: req.session.user});

    });
}

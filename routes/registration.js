var log = require('../lib/log')(module)
var User = require('../models/user');
var HttpError = require('../error/httpError').HttpError;
var AuthError = require('../error/authError').AuthError;

exports.get  = function(req, res) {
    res.render('registration', { title: 'Avra'});
};

exports.post = function(req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    log.info(name);
    log.info(email);
    log.info(password);
    User.authorize(name, email, password, function(err, user) {
        if (err) {
            console.log('in error auth');
            if (err instanceof AuthError) {
                return next(new HttpError(403, err.message));
            } else {
                return next(err);
            }
        }
        log.debug('mistake was not found');
        req.session.user = user;
        log.debug(req.session.user)
        res.render('cabinet', { title: 'Avra', user: req.session.user});
    });
}


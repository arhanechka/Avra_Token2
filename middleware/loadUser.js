var User = require('models/user');
var log = require('../lib/log')(module)

module.exports = function (req, res, next) {
    req.user = res.locals.user = null;
    log.debug(req.session.user)
    if (!req.session.user) {
        log.debug('NOOOO!')
        return next();
    }
    User.findById(req.session.user, function (err, user) {
        if (err) return next(err);
        else {
            log.debug(user)
            req.user = res.locals.user = user;
            log.debug(req.user)
            next();
        }
    });
};

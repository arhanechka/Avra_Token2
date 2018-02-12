//var express = require('express');
//var router = express.Router();
var log = require('lib/log')(module)
var HttpError = require('error').HttpError;

module.exports = function (app) {
    var User = require('models/user');

    /* GET users listing. */
    app.get('/users', function (err, res, next) {
        User.find({}, function (err, users) {
            if (err) {
                return next(err)
            }
            else
                res.json(users)
        })
    });
    /*GET user by email*/
    app.get('/user/:email', function (req, res, next) {
        var email = new Object(req.params.email);
        log.debug('This is email ' + email)
        User.findOne({'email': req.params.email}, function (err, user) {
            // if (err || !user) {
            //     //res.status(401).send({message: 'User was not found'});
            //     res.render('error', {title: 'Avra', status: 404, error: 'User was not found'});
            // }
            if(err)
                next(err)
                if(!user)
                 next(new HttpError(404));
            else {
                    res.render('login', {title: 'Avra'});
            }
        })
    });
};

//module.exports = router;

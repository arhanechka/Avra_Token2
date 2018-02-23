var passport = require('passport');
var config = require('../config/config').get(process.env.NODE_ENV);
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');
var log = require('../lib/log')(module);
var User = require('../models/user');
var HttpError = require('../error/httpError').HttpError;
var AuthError = require('../error/authError').AuthError;
var getToken = require('../lib/token')
var express = require('express');
var router = express.Router();


router.post('/signin', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    log.info(email);
    log.info(password);
    if (!req.body.email || !req.body.password) {
        res.json({
            success: false,
            msg: 'Please pass email and password.'
        });
    }
    else {
        User.authorize(null, email, password, function (err, user) {
            if (err) {
                res.json({
                    success: false,
                    msg: 'Authentication failed. User not found.',
                    username: 'was not found'
                });
            }
            else {
                log.debug('mistake was not found');
                log.debug('user found ' +user._id);
                var payload = user.toJSON();
                console.log("payload "+payload)
                var token = jwt.sign(payload, config.secret);
                console.log(token)
                // return the information including token as JSON
                res.json({
                    success: true,
                    msg: 'Congratulations! You have been logged',
                    username: user.name,
                    token: 'JWT ' + token
                });
            }
            //   res.render('cabinet', { title: 'Avra', user: req.session.user});

        });
    }
});

router.post('/signup', function (req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    log.info(name);
    log.info(email);
    log.info(password);
    if (!req.body.email || !req.body.password || !req.body.name) {
        res.json({
            success: false,
            msg: 'Please pass name, email and password.'
        });
    }
    else {
        User.authorize(name, email, password, function (err, user) {
            if (err) {
                console.log('in error auth');
                if (err instanceof AuthError) {
                    // return next(new HttpError(403, err.message));
                    res.json({
                        msg: "User with" + email + " is exist in database",
                        success: false
                    })
                } else {
                    //return next(err);
                    res.json({
                        msg: "Something wrong with saving to the database",
                        success: false
                    })
                }
            }
            log.debug('mistake was not found');
            //res.render('cabinet', { title: 'Avra', user: req.session.user});
            res.json({
                msg: "Success! You have been registred",
                success: true
            })
        });
    }
});

/* GET users listing. */
router.get('/users', passport.authenticate('jwt', {
    session: false
}), function (req, res, next) {
    log.debug("before users search");
    var token = getToken(req.headers);
    log.debug(token);
    if (token) {
        User.find(function (err, users) {
            if (err) {
                console.log(err);
                return next(err)
            }
            else
                res.json(users)
        })

    }
    else {
        return res.status(403).send({
            success: false,
            msg: 'Unauthorized.'
        });
    }
});


module.exports = router;

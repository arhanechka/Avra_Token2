var log = require('../lib/log')(module);
var User = require('../models/user');
var HttpError = require('../error/httpError').HttpError;
var AuthError = require('../error/authError').AuthError;
var express = require('express');
var router = express.Router();


router.post('/signin', function(req, res) {
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
        User.authorize(null, email, password, function(err, user) {


            if (err) {
                res.json({
                    success: false,
                    msg: 'Authentication failed. User not found.',
                    username: 'was not found'
                });
            }
            else {
                log.debug('mistake was not found');
                res.json({
                    success: true,
                    msg: 'Congratulations! You are in',
                    username: user.name
                });
            }
            //   res.render('cabinet', { title: 'Avra', user: req.session.user});

        });}
});

router.post('/signup', function(req, res, next) {
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
        User.authorize(name, email, password, function(err, user) {
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
        });}
});
module.exports = router;

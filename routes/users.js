//var express = require('express');
//var router = express.Router();
var log = require('../lib/log')(module)
var HttpError = require('../error').HttpError;


    var User = require('../models/user');

    /* GET users listing. */
     exports.get = function (req, res) {
      log.debug("before users search");
        User.find(function (err, users) {
            if (err) {
                console.log(err);
                return next(err)
            }
            else
                res.json(users)
        })

    };

    /*GET user by email*/
//     app.get('/user/:email', function (req, res, next) {
//         var email = new Object(req.params.email);
//         log.debug('This is email ' + email)
//         User.findOne({'email': req.params.email}, function (err, user) {
//             // if (err || !user) {
//             //     //res.status(401).send({message: 'User was not found'});
//             //     res.render('error', {title: 'Avra', status: 404, error: 'User was not found'});
//             // }
//             if(err)
//                 next(err)
//                 if(!user)
//                  next(new HttpError(404));
//             else {
//                     res.render('login', {title: 'Avra'});
//             }
//         })
//     });
//
//     app.put('/user/:userId', function (req, res, next) {
//     // Update a user identified by the userId in the request
//         var userId = req.session.user._id;
//         User.findById(userId, function (err, user) {
//             if (err) {
//                 res.status(500).send({message: "Could not find a user with id " + req.params.userId});
//             }
//
//             user.name = req.body.name;
//             user.email = req.body.email;
//             user.pass = req.body.pass;
//
//             user.save(function (err, data) {
//                 if (err) {
//                     res.status(500).send({message: "Could not update user with id " + req.params.userId});
//                 } else {
//                     res.json({message: "User successfully updated!", data});
//                 }
//             });
//         });
//     });
// };
//
// //module.exports = router;

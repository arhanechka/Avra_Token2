var passport = require('passport');
var config = require('../config/config').get(process.env.NODE_ENV);
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');
var log = require('../lib/log')(module)
var web3 = require('../lib/web3');
var Wallet = require('../models/wallet');
var async = require('async');
var getToken = require('../lib/token')
var express = require('express');
var router = express.Router();

router.get('/wallets/:user_id', passport.authenticate('jwt', {
    session: false
}), function (req, res, next) {
    console.log("In wallet get func")
    var token = getToken(req.headers);
    console.log("token");
    log.debug(token);
    if (!token) {
        return res.status(403).send({
            success: false,
            msg: 'Unauthorized.'
        });
    }
    Wallet.find({userId: req.params.user_id}, (err, wallets) => {
        if (err) {
            res.send({
                success: false,
                msg: "No wallets or mistake"
            })
            // return next(new HttpError(404, "No existing wallets in database"));
        } else {
            log.debug(wallets);
            res.json({
                success: true,
                msg: 'Wallets have been found!',
                wallets: wallets,
                token: token
            });
        }
    });
});
router.post('/deleteWallet/:wallet_id', passport.authenticate('jwt', {
    session: false
}), function (req, res, next) {
    console.log("In wallet get func")
    var token = getToken(req.headers);
    console.log("token");
    log.debug(token);
    if (!token) {
        return res.status(403).send({
            success: false,
            msg: 'Unauthorized.'
        });
    }
    Wallet.remove({_id: req.params.wallet_id}, function (err, data) {
        if (err) {
            res.status(500).send({msg: "Could not delete wallet with id " + req.params.wallet_id});
        } else {
            res.json({msg: "Wallet deleted successfully!"})
        }
    });
});


router.post('/newWallet/:user_id', passport.authenticate('jwt', {
    session: false
}), async function (req, res, next) {
    // Create and Save a new Wallet
    console.log("in new wallet")
    var token = getToken(req.headers);
    log.debug(token);
    if (!token) {
        return res.status(403).send({
            success: false,
            msg: 'Unauthorized.'
        });
    }
    var req_public = await web3.eth.personal.newAccount('1111');

    // if(callback) {
    //     return next(new HttpError(400, "Filelds can not be empty"));
    // };
    console.log("req public after " + req_public);
    var req_balance = 0;
    var wallet = new Wallet({userId: req.params.user_id, public: req_public, balance: req_balance});
    console.log("created wallet: " + wallet);
    wallet.save(function (err, data) {
        if (err) {
            console.log(err);
            return next(new HttpError(500, "Some error ocuured while creating the wallet."));
        } else {
            res.json({
                success: true,
                msg: 'New wallet was created!',
                wallet: wallet,
                token: token
            });
        }
    });
});
module.exports = router;

//exports.post = function(req, res, next) {
//     // Create and Save a new Wallet
//     var userId = req.session.user._id;
//     log.debug("That is req.session.userId"+userId);
//     var userPas = req.session.user.hashedPassword;
//     log.debug("That is req.session.userPass"+userPas);
//     async.waterfall([
//         function (callback) {
//             console.log('in wallet stage 1')
//             web3.eth.personal.newAccount(userPas, callback)
//         },
//         function (req_public, callback) {
//             console.log('in wallet stage 2')
//             if (callback) {
//                 //TODO make a new mistake type
//                 return next(new HttpError(500, "Some error ocuured while creating the wallet."));
//             }
//             console.log("req public after " + req_public);
//             //TODO make get balance
//             var req_balance = 0;
//             var wallet = new Wallet({userId: userId, public: req_public, balance: req_balance});
//             console.log("created wallet: " +wallet);
//             wallet.save(function(err, data) {
//                 if(err) {
//                     console.log(err);
//                     return next(new HttpError(500, "Some error ocuured while creating the wallet."));
//                 } else {
//                     res.json(data);}
//         })}
//         ], callback);
// };
module.exports = router;

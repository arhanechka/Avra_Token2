var log = require('../lib/log')(module)
var web3 = require('../lib/web3');
var Wallet = require('../models/wallet');
var async = require('async');
var express = require('express');
var router = express.Router();

router.post('/wallets', function(req, res, next) {
    // var userId = req.session.user._id;
    var userId = req.body.id;
    log.debug(userId);
    Wallet.find({userId: userId}, (err, wallets)=>{
     if(err){
        res.send({
            success: false,
            msg: "No wallets or mistake"
        })
         // return next(new HttpError(404, "No existing wallets in database"));
     } else {
        log.debug(wallets);
       //  req.session.wallets = wallets;
       //  res.json(wallets);
         res.json({
             success: true,
             msg: wallets
         });
        //res.render('wallets', {title: 'Avra', address: addresses});
     }
    });
});

router.post('/newWallet', async function(req, res, next) {
    // Create and Save a new Wallet
    var userId = req.body.id;
    // var userId = req.session.user._id;
    log.debug("That is req.session.userId"+ userId);
    // var userPas = req.session.user.hashedPassword;
    var userPas = req.body.pass;
    log.debug("That is req.session.userPass"+userPas);
    var req_public = await web3.eth.personal.newAccount(userPas);

    // if(callback) {
    //     return next(new HttpError(400, "Filelds can not be empty"));
    // };
    console.log("req public after " + req_public);
    var req_balance = 0;
    var wallet = new Wallet({userId: userId, public: req_public, balance: req_balance});
    console.log("created wallet: " +wallet);
    wallet.save(function(err, data) {
        if(err) {
            console.log(err);
            return next(new HttpError(500, "Some error ocuured while creating the wallet."));
        } else {
            res.json(data);
          //  res.render('wallets.ejs')
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

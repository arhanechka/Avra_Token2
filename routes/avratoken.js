var express = require('express');
var router = express.Router();
var passport = require('passport');
var config = require('../config/config').get(process.env.NODE_ENV);
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');
var log = require('../lib/log')(module)
var web3 = require('../lib/web3');
var Wallet = require('../models/wallet');
var async = require('async');
var getToken = require('../lib/token');
var getInfo = require('../token/app/javascripts/app').getInfo;
var buyToken = require('../token/app/javascripts/app').buyToken;


router.post('/buyToken', passport.authenticate('jwt', {
    session: false
}), async function (req, res) {
    console.log("In buy avratoken get func")
    var amount = parseInt(req.body.amount, 10);
    console.log("amount!");
    console.log(amount);
    var wallet = req.body.wallet;
    console.log("wallet!");
    console.log(wallet);
    var token = getToken(req.headers);
    console.log("token");
   // log.debug(token);
    if (!token) {
        return res.status(403).send({
            success: false,
            msg: 'Unauthorized.'
        });
    }
    else {
        let info = await buyToken(amount);
        console.log("info")
        console.log(info)
        res.json({
            success: true,
            msg: 'Success',
            balance: info.balance
        })
    }

});
router.get('/getInfo/:wallet_id', passport.authenticate('jwt', {
    session: false
}), async function (req, res, next) {
    console.log("In avratoken get func")
    var token = getToken(req.headers);
    console.log("token");
    log.debug(token);
    if (!token) {
        return res.status(403).send({
            success: false,
            msg: 'Unauthorized.'
        });
    }
    else {
        let info = await getInfo();
      //  console.log("tk");
       // console.log(info);
        res.json({
            success: true,
            msg: 'Success',
            address: info.address,
            supply: info.supply,
            balance: info.balance
        })
    }

});
module.exports = router;

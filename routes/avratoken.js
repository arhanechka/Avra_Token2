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
var getToken = require('../lib/token')

var web3Token = require('../token/app/javascripts/app')

router.post('/checkbalance/:wallet_id', passport.authenticate('jwt', {
    session: false
}), async function (req, res, next) {
    console.log("In avratoken get func")
    var token = getToken(req.headers);
    console.log("token");
    log.debug(token);
    var account;
    if (!token) {
        return res.status(403).send({
            success: false,
            msg: 'Unauthorized.'
        });
    }
    else {
        let tk = await web3Token();
        console.log("tk");
        console.log(tk);
        res.json({
            address: info.address,
            supply: info.supply,
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
        let info = await web3Token();
        console.log("tk");
        console.log(info);
        res.json({
            msg: 'Success',
            address: info.address,
            supply: info.supply,
            balance: info.balance
        })
    }

});
module.exports = router;

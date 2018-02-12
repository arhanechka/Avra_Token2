var mongoose = require('./lib/mongoose');
var async = require('async');
mongoose.set('debug', true);

async.series([
    open,
    dropDatabase,
    requireModels,
    createUsers
], function(err) {
    console.log(arguments);
    mongoose.disconnect();
    process.exit(err ? 255 : 0);
});

function open(callback) {
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback) {
    require('./models/user');

    async.each(Object.keys(mongoose.models), function(modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

function createUsers(callback) {
        var users = [
            {name: 'Zildjian', email: 'aranvic@inet.ua', password: 'salted'},
            {name: 'Petya', email: 'araasdic@inet.ua', password: 'swdwlted'},
            {name: 'Yura', email: 'araas34dic@inet.ua', password: 'swewedwlted'},
            {name: 'Sonya', email: 'arassdic@inet.ua', password: 'swsdwlted'}
        ];
            async.each(users, function (userData, callback) {
                var user = new mongoose.models.User(userData);
               // console.log(user)
                user.save(callback);

            }, callback);}
    // async.parallel([
    //     function (callback) {
    //         var vasya = new User({name: 'Zildjian', email: 'aranvic@inet.ua', pass: 'salted', salt: '1234'});
    //         vasya.save(function (err) {
    //             callback(err, vasya);
    //         })
    //
    //     },
    //     function (callback) {
    //         var petya = new User({name: 'Petya', email: 'araasdic@inet.ua', pass: 'swdwlted', salt: '4341234'});
    //         petya.save(function (err) {
    //             callback(err, petya);
    //         })
    //
    //     },
    //     function (callback) {
    //         var yura = new User({name: 'Yura', email: 'araas34dic@inet.ua', pass: 'swewedwlted', salt: '434321234'});
    //         yura.save(function (err) {
    //             callback(err, yura);
    //         })
    //
    //     },
    //     function (callback) {
    //         var sonya = new User({name: 'Sonya', email: 'arassdic@inet.ua', pass: 'swsdwlted', salt: '43341234'});
    //         sonya.save(function (err) {
    //             callback(err, sonya);
    //         })
    //
    //     }
    // ], callback);

// function close(callback){
//     mongoose.disconnect(callback);
// }


// var newUser = function (name, email, password, salt) {
//
// const user = new User(
//     {
//         name: name,
//         email: email,
//         password: password,
//         salt: salt
//     });
// user.save(function (err, res, affected) {
//     if (err == null)
//         console.log('meow')
// });
//
// }
// User.findOne({name: "Zildjian"}, function(err, tester) {
//     console.log(tester);
// });



var mongoose = require('../lib/mongoose');
var util = require('util');
var crypto = require('crypto');
var async = require('async');
var log = require('../lib/log')(module)
var AuthError = require('error/authError').AuthError;



Schema = mongoose.Schema;
var schema = new Schema({
    id: { type: String, required: false},
    name: { type: String, required: true },
    email: { type : String, required: true, unique: true},
    hashedPassword: { type: String, required: true },
    salt: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false
});


schema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function(password) {
        this._plainPassword = password;
        this.salt = Math.random() + '';
       // this.salt = '4341234';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() { return this._plainPassword; });


schema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};
schema.statics.authorize = function(email, password, callback) {
    console.log('here')
    var User = this;

    async.waterfall([
        function(callback) {
        console.log('in stage 1')
            User.findOne({email: email}, callback);
        },
        function(user, callback) {
            if (user) {
                if (user.checkPassword(password)) {
                    callback(null, user);
                } else {
                    callback(new AuthError("Password is wrong"));
                }
            } else {
                console.log("final")
                callback(new AuthError("Wrong email or such user does not exist"));

            }
        }
    ], callback);
};

module.exports = mongoose.model('User', schema);



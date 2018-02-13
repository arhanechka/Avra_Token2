var mongoose = require('mongoose');
var User = require('../models/user');

var WalletSchema = mongoose.Schema({
    id: { type: String, required: false},
    userId: { type: String, required: true },
    public: { type : String, required: true, unique: true},
    //  private: { type : String, required: true, unique: true},
    balance: { type : Number, required: true, unique: false}
}, {
    timestamps: true,
     versionKey: false
});

module.exports = mongoose.model('Wallet', WalletSchema);

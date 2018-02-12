var log = require('../lib/log')(module)

const mongoose = require('mongoose');
var config = require('../config');
mongoose.connect(config.get('mongoose:uri'));
mongoose.connection.on('error', function() {
    log.debug('Could not connect to the database. Exiting now...');
    process.exit();
});
mongoose.connection.once('open', function() {
    log.info("Successfully connected to the database");
})
module.exports = mongoose;

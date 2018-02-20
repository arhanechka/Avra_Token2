var log = require('../lib/log')(module)

const mongoose = require('mongoose');
var config = require('../config/config').get(process.env.NODE_ENV);
mongoose.connect(config.database);
log.debug(config.database)

mongoose.connection.on('error', function() {
    log.debug('Could not connect to the database. Exiting now...');
    process.exit();
});
mongoose.connection.once('open', function() {
    log.info("Successfully connected to the database");
})
module.exports = mongoose;

var winston = require('winston')
var ENV = process.env.NODE_ENV;

//function for getting different loging levels with paths
var getLogger = function (module) {
    var path = module.filename.split('/').slice(-2).join(2);

    return new winston.Logger({
        transports: [
            new winston.transports.Console({
            colorize: true,
            level: 'development' ? 'debug' : 'error',
                label: path})

        ]
    });
}

module.exports = getLogger;

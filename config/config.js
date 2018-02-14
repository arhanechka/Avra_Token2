var config = {
    test: {
        'database': 'mongodb://localhost:27017/avra-rest-server-test',

    },
    default: {
        'database': 'mongodb://localhost:27017/avra_test',
    },
    portConfig: 3000,
    session: {
        'secret': 'tooSimpleServer',
        'maxAge': null
    },
}

exports.get = function get(env) {
    return config[env] || config.default;
}

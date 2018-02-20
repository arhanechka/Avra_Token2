var config = {
    test: {
        'database': 'mongodb://localhost:27017/avra-rest-server-test',
        'secret': 'annazavr'

    },
    default: {
        'database': 'mongodb://localhost:27017/avra_test',
        'secret': 'annazavr'
    },
    portConfig: 3000,
    session: {
        'secret': 'tooSimpleServer',
        'maxAge': null
    },
    jwt: {
        jwtSecret: "MyS3cr3tK3Y",
        jwtSession: {
            session: false
        },
    },
}

exports.get = function get(env) {
    return config[env] || config.default;
}

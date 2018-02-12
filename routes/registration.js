var log = require('lib/log')(module)


exports.get  = function(req, res) {
    res.render('registration', { title: 'Avra'});
};



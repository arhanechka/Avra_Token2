
var log = require('lib/log')(module)
// module.exports = function (app) {
//
// /* GET home page. */
// app.get('/', function(req, res, next) {
//   res.render('index', { title: 'Avra'});
// });
//
// app.get('/t', function(req, res, next) {
//     log.debug('test')
//     res.end('test');
// });
// }
module.exports = function(app) {
    //redirect to index page
    app.get('/', require('./frontpage').get);
    //redirect to login page
    app.get('/login', require('./login').get);
    // filling login form
    app.post('/login', require('./login').post);
    //redirect to registration page
    app.get('/registration', require('./registration').get);
    //redirect to logout page
    app.post('/logout', require('./logout').post);

    //
    // app.post('/logout', require('./logout').post);
    //
    // app.get('/chat', checkAuth, require('./chat').get);

};

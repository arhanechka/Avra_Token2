
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
    //filling registration form
    app.post('/registration', require('./registration').post);
    //redirect to logout page
    app.post('/logout', require('./logout').post);
    //redirect to cabinet page
    app.get('/cabinet', require('./cabinet').get);
   // redirect to wallets page
    app.get('/wallets', require('./wallet').get);
    // // filling login form
    // app.post('/login', require('./login').post);


};


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
    //close the session
    app.post('/logout', require('./logout').post);
    //redirect to cabinet page
    app.get('/cabinet', require('./cabinet').get);
   // redirect to wallets page
    app.get('/wallets', require('./wallet').get);
    // create new wallet
    app.post('/wallets', require('./wallet').post);
    app.get('/users', require('./users').get);
    // TODO update and delete user and wallet
    // Update a User with userId
    // app.put('/users/:userId', users.update);
    // // Delete a User with userId
    // app.delete('/users/:userId', users.delete);
    // // Update a Wallet with walletId
    // app.put('/wallet/:walletId', wallet.update);
    // // Delete a Wallet with walletId
    // app.delete('/wallet/:walletId', wallet.delete);
};

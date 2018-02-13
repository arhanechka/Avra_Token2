var log = require('../lib/log')(module)

exports.post = function (req, res) {
    //console.log();
    console.log('here is sess')
    console.log(req.session)

    req.session.destroy(function(err) {
      if(err){
          log.debug('Problem with session destroy')
      }  // cannot access session here
    })
    res.render('index', { title: 'Avra'});
};

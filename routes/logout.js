exports.post = function (req, res) {
    req.session.destroy();
    res.render('index', { title: 'Avra'});
};

exports.get  = function(req, res) {
    var addresses = ["0x01236374234nbr48743rjernkwedew", "0x01236374234nbr48743rjernkwedew"];
    //res.render('cabinet',{ title: 'Avra', address: addresses});
    res.json(addresses)
};

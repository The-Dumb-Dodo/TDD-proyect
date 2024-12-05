module.exports.renderHome = (req, res, next) => {
    res.render('home');
}

module.exports.renderGame = (req, res, next) => {
    res.render('play');
}
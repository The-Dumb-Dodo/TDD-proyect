module.exports.renderHome = (req, res, next) => {
    res.render('home');
}

module.exports.renderGame = (req, res, next) => {
    res.render('play');
}

module.exports.welcome = (req, res ,next) => {
    res.render('users/welcome')
}
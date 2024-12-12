const User = require('../models/User.model')
module.exports.renderHome = (req, res, next) => {
    res.render('home');
}

module.exports.renderGame = (req, res, next) => {
    res.render('play');
    
}

module.exports.endGame = (req, res, next) => {
    let {score} = req.body
    User.findOneAndUpdate({_id: req.currentUser.id},{highestScore:score})
        .then(()=>{
            res.redirect('/')
        })
        .catch((error)=>next(error))

}
module.exports.welcome = (req, res ,next) => {
    res.render('users/welcome')
}
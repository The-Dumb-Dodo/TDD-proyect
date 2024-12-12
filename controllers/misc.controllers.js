const User = require('../models/User.model')
module.exports.renderHome = (req, res, next) => {
    res.render('home');
}

module.exports.renderGame = (req, res, next) => {
    res.render('play');
    
}

module.exports.endGame = (req, res, next) => {
    let {score} = req.body
    User.findById({_id: req.currentUser.id})
        .then((user)=>{
            if (score > user.highestScore){
                User.findOneAndUpdate({_id: req.currentUser.id},{highestScore:score})
                .then(()=>{
                    console.log("score updated")
                    setTimeout(() => {
                        console.log("entered 1")
                        return res.render('end-game')
                        
                      }, 2000);
                })
                .catch((error)=>next(error))
            } else {
                console.log("score is not high to update")
                
                    setTimeout(() => {
                        console.log("entered 2")
                        return res.render('end-game')
                        
                      }, 2000);
            }
            
        })
        .catch((error)=>next(error))

}
module.exports.welcome = (req, res ,next) => {
    res.render('users/welcome')
}
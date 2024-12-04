const mongoose = require('mongoose')
const Island = require('../models/Island.model')

module.exports.renderMainIsland = (req, res, next) => {
    res.render("island/main")
}

module.exports.formCreate = (req, res, next) => {
    res.render("island/form")
}
module.exports.doFormCreate = (req, res, next) => {
    
    req.body.guardian = req.currentUser.id

    Island.create(req.body)
        .then(
            res.redirect("/my-island")
        )
        .catch(error => {
            console.log("Error details:", error.message, error.errors)

            const values = {...req.body}
            
            if (error instanceof mongoose.Error.ValidationError) {
              res.render('island/form', {
                errors: error.errors,
                values
              })
            }else if (error.code && error.code === 11000) {
                const errors = {}
        
                if (error.keyValue.name) {
                  errors.email = 'Ya existe un usuario con este nombre'
                }
                res.render('island/form', { errors, values })
              } else {
              next(error)
            }
      
          })

}

module.exports.myIsland = (req, res, next) => {
    res.render("island/my-island")
}
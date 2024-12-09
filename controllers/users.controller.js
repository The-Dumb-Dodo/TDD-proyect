const mongoose = require('mongoose')
const User = require('../models/User.model')
const Island = require('../models/Island.model')

module.exports.create = (req, res, next) => {
    res.render('users/subscribe')
  }

  module.exports.doCreate = (req, res, next) => {

    // const fields = {
    //     ...req.body,
    //     image: req.file.path
    //   }
    User.create(req.body)
      .then(() => {
        res.redirect('/welcome')
      })
      
      .catch(error => {
        console.log("Error details:", error.message, error.errors)
        // Para autorellenar el formulario cuando haya errores, pasamos todos los valores del req.body, menos la password
        const values = {...req.body}
        delete values.password
  
        if (error instanceof mongoose.Error.ValidationError) {
          res.render('users/subscribe', {
            errors: error.errors,
            values
          })
        } else if (error.code && error.code === 11000) {
          const errors = {}
  
          if (error.keyValue.email) {
            errors.email = 'Ya existe un usuario con este email'
          }
  
          if (error.keyValue.username) {
            errors.username = 'Ya existe un usuario con este nombre'
          }
  
          res.render('users/subscribe', { errors, values })
        } else {
          next(error)
        }
  
      })
  }

  module.exports.getCurrentUserProfile = (req, res, next) => {
    Island.findOne({ guardian: new mongoose.Types.ObjectId(req.currentUser.id) })
    .then((island)=>{
      res.render('users/profile', {island})
    })
    .catch((error) => next(error))
  }

  module.exports.editProfile = (req, res , next) => {
    res.render("users/profile-form")
  }

  module.exports.doEditProfile = (req,res,next)=>{
    User.findOneAndUpdate({_id: req.currentUser.id },
    req.body)
    .then(()=>{
        res.redirect('/profile')
      })
      .catch((error) => next(error))
      
  }
const mongoose = require('mongoose')
const User = require('../models/User.model')

module.exports.create = (req, res, next) => {
    res.render('users/subscribe')
  }

  module.exports.doCreate = (req, res, next) => {

    // const fields = {
    //     ...req.body,
    //     image: req.file.path
    //   }
    console.log("req body1***",req.body)
    User.create(req.body)
   
      .then(() => {
        console.log("***entered in THEN***")
        res.redirect('/')
      })
    
      .catch(error => {
        console.log("**Second Body**", req.body)
        
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


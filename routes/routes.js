const router = require ('express').Router()

const upload = require('../config/multer.config')

const { isAuthenticated, isNotAuthenticated } = require('../middlewares/auth.middleware')

const usersController = require('../controllers/users.controller')
const authController = require('../controllers/auth.controller')

//Home 
router.get('/', (req, res, next) => {
    res.render('home');
});


//Play (priority 2)


//Islands 


//Creatures 


//Users subscribe 
router.get('/subscribe', isNotAuthenticated, usersController.create)
router.post('/subscribe', isNotAuthenticated, usersController.doCreate)

//Users sign in 
// router.get('/signin', isNotAuthenticated, authController.login)
// router.post('/signin', isNotAuthenticated, authController.doLogin)

// //Users log out
// router.get('/logout', isAuthenticated, authController.logout)

// //Users 
// router.get('/profile', isAuthenticated, usersController.getCurrentUserProfile)
// router.get('/users/:id', isAuthenticated, usersController.getUserProfile)





module.exports = router 
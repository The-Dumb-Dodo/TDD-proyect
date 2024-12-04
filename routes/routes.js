const router = require ('express').Router()

const upload = require('../config/multer.config')

const { isAuthenticated, isNotAuthenticated } = require('../middlewares/auth.middleware')

// user controllers
const usersController = require('../controllers/users.controller')
const authController = require('../controllers/auth.controller')
// island controllers
const islandController = require('../controllers/islands.controller')

//Home 
router.get('/', (req, res, next) => {
    res.render('home');
});


//Play (priority 2)


//Islands 
router.get('/island-main', islandController.renderMainIsland )
router.get('/island-form', islandController.formCreate)
router.post('/island-form', islandController.doFormCreate)
router.get('/my-island', islandController.myIsland )

//Creatures 

//Users subscribe 
router.get('/subscribe', isNotAuthenticated, usersController.create)
router.post('/subscribe', isNotAuthenticated, usersController.doCreate)

//Users sign in 
router.get('/signin', isNotAuthenticated, authController.signin)
router.post('/signin', isNotAuthenticated, authController.doSignin)

// //Users log out
 router.get('/logout', isAuthenticated, authController.logout)

// //Users 
router.get('/profile', isAuthenticated, usersController.getCurrentUserProfile)
// router.get('/users/:id', isAuthenticated, usersController.getUserProfile)





module.exports = router 
const express = require('express')
const userController=  require('../controllers/userController')
const router = express.Router();



router.get('/profile',userController.profile)
router.get('/sign-up',userController.signUp)
router.get('/sign-in',userController.signIn)
router.post('/create',userController.create)
router.post('/signin',userController.login)
module.exports = router; 
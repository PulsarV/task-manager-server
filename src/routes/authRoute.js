const {Router} = require('express')
const router = Router()
const {AuthController} = require('../controllers')
const signinAuth = require('../middlewares/authMiddleware')

router.route('/signup').post(AuthController.signup)
router.route('/signin').post(signinAuth, AuthController.signin)

module.exports = router
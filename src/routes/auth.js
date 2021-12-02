const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController')


router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/refresh-token', AuthController.refreshToken)
router.post("/forgotpassword", AuthController.forgotpassword)
router.post("/resetpassword/:tkn", AuthController.resetpassword)

module.exports = router
const express = require('express')
const router = express.Router()

const UserController = require("../controllers/UserController")
const authenticate = require('../middleware/authenticate')

router.post("/createuser", UserController.createUser);
router.get("/readbook/:username/:bookId",UserController.readbook)
router.get("/userinfo/:username", authenticate, UserController.userinfo)

module.exports = router
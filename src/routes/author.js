const express = require('express')
const router = express.Router()

const AuthorController = require("../controllers/AuthorController")

router.post("/insertauthor", AuthorController.insertauthor);
router.get("/getauthor/:authorid", AuthorController.getAuthor)
router.post("/addbooktoauthor/:bookId/:authorId",AuthorController.addBookToAuthor)

module.exports = router
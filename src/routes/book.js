const express = require('express')
const router = express.Router()

const BookController = require("../controllers/BookController")

router.post("/insertbook", BookController.insertbook);
router.get("/getbook/:bookid", BookController.getBook)
router.post("/addauthortobook/:authorId/:bookId",BookController.addAuthorToBook)

module.exports = router
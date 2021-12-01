const mongoose = require('mongoose')

const Book = mongoose.model(
    "Book",
    new mongoose.Schema({
      title: String
    })
  );

module.exports = Book
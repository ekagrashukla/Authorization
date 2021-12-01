const mongoose = require('mongoose')

const Book = mongoose.model(
    "Book",
    new mongoose.Schema({
      title: String,
      authors: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Author"
        }
      ]
    })
  );

module.exports = Book
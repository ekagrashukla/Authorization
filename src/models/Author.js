const mongoose = require('mongoose')

const Author = mongoose.model(
    "Author",
    new mongoose.Schema({
      authorName: String,
      books: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book"
        }
      ]
    })
  );

  module.exports = Author
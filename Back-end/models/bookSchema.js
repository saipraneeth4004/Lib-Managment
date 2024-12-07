const mongoose = require("mongoose");

const bookModel = new mongoose.Schema(
  {
    BookName: {
      type: String,
      required: [true, "Book Name is Required"],
    },
    Category: {
      type: String,
    },
    Author: {
      type: String,
    },
    ISBN: {
      type: String,
      unique: true,
      
    },
    Price: {
      type: String,
    },
    BookPicture: {
      type: String,
    },
    isIssued: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("book", bookModel);
module.exports = Book;

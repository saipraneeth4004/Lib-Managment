const mongoose = require("mongoose");

const authorsModel = new mongoose.Schema(
  {
    AuthorName: {
      type: String,
      required: [true, "Author Name is Required"],
      unique:true
    }
  },
  { timestamps: true }
);

const Authors = mongoose.model("authors", authorsModel);
module.exports = Authors;

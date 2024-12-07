const mongoose = require("mongoose");

const categoryModel = new mongoose.Schema(
  {
    CategoryName: {
      type: String,
      required: [true, "Category Name is Required"],
      unique:true
    },
    Status: {
      type: String,
      default:"Active"
    },
  },
  { timestamps: true }
);

const   Category = mongoose.model("category", categoryModel);
module.exports = Category;


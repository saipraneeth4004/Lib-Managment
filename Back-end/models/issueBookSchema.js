const mongoose = require("mongoose");

const issueBookModel = new mongoose.Schema(
  {
    StudentId: {
      type: String,
      required: [true, "Student id is Required"],
    },
    ISBN: {
      type: String,
      required: [true, "ISBN is Required"],
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
    },
    returned: {
      type: Boolean,
      default: false,
    },
    Fine:{
      type:String,
      default:0
    }
  },
  { timestamps: true }
);

const IssueBook = mongoose.model("issueBook", issueBookModel);
module.exports = IssueBook;

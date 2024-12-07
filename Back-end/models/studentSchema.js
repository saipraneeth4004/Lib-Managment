const mongoose = require("mongoose");

const studentModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    username: {
      type: String,
      required: [true, "Username is Required"],
      unique: true,
    },
    mobile: {
      type: String,
      required: [true, "Mobile is Required"],
    },
    password: {
      type: String,
      select: false,
      maxLength: [12, "password should not exceed 12 character"],
      minLength: [4, "password should have atleast 4 character"],
      //   match:[]
    },
    SID: {
      type: String,
    },
    Status: {
      type: String,
      default: "Active",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    issuedBook: [{ type: mongoose.Schema.Types.ObjectId, ref: "book" }],
  },
  { timestamps: true }
);

const bcrypt = require("bcryptjs");
// For encrypting password
studentModel.pre("save", function () {
  if (!this.isModified("password")) {
    return;
  }
  let salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
});

// For comparing password
studentModel.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// jwt generate and verify methods
const jwt = require("jsonwebtoken");
studentModel.methods.generateJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const Student = mongoose.model("student", studentModel);
module.exports = Student;

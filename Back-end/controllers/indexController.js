const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Book = require("../models/bookSchema");
const IssueBook = require("../models/issueBookSchema");
const Student = require("../models/studentSchema");
const ErrorHandler = require("../utlis/ErrorHandler");
const { setcookie } = require("../utlis/setCookie");

exports.homepage = catchAsyncErrors(async (req, res, next) => {
  res.send("hey arjun");
});

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findOneAndUpdate(
    { SID: req.body.sid },
    { $set: { name: req.body.name, mobile: req.body.mobile } }
  );
  res.json(student);
});

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findById(req.id).exec();
  if (student) {
    res.json(student);
  } else {
    return res.json({ message: "user not found" });
  }
});

exports.studentSignup = catchAsyncErrors(async (req, res, next) => {
  const student = await new Student({
    name: req.body.name,
    username: req.body.username,
    mobile: req.body.mobile,
    password: req.body.password,
    SID: req.body.SID,
  }).save();
  setcookie(student, 201, res);
});

exports.studentSignin = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findOne({ username: req.body.username })
    .select("+password")
    .exec();
  const bcrypt = require("bcryptjs");
  let salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(req.body.password, salt);
  if (!student) return next(new ErrorHandler("User Not Found", 404));
  const isMatched = student.comparePassword(req.body.password);
  if (!isMatched) {
    return next(new ErrorHandler("Wrong Password", 500));
  }
  const isAdmin = student.isAdmin;
  setcookie(student, 200, res, isAdmin);
});

exports.studentSignout = catchAsyncErrors(async (req, res, next) => {
  res.clearCookie("mytoken");
  res.json("Signed Out Successfully");
});

exports.changePassword = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findOne({ _id: req.body._id })
    .select("+password")
    .exec();
  
  const bcrypt = require("bcryptjs");
  let salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(req.body.newPassword, salt);
  const isMatched = student.comparePassword(req.body.oldPassword);
  if (isMatched) {
    const student = await Student.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      {
        $set: { password: hashPassword },
      }
    );
    res.json({ student, message: 200 });
  } else {
    res.json({ message: 204, errorr: "Enter Correct Password " });
  }
});

exports.userDashboardLength = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findOne({ _id: req.body._id }).exec();
  const issuedBook = await IssueBook.find({});
  const book = await Book.find({});


  const userFilteredIssuedBook = issuedBook.filter(
    (data) => data.StudentId === student.SID
  );

  res.json({
    book: book.length,
    notReturnedYet: student.issuedBook.length,
    issuedBook: userFilteredIssuedBook.length,
  });
});

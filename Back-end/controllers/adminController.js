const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentSchema");
const Category = require("../models/categoriesSchema");
const Authors = require("../models/authorSchema");
const Book = require("../models/bookSchema");
const IssueBook = require("../models/issueBookSchema");
const ErrorHandler = require("../utlis/ErrorHandler");
const { setcookie } = require("../utlis/setCookie");

exports.adminProfile = catchAsyncErrors(async (req, res, next) => {
  res.send("hey arjun");
});

const allUsername = new Set();
const allSid = new Set();
const allIsbn = new Set();
exports.gatherAll_sid_isbn = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.find({});
  const book = await Book.find({});
  for (let i = 0; i < student.length; i++) {
    const s = student[i].toObject();
    allSid.add(s.SID);
  }
  for (let i = 0; i < book.length; i++) {
    const b = book[i].toObject();
    allIsbn.add(b.ISBN);
  }
  res.json("All SID And ISBN Gathered");
});

exports.check_username = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.find({});
  for (let i = 0; i < student.length; i++) {
    const s = student[i].toObject();
    allUsername.add(s.username);
  }
  const username = req.body.username;
  
  const availUsername = allUsername.has(username);
  res.json({ usernameAvail: availUsername });
});
exports.check_sid = catchAsyncErrors(async (req, res, next) => {
  const sid = req.body.sid;
  const availSid = allSid.has(sid);
  res.json({ sidAvail: availSid });
});

exports.check_isbn = catchAsyncErrors(async (req, res, next) => {
  const isbn = req.body.isbn;
  const availISBN = allIsbn.has(isbn);
  res.json({ isbnAvail: availISBN });
});

exports.studentStatusChanger = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findOneAndUpdate(
    { _id: req.body._id },
    { $set: { Status: req.body.Status } }
  );
  res.json(student);
});

exports.deleteBook = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.deleteOne({ _id: req.body.Id });
  res.json("Book deleted");
});

exports.editBook = catchAsyncErrors(async (req, res, next) => {
  const imageBuffer = req?.file?.buffer;
  const base64image = imageBuffer?.toString("base64");
  const book = await Book.findOneAndUpdate(
    { _id: req.body._id },
    {
      $set: {
        BookName: req.body.BookName,
        Category: req.body.Category,
        Author: req.body.Author,
        ISBN: req.body.ISBN,
        Price: req.body.Price,
        BookPicture: base64image,
      },
    }
  );
  res.status(201).json(book);
});

exports.bookDetail = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.findOne({ _id: req.body._id });
  res.json(book);
});

exports.authorDetail = catchAsyncErrors(async (req, res, next) => {
  const author = await Authors.findOne({ _id: req.body._id });
  res.json(author);
});

exports.editAuthor = catchAsyncErrors(async (req, res, next) => {
  const author = await Authors.findOneAndUpdate(
    { _id: req.body._id },
    { $set: { AuthorName: req.body.AuthorName } }
  );
  res.json(author);
});

exports.deleteAuthor = catchAsyncErrors(async (req, res, next) => {
  const author = await Authors.deleteOne({ _id: req.body.Id });
  res.json("Category deleted");
});

exports.editCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findOneAndUpdate(
    { _id: req.body._id },
    { $set: { CategoryName: req.body.CategoryName, Status: req.body.Status } }
  );
  res.json(category);
});

exports.categoryDetail = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findOne({ _id: req.body._id });
  res.json(category);
});

exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const delCategory = await Category.deleteOne({ _id: req.body.Id });
  res.json("Category deleted");
});

exports.allLengths = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.find({});
  const issuedBook = await IssueBook.find({});
  const book = await Book.find({});
  const authors = await Authors.find({});
  const category = await Category.find({});

  res.json({
    student: student.length,
    issuedBook: issuedBook.length,
    book: book.length,
    authors: authors.length,
    category: category.length,
  });
});

exports.allStudent = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.find({});
  res.json({ student: student });
});

// issued Book
exports.IssuedBookDetails = catchAsyncErrors(async (req, res, next) => {
  const issued = await IssueBook.findOne({ _id: req.body._id });
  const student = await Student.findOne({ SID: issued.StudentId });
  const book = await Book.findOne({ ISBN: issued.ISBN });
  res.json({ student, book, issued });
});

exports.createissuedBook = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findOne({ SID: req.body.StudentId });
  const IssuedBook = await Book.findOne({ ISBN: req.body.ISBN });

  const AllissuedBook = await IssueBook.find({});
  const userFilteredIssuedBook = AllissuedBook.filter(
    (data) =>
      data.StudentId === req.body.StudentId && data.ISBN === req.body.ISBN
  );
  if (!IssuedBook.isIssued) {
    if (userFilteredIssuedBook.length === 0) {
      const issuedBook = await new IssueBook({
        StudentId: req.body.StudentId,
        ISBN: req.body.ISBN,
        student: student._id,
      }).save();
      const book = await Book.findOneAndUpdate(
        { ISBN: req.body.ISBN },
        { $set: { isIssued: true } }
      );
      student.issuedBook.push(book._id);
      student.save();
      res.status(200).json({
        message: 200,
        issuedBook,
        book,
        student,
      });
    } else {
      res.status(202).json({ message: 202 });
    }
  } else {
    res.status(201).json({ message: 201 });
  }
});

exports.returnIssuedBook = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findOne({ SID: req.body.StudentId });
  const IssuedBook = await Book.findOne({ ISBN: req.body.ISBN });
  const AllissuedBook = await IssueBook.find({});
  const userFilteredIssued = AllissuedBook.filter(
    (data) =>
      data.StudentId === req.body.StudentId && data.ISBN === req.body.ISBN
  );
  const issued = await IssueBook.findOneAndUpdate(
    {
      _id: userFilteredIssued[0]._id,
    },
    { $set: { returned: true, Fine: req.body.FINE } }
  );
  const book = await Book.findOneAndUpdate(
    { ISBN: req.body.ISBN },
    { $set: { isIssued: false } }
  );
  student.issuedBook.pop(book._id);
  student.save();
  res.status(200).json({
    student,
    issued,
    IssuedBook,
  });
});

exports.allissuedBook = catchAsyncErrors(async (req, res, next) => {
  const AllissuedBook = await IssueBook.find({});
  const AllBookDetailsArray = [];
  for (let i = 0; i < AllissuedBook.length; i++) {
    const allBook = AllissuedBook[i].toObject();
    const student = await Student.findOne({ SID: allBook.StudentId });
    const book = await Book.findOne({ ISBN: allBook.ISBN });
    const userFilteredIssued = AllissuedBook.filter(
      (data) => data.StudentId === student.SID && data.ISBN === book.ISBN
    );
    AllBookDetailsArray.push({
      _id: allBook._id,
      student: student.name,
      SID: student.SID,
      isIssued: !userFilteredIssued[0].returned,
      book: book.BookName,
      ISBN: book.ISBN,
      issuedDate: allBook.createdAt,
      returnDate: userFilteredIssued[0].updatedAt,
    });
  }
  res.json({ AllBookDetailsArray });
});

exports.studentBookNotReturned = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findOne({ _id: req.body._id });
  const AllissuedBook = await IssueBook.find({});
  const userFilteredIssuedBookArray = AllissuedBook.filter(
    (data) => data.StudentId === student.SID
  );
  const userFilteredIssuedBookArray2 = userFilteredIssuedBookArray.filter(
    (data) => data.returned == false
  );

  const AllBookDetailsArray = [];
  for (let i = 0; i < userFilteredIssuedBookArray2.length; i++) {
    const mybook = userFilteredIssuedBookArray2[i].toObject();
    const book = await Book.findOne({ ISBN: mybook.ISBN });

    AllBookDetailsArray.push({
      student: student.name,
      SID: student.SID,
      book: book.BookName,
      ISBN: book.ISBN,
      issueDate: book.createdAt,
      returnDate: mybook.updatedAt,
      Fine: mybook.Fine,
      returned: mybook.returned,
    });
  }
  res.json({AllBookDetailsArray});
});

exports.studentIssuedBook = catchAsyncErrors(async (req, res, next) => {
  const student = await Student.findOne({ _id: req.body._id });
  const AllissuedBook = await IssueBook.find({});
  const userFilteredIssuedBookArray = AllissuedBook.filter(
    (data) => data.StudentId === student.SID
  );
  const AllBookDetailsArray = [];
  for (let i = 0; i < userFilteredIssuedBookArray.length; i++) {
    const mybook = userFilteredIssuedBookArray[i].toObject();
    const book = await Book.findOne({ ISBN: mybook.ISBN });

    AllBookDetailsArray.push({
      student: student.name,
      SID: student.SID,
      book: book.BookName,
      ISBN: book.ISBN,
      issueDate: mybook.createdAt,
      returnDate: mybook.updatedAt,
      Fine: mybook.Fine,
      returned: mybook.returned,
    });
  }
  res.json({ AllBookDetailsArray });
});

// BOOK
exports.createBook = catchAsyncErrors(async (req, res, next) => {
  const BookName = req.body?.BookName;
  const Category = req.body?.Category;
  const Author = req.body?.Author;
  const ISBN = req.body?.ISBN;
  const Price = req.body?.Price;

  const imageBuffer = req?.file?.buffer;
  const base64image = imageBuffer?.toString("base64");

  const bookcreated = new Book({
    BookName: BookName,
    Category: Category,
    Author: Author,
    ISBN: ISBN,
    Price: Price,
    BookPicture: base64image,
  });
  const BookCreated = await bookcreated.save();
  if (bookcreated) {
    res.status(201).json(bookcreated);
  } else {
    res.json("book not created");
  }
});

exports.allBook = catchAsyncErrors(async (req, res, next) => {
  const book = await Book.find({});
  res.json({ book: book });
});

// AUTHORS
exports.createauthor = catchAsyncErrors(async (req, res, next) => {
  const authors = await new Authors(req.body).save();
  res.json({ message: "new author created", authors });
});

exports.allAuthors = catchAsyncErrors(async (req, res, next) => {
  const authors = await Authors.find({});
  res.json({ authors: authors });
});

// CATEGORIES
exports.allCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.find({});
  res.json({ category: category });
});

exports.createcategory = catchAsyncErrors(async (req, res, next) => {
  const category = await new Category(req.body).save();
  res.json({ message: "new category created", category });
});



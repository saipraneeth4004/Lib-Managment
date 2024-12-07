const express = require("express");
const router = express.Router();
const {
  adminProfile,
  createcategory,
  allCategory,
  createauthor,
  allAuthors,
  createBook,
  allBook,
  createissuedBook,
  allissuedBook,
  allStudent,
  allLengths,
  deleteCategory,
  categoryDetail,
  editCategory,
  authorDetail,
  editAuthor,
  deleteAuthor,
  bookDetail,
  editBook,
  deleteBook,
  studentStatusChanger,
  gatherAll_sid_isbn,
  check_isbn,
  check_sid,
  studentIssuedBook,
  returnIssuedBook,
  IssuedBookDetails,
  studentBookNotReturned,
  check_username,
  
} = require("../controllers/adminController");
const multer = require("multer");

const { isLoggedIn } = require("../middlewares/isLoggedIn");

router.post("/profile", adminProfile);

router.get("/allStudent", allStudent);
router.get("/allLength", allLengths);
router.get("/gatherAll_sid_isbn", gatherAll_sid_isbn);
router.get("/check_username", check_username);
router.post("/check_sid", check_sid);
router.post("/check_isbn", check_isbn);
router.post("/studentStatusChanger", studentStatusChanger);
router.post("/studentIssuedBook", studentIssuedBook);
router.post("/studentBookNotReturned", studentBookNotReturned);

router.post("/createcategory", createcategory);
router.get("/allCategory", allCategory);
router.post("/categoryDetail", categoryDetail);
router.post("/editCategory", editCategory);
router.post("/deleteCategory", deleteCategory);

router.post("/createauthor", createauthor);
router.get("/allAuthors", allAuthors);
router.post("/authorDetail", authorDetail);
router.post("/editAuthor", editAuthor);
router.post("/deleteAuthor", deleteAuthor);

const storage = multer.memoryStorage();
const upload = multer({ storage });
router.post("/createBook", upload.single("BookPicture"), createBook);
router.get("/allBook", allBook);
router.post("/bookDetail", bookDetail);
router.post("/editBook", upload.single("BookPicture"), editBook);
router.post("/deleteBook", deleteBook);

router.post("/createissuedBook", createissuedBook);
router.post("/returnIssuedBook", returnIssuedBook);
router.post("/IssuedBookDetails", IssuedBookDetails);
router.get("/allissuedBook", allissuedBook);

module.exports = router;

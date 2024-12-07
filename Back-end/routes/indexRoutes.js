const express = require("express");
const router = express.Router();
const {
  homepage,
  currentUser,
  studentSignup,
  studentSignin,
  studentSignout,
  updateProfile,
  changePassword,
  userDashboardLength,

} = require("../controllers/indexController");
const { isLoggedIn } = require("../middlewares/isLoggedIn");

router.get("/homepage", isLoggedIn, homepage);

router.post("/user", isLoggedIn, currentUser);

router.post("/updateProfile", isLoggedIn, updateProfile);

router.post("/changePassword", isLoggedIn, changePassword);

router.post("/userDashboardLength", isLoggedIn, userDashboardLength);

router.post("/student/signup", studentSignup);

router.post("/student/signin", studentSignin);

router.get("/student/signout", isLoggedIn, studentSignout);

module.exports = router;

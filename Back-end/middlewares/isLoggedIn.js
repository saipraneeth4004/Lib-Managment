const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utlis/ErrorHandler");
const { catchAsyncErrors } = require("./catchAsyncErrors");

exports.isLoggedIn = catchAsyncErrors(async (req, res, next) => {
  const { mytoken } = req.headers; // for frontend 
  // const { mytoken } = req.cookies; // for postman
  if (!mytoken) {
    return next(new ErrorHandler("Login first to access this page", 401));
  }
  const { id } = jwt.verify(mytoken, process.env.JWT_SECRET);
  req.id = id;
  next();
});



require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4041;

// cors policy
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions)); // Use this after the variable declaration

// database connection
require("./models/database").databaseConnection();

// logger ( morgan )
const logger = require("morgan");
app.use(logger("tiny"));

const path = require("path");
const compression = require("compression");
// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(compression());

// session and cookies
const session = require("express-session");
const cookieParser = require("cookie-parser");
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(cookieParser());

// routes
app.use("/api/", require("./routes/indexRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// error handling
const ErrorHandler = require("./utlis/ErrorHandler");
const { generatedError } = require("./middlewares/error");
// app.all("*", (req, res, next) => {
//   next(new ErrorHandler(`requested url not found ${req.url}`, 404));
// });

app.use(generatedError);

app.listen(PORT, console.log(`Server is running on PORT ${PORT}`));

exports.setcookie = (student, statusCode, res, isAdmin) => {
  const token = student.generateJWT();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE  * 60 * 60 * 1000
    ),
    httpOnly: true,
    // secure: false,
  };

  res
    .status(statusCode)
    .cookie("mytoken", token, options)
    .json({ content: "heylo gays", student_data: student, token: token , admin : isAdmin });
};


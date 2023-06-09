const jwt = require("jsonwebtoken");


exports.signToken = (id) => {
  console.log(
    "signToken" + process.env.JWT_SECRET + process.env.JWT_EXPIRES_IN
  );
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};



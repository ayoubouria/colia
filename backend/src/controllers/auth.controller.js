const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const userServices = require("../services/user.service");

exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    const token = userServices.signToken(newUser._id);

    res.status(201).json({
      status: "success",
      token,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide email and password!",
    });
  }

  // 2) Check if user exists && password is correct
  try {
    const user = await User.findOne({ email }).select("+password");
    // console.log(user);
    const isCorrect = await user.correctPassword(password, user.password);
    // console.log(isCorrect);

    if (!user || !isCorrect) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }
    // 3) If everything ok, send token to client
    // console.log("token");
    const token = userServices.signToken(user._id);
    console.log(token);

    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: "Incorrect email or password",
    });
  }
};

exports.protect = async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  console.log(token);
  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "You are not logged in! Please log in to get access.",
    });
  }
  // 2) Verification signToken
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);
  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res.status(401).json({
      status: "fail",
      message: "The user belonging to this token does no longer exist.",
    });
  }
  // 4) Check if user changed password after the token was issued
  //   if (currentUser.changedPasswordAfter(decoded.iat)) {
  //     return res.status(401).json({
  //       status: "fail",
  //       message: "User recently changed password! Please log in again.",
  //     });
  //   }
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
};

const User = require("../models/user.model");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllUsers = async (req, res) => {
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  try {
    const users = await features.query;
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getUser = async (req, res) => {
  const features = new APIFeatures(
    User.findById(req.params.id),
    req.query
  ).limitFields();

  try {
    const user = await features.query;
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, updatedUser, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createReview = async (req, res) => {
  const id = req.params.id;
  const review = req.body;
  try {
    const user = await User.findById(id);
    user.addReview(review);
    return res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

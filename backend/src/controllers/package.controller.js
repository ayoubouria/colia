const Package = require("../models/package.model");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllPackages = async (req, res) => {
  const features = new APIFeatures(Package.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  try {
    const packages = await features.query;
    res.status(200).json({
      status: "success",
      results: packages.length,
      data: {
        packages,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getPackage = async (req, res) => {
  const features = new APIFeatures(
    Package.findById(req.params.id),
    req.query
  ).limitFields();

  try {
    const package = await features.query;
    res.status(200).json({
      status: "success",
      data: {
        package,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createPackage = async (req, res) => {
  try {
    const newPackage = await Package.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        package: newPackage,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updatePackage = async (req, res) => {
  const id = req.params.id;
  const updatedPackage = req.body;
  try {
    const package = await Package.findByIdAndUpdate(id, updatedPackage, {
      new: true,
      runValidators: true,
    });
    return res.status(200).json({
      status: "success",
      data: {
        package,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deletePackage = async (req, res) => {
  const id = req.params.id;
  try {
    await Package.findByIdAndDelete(id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

const Proposition = require("../models/proposition.model");
const Package = require("../models/package.model");
const User = require("../models/user.model");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllPropositions = async (req, res) => {
  const features = new APIFeatures(Proposition.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  try {
    const propositions = await features.query;
    res.status(200).json({
      status: "success",
      results: propositions.length,
      data: {
        propositions,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getProposition = async (req, res) => {
  const features = new APIFeatures(
    Proposition.findById(req.params.id),
    req.query
  ).limitFields();

  try {
    const proposition = await features.query;
    res.status(200).json({
      status: "success",
      data: {
        proposition,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getPropositionsByPackage = async (req, res) => {
  const features = new APIFeatures(
    Proposition.find({ package: req.params.id }),
    req.query
  ).limitFields();

  try {
    const propositions = await features.query;
    res.status(200).json({
      status: "success",
      data: {
        propositions,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getPropositionsByUserFrom = async (req, res) => {
  const features = new APIFeatures(
    Proposition.find({ userFrom: req.params.id }),
    req.query
  ).limitFields();

  try {
    const propositions = await features.query;
    res.status(200).json({
      status: "success",
      data: {
        propositions,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getPropositionsByUserTo = async (req, res) => {
  const features = new APIFeatures(
    Proposition.find({ userTo: req.params.id }),
    req.query
  ).limitFields();

  try {
    const propositions = await features.query;
    res.status(200).json({
      status: "success",
      data: {
        propositions,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createProposition = async (req, res) => {
  try {
    const newProposition = await Proposition.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        proposition: newProposition,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};


const mongoose = require("mongoose");

const propositionSchema = new mongoose.Schema({
    userFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    // Other fields of the proposition
    // ...
  });

  const Proposition = mongoose.model('Proposition', propositionSchema);

  module.exports = Proposition;
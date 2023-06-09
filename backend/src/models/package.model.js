const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  description: {
    type: String,
  },
  dimensions: {
    size: {
      type: String,
      enum: ["XXL", "XL", "L", "M", "S"],
    },
    height: {
      type: Number,
    },
    width: {
      type: Number,
    },
    length: {
      type: Number,
    },
  },
  weight: {
    approximate: {
      type: String,
      enum: ["< 5 kg", "5 - 30 kg", "30 - 100 kg", "> 100 kg"],
    },
    exact: {
      type: Number,
    },
  },
  images: [
    {
      type: String,
      default: "default.jpg",
    },
  ],
  price: {
    suggested: {
      type: Number,
      required: [true, "Please provide a suggested price"],
    },
    final: {
      type: Number,
      required: [true, "Please provide a final price"],
      default: function () {
        return this.suggested;
      },
    },
  },
  sender: { type: mongoose.Schema.ObjectId, ref: "User" },
  receiver: {
    name: {
      type: String,
    },
    telephone: {
      type: String,
      validate: {
        validator: function (el) {
          return el.match(/^[0-9]{10}$/);
        },
        message: "Please provide a valid telephone number",
      },
    },
  },
  deliverer: { type: mongoose.Schema.ObjectId, ref: "User" },
  desiredDeliveryDate: {
    start: {
      type: Date,
      required: [true, "Please provide a start date"],
    },
    end: {
      type: Date,
      required: [true, "Please provide an end date"],
    },
  },
  pickupAddress: {
    name: {
      type: String,
      required: [true, "Please provide a pickup address name"],
    },
    longitude: {
      type: Number,
      required: [true, "Please provide a longitude"],
    },
    latitude: {
      type: Number,
      required: [true, "Please provide a latitude"],
    },
  },
  deliveryAddress: {
    name: {
      type: String,
      required: [true, "Please provide a pickup address name"],
    },
    longitude: {
      type: Number,
      required: [true, "Please provide a longitude"],
    },
    latitude: {
      type: Number,
      required: [true, "Please provide a latitude"],
    },
  },
  status: {
    type: String,
    enum: ["pending", "in transit", "delivered"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

packageSchema.methods.updateFinalPrice = function (suggestedPrice) {
  this.price.final = suggestedPrice;
  return this.price.final;
};

packageSchema.methods.updateStatus = function (status) {
  this.status = status;
  return this.status;
};

const Package = mongoose.model("Package", packageSchema);

module.exports = Package;

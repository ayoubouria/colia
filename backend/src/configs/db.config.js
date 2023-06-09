require("dotenv").config();
const mongoose = require("mongoose");

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
exports.connect = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
    });
    console.log("DB connection successful!");
  } catch (err) {
    console.log(err);
  }
};

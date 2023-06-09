require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const userRoute = require("./src/routes/user.route");
const packageRoute = require("./src/routes/package.route");
const proposition = require("./src/routes/proposition.route");


// -------------------------Middleware-------------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// -------------------------Routes-------------------------
app.use("/api/v1/users", userRoute);
app.use("/api/v1/packages", packageRoute);
app.use("/api/v1/propositions", proposition);




module.exports = app;
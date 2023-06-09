require('dotenv').config();

const app = require("./app");
const db = require("./src/configs/db.config");




// --------------------------------- DB ---------------------------------

db.connect();
// -------------------------- Server --------------------------
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
  });
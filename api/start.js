const mongoose = require("mongoose");

// import environmental variables from our variables.env file
require("dotenv").config({ path: "variables.env" });

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.DATABASE,
  () => {
    console.log("Database connection");
  }
);

// READY?! Let's go!
require("./models/user");
// require("./models/cart");

// Start our app!
const app = require("./app");
const port = process.env.PORT || 7777;
app.listen(port, () => {
  console.log(`Express running → PORT ${port}`);
});

const mongoose = require("mongoose");
require("dotenv").config();

const { MONGO_URI } = process.env;
module.exports=
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("DB connected......@@@@@@@@@");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

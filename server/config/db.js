// package
const mongoose = require("mongoose");
const config = require("config");
// URI
const url = config.get("mongoURL");

// Connect MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

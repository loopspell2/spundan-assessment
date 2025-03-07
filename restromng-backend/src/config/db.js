const mongoose = require("mongoose");
require("dotenv").config();

const connection = async () => {
  try {
    const uri = process.env.MONGODB_URI; // Get the Mongo URI from .env file
    await mongoose.connect(uri);
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit if the connection fails
  }
};

module.exports = connection;

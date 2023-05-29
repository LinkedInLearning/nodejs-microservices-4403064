const mongoose = require("mongoose");

const connectToMongoose = async (connectionString) => {
  try {
    await mongoose.connect(connectionString);

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to Mongoose:", error);
    process.exit(1);
  }
};

module.exports = connectToMongoose;

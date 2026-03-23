const mongoose = require("mongoose");
const connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Sample_data");
    console.log("Database connected successfully!");
    console.log(mongoose.connection.readyState);
  } catch (error) {
    console.log("Database connection failed", error);
    console.log(mongoose.connection.readyState);
  }
};
connection();

module.exports = connection;
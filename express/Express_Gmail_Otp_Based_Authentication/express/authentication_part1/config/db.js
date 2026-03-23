const mongoose = require("mongoose");
const connection = async () => {
  try {
    await mongoose.connect(
     "mongodb://localhost:27017/insta_user"
    );
    console.log("Database connected!");
    console.log(mongoose.connection.readyState);
  } catch (error) {
    console.log("Database connection failed");
    console.log(mongoose.connection.readyState);
  }
};

connection();
module.exports = connection;
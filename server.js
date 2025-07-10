const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const mongoose = require("mongoose");

const db = process.env.DATABASE_LOCAL.toString();
mongoose
  .connect(db)
  .then(() => console.log("DB connect succesfully"))
  .catch((e) => {
    console.log(e);
  });





const port = process.env.PORT || 3000;
const server = app.listen(port,'0.0.0.0',() => {
  console.log(`App running on port ${port}`);
});
server.on('error', (err) => {
  console.error("Server error:", err);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});


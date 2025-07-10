const express = require("express");
const morgan = require("morgan");
const app = express();
// const tourRouter = require("./routers/tourRoute");
const userRouter = require("./routes/userRoute");
const AppError = require("./utils/appError");
// const globalErrorHandler = require("./controllers/errorController");

console.log(process.env.NODE_ENV);

// 1) Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// // 3) Route

// // app.use("/api/v2/tours", tourRouter); //middleware
app.use("/api/financy/v1/", userRouter); //middleware

// app.all("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

// app.use(globalErrorHandler); // 5) Error handling middleware

// 4) Server
module.exports = app;

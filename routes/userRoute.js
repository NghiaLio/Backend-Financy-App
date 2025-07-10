const express = require("express");

// const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const userRouter = express.Router();

//authentication

userRouter.post("/google/login", authController.parseToken);
userRouter.get("/google/check", authController.authenticateJWT, userController.getUser);
userRouter.post("/google/logout", authController.logout);
userRouter.post("/google/refresh", authController.refreshToken);

// userRouter.post("/forgotPassword", authController.forgotPassword);
// userRouter.patch("/resetPassword/:token", authController.resetPassword);

// userRouter.patch("/updateMe", authController.protect, userController.updateMe);
// userRouter.delete("/deleteMe", authController.protect, userController.deleteMe);

userRouter.route("/").get((req, res) => {});

module.exports = userRouter;

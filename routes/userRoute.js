const express = require("express");

// const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const accountController = require("../controllers/acountController");
const validateAccountInput = require("../utils/validateAccountInput");
const { authenticateJWT } = require("../controllers/authController");

const userRouter = express.Router();

//authentication

userRouter.post("/google/login", authController.parseToken);
userRouter.post("/google/logout", authController.logout);
userRouter.post("/google/refresh", authController.refreshToken);

// user
userRouter.get(
  "/google/user",
  authController.authenticateJWT,
  userController.getUser
);
userRouter.put("/google/user/:id", userController.updateUser);

// Account CRUD routes
userRouter.get("/accounts", authenticateJWT, accountController.getAllAccount);
userRouter.get("/accounts/:id", authenticateJWT, accountController.getAccount);
userRouter.post(
  "/accounts",
  authenticateJWT,
  validateAccountInput,
  accountController.createAccount
);
userRouter.put(
  "/accounts/:id",
  authenticateJWT,
  validateAccountInput,
  accountController.updateAccount
);
userRouter.patch(
  "/accounts/:id/active",
  authenticateJWT,
  accountController.updateAccountActive
);
userRouter.delete(
  "/accounts/:id",
  authenticateJWT,
  accountController.deleteAccount
);

module.exports = userRouter;

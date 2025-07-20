const accountModels = require("../models/accountModels");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const allowedTypes = Object.values(accountModels.account_type);
const allowedCurrencies = Object.values(accountModels.account_currency);

// Get all accounts (chỉ lấy account của user)
const getAllAccount = catchAsync(async (req, res) => {
  const allAccount = await accountModels.Account.find({
    userId: req.user.userId,
  });
  res.json(allAccount);
});

// Get one account by ID (chỉ lấy account của user)
const getAccount = catchAsync(async (req, res, next) => {
  const account = await accountModels.Account.findOne({
    _id: req.params.id,
    userId: req.user.userId,
  });
  if (!account) {
    return next(new AppError("No account found with that ID", 404));
  }
  res.json(account);
});

// Create account (gán userId từ JWT)
const createAccount = catchAsync(async (req, res, next) => {
  console.log(req.body)
  // Validate dữ liệu đầu vào bổ sung
  if (
    typeof req.body.accountName !== "string" ||
    !req.body.accountName.trim() ||
    req.body.accountName.length > 100
  ) {
    return next(
      new AppError(
        "accountName is required, non-empty, and <= 100 characters",
        400
      )
    );
  }
  // if (!allowedTypes.includes(req.body.accountType)) {
  //   return next(new AppError("accountType is invalid", 400));
  // }
  if (req.body.accountBalance !== undefined && req.body.accountBalance < 0) {
    return next(new AppError("accountBalance must be >= 0", 400));
  }
  // if (req.body.currency && !allowedCurrencies.includes(req.body.currency)) {
  //   return next(new AppError("currency is invalid", 400));
  // }
  const newAccount = await accountModels.Account.create({
    ...req.body,
    userId: req.user.userId,
  });
  res.status(201).json(newAccount);
});

// Update account by ID (chỉ update account của user)
const updateAccount = catchAsync(async (req, res, next) => {
  // Validate dữ liệu đầu vào bổ sung
  if (
    req.body.accountName &&
    (typeof req.body.accountName !== "string" ||
      !req.body.accountName.trim() ||
      req.body.accountName.length > 100)
  ) {
    return next(
      new AppError("accountName must be non-empty and <= 100 characters", 400)
    );
  }
  if (req.body.accountType && !allowedTypes.includes(req.body.accountType)) {
    return next(new AppError("accountType is invalid", 400));
  }
  if (req.body.accountBalance !== undefined && req.body.accountBalance < 0) {
    return next(new AppError("accountBalance must be >= 0", 400));
  }
  if (req.body.currency && !allowedCurrencies.includes(req.body.currency)) {
    return next(new AppError("currency is invalid", 400));
  }
  const updatedAccount = await accountModels.Account.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!updatedAccount) {
    return next(new AppError("No account found with that ID", 404));
  }
  res.json(updatedAccount);
});

// Update only the 'active' field (soft delete or restore, chỉ cho user sở hữu)
const updateAccountActive = catchAsync(async (req, res, next) => {
  if (typeof req.body.active !== "boolean") {
    return next(new AppError('Missing or invalid "active" field', 400));
  }
  const updatedAccount = await accountModels.Account.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.userId },
    { active: req.body.active },
    { new: true }
  );
  if (!updatedAccount) {
    return next(new AppError("No account found with that ID", 404));
  }
  res.json(updatedAccount);
});

// Delete account by ID (hard delete, chỉ cho user sở hữu)
const deleteAccount = catchAsync(async (req, res, next) => {
  const deletedAccount = await accountModels.Account.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.userId,
  });
  if (!deletedAccount) {
    return next(new AppError("No account found with that ID", 404));
  }
  res.status(204).json({ status: "success", data: null });
});

module.exports = {
  getAllAccount,
  getAccount,
  createAccount,
  updateAccount,
  updateAccountActive,
  deleteAccount,
};

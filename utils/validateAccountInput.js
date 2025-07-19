const AppError = require("./appError");

module.exports = (req, res, next) => {
  const {
    accountName,
    accountType,
    accountBalance,
    currency,
    linked,
    bankMeta,
  } = req.body;

  // accountName: required, string
  if (typeof accountName !== "string" || !accountName.trim()) {
    return next(
      new AppError(
        "accountName is required and must be a non-empty string",
        400
      )
    );
  }
  // accountType: optional, string
  if (accountType !== undefined && typeof accountType !== "string") {
    return next(new AppError("accountType must be a string", 400));
  }
  // accountBalance: optional, number
  if (accountBalance !== undefined && typeof accountBalance !== "number") {
    return next(new AppError("accountBalance must be a number", 400));
  }
  // currency: optional, string
  if (currency !== undefined && typeof currency !== "string") {
    return next(new AppError("currency must be a string", 400));
  }
  // linked: optional, boolean
  if (linked !== undefined && typeof linked !== "boolean") {
    return next(new AppError("linked must be a boolean", 400));
  }
  // bankMeta: optional, object or null
  if (
    bankMeta !== undefined &&
    bankMeta !== null &&
    typeof bankMeta !== "object"
  ) {
    return next(new AppError("bankMeta must be an object or null", 400));
  }

  // Nếu accountType là 'Ngân hàng' hoặc 'Banking', chỉ cho nhập tên + số dư
  if (accountType === "Ngân hàng" || accountType === "Banking") {
    // Các trường khác ngoài accountName, accountBalance, linked, bankMeta không được nhập
    const allowedFields = [
      "accountName",
      "accountType",
      "accountBalance",
      "linked",
      "bankMeta",
    ];
    for (const key of Object.keys(req.body)) {
      if (!allowedFields.includes(key)) {
        return next(
          new AppError(
            `Field '${key}' is not allowed when accountType is 'Ngân hàng'/'Banking'`,
            400
          )
        );
      }
    }
  }

  // Nếu linked === true, bankMeta là bắt buộc (object, không null)
  if (linked === true) {
    if (!bankMeta || typeof bankMeta !== "object") {
      return next(
        new AppError(
          "bankMeta is required and must be an object when linked is true",
          400
        )
      );
    }
  }
  // Nếu linked === false, bankMeta phải là null hoặc undefined
  if (linked === false) {
    if (bankMeta !== undefined && bankMeta !== null) {
      return next(
        new AppError(
          "bankMeta must be null or undefined when linked is false",
          400
        )
      );
    }
  }

  next();
};
